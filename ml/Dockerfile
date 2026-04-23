FROM python:3.10-slim

WORKDIR /app

# Install system deps (needed for pandas, sklearn, etc.)
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy only requirements first (for caching)
COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

# Now copy rest of code
COPY . .

EXPOSE 8000

# Better startup
CMD ["python3", "app.py"]