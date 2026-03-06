import os
import time
import io
import resend
from fastapi import FastAPI, File, UploadFile, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
import threading
from rembg import new_session, remove
from PIL import Image

print(f"[{time.strftime('%Y-%m-%d %H:%M:%S')}] Starting backend process...")

# グローバル状態
session = None
model_ready = False
model_loading = False

def load_model():
    global session, model_ready, model_loading
    model_loading = True
    try:
        import numpy as np
        print(f"[{time.strftime('%Y-%m-%d %H:%M:%S')}] Background: Initializing AI model (u2netp)...")
        # ダミーデータで一度実行して初期化
        dummy_img = np.zeros((10, 10, 3), dtype=np.uint8)
        _ = remove(dummy_img, model_name="u2netp")
        
        # セッションも作成しておく（高速化のため）
        session = new_session(model_name="u2netp", providers=['CPUExecutionProvider'])
        
        model_ready = True
        print(f"[{time.strftime('%Y-%m-%d %H:%M:%S')}] Background: AI model (u2netp) is READY")
    except Exception as e:
        print(f"[{time.strftime('%Y-%m-%d %H:%M:%S')}] Background: ERROR loading model: {str(e)}")
        import traceback
        traceback.print_exc()
    finally:
        model_loading = False


# --- App setup ---
limiter = Limiter(key_func=get_remote_address)
app = FastAPI(title="Cutout AI API", version="1.0.0")
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

@app.on_event("startup")
def on_startup():
    # サーバーがポート待機を開始した後に、バックグラウンドでモデル読み込みを開始
    print(f"[{time.strftime('%Y-%m-%d %H:%M:%S')}] Startup: Triggering model load in background")
    threading.Thread(target=load_model, daemon=True).start()

# CORS設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://cutoutai.yu-fu.site",
        "https://cutout-ai.pages.dev", # Cloudflare Pages デフォルトドメイン
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Resend API Key
resend.api_key = os.getenv("RESEND_API_KEY")
CONTACT_RECEIVER_EMAIL = os.getenv("CONTACT_RECEIVER_EMAIL")

# --- Constants ---
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB
MAX_RESOLUTION = 4096
ALLOWED_MIME_TYPES = {"image/png", "image/jpeg", "image/webp"}
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "webp"}


@app.get("/api/health")
async def health_check():
    """ヘルスチェックエンドポイント"""
    return {"status": "ok", "service": "cutout-ai"}


@app.post("/api/remove-bg")
@limiter.limit("5/minute")
def remove_background(request: Request, image: UploadFile = File(...)):
    """背景削除エンドポイント
    
    注: CPU負荷が高いため、asyncなしの def で定義し、
    FastAPIのスレッドプールで実行させることでイベントループのブロックを防ぎます。
    """
    if not model_ready:
        raise HTTPException(
            status_code=503,
            detail="AIモデルを準備中です（数十秒かかります）。しばらくしてから再度お試しください。",
            headers={"Retry-After": "10"}
        )
        
    print(f"[{time.strftime('%Y-%m-%d %H:%M:%S')}] Received remove-bg request")
    
    # 拡張子チェック
    filename = image.filename or ""
    ext = filename.rsplit(".", 1)[-1].lower() if "." in filename else ""
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail=f"対応していないファイル形式です。対応形式: {', '.join(ALLOWED_EXTENSIONS)}",
        )

    # MIMEタイプチェック
    if image.content_type not in ALLOWED_MIME_TYPES:
        raise HTTPException(
            status_code=400,
            detail=f"対応していないMIMEタイプです: {image.content_type}",
        )

    # ファイル読み込み
    file_bytes = image.file.read()

    # サイズチェック
    if len(file_bytes) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=400,
            detail=f"ファイルサイズが大きすぎます。最大: {MAX_FILE_SIZE // (1024 * 1024)}MB",
        )

    # 解像度チェック
    try:
        img = Image.open(io.BytesIO(file_bytes))
        width, height = img.size
        if width > MAX_RESOLUTION or height > MAX_RESOLUTION:
            raise HTTPException(
                status_code=400,
                detail=f"解像度が大きすぎます。最大: {MAX_RESOLUTION}px",
            )
    except HTTPException:
        raise
    except Exception:
        raise HTTPException(status_code=400, detail="画像を読み込めませんでした。")

    # rembgで背景削除
    try:
        # 外部でインポート済み
        if session:
            output_bytes = remove(file_bytes, session=session)
        else:
            # 万が一セッションがない場合はデフォルトで実行
            output_bytes = remove(file_bytes, model_name="u2netp")
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(
            status_code=500,
            detail=f"背景削除処理に失敗しました: {str(e)}",
        )

    return Response(
        content=output_bytes,
        media_type="image/png",
        headers={
            "Content-Disposition": "inline; filename=cutout.png",
        },
    )


from pydantic import BaseModel, EmailStr

class ContactForm(BaseModel):
    name: str
    email: EmailStr
    message: str

@app.post("/api/contact")
async def contact(form: ContactForm):
    """お問い合わせ送信エンドポイント"""
    if not resend.api_key or not CONTACT_RECEIVER_EMAIL:
        print("Error: RESEND_API_KEY or CONTACT_RECEIVER_EMAIL is not set")
        # 開発環境でのデバッグ用にログ出力のみして成功を返すことも検討できますが、
        # ここではエラーを返して設定が必要なことを明示します。
        raise HTTPException(status_code=500, detail="メール送信設定が未完了です。")

    try:
        params = {
            "from": "Cutout AI <onboarding@resend.dev>", # Resendのデフォルト送信元
            "to": [CONTACT_RECEIVER_EMAIL],
            "subject": f"【Cutout AI】お問い合わせ: {form.name}様",
            "html": f"""
                <h3>新着のお問い合わせ</h3>
                <p><strong>お名前:</strong> {form.name}</p>
                <p><strong>メールアドレス:</strong> {form.email}</p>
                <p><strong>内容:</strong></p>
                <p>{form.message.replace(chr(10), '<br>')}</p>
            """,
        }
        resend.Emails.send(params)
        return {"status": "success", "message": "お問い合わせを送信しました。"}
    except Exception as e:
        print(f"Resend Error: {str(e)}")
        raise HTTPException(status_code=500, detail="お問い合わせの送信に失敗しました。")


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
