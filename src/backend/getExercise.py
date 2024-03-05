from fastapi import APIRouter
from fastapi.responses import JSONResponse
from database_connection import datasource
from datetime import date, timedelta


router = APIRouter()

EXERCISE_LOG_QUERY = '''
    SELECT *
    FROM exercise
    WHERE username = %s
    AND date >= DATE_SUB(CURDATE(), INTERVAL 5 DAY);
    '''

@router.get("/api/get-exercise")
async def getExercise(username: str, key_date: str):
    print("request", username, key_date)
    result = None

    try:
        cursor = datasource.cursor()
        cursor.execute(EXERCISE_LOG_QUERY, (username, key_date))
        result = cursor.fetchall()
    except Exception as e:
        print(f'Unable to execute the query: {e}')

    if result:
        for day_vals in result:
            for item in day_vals:
                if type(item) == date or type(item) == timedelta:
                    item = str(item) # date types can't be processed by JSON
        return JSONResponse(content={
            "message" : result,
            "success" : True,
            }, status_code=200)
    else:
        return JSONResponse(content={
            "message": "Failed to get pull the exercise log of the user",
            "success" : False
            }, status_code=500)