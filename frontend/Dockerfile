# ビルドステージ
FROM node:20-slim AS builder

# ビルド時引数の定義
ARG BACKEND_URL
ENV BACKEND_URL=$BACKEND_URL

# OpenCVや一部の依存関係で必要なライブラリを追加（必要に応じて）
RUN apt-get update && apt-get install -y --no-install-recommends \
    libc6 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# 実行ステージ
FROM node:20-slim AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# 実行時にも環境変数を保持
ARG BACKEND_URL
ENV BACKEND_URL=$BACKEND_URL

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.ts ./

EXPOSE 3000

CMD ["npm", "run", "start"]
