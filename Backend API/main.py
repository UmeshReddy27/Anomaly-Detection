# main.py

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
# --- ADD THIS IMPORT ---
from fastapi.middleware.cors import CORSMiddleware
# ---

# Make sure this import is correct for your friend's project
from prediction_service import get_hybrid_prediction, SEQUENCE_LENGTH, N_FEATURES

app = FastAPI()

# --- ADD THIS ENTIRE BLOCK ---
# This list must contain YOUR IP address
origins = [
    "http://192.168.6.177:3000", 
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# ---


class SequenceInput(BaseModel):
    data: List[List[float]]

@app.post("/analyze")
async def analyze_data(request: SequenceInput):
    if len(request.data) != SEQUENCE_LENGTH or len(request.data[0]) != N_FEATURES:
        raise HTTPException(
            status_code=400, 
            detail=f"Input data must be a sequence of {SEQUENCE_LENGTH} records, each with {N_FEATURES} features."
        )
    
    prediction = get_hybrid_prediction(request.data)
    
    return prediction

@app.get("/")
def read_root():
    return {"message": "Anomaly Detection API is running."}