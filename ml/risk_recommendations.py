def classify_risk(aqi):
    if aqi <= 50: return "Good"
    if aqi <= 100: return "Moderate"
    if aqi <= 150: return "Unhealthy for Sensitive Groups"
    if aqi <= 200: return "Unhealthy"
    if aqi <= 300: return "Very Unhealthy"
    return "Hazardous"

def get_recommendations(aqi):
    # Match exactly the keys React expects: outdoor, mask, exercise, ventilation, tips
    if aqi > 300:
        return {
            "outdoor": "STRICTLY AVOID all outdoor activities",
            "mask": "N95/KN95 strictly required",
            "exercise": "No physical exertion",
            "ventilation": "Keep completely sealed, run HEPA purifiers",
            "tips": ["Stay indoors with doors and windows closed", "Use high-efficiency air purifiers", "Seek medical help if experiencing respiratory issues"]
        }
    elif aqi > 200:
        return {
            "outdoor": "Avoid outdoor activities",
            "mask": "N95/KN95 recommended outdoors",
            "exercise": "Move all exercise indoors",
            "ventilation": "Keep windows closed, use air purifier",
            "tips": ["Stay indoors as much as possible", "Use air purifiers", "Avoid physical exertion outdoors"]
        }
    elif aqi > 150:
        return {
            "outdoor": "Limit prolonged exposure",
            "mask": "N95/KN95 advised for sensitive groups",
            "exercise": "Reduce intensity, move indoors if possible",
            "ventilation": "Keep windows mostly closed",
            "tips": ["Everyone should reduce prolonged or heavy outdoor exertion", "Sensitive groups should strictly stay indoors"]
        }
    elif aqi > 100:
        return {
            "outdoor": "Safe for most, sensitive groups limit time",
            "mask": "Optional for sensitive groups",
            "exercise": "Reduce intensity if sensitive",
            "ventilation": "Briefly open windows for fresh air",
            "tips": ["Unusually sensitive individuals should reduce outdoor exertion", "Keep windows closed during high traffic hours"]
        }
    elif aqi > 50:
        return {
            "outdoor": "Safe for most people",
            "mask": "No mask required",
            "exercise": "Normal exercise okay",
            "ventilation": "Open windows for fresh air",
            "tips": ["Air quality is acceptable", "Unusually sensitive people should monitor symptoms"]
        }
    else:
        return {
            "outdoor": "Ideal for outdoor activities",
            "mask": "No mask required",
            "exercise": "Great conditions for running/sports",
            "ventilation": "Open windows to bring in fresh air",
            "tips": ["Air quality is excellent — enjoy outdoor activities!", "Perfect day to ventilate your home"]
        }