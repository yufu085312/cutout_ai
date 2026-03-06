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

# モデルの保存先を固定
ENV U2NET_HOME=/app/models

# AIモデルをビルド時に事前ダウンロード
RUN mkdir -p /app/models && \
  python -c "import os; from rembg import remove, new_session; import numpy as np; remove(np.zeros((1,1,3), dtype=np.uint8), session=new_session(model_name='u2netp'))"

COPY . .

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--log-level", "debug"]
