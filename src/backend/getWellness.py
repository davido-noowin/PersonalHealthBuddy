from fastapi import APIRouter
from fastapi.responses import JSONResponse
from database_connection import getDatasource
from datetime import date, timedelta


router = APIRouter()

WELLNESS_LOG_QUERY = '''
    SELECT *
    FROM wellness
    WHERE username = %s
    AND date >= DATE_SUB(CURDATE(), INTERVAL 5 DAY);
    '''


@router.get("/api/get-wellness")
async def getWellness(username: str):
    print("request", username)
    result = None
    datasource = getDatasource()
    try:
        cursor = datasource.cursor()
        cursor.execute(WELLNESS_LOG_QUERY, (username,))
        result = cursor.fetchall()
        cursor.close()
    except Exception as e:
        print(f'Unable to execute the query: {e}')
    finally:
        datasource.close()

    if result:
        wellness_log = {}
        for day_vals in result:
            wellness_log[str(day_vals[1])] = {
                'username' : day_vals[0],
                'date' : str(day_vals[1]),
                'screen-duration' : str(day_vals[2]),
                'sleep-duration' : str(day_vals[3])
            }
        return JSONResponse(content={
            "log" : wellness_log,
            "success" : True,
            }, status_code=200)
    else:
        return JSONResponse(content={
            "message": "Failed to get pull the wellness log of the user",
            "success" : False
            }, status_code=500)