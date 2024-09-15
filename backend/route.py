from fastapi import APIRouter, HTTPException
from db import pets_collection
from pets import Pet
from schemas import list_serial
from bson import ObjectId

router = APIRouter()

#GET Request Method
@router.get("/users/{user_id}/pets") #error with searching
async def get_pets(user_id: str):
    pets = list_serial(pets_collection.find({"user_id": user_id}))
    if not pets:
        raise HTTPException(status_code=404, detail="No pets found for the user")
    return pets

#POST Request Method
@router.post("/users/{user_id}/pets")
async def post_pet(user_id: str, pet: Pet):
    pet_data = pet.dict()  # Convert Pydantic model to dictionary
    pet_data["user_id"] = user_id  # Add user_id to the pet data
    pets_collection.insert_one(pet_data)  # Insert the pet into the MongoDB collection
    return {"message": "Pet added successfully"}