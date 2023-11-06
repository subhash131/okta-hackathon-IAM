from flask import Flask, jsonify
import pandas as pd
from sklearn.ensemble import IsolationForest
from flask_cors import CORS

print(Flask)

app = Flask(__name__)
CORS(app)

def prediction_model():
    # Load the dataset
    raw_df = pd.read_csv('./dataset.csv')
    df = raw_df[["access","userType","anomaly"]]
    # print(raw_df)

    #Define additional rules for anomalies (userType, access)
    manual_anomalies = [('associate', 'all'), ('manager', 'all'),('associate','create')]

    # Identify rows matching manual anomalies and mark them as anomalies
    for anomaly_user_type, anomaly_access in manual_anomalies:
        mask = (df['userType'] == anomaly_user_type) & (df['access'] == anomaly_access)
        df.loc[mask, 'anomaly'] = 1

    # Exclude 'admin' user types from anomaly detection
    df_for_anomaly_detection = df[df['userType'] != 'admin'].copy()  # Create a copy to avoid the warning

    # Encode categorical variables
    df_encoded = pd.get_dummies(df_for_anomaly_detection, columns=['userType', 'access'])

    # Select features for anomaly detection (all columns except 'anomaly')
    features = df_encoded.drop(columns=['anomaly'])

    # Initialize the Isolation Forest model
    clf = IsolationForest(contamination=0.2, random_state=42)  # Adjust the contamination parameter as needed

    # Fit the model
    clf.fit(features)

    # Predict anomalies
    predictions = clf.predict(features)

    # Add 'anomaly_prediction' column to the DataFrame using .loc[]
    df_for_anomaly_detection.loc[:, 'anomaly_prediction'] = predictions

    # Filter rows where anomalies are detected using .loc[]
    anomalies = df_for_anomaly_detection.loc[(df_for_anomaly_detection['anomaly_prediction'] == -1) | (df_for_anomaly_detection['anomaly'] == 1)]

    # Print detected anomalies
    # print("Detected Anomalies:")
    df2 = pd.concat([anomalies, raw_df[["name"]]], axis=1)
    return df2.to_json(orient="records")

@app.route("/predict",methods = ['GET'])
def return_home():
    data = prediction_model()
    return data


if __name__ == "__main__":
    app.run(debug=True, port=8080)

