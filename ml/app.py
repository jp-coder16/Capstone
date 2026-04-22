from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import pandas as pd
import os

from shap_explainer_xgb import get_shap_values, load_globals
from risk_recommendations import classify_risk, get_recommendations

app = FastAPI(title="AQI Prediction with XGBoost + SHAP")

# ✅ FIX 1: Load everything ONCE at startup to save RAM and speed up predictions 100x
load_globals()
model = joblib.load("models/aqi_model_xgb.pkl")
scaler = joblib.load("models/scaler.pkl")

with open("models/feature_names.txt", "r") as f:
    FEATURE_NAMES = f.read().strip().split(",")

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

@app.get("/")
def root():
    return {"message": "AQI Prediction with XGBoost + SHAP", "features": len(FEATURE_NAMES), "model": "xgboost"}

@app.post("/predict")
def predict(data: AQIInput):
    try:
        input_dict = data.dict()
        input_df = pd.DataFrame([input_dict], columns=FEATURE_NAMES)
        
        # We now use the globally loaded scaler and model
        input_scaled = scaler.transform(input_df)
        pred = model.predict(input_scaled)[0]
        pred = float(round(pred, 2))
        
        risk = classify_risk(pred)
        recommendations = get_recommendations(pred)
        shap_vals = get_shap_values(input_dict)
        
        return {
            "predicted_aqi": pred,
            "risk": risk,
            "recommendations": recommendations,
            "shap_values": shap_vals
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    # ✅ FIX 2: Let Render assign the port dynamically via Environment Variables
    port = int(os.environ.get("PORT", 10000))
    uvicorn.run(app, host="0.0.0.0", port=port)