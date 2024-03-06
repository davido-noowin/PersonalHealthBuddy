from fastapi import APIRouter
from fastapi.responses import JSONResponse
from database_connection import datasource
from datetime import date


router = APIRouter()

FOOD_LOG_QUERY = '''
    SELECT *
    FROM food
    WHERE username = %s
    AND date >= DATE_SUB(CURDATE(), INTERVAL 5 DAY);
    '''


@router.get("/api/get-food")
async def getFood(username: str):
    print("request", username)
    result = None

    try:
        cursor = datasource.cursor()
        cursor.execute(FOOD_LOG_QUERY, (username,))
        result = cursor.fetchall()
    except Exception as e:
        print(f'Unable to execute the query: {e}')

    if result:
        food_log = {}
        for day_vals in result:
            food_log[str(day_vals[1])] = {
                'username' : day_vals[0],
                'date' : str(day_vals[1]),
                'fruits' : day_vals[2],
                'vegetables' : day_vals[3],
                'protein' : day_vals[4],
                'grains' : day_vals[5],
                'dairy' : day_vals[6]
            }
        return JSONResponse(content={
            "log" : food_log,
            "success" : True,
            }, status_code=200)
    else:
        return JSONResponse(content={
            "message": "Failed to get pull the food log of the user",
            "success" : False
            }, status_code=500)