def classify_risk(aqi):
    
    if aqi < 100:
        return "Low"
    
    elif aqi < 200:
        return "Medium"
    
    else:
        return "High"