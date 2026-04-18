import shap
import joblib
import pandas as pd
import os

# Load model + scaler
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../.."))

MODEL_PATH = os.path.join(BASE_DIR, "models", "aqi_model.pkl")
SCALER_PATH = os.path.join(BASE_DIR, "models", "scaler.pkl")

model = joblib.load(MODEL_PATH)
scaler = joblib.load(SCALER_PATH)

feature_names = [
    "pm25", "pm10", "no2", "so2", "co", "o3",
    "temp", "humidity", "wind",
    "day_of_week", "month"
]


def explain_prediction(features):
    
    df = pd.DataFrame([features], columns=feature_names)
    
    scaled = scaler.transform(df)
    
    explainer = shap.Explainer(model)
    shap_values = explainer(scaled)
    
    explanation = {}
    
    for i, val in enumerate(shap_values.values[0]):
        explanation[feature_names[i]] = float(val)
    
    return explanation