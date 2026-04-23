from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import numpy as np
import os

from shap_explainer_xgb import get_shap_values, load_globals
from risk_recommendations import classify_risk, get_recommendations

app = FastAPI(title="AQI Prediction API")

# 🔥 Load everything ONCE
load_globals()
model = joblib.load("models/aqi_model_xgb.pkl")
scaler = joblib.load("models/scaler.pkl")

with open("models/feature_names.txt", "r") as f:
    FEATURE_NAMES = f.read().strip().split(",")

# ✅ Input schema
class AQIInput(BaseModel):
    pm25: float
    pm10: float
    no2: float
    so2: float
    co: float
    o3: float
    temp: float
    humidity: float
    wind: float
    day_of_week: int
    month: int

# ✅ Health endpoint (CRITICAL for Docker)
@app.get("/health")
def health():
    return {"status": "ok"}

# Optional root
@app.get("/")
def root():
    return {"message": "AQI ML Service Running"}

# ✅ Prediction endpoint (OPTIMIZED)
@app.post("/predict")
def predict(data: AQIInput):
    try:
        input_dict = data.dict()

        # ⚡ Faster than pandas
        input_array = np.array([[input_dict[f] for f in FEATURE_NAMES]])

        # Scale + predict
        input_scaled = scaler.transform(input_array)
        pred = model.predict(input_scaled)[0]

        # 🔥 Full response (matches backend)
        return {
            "predicted_aqi": float(round(pred, 2)),
            "risk": classify_risk(pred),
            "recommendations": get_recommendations(pred),
            "shap_values": get_shap_values(input_array)
        }

    except Exception as e:
        print(f"CRASH: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


# ✅ Local run (for dev only)
if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)