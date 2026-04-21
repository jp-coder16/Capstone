import pandas as pd
import joblib
import xgboost as xgb
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
import os

DATA_PATH = "data/processed/cleaned_data.csv"
MODEL_PATH = "models/aqi_model_xgb.pkl"
SCALER_PATH = "models/scaler.pkl"
FEATURE_COLS = [
    "pm25", "pm10", "no2", "so2", "co", "o3",
    "temp", "humidity", "wind",
    "day_of_week", "month"
]

def train():
    os.makedirs("models", exist_ok=True)
    df = pd.read_csv(DATA_PATH)
    X = df[FEATURE_COLS]
    y = df["aqi"]
    
    # Split for evaluation (optional)
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # XGBoost does not need scaling, but we'll keep scaler for SHAP consistency
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    # Train XGBoost model
    model = xgb.XGBRegressor(
        n_estimators=200,
        max_depth=6,
        learning_rate=0.05,
        subsample=0.8,
        colsample_bytree=0.8,
        random_state=42,
        verbosity=1
    )
    model.fit(X_train_scaled, y_train, eval_set=[(X_test_scaled, y_test)], verbose=False)
    
    # Save model and scaler
    joblib.dump(model, MODEL_PATH)
    joblib.dump(scaler, SCALER_PATH)
    # Save feature names for later use
    with open("models/feature_names.txt", "w") as f:
        f.write(",".join(FEATURE_COLS))
    
    print(f"✅ XGBoost model saved to {MODEL_PATH}")
    print(f"✅ Scaler saved to {SCALER_PATH}")
    print(f"✅ Feature names saved to models/feature_names.txt")
    print(f"Training R²: {model.score(X_train_scaled, y_train):.4f}")
    print(f"Test R²: {model.score(X_test_scaled, y_test):.4f}")

if __name__ == "__main__":
    train()