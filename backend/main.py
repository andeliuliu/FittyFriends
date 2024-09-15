# Importing the API and instantiating the client using your keys
from fastapi import FastAPI, Request, HTTPException
from dotenv import load_dotenv
import os
import uvicorn
from terra.base_client import Terra
import requests
from datetime import datetime
from bson import ObjectId
from schemas import list_serial, individual_serial
import db
from db import pets_collection
from pets import Pet
from route import router


# Load environment variables
load_dotenv()

API_KEY = os.getenv('API_KEY')
DEV_ID = os.getenv('DEV_ID')
SECRET = os.getenv('SECRET')
terra = Terra(API_KEY, DEV_ID, SECRET)

# Initialize FastAPI app
app = FastAPI()
app.include_router(router)

def get_headers():
    return {
        "accept": "application/json",
        "dev-id": DEV_ID,
        "x-api-key": API_KEY
    }

def fetch_daily_data(user_id: str):
    today = datetime.now().strftime('%Y-%m-%d')  # Get today's date in 'YYYY-MM-DD' format
    url = f"https://api.tryterra.co/v2/daily?user_id={user_id}&start_date={'2024-09-01'}&end_date={'2024-09-01'}&to_webhook=false"
    
    headers = get_headers()  # Get headers with API Key and Dev ID
    response = requests.get(url, headers=headers)  # Make GET request to Terra API

    if response.status_code == 200:  # Check if the request was successful
        return response.json()  # Parse the JSON response
    else:
        return {"error": f"Failed to fetch data: {response.text}"}
    

def filter_data(daily_data: dict):
    data_entry = daily_data[0]
    return {
        "steps": data_entry.get("distance_data", {}).get("steps", 0),
        "total_burned_calories": data_entry.get("calories_data", {}).get("total_burned_calories", 0),
        "avg_hr_bpm": round(data_entry.get("heart_rate_data", {}).get("summary", {}).get("avg_hr_bpm", 0), 2),   
        "activity_seconds": data_entry.get("active_durations_data", {}).get("activity_seconds", 0),
    }

# Generate Terra Widget Session
@app.get("/generate_widget")
def generate_widget():
    widget_response = terra.generate_widget_session(
        providers=["GARMIN", "OURA", "GOOGLE", "FITBIT"],
        auth_success_redirect_url="http://127.0.0.1:8000/auth/success",
        auth_failure_redirect_url="http://127.0.0.1:8000/auth/failure",
        language="en"
    ).get_parsed_response()

    return widget_response

# Endpoint to handle successful auth and fetch data
@app.get("/auth/success")
async def auth_success(request: Request):
    # Extracting user_id from query parameters
    user_id = request.query_params.get('user_id')
    
    if not user_id:
        return {"error": "Missing user_id"}
    
    # Fetch daily data for today
    daily_data = fetch_daily_data(user_id)
    
    # Check if there was an error during data fetching
    if 'error' in daily_data:
        return {"error": daily_data['error']}
    
    # Filter the data to include only the required fields
    filtered_data = filter_data(daily_data.get('data', {}))
    
    return {"user_id": user_id, "filtered_data": filtered_data}


if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
