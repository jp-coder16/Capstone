FROM python:3.10-slim

WORKDIR /app

# ---- SYSTEM DEPENDENCIES (cache this layer) ----
RUN apt-get update && apt-get install -y \
    build-essential \
    gcc \
    g++ \
    python3-dev \
    curl \
    && rm -rf /var/lib/apt/lists/*

# ---- PYTHON DEPENDENCIES (cache layer) ----
COPY requirements.txt .

RUN pip install --no-cache-dir --upgrade pip setuptools wheel && \
    pip install --no-cache-dir -r requirements.txt

# ---- APP CODE (changes frequently → last layer) ----
COPY . .

EXPOSE 8000

CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "1"]