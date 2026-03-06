# Cutout AI 完全仕様書 v1.0

---

# 1. サービス概要

## サービス名

**Cutout AI**

画像の背景をAIで自動削除するWebツール。

---

## サービスURL

```
https://cutoutai.yu-fu.site
```

---

## サービス説明

画像をアップロードすると
AIが自動で背景を削除し
透過PNGを生成するサービス。

特徴

* 登録不要
* 無料利用
* 高速処理
* ブラウザで完結

---

## ターゲット

ユーザー層

* EC出品者
* SNSユーザー
* ブロガー
* デザイナー
* 開発者

---

## 技術構成

### フロント

* Next.js
* TypeScript
* TailwindCSS

デプロイ

Cloudflare Pages

---

### バックエンド

* Python
* FastAPI

AI処理

rembg

---

### インフラ

フロント

Cloudflare Pages

API

* Fly.io

CDN

Cloudflare

---

# 2. AI仕様

使用ライブラリ

rembg

---

## モデル

U²-Net

特徴

* 人物
* 商品
* 動物
* 車

などの切り抜きに強い

---

## 入力

画像

対応

```
PNG
JPG
JPEG
WEBP
```

---

## 出力

```
透過PNG
```

---

# 3. MVP機能

---

# 3.1 画像アップロード

UI

```
Drag & Drop
```

または

```
Upload Image
```

---

## 制限

ファイルサイズ

```
10MB
```

解像度

```
最大4096px
```

---

## 対応形式

```
png
jpg
jpeg
webp
```

---

# 3.2 AI背景透過

処理フロー

```
画像アップロード
 ↓
Next.js API
 ↓
FastAPI
 ↓
rembg
 ↓
透過PNG生成
```

---

# 3.3 プレビュー

表示

```
元画像 | 透過画像
```

透過背景

```
市松模様
```

---

# 3.4 ダウンロード

ボタン

```
Download PNG
```

---

# 4. UI設計

---

# TOPページ

```
--------------------------------

Cutout AI
Remove Background Automatically

[ Drag & Drop Image ]

or

[ Upload Image ]

--------------------------------
```

---

# 処理画面

```
--------------------------------

Original Image | Removed Background

[Download PNG]

--------------------------------
```

---

# 5. セキュリティ

---

## MIMEチェック

```
image/*
```

---

## サイズ制限

```
10MB
```

---

## Rate Limit

```
1分5回
```

---


# 6. 収益化

---

## 広告

Google AdSense

配置

* ヘッダー
* 結果画面下

---

## プラン

無料

---

# 7. 想定コスト

MVP

```
ほぼ0円
```

内訳

| 項目               | 料金 |
| ---------------- | -- |
| Cloudflare Pages | 無料 |
| Fly.io           | 無料 |
| rembg            | 無料 |

---

# 8. 将来拡張

---

## 一括処理

```
10画像
ZIP
```

---

## 背景変更

例

```
カフェ
オフィス
海
```

---

## AI商品写真生成

EC向け

```
商品
↓
AI背景
```

---

# 9. KPI

最初の目標

```
1日100ユーザー
```

達成すると

```
月3万PV
```

広告収益

```
5000〜20000円
```

---

# 10. 開発環境構築

## 必要要件

* **Python**: 3.10以上 (推奨 3.10.x)
* **Node.js**: 18.x以上
* **npm**: 9.x以上

## セットアップ手順

### 1. リポジトリのクローン
```bash
git clone https://github.com/yufu085312/cutout_ai.git
cd cutout_ai
```

### 2. バックエンドのセットアップ
```bash
cd backend
# 仮想環境の作成（推奨）
python3.10 -m venv venv
source venv/bin/activate

# 依存パッケージのインストール
pip install -r requirements.txt
```
> [!NOTE]
> Apple Silicon (M1/M2/M3) 環境で `llvmlite` のビルドエラーが発生する場合は、`requirements.txt` で `llvmlite==0.43.0` および `numba==0.60.0` を指定していることを確認してください。

### 3. フロントエンドのセットアップ
```bash
cd ../frontend
npm install
```

---

# 11. 起動方法

### 1. バックエンドサーバーの起動
```bash
cd backend
source venv/bin/activate # 仮想環境を使用している場合
uvicorn main:app --reload --port 8000
```
> 初回起動時は、背景削除用AIモデル（u2net.onnx）のダウンロード（約176MB）が行われるため、数分かかる場合があります。

### 2. フロントエンド開発サーバーの起動
```bash
cd frontend
npm run dev
```

起動後、ブラウザで [http://localhost:3000](http://localhost:3000) にアクセスしてください。

---

# 12. Dockerでの起動方法（推奨）

DockerおよびDocker Composeがインストールされている場合、以下のコマンドだけで全環境を起動できます。

### 1. ビルドと起動
```bash
docker-compose up --build
```

### 2. アクセス
* **フロントエンド**: [http://localhost:3000](http://localhost:3000)
* **バックエンド**: [http://localhost:8000](http://localhost:8000)

> [!TIP]
> Docker Composeを使用すると、AIモデルデータがボリューム（`u2net_data`）に保存されるため、2回目以降の起動が高速になります。
