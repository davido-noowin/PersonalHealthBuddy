from fastapi import APIRouter
from fastapi.responses import JSONResponse
from database_connection import datasource
from datetime import date, timedelta


router = APIRouter()


@router.get("/api/get-exercise-log")
async def getFoodLog(user_id: int, day: str):
    # TODO: this query does not account for the types of exercises 
    print("request", user_id, day)
    EXERCISE_LOG_QUERY = '''
    SELECT *
    FROM exercise_log AS el
    WHERE el.user_id = %s AND el.date = %s
    '''
    result = None
    metadata = None
    cursor = None

    try:
        cursor = datasource.cursor()
        cursor.execute(EXERCISE_LOG_QUERY, (user_id, day))
        result = cursor.fetchone()
        metadata = [i[0] for i in cursor.description]
    except Exception as e:
        print(f'Unable to execute the query: {e}')

    if result and metadata:
        exercise_log_result_set = {}
        for attribute, value in zip(metadata, result):
            if type(value) == date or type(value) == timedelta:
                exercise_log_result_set[attribute] = str(value) # date types can't be processed by JSON
            else:
                exercise_log_result_set[attribute] = value
        return JSONResponse(content={
            "message" : exercise_log_result_set,
            "success" : True,
            }, status_code=200)
    else:
        return JSONResponse(content={
            "message": "Failed to get pull the exercise log of the user",
            "success" : False
            }, status_code=500)