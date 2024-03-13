from fastapi import APIRouter
from fastapi.responses import JSONResponse
from database_connection import datasource
from pydantic import BaseModel
from datetime import date, timedelta


router = APIRouter()

EXERCISE_LOG_QUERY = '''
    INSERT INTO exercise (username, date, duration, type, steps) VALUES
    (%s, %s, %s, %s, %s);
    '''


CHECK_USER_QUERY = '''
    SELECT username
    FROM users
    WHERE (%s) = username;
    '''


class ExerciseLogRequest(BaseModel):
    '''
    '''
    username: str
    date: date
    duration: timedelta
    type: str
    steps: int


@router.post("/api/log-exercise")
async def logExercise(request: ExerciseLogRequest):
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
            cursor.execute(EXERCISE_LOG_QUERY, (request.username,
                                              request.date,
                                              request.duration,
                                              request.type,
                                              request.steps,))
            datasource.commit()
            return JSONResponse(content={
                "message" : "Exercise has been logged",
                "success" : True,
                }, status_code=200)
        
        except Exception as e:
            print(f'ERROR, unable to update exercise log in the database: {e}')
            return JSONResponse(content={
                "message" : "Exercise has not been logged, failed to update database",
                "success" : False,
                }, status_code=401)
    else:
        print('user does not exist')
        return JSONResponse(content={
            "message" : "Exercise has not been logged, user does not exist",
            "success" : False,
            }, status_code=401)

    