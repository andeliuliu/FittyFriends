import json
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
import os

# Initialize the router
router = APIRouter()

# JSON file to store pets
PETS_FILE = "pets_data.json"

# Pydantic model for Pet
class Pet(BaseModel):
    name: str
    personality: str
    mood: str
    goal: int
    type: str

# Function to load data from the JSON file
def load_data():
    try:
        # Check if the file exists and is non-empty
        if os.path.getsize(PETS_FILE) > 0:
            with open(PETS_FILE, "r") as f:
                return json.load(f)
        else:
            return {}  # If the file is empty, return an empty dictionary
    except FileNotFoundError:
        return {}  # If the file doesn't exist, return an empty dictionary
    except json.JSONDecodeError:
        return {}  # If the file is corrupted, return an empty dictionary


# Function to save data to the JSON file
def save_data(data):
    with open(PETS_FILE, "w") as f:
        json.dump(data, f)

# POST Request to add a new pet for a specific user
@router.post("/users/{user_id}/pets/")
async def post_pet(user_id: str, pet: Pet):
    pets_data = load_data()  # Load the current pets data from the file
    if user_id not in pets_data:
        pets_data[user_id] = []  # Initialize a list for this user's pets if not present
    pets_data[user_id].append(pet.dict())  # Add the new pet to the user's list
    save_data(pets_data)  # Save the updated data back to the file
    return {"message": "Pet added successfully"}

# GET Request to retrieve all pets for a specific user
@router.get("/users/{user_id}/pets/", response_model=List[Pet])
async def get_pets(user_id: str):
    pets_data = load_data()  # Load the current pets data from the file
    if user_id not in pets_data:
        raise HTTPException(status_code=404, detail="No pets found for the user")
    return pets_data[user_id]

# DELETE Request to delete a specific pet for a user by name
@router.delete("/users/{user_id}/pets/{pet_name}")
async def delete_pet(user_id: str, pet_name: str):
    pets_data = load_data()
    if user_id not in pets_data:
        raise HTTPException(status_code=404, detail="No pets found for the user")

    # Find the pet by name
    pet_index = next((index for index, pet in enumerate(pets_data[user_id]) if pet['name'] == pet_name), None)

    if pet_index is None:
        raise HTTPException(status_code=404, detail=f"Pet with name '{pet_name}' not found")

    # Remove the pet by index
    deleted_pet = pets_data[user_id].pop(pet_index)
    save_data(pets_data)
    return {"message": "Pet deleted successfully", "deleted_pet": deleted_pet}

# PUT Request to edit/update a specific pet for a user by name
@router.put("/users/{user_id}/pets/{pet_name}")
async def update_pet(user_id: str, pet_name: str, updated_pet: Pet):
    pets_data = load_data()
    if user_id not in pets_data:
        raise HTTPException(status_code=404, detail="No pets found for the user")

    # Find the pet by name
    pet_index = next((index for index, pet in enumerate(pets_data[user_id]) if pet['name'] == pet_name), None)

    if pet_index is None:
        raise HTTPException(status_code=404, detail=f"Pet with name '{pet_name}' not found")

    # Update the pet at the found index
    pets_data[user_id][pet_index] = updated_pet.dict()
    save_data(pets_data)
    return {"message": "Pet updated successfully", "updated_pet": updated_pet}