import pandas as pd
import joblib
import xgboost as xgb
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
import os

DATA_PATH = "data/processed/cleaned_data.csv"
MODEL_PATH = "models/aqi_model_xgb.pkl"
SCALER_PATH = "models/scaler.pkl"
FEATURES_PATH = "models/feature_names.txt"

FEATURE_COLS = [
    "pm25", "pm10", "no2", "so2", "co", "o3",
    "temp", "humidity", "wind",
    "day_of_week", "month"
]


def train():
    os.makedirs("models", exist_ok=True)

    # Load data
    df = pd.read_csv(DATA_PATH)

    X = df[FEATURE_COLS]
    y = df["aqi"]

    # Split dataset
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    # Scaling (kept for SHAP consistency)
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    # XGBoost model
    model = xgb.XGBRegressor(
        n_estimators=200,
        max_depth=6,
        learning_rate=0.05,
        subsample=0.8,
        colsample_bytree=0.8,
        random_state=42,
        verbosity=1
    )

    model.fit(
        X_train_scaled,
        y_train,
        eval_set=[(X_test_scaled, y_test)],
        verbose=False
    )

    # Save model + scaler
    joblib.dump(model, MODEL_PATH)
    joblib.dump(scaler, SCALER_PATH)

    # Save feature names (IMPORTANT for inference order)
    with open(FEATURES_PATH, "w") as f:
        f.write(",".join(FEATURE_COLS))

    print("✅ Model saved:", MODEL_PATH)
    print("✅ Scaler saved:", SCALER_PATH)
    print("✅ Features saved:", FEATURES_PATH)

    print(f"Train R²: {model.score(X_train_scaled, y_train):.4f}")
    print(f"Test R²: {model.score(X_test_scaled, y_test):.4f}")


if __name__ == "__main__":
    train()