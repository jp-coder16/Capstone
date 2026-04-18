import sys
import json
import os
import warnings

# 🔥 suppress warnings (VERY IMPORTANT)
warnings.filterwarnings("ignore")

# Fix path
sys.path.append(os.path.abspath("ml/src"))

from recommendation.engine import run_full_pipeline


if __name__ == "__main__":
    try:
        input_data = json.loads(sys.argv[1])
        
        result = run_full_pipeline(input_data)
        
        # ✅ ONLY JSON OUTPUT
        print(json.dumps(result))
    
    except Exception as e:
        print(json.dumps({"error": str(e)}))