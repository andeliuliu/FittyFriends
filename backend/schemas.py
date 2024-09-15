def individual_serial(pet) -> dict:
    return {
        "id": str(pet["_id"]),
        "userid": str["userid"],
        "name": str["name"],
        "personality": str["personality"],
        "mood": str["mood"],
        "goal": int["goal"]
    }

def list_serial(pets) -> list:
    return[individual_serial(pet) for pet in pets]