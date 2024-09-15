from pydantic import BaseModel

class Pet(BaseModel):
    name: str
    personality: str
    userid: str
    mood: str
    goal: int