from fastapi import APIRouter
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from database_connection import datasource


router = APIRouter()

# We do it this way to prevent SQL injections
LOGIN_QUERY = '''
    SELECT *
    FROM users
    WHERE username = %s AND password = %s
    '''


class LoginRequest(BaseModel):
    '''
    This is a class that the login api call expects to see. 
    This comes from the data sent over through React Native
    using the fetch api and POST method
    '''
    username: str
    password: str


@router.post("/api/login")
async def login(request: LoginRequest):
    '''
    Grabs email and password from react native  and logs the user in if successful
    '''
    print("request", request)
    result = None
    cursor = None

    try:
        cursor = datasource.cursor()
        cursor.execute(LOGIN_QUERY, (request.username, request.password))
        result = cursor.fetchone()
    except Exception as e:
        print(f'Unable to execute the query and log the user in: {e}')


    # print("query result", result)
    if result is not None:
        return JSONResponse(content={
            "message" : "Login successful",
            "success" : True,
            "username" : result[0],
            }, status_code=200)
    else:
        return JSONResponse(content={
            "message": "Invalid Login",
            "success" : False
            }, status_code=401)