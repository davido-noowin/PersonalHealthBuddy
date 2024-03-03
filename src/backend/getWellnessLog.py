from fastapi import APIRouter
from fastapi.responses import JSONResponse
from database_connection import datasource
from datetime import date, timedelta


router = APIRouter()


@router.get("/api/get-wellness-log")
async def getFoodLog(username: int, date: str):
    print("request", username, date)
    WELLNESS_LOG_QUERY = '''
    SELECT *
    FROM wellness
    WHERE username = %s AND date = %s
    '''
    result = None
    metadata = None
    cursor = None

    try:
        cursor = datasource.cursor()
        cursor.execute(WELLNESS_LOG_QUERY, (username, date))
        result = cursor.fetchall()
        metadata = [i[0] for i in cursor.description]
    except Exception as e:
        print(f'Unable to execute the query: {e}')

    if result and metadata:
        wellness_log_result_set = {}
        for attribute, value in zip(metadata, result):
            if type(value) == date or type(value) == timedelta:
                wellness_log_result_set[attribute] = str(value) # date types can't be processed by JSON
            else:
                wellness_log_result_set[attribute] = value
        return JSONResponse(content={
            "message" : wellness_log_result_set,
            "success" : True,
            }, status_code=200)
    else:
        return JSONResponse(content={
            "message": "Failed to get pull the wellness log of the user",
            "success" : False
            }, status_code=500)