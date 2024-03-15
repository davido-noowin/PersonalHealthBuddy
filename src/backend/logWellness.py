from fastapi import APIRouter
from fastapi.responses import JSONResponse
from database_connection import getDatasource
from pydantic import BaseModel
from datetime import date, timedelta


router = APIRouter()

WELLNESS_LOG_QUERY = '''
    INSERT INTO wellness (username, date, screen_duration, sleep_duration)
    VALUES
    (%s, %s, %s, %s);
    '''


CHECK_USER_QUERY = '''
    SELECT username
    FROM users
    WHERE (%s) = username;
    '''


class WellnessLogRequest(BaseModel):
    '''
    '''
    username: str
    date: date
    screen_duration: float
    sleep_duration: float


@router.post("/api/log-wellness")
async def logExercise(request: WellnessLogRequest):
    print("request", request)
    datasource = getDatasource()
    user_exists = None
    try:
        cursor = datasource.cursor()
        cursor.execute(CHECK_USER_QUERY, (request.username, ))
        user_exists = cursor.fetchall()
        cursor.close()
    except Exception as e:
        print(f'ERROR: {e}')

    if user_exists:
        print('exists')
        try:
            cursor = datasource.cursor()
            cursor.execute(WELLNESS_LOG_QUERY, (request.username,
                                              request.date,
                                              request.screen_duration,
                                              request.sleep_duration, ))
            datasource.commit()
            cursor.close()
            datasource.close()
            return JSONResponse(content={
                "message" : "Wellness has been logged for the day",
                "success" : True,
                }, status_code=200)
        
        except Exception as e:
            print(f'ERROR, unable to update wellness log in the database: {e}')
            return JSONResponse(content={
                "message" : "Wellness has not been logged, failed to update database",
                "success" : False,
                }, status_code=401)
    else:
        print('user does not exist')
        return JSONResponse(content={
            "message" : "Wellness has not been logged, user does not exist",
            "success" : False,
            }, status_code=401)

    