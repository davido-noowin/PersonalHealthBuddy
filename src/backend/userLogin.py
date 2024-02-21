from fastapi import APIRouter
from fastapi.responses import JSONResponse
from pydantic import BaseModel


router = APIRouter()


class LoginRequest(BaseModel):
    '''
    This is a class that the login api call expects to see. 
    This comes from the data sent over through React Native
    using the fetch api and POST method
    '''
    Email: str
    Password: str


@router.post("/api/login")
async def login(request: LoginRequest):
    # prints out email and password from react native if successful
    # TODO: error handle other status codes and do the proper logic for post
    print(request)
    return JSONResponse(content={"message": "Login successful"}, status_code=200)