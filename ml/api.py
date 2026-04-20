import sys
import json
import os
import warnings

warnings.filterwarnings("ignore")

# Fix import path
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.append(os.path.join(BASE_DIR, "src"))

from recommendation.engine import run_full_pipeline

if __name__ == "__main__":
    try:
        input_data = json.loads(sys.argv[1])

        result = run_full_pipeline(input_data)

        print(json.dumps(result))  # ✅ MUST print JSON only

    except Exception as e:
        print(json.dumps({
            "error": str(e)
        }))
        sys.exit(1)