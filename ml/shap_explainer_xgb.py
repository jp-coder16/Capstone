import shap
import joblib
import pandas as pd
import numpy as np
import os

MODEL_PATH = "models/aqi_model_xgb.pkl"
SCALER_PATH = "models/scaler.pkl"
FEATURE_NAMES_PATH = "models/feature_names.txt"

model = None
scaler = None
explainer = None
feature_names = None

def load_globals():
    global model, scaler, explainer, feature_names
    if model is None:
        model = joblib.load(MODEL_PATH)
        scaler = joblib.load(SCALER_PATH)
        # Load feature names
        with open(FEATURE_NAMES_PATH, "r") as f:
            feature_names = f.read().strip().split(",")
        explainer = shap.TreeExplainer(model)
    return model, scaler, explainer, feature_names

def get_shap_values(features_dict):
    """
    features_dict: dict with all feature names as keys.
    Returns dict of feature -> shap_value (float)
    """
    model, scaler, explainer, feature_names = load_globals()
    
    # Convert to DataFrame with correct column order
    input_df = pd.DataFrame([features_dict], columns=feature_names)
    input_scaled = scaler.transform(input_df)
    
    shap_values = explainer.shap_values(input_scaled)
    # shap_values shape: (1, n_features)
    result = {feature_names[i]: float(shap_values[0][i]) for i in range(len(feature_names))}
    return result

if __name__ == "__main__":
    test_input = {f: 50.0 for f in feature_names}
    print(get_shap_values(test_input))