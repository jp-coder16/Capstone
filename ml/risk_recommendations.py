def classify_risk(aqi):
    if aqi <= 50: return "Good"
    if aqi <= 100: return "Moderate"
    if aqi <= 150: return "Unhealthy for Sensitive"
    if aqi <= 200: return "Unhealthy"
    if aqi <= 300: return "Very Unhealthy"
    return "Hazardous"

def get_recommendations(aqi):
    if aqi > 200:
        return {
            "mask": "N95",
            "activity": "Avoid outdoor",
            "exercise": "Indoor yoga",
            "tips": ["Stay indoors", "Use air purifier", "Avoid physical exertion"]
        }
    if aqi > 100:
        return {
            "mask": "Surgical",
            "activity": "Limit outdoor",
            "exercise": "Light indoor workout",
            "tips": ["Avoid traffic areas", "Keep windows closed", "Use N95 if going out"]
        }
    return {
        "mask": "Optional",
        "activity": "Outdoor safe",
        "exercise": "Running / sports",
        "tips": ["Normal activity allowed", "Stay hydrated"]
    }