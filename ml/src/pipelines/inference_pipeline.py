import sys
import os

# 🔥 Add project src path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from recommendation.engine import run_full_pipeline


if __name__ == "__main__":
    
    sample_input = [
        120,  # pm25
        200,  # pm10
        40,   # no2
        10,   # so2
        1,    # co
        30,   # o3
        30,   # temp
        60,   # humidity
        5,    # wind
        2,    # day_of_week
        7     # month
    ]
    
    result = run_full_pipeline(sample_input)
    
    print(result)