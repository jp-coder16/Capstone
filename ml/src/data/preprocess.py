import pandas as pd
import os

RAW_PATH = "ml/data/raw/city_day.csv"
PROCESSED_PATH = "ml/data/processed/cleaned_data.csv"


def load_data():
    df = pd.read_csv(RAW_PATH)
    print("Raw shape:", df.shape)
    return df


def filter_city(df, city="Delhi"):
    df = df[df["City"] == city]
    print("After city filter:", df.shape)
    return df


def select_columns(df):
    df = df[[
        "Date",
        "PM2.5",
        "PM10",
        "NO2",
        "SO2",
        "CO",
        "O3",
        "AQI"
    ]]
    return df


def rename_columns(df):
    df.columns = [
        "date",
        "pm25",
        "pm10",
        "no2",
        "so2",
        "co",
        "o3",
        "aqi"
    ]
    return df


def handle_missing(df):
    # Forward fill + backward fill
    ddf = df.ffill()
    df = df.bfill()
    
    print("Missing values handled")
    return df


def add_weather_features(df):
    # Dummy values (for MVP)
    df["temp"] = 30
    df["humidity"] = 60
    df["wind"] = 5
    
    return df


def add_time_features(df):
    df["date"] = pd.to_datetime(df["date"])
    
    df["day_of_week"] = df["date"].dt.dayofweek
    df["month"] = df["date"].dt.month
    
    return df


def save_data(df):
    os.makedirs("ml/data/processed", exist_ok=True)
    df.to_csv(PROCESSED_PATH, index=False)
    print("Saved cleaned data:", PROCESSED_PATH)


def run_preprocessing():
    df = load_data()
    df = filter_city(df)
    df = select_columns(df)
    df = rename_columns(df)
    df = handle_missing(df)
    df = add_weather_features(df)
    df = add_time_features(df)
    save_data(df)


if __name__ == "__main__":
    run_preprocessing()