from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np

# Load the pickled model and scaler
with open("house_price_model.pkl", "rb") as file:
    loaded = pickle.load(file)
    if isinstance(loaded, dict):
        model = loaded["model"]
        scaler = loaded["scaler"]
    else:
        model = loaded
        scaler = None  # Not available if old pickle

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/')
def index():
    return '🏠 House Price Prediction API is running. Send a POST request to /predict with RM, LSTAT, and PTRATIO.'

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    try:
        # Validate input
        for key in ["RM", "LSTAT", "PTRATIO"]:
            if key not in data:
                return jsonify({"error": f"Missing input: {key}"}), 400

        # Extract input features
        rm = float(data["RM"])
        lstat = float(data["LSTAT"])
        ptratio = float(data["PTRATIO"])

        features = np.array([[rm, lstat, ptratio]])
        # Scale the features before prediction if scaler is available
        if scaler is not None:
            features = scaler.transform(features)
        prediction = model.predict(features)

        # Ensure prediction is a float and handle numpy types
        predicted_price = float(prediction[0])

        return jsonify({"predicted_price": round(predicted_price, 2)})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
