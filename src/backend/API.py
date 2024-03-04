from fastapi import FastAPI, Depends
from fastapi.responses import JSONResponse
from database_connection import datasource
from datetime import date, timedelta

app = FastAPI()

error_json = JSONResponse(content={
            "message": "Failed to get pull the wellness log of the user",
            "success" : False
            }, status_code=500)


@app.get('/api/get-score-rec')
def recommend(username, key_date):
    query = '''
    SELECT *
    FROM score
    WHERE username = %s
    AND date >= DATE_SUB(CURDATE(), INTERVAL 5 DAY);
    '''
    result = None
    metadata = None

    try:
        cursor = datasource.cursor()
        cursor.execute(query, (username, key_date))
        result = cursor.fetchall()
        metadata = [i[0] for i in cursor.description]
    except Exception as e:
        print(f'Unable to retrieve the scores of the user: {e}')

    # the score and recommendation already exists
    if result and metadata:
        ret = {}
        for attribute, value in zip(metadata, result): ret[attribute] = value
        return ret
    
    # the score and recommendation does not exist, calculate them
    else:
        food_log = Depends(getFood(username, key_date))
        exercise_log = Depends(getExercise(username, key_date))
        wellness_log = Depends(getWellness(username, key_date))

        # all the logs should have the same length
        # scale each reported day higher when there are missing days
        weight = 5//len(food_log)

        # assuming above code is in the correct format (list of tuples)

        # TODO: calculate sum of each individual category, recommend the lacking one(s)
        food_score = 0
        for food in food_log:
            # check all 5 categores
            for i in range(2, 7):
                if food[i]:
                    food_score +=1
        food_score = food_score*4*5*weight
            
        # TODO: if user is consistently only walking, recommend other forms of exercise
        exercise_score = 0
        for exercise in exercise_log:
            # TODO: time out of 30 minutes 
            exercise_score += min(exercise[2]//30, 1)
            #TODO: include steps within the calculation, goal of 5k steps per day
        exercise_score = exercise_score*20*weight

        # TODO: split score into fraction for sleep, fraction for screen time
        # track which part user is struggling more on
        wellness_score = 0
        for wellness in wellness_log:
            pass

        
        # recommendation system
        rec = None

        if len(food_log) <3:
            rec = "We lack the data for a clear recommendation. Try logging more consistsently"

        


@app.get("/api/get-exercise")
async def getExercise(username: int, key_date: str):
    print("request", username, key_date)
    EXERCISE_LOG_QUERY = '''
    SELECT *
    FROM exercise
    WHERE username = %s
    AND date >= DATE_SUB(CURDATE(), INTERVAL 5 DAY);
    '''
    result = None
    metadata = None

    try:
        cursor = datasource.cursor()
        cursor.execute(EXERCISE_LOG_QUERY, (username, key_date))
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
        return error_json
    

@app.get("/api/get-food")
async def getFood(username: int, key_date: str):
    print("request", username, key_date)
    FOOD_LOG_QUERY = '''
    SELECT *
    FROM food
    WHERE username = %s
    AND date >= DATE_SUB(CURDATE(), INTERVAL 5 DAY);
    '''
    result = None
    metadata = None

    try:
        cursor = datasource.cursor()
        cursor.execute(FOOD_LOG_QUERY, (username, key_date))
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
        return error_json
    

@app.get("/api/get-wellness")
async def getWellness(username: int, key_date: str):
    print("request", username, key_date)
    WELLNESS_LOG_QUERY = '''
    SELECT *
    FROM wellness
    WHERE username = %s
    AND date >= DATE_SUB(CURDATE(), INTERVAL 5 DAY);
    '''
    result = None
    metadata = None

    try:
        cursor = datasource.cursor()
        cursor.execute(WELLNESS_LOG_QUERY, (username, key_date))
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
        return error_json
    

@app.get("/")
async def root():
    return {"message": "Hello World"}