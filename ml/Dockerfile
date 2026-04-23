FROM python:3.10-slim

WORKDIR /app

# Install system dependencies (IMPORTANT for numpy, sklearn, xgboost, shap)
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    gcc \
    g++ \
    python3-dev \
    && rm -rf /var/lib/apt/lists/*

# Upgrade pip tooling (fixes many ML install issues)
RUN pip install --upgrade pip setuptools wheel

# Copy requirements first (for caching)
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy full project
COPY . .

# Expose FastAPI port
EXPOSE 8000

# Run FastAPI app
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "1"]