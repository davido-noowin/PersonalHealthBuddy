from fastapi import APIRouter
from fastapi.responses import JSONResponse
from database_connection import datasource
from datetime import date, timedelta

router = APIRouter()

@router.get('/api/get-score-rec')
async def getScoreRec(username, key_date):
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
        return JSONResponse(content={
            "message" : ret,
            "success" : True,
            }, status_code=200)
    
    # the score and recommendation does not exist, calculate them
    else:
        food_log = Depends(getFood(username, key_date))
        exercise_log = Depends(getExercise(username, key_date))
        wellness_log = Depends(getWellness(username, key_date))
        # TODO: update to retrieve logs through sql queries


        food_score, food_score_arr = foodScore(food_log)
        exercise_score = exerciseScore(exercise_log)
        wellness_score = wellnessScore(wellness_log)

        
        # recommendation system
        rec = None

        if len(food_log) <3:
            rec = "We lack the data for a clear recommendation. Try logging more consistsently!"

        min_score = min(wellness_score, exercise_score, food_score)

        if min_score == wellness_score:
            pass
        elif min_score == exercise_score:
            pass
        else:
            title = ['fruits', 'vegetables', 'protein', 'grain', 'dairy']
            rec = f'Eat more {title[food_score_arr.index(min(food_score_arr))]}!'

        # insert the score and recommendation into the database
        insert_score_rec = '''
        INSERT INTO score
        (username, date, food_score, exercise_score, wellness_score, recommendation)
        VALUES (%s, %s, %s, %s, %s, %s);
        '''

        # return the score and recommendation
        return JSONResponse(content={
            "message" : {
                "food_score" : food_score,
                "exercise_score" : exercise_score,
                "wellness_score" : wellness_score,
                "recommendation" : rec
            },
            "success" : True,
            }, status_code=200)


def foodScore(food_log):
    # TODO: calculate sum of each individual category, recommend the lacking one(s)
    food_score = 0
    fruit_score = 0
    veg_score = 0
    protein_score = 0
    grain_score = 0
    dairy_score = 0
    for food in food_log:
        fruit_score += food[2]
        veg_score += food[3]
        protein_score += food[4]
        grain_score += food[5]
        dairy_score += food[6]

    food_score_arr = [fruit_score, veg_score, protein_score, grain_score, dairy_score]
    food_score = sum(food_score_arr)*4*5*5//len(food_log)

    return food_score, food_score_arr


def exerciseScore(exercise_log):
    # TODO: if user is consistently only walking, recommend other forms of exercise
    exercise_score = 0
    for exercise in exercise_log:
        # TODO: time out of 30 minutes 
        exercise_score += min(exercise[2]//30, 1)
        #TODO: include steps within the calculation, goal of 5k steps per day
    exercise_score = exercise_score*20*5//len(exercise_log)

    return exercise_score


def wellnessScore(wellness_log):
    # half score for sleep, half score for screen time
    # in sleep: average 7 hours a day is good, also track consistency
    wellness_score = 0
    sleep_score = 0
    sleep_min = 2000
    sleep_max = 0
    st_score = 0
    for wellness in wellness_log:
        screen_time = wellness[2]
        sleep = wellness[3]
        sleep_min = min(sleep_min, sleep)
        sleep_max = max(sleep_max, sleep)

    return wellness_score