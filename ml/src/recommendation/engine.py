from models.predict_model import predict
from models.risk_classifier import classify_risk
from recommendation.rules import get_recommendations
from explainability.shap_explainer import explain_prediction


def run_full_pipeline(features):
    
    # Prediction
    aqi_pred = predict(features)
    
    # Risk classification
    risk = classify_risk(aqi_pred)
    
    # Recommendations
    pm25 = features[0]
    recommendations = get_recommendations(aqi_pred, pm25)
    
    # Explainability
    explanation = explain_prediction(features)
    
    return {
        "predicted_aqi": float(aqi_pred),
        "risk_level": risk,
        "recommendations": recommendations,
        "explanation": explanation
    }