from fastapi import APIRouter
from pydantic import BaseModel


router = APIRouter()


class CreateUserRequest(BaseModel):
    '''
    This is a class that the create user api call expects to see. 
    This comes from the data sent over through React Native
    using the fetch api and POST method
    '''
    first_name: str
    last_name: str
    age: int
    height: float
    weight: float
    email: str
    password: str


@router.post("/api/create-user")
async def createUser(request: CreateUserRequest):
    pass