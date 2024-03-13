from fastapi import APIRouter
from fastapi.responses import JSONResponse
from database_connection import datasource
from pydantic import BaseModel
from datetime import date


router = APIRouter()

FOOD_LOG_QUERY = '''
    INSERT INTO food (username, date, fruits, vegetables, proteins, grains, dairy) 
    VALUES
    (%s, %s, %s, %s, %s, %s, %s);
    '''


CHECK_USER_QUERY = '''
    SELECT username
    FROM users
    WHERE (%s) = username;
    '''


class FoodLogRequest(BaseModel):
    '''
    '''
    username: str
    date: date
    fruits: bool
    vegetables: bool
    proteins: bool
    grains: bool
    dairy: bool


@router.post("/api/log-food")
async def logExercise(request: FoodLogRequest):
    print("request", request)

    user_exists = None
    try:
        cursor = datasource.cursor()
        cursor.execute(CHECK_USER_QUERY, (request.username, ))
        user_exists = cursor.fetchall()
    except Exception as e:
        print(f'ERROR: {e}')

    if user_exists:
        print('exists')
        try:
            cursor = datasource.cursor()
            cursor.execute(FOOD_LOG_QUERY, (request.username,
                                              request.date,
                                              request.fruits,
                                              request.vegetables,
                                              request.proteins,
                                              request.grains,
                                              request.dairy, ))
            datasource.commit()
            return JSONResponse(content={
                "message" : "Food has been logged for the day",
                "success" : True,
                }, status_code=200)
        
        except Exception as e:
            print(f'ERROR, unable to update food log in the database: {e}')
            return JSONResponse(content={
                "message" : "Food has not been logged, failed to update database",
                "success" : False,
                }, status_code=401)
    else:
        print('user does not exist')
        return JSONResponse(content={
            "message" : "Food has not been logged, user does not exist",
            "success" : False,
            }, status_code=401)

    