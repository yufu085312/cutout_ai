FROM python:3.11-slim

WORKDIR /app

# システム依存パッケージ
RUN apt-get update && apt-get install -y --no-install-recommends \
    libgl1 \
    libglib2.0-0 \
    curl \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# AIモデルをビルド時に事前ダウンロード（初回リクエスト時のタイムアウト防止）
RUN python -c "import os; from rembg import remove; import numpy as np; remove(np.zeros((1,1,3), dtype=np.uint8))"

COPY . .

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
