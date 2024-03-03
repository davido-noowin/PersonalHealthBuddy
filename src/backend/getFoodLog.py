from fastapi import APIRouter
from fastapi.responses import JSONResponse
from database_connection import datasource
from datetime import date


router = APIRouter()


@router.get("/api/get-food-log")
async def getFoodLog(username: int, date: str):
    # TODO: this query does not account for the types of nutrients make this query useful by adding
    #       the actual nutrients
    print("request", username, date)
    FOOD_LOG_QUERY = '''
    SELECT *
    FROM food
    WHERE username = %s AND date = %s
    '''
    result = None
    metadata = None
    cursor = None

    try:
        cursor = datasource.cursor()
        cursor.execute(FOOD_LOG_QUERY, (username, date))
        result = cursor.fetchone()
        metadata = [i[0] for i in cursor.description]
    except Exception as e:
        print(f'Unable to execute the query: {e}')

    if result and metadata:
        food_log_result_set = {}
        for attribute, value in zip(metadata, result):
            if type(value) == date:
                food_log_result_set[attribute] = str(value) # date types can't be processed by JSON
            else:
                food_log_result_set[attribute] = value
        return JSONResponse(content={
            "message" : food_log_result_set,
            "success" : True,
            }, status_code=200)
    else:
        return JSONResponse(content={
            "message": "Failed to get pull the food log of the user",
            "success" : False
            }, status_code=500)