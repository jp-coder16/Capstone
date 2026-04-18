def get_recommendations(aqi, pm25):
    
    if aqi > 300:
        return {
            "outdoor": "NO",
            "mask": "N95",
            "workout": "Indoor yoga",
            "tips": [
                "Stay indoors",
                "Use air purifier",
                "Avoid physical exertion"
            ]
        }
    
    elif aqi > 200:
        return {
            "outdoor": "LIMITED",
            "mask": "N95",
            "workout": "Light indoor exercise",
            "tips": [
                "Avoid traffic areas",
                "Keep windows closed"
            ]
        }
    
    else:
        return {
            "outdoor": "YES",
            "mask": "Optional",
            "workout": "Outdoor walk allowed",
            "tips": [
                "Stay hydrated",
                "Normal activity allowed"
            ]
        }