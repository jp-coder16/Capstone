import shap
import joblib
import pandas as pd
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

        # ⚠️ IMPORTANT: DO NOT initialize SHAP here (prevents container crash)
        explainer = None

    return model, scaler, explainer, feature_names


def fix_xgboost_model():
    """
    Fixes XGBoost metadata issues like:
    base_score = '[2.578606E2]'
    """
    global model

    booster = model.get_booster()

    try:
        attrs = booster.attributes()
        if "base_score" in attrs:
            val = attrs["base_score"]
            clean_val = str(float(val.strip("[]")))
            booster.set_attr(base_score=clean_val)
    except:
        # fallback safe value
        booster.set_attr(base_score="0.5")


def get_explainer():
    global explainer, model

    if explainer is None:
        fix_xgboost_model()
        explainer = shap.TreeExplainer(model)

    return explainer


def get_shap_values(features_dict):
    model, scaler, _, feature_names = load_globals()

    # Ensure correct feature order
    input_df = pd.DataFrame([features_dict], columns=feature_names)
    input_scaled = scaler.transform(input_df)

    explainer = get_explainer()
    shap_values = explainer.shap_values(input_scaled)

    return {
        feature_names[i]: float(shap_values[0][i])
        for i in range(len(feature_names))
    }


if __name__ == "__main__":
    # safe test
    _, _, _, feature_names = load_globals()
    test_input = {f: 50.0 for f in feature_names}
    print(get_shap_values(test_input))