def classify_risk(aqi):
    
    if aqi < 100:
        return "Low_AQI"
    
    elif aqi < 200:
        return "Medium_AQI"
    
    else:
        return "High_AQI"