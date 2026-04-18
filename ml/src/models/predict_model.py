import os
import joblib
import numpy as np

# 🔥 Build correct absolute path to root models folder
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../.."))

MODEL_PATH = os.path.join(BASE_DIR, "models", "aqi_model.pkl")
SCALER_PATH = os.path.join(BASE_DIR, "models", "scaler.pkl")

model = joblib.load(MODEL_PATH)
scaler = joblib.load(SCALER_PATH)


def predict(features: list):
    features = np.array(features).reshape(1, -1)
    
    features_scaled = scaler.transform(features)
    
    prediction = model.predict(features_scaled)
    
    return prediction[0]