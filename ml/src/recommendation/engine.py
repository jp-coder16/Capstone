from src.pipelines.inference_pipeline import run_inference_pipeline


def run_full_pipeline(data):
    return run_inference_pipeline(data)


def generate_recommendations(aqi, risk):
    """
    Rule-based recommendation engine
    """

    if aqi > 200:
        return {
            "mask": "N95",
            "activity": "Avoid outdoor",
            "exercise": "Indoor yoga"
        }
    elif aqi > 100:
        return {
            "mask": "Surgical",
            "activity": "Limit outdoor",
            "exercise": "Light indoor workout"
        }
    else:
        return {
            "mask": "Optional",
            "activity": "Outdoor safe",
            "exercise": "Running / sports"
        }