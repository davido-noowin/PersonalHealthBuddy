from fastapi import APIRouter
from fastapi.responses import JSONResponse
from database_connection import datasource
from datetime import date, timedelta

router = APIRouter()

FOOD_LOG_QUERY = '''
    SELECT *
    FROM food
    WHERE username = %s
    AND date >= DATE_SUB(CURDATE(), INTERVAL 5 DAY);
    '''

EXERCISE_LOG_QUERY = '''
    SELECT *
    FROM exercise
    WHERE username = %s
    AND date >= DATE_SUB(CURDATE(), INTERVAL 5 DAY);
    '''

WELLNESS_LOG_QUERY = '''
    SELECT *
    FROM wellness
    WHERE username = %s
    AND date >= DATE_SUB(CURDATE(), INTERVAL 5 DAY);
    '''

SCORE_REC_QUERY = '''
    SELECT *
    FROM score
    WHERE username = %s AND date = %s;
    '''

INSERT_SCORE_REC = '''
    INSERT INTO score
    (username, date, food_score, exercise_score, wellness_score, recommendation)
    VALUES (%s, %s, %s, %s, %s, %s);
    '''


@router.get('/api/get-score-rec')
async def getScoreRec(username, key_date):
    result = None

    try:
        cursor = datasource.cursor()
        cursor.execute(SCORE_REC_QUERY, (username, key_date))
        result = cursor.fetchone()
        metadata = [i[0] for i in cursor.description]
    except Exception as e:
        print(f'Unable to retrieve the scores of the user: {e}')

    # the score and recommendation already exists
    if result and metadata:
        ret = {}
        for attribute, item in zip(metadata, result): 
            if type(item) == date or type(item) == timedelta:
                ret[attribute] = str(item) 
            else: 
                ret[attribute] = item
        return JSONResponse(content={
            "message" : ret,
            "success" : True,
            }, status_code=200)
    
    # the score and recommendation does not exist, calculate them
    else:
        cursor = datasource.cursor()

        cursor.execute(FOOD_LOG_QUERY, (username, key_date))
        food_log = cursor.fetchall()
        food_log = fixType(food_log)

        cursor.execute(EXERCISE_LOG_QUERY, (username, key_date))
        exercise_log = cursor.fetchall()
        exercise_log = fixType(exercise_log)

        cursor.execute(WELLNESS_LOG_QUERY, (username, key_date))
        wellness_log = cursor.fetchall()
        wellness_log = fixType(wellness_log)

        # TODO: test output type with date/time

        rec, food_score, exercise_score, wellness_score = recommend(food_log, exercise_log, wellness_log)

        # insert the score and recommendation into the database
        cursor.execute(INSERT_SCORE_REC, (username, key_date, food_score, exercise_score, wellness_score, rec))

        # return the score and recommendation
        return JSONResponse(content={
            "message" : {
                "recommendation" : rec,
                "food_score" : food_score,
                "exercise_score" : exercise_score,
                "wellness_score" : wellness_score
            },
            "success" : True,
            }, status_code=200)



def recommend(food_log, exercise_log, wellness_log):
    food_score, food_rec = foodScore(food_log)
    exercise_score, exercise_rec = exerciseScore(exercise_log)
    wellness_score, wellness_rec = wellnessScore(wellness_log)
    rec = ''

    if len(food_log) <3:
        rec = "We lack the data for a clear recommendation. Try logging more consistsently!"
    if food_score > 90 and exercise_score > 90 and wellness_score > 90:
        rec = "You're doing great, keep it up!"

    min_score = min(wellness_score, exercise_score, food_score)

    if min_score == wellness_score:
        rec  = wellness_rec
    elif min_score == exercise_score:
        rec = exercise_rec
    else:
        rec = food_rec

    return rec, food_score, exercise_score, wellness_score



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
    food_score = sum(food_score_arr)*4*5*5/len(food_log)

    # select the category with the lowest sum
    title = ['fruits', 'vegetables', 'protein', 'grain', 'dairy']
    rec = f'For a healthier diet, eat more {title[food_score_arr.index(min(food_score_arr))]}.'

    return food_score, rec



def exerciseScore(exercise_log):
    exercise_score = 0
    for exercise in exercise_log:
        # TODO: time out of 30 minutes 
        exercise_score += min(exercise[2]/30, 1)
        #TODO: include steps within the calculation, goal of 5k steps per day
    exercise_score = exercise_score*20*5/len(exercise_log)

    return exercise_score



def wellnessScore(wellness_log):
    sleep_min = 2000
    sleep_max = 0
    net_sleep = 0

    st_score = 0
    net_st = 0

    for wellness in wellness_log:
        net_st += wellness[2]
        sleep = wellness[3]
        sleep_min = min(sleep_min, sleep)
        sleep_max = max(sleep_max, sleep)
        net_sleep += sleep

    sleep_diff = sleep_max - sleep_min
    # sleep diff of 2 or below has no penalty
    # sleep diff has a max score of 20
    sleep_score = (net_sleep/5/8)*50 + max(0, (20 - 2*max((sleep_diff-2), 0)))

    # screen time score between 0 and 30, scaling between 15 net hours and 45 net hours
    st_score = max(0, 30 - 3*max((net_st/5)-3, 0))

    wellness_score = sleep_score + st_score
    rec = ''

    if sleep_score-40 < st_score:
        if (net_sleep/5/8)*50 - 10 < max(0, (20 - 2*max((sleep_diff-2), 0))):
            rec = 'Try getting more sleep every night - 8 hours a day is recommended.'
        else:
            rec = 'Be more consistent by sleeping roughly the same amount each night.'
    else:
        rec = 'Try spending less time on your phone.'

    return wellness_score, rec



def fixType(log):
    for day_vals in log:
        for item in day_vals:
            # date or time types can't be processed by JSON
            if type(item) == date or type(item) == timedelta:
                item = str(item) 
    return log