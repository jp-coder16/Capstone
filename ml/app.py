from fastapi import FastAPI
from pydantic import BaseModel
import pickle
import numpy as np

app = FastAPI()

# Load model
model = pickle.load(open("model.pkl", "rb"))

class AQIInput(BaseModel):
    pm25: float
    pm10: float
    no2: float
    so2: float
    co: float
    o3: float
    temp: float
    humidity: float
    wind: float

@app.get("/")
def home():
    return {"message": "ML API Running"}

@app.post("/predict")
def predict(data: AQIInput):
    features = np.array([[
        data.pm25, data.pm10, data.no2, data.so2,
        data.co, data.o3, data.temp, data.humidity, data.wind
    ]])

    prediction = model.predict(features)

    return {
        "predicted_aqi": float(prediction[0])
    }