# prediction_service.py
import numpy as np
import joblib
from tensorflow.keras.models import load_model

# --- Load All Assets (happens once at startup) ---
IF_MODEL = joblib.load('if_model.pkl')
LSTM_MODEL = load_model('lstm_model.h5', compile=False)
DATA_SCALER = joblib.load('data_scaler.pkl')
IF_SCORE_SCALER = joblib.load('if_score_scaler.pkl')
LSTM_SCORE_SCALER = joblib.load('lstm_score_scaler.pkl')

# --- Constants & Tuned Parameters ---
SEQUENCE_LENGTH = 10
N_FEATURES = 25
THRESHOLD = 0.2 # Your optimal hybrid threshold
W_IF = 0.5
W_LSTM = 0.5


def get_hybrid_prediction(data_sequence: np.ndarray):
    """
    Runs the full hybrid model pipeline on a sequence of network data.
    """
    # 1. Scale the raw input data
    sequence_scaled = DATA_SCALER.transform(data_sequence)

    # 2. Get LSTM Score
    sequence_3d = sequence_scaled.reshape(1, SEQUENCE_LENGTH, N_FEATURES)
    reconstruction = LSTM_MODEL.predict(sequence_3d)
    lstm_error = np.mean(np.abs(reconstruction - sequence_3d))
    
    # 3. Get Isolation Forest Score
    sequence_2d_flat = sequence_scaled.reshape(1, -1)
    if_score = -1 * IF_MODEL.score_samples(sequence_2d_flat)[0]
    
    # 4. Normalize both scores
    lstm_score_scaled = LSTM_SCORE_SCALER.transform([[lstm_error]])[0][0]
    if_score_scaled = IF_SCORE_SCALER.transform([[if_score]])[0][0]

    # 5. Combine scores
    hybrid_score = (W_IF * if_score_scaled) + (W_LSTM * lstm_score_scaled)

    # 6. Make final decision
    is_anomaly = bool(hybrid_score > THRESHOLD)

    return {"is_anomaly": is_anomaly, "hybrid_score": float(hybrid_score)}