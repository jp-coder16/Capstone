import pandas as pd
import joblib
from sklearn.preprocessing import StandardScaler

DATA_PATH = "data/processed/cleaned_data.csv"
SCALER_PATH = "models/scaler.pkl"

# Feature columns (must match your model's training order)
FEATURE_COLS = [
    "pm25", "pm10", "no2", "so2", "co", "o3",
    "temp", "humidity", "wind",
    "day_of_week", "month"
]

df = pd.read_csv(DATA_PATH)
X = df[FEATURE_COLS]

scaler = StandardScaler()
scaler.fit(X)

joblib.dump(scaler, SCALER_PATH)
print(f"✅ Scaler saved to {SCALER_PATH}")