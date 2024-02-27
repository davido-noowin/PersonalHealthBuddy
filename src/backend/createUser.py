from fastapi import APIRouter
from pydantic import BaseModel
from database_connection import datasource
from fastapi.responses import JSONResponse


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
    CREATE_USER_QUERY = '''
    INSERT INTO users (email, first_name, last_name, age, height, weight, password)
    VALUES
    (%s, %s, %s, %s, %s, %s, %s)
    '''
    result = None
    cursor = None

    RETURN_ID_QUERY = '''
    SELECT user_id
    FROM users
    WHERE email = %s
    '''

    try:
        cursor = datasource.cursor()
        cursor.execute(CREATE_USER_QUERY, (request.email, 
                                           request.first_name,
                                           request.last_name,
                                           request.age,
                                           request.height,
                                           request.weight,
                                           request.password))
    except Exception as e:
        print(f'Unable to create an account for the user in the database: {e}')

    try:
        cursor.execute(RETURN_ID_QUERY, (request.email,))
        result = cursor.fetchone()
    except Exception as e:
        print(f'Unable to retrieve the created user id: {e}')

    

    if result:
        return JSONResponse(content={
            "message" : "Account Creation successful",
            "success" : True,
            "user-id" : result,
            }, status_code=200)
    else:
        return JSONResponse(content={
            "message": "Invalid Login",
            "success" : False
            }, status_code=401)