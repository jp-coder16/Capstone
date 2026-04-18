import pandas as pd
import joblib
import os

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from xgboost import XGBRegressor


DATA_PATH = "ml/data/processed/cleaned_data.csv"
MODEL_PATH = "models/aqi_model.pkl"
SCALER_PATH = "models/scaler.pkl"


def load_data():
    df = pd.read_csv(DATA_PATH)
    print("Data loaded:", df.shape)
    return df


def prepare_features(df):
    
    # Drop date column (not needed directly)
    df = df.drop(columns=["date"])
    
    X = df.drop(columns=["aqi"])
    y = df["aqi"]
    
    return X, y


def split_data(X, y):
    return train_test_split(X, y, test_size=0.2, random_state=42)


def scale_data(X_train, X_test):
    scaler = StandardScaler()
    
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    return X_train_scaled, X_test_scaled, scaler


def train_model(X_train, y_train):
    
    model = XGBRegressor(
        n_estimators=100,
        max_depth=5,
        learning_rate=0.1
    )
    
    model.fit(X_train, y_train)
    
    return model


def save_artifacts(model, scaler):
    os.makedirs("models", exist_ok=True)
    
    joblib.dump(model, MODEL_PATH)
    joblib.dump(scaler, SCALER_PATH)
    
    print("Model saved:", MODEL_PATH)
    print("Scaler saved:", SCALER_PATH)


def run_training():
    
    df = load_data()
    
    X, y = prepare_features(df)
    
    X_train, X_test, y_train, y_test = split_data(X, y)
    
    X_train, X_test, scaler = scale_data(X_train, X_test)
    
    model = train_model(X_train, y_train)
    
    save_artifacts(model, scaler)


if __name__ == "__main__":
    run_training()