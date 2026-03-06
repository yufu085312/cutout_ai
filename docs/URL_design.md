# Cutout AI URL設計（保存なし完全版）

ベースURL

```
https://cutoutai.yu-fu.site
```

画像は**サーバー保存せず、処理してそのままレスポンス返却**します。

---

# 1. 公開ページ（Public Pages）

| URL           | ページ        | 内容                |
| ------------- | ---------- | ----------------- |
| `/`           | ホーム        | サービス説明 + 画像アップロード |
| `/editor`     | 背景削除       | 画像アップロード + 処理     |
| `/result`     | 結果         | 背景透過画像表示 + ダウンロード |
| `/how-to-use` | 使い方        | 操作説明              |
| `/faq`        | FAQ        | よくある質問            |
| `/privacy`    | プライバシーポリシー | 画像を保存しない旨         |
| `/terms`      | 利用規約       | サービス利用条件          |
| `/contact`    | お問い合わせ     | メールフォーム           |

---

# 2. 機能ページ（Feature Pages）

MVPでは `/editor` だけでも成立します。

| URL         | 内容              |
| ----------- | --------------- |
| `/editor`   | 画像アップロード + 背景削除 |
| `/result`   | 処理結果表示          |
| `/download` | 画像ダウンロード        |

※ `/result` 内でダウンロードするなら `/download` は不要。

---

# 3. API

APIベースURL

```
https://cutoutai.yu-fu.site/api
```

| API              | Method | 内容         |
| ---------------- | ------ | ---------- |
| `/api/remove-bg` | POST   | 背景削除       |
| `/api/health`    | GET    | APIヘルスチェック |

MVPでは **remove-bgのみでOK**。

---

# 4. API仕様

### リクエスト

```
POST /api/remove-bg
Content-Type: multipart/form-data
```

Body

```
image: file
```

対応形式

```
jpg
jpeg
png
webp
```

最大サイズ

```
10MB
```

---

### レスポンス

```
Content-Type: image/png
```

レスポンス例

```
PNG binary
```

フロント側では

```
URL.createObjectURL()
```

で表示できます。

---

# 5. フロントの画面フロー

```
/
↓
/editor
↓
画像アップロード
↓
/api/remove-bg
↓
結果取得
↓
/result
↓
ダウンロード
```

---

# 6. 完全URLツリー

```
cutoutai.yu-fu.site
│
├ /
│
├ /editor
│
├ /result
│
├ /how-to-use
│
├ /faq
│
├ /privacy
│
├ /terms
│
├ /contact
│
└ /api
     ├ remove-bg
     └ health
```

---

# 7. MVP URL構成（最小）

最初はこれだけでもOKです。

```
/
 /editor
 /api/remove-bg
```

結果表示は `/editor` 内でも可能。

---

# 8. SEO用URL（リダイレクト）

検索流入を増やすためのURL。

| URL                         | 内容      |
| --------------------------- | ------- |
| `/ai-background-remover`    | AI背景削除  |
| `/remove-background-online` | 背景削除ツール |
| `/png-background-remover`   | PNG背景削除 |
| `/free-background-remover`  | 無料背景削除  |

すべて

```
/editor
```

へリダイレクト。

---

# 9. サブドメイン構成

今回は **1つのみ**

```
cutoutai.yu-fu.site
```

不要

```
img.cutoutai.yu-fu.site
api.cutoutai.yu-fu.site
```

---

# 10. Cloudflare構成

```
User
 ↓
Cloudflare
 ↓
Pages (Next.js)
 ↓
API
 ↓
rembg
 ↓
レスポンス
```

画像保存なし。

---

# 11. 将来の拡張URL

機能追加する場合。

```
/batch
/api/batch-remove
/login
/dashboard
/api-key
```

APIサービス化も可能。

---

# 12. 最終URL構成

```
cutoutai.yu-fu.site
│
├ /
├ /editor
├ /result
├ /how-to-use
├ /faq
├ /privacy
├ /terms
├ /contact
│
├ /ai-background-remover
├ /remove-background-online
├ /png-background-remover
│
└ /api
     ├ remove-bg
     └ health
```
