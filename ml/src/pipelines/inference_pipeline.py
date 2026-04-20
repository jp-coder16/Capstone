from src.models.predict_model import predict_aqi
from src.models.risk_classifier import classify_risk
from src.recommendation.engine import generate_recommendations


def run_inference_pipeline(data):
    """
    Full ML inference pipeline
    """

    # Step 1: AQI Prediction
    predicted_aqi = predict_aqi(data)

    # Step 2: Risk Classification
    risk = classify_risk(predicted_aqi)

    # Step 3: Recommendations
    recommendations = generate_recommendations(predicted_aqi, risk)

    return {
        "predicted_aqi": predicted_aqi,
        "risk": risk,
        "recommendations": recommendations
    }