from fastapi import APIRouter
from fastapi.responses import JSONResponse
from database_connection import getDatasource
from datetime import date, timedelta


router = APIRouter()

EXERCISE_LOG_QUERY = '''
    SELECT *
    FROM exercise
    WHERE username = %s
    AND date >= DATE_SUB(CURDATE(), INTERVAL 5 DAY);
    '''


@router.get("/api/get-exercise")
async def getExercise(username: str):
    print("request", username)
    result = None
    datasource = getDatasource()
    try:
        cursor = datasource.cursor()
        cursor.execute(EXERCISE_LOG_QUERY, (username, ))
        result = cursor.fetchall()
        cursor.close()
    except Exception as e:
        print(f'Unable to execute the query: {e}')
    finally:
        datasource.close()

    if result:
        exercise_log = {}
        # print(result)
        for day_vals in result:
            exercise_log[str(day_vals[1])] = {
                'username' : day_vals[0],
                'date' : str(day_vals[1]),
                'duration' : str(day_vals[2]),
                'type' : str(day_vals[3]),
                'steps' : day_vals[4]
            }
        return JSONResponse(content={
            "log" : exercise_log,
            "success" : True,
            }, status_code=200)
    else:
        return JSONResponse(content={
            "message": "Failed to get pull the exercise log of the user",
            "success" : False
            }, status_code=500)