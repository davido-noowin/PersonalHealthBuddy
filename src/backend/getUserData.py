from fastapi import APIRouter
from fastapi.responses import JSONResponse
from database_connection import datasource


router = APIRouter()


@router.get("/api/get-user-data")
async def getUserData(user_id: int):
    print("request", user_id)

    USER_QUERY = '''
    SELECT *
    FROM users
    WHERE user_id = %s
    '''
    result = None
    metadata = None
    cursor = None

    try:
        cursor = datasource.cursor()
        cursor.execute(USER_QUERY, (user_id,))
        result = cursor.fetchone()
        cursor.execute("DESCRIBE users")
        metadata = cursor.fetchall()
    except Exception as e:
        print(f'Unable to execute the query: {e}')

    if result and metadata:
        user_data_result_set = {}
        for attribute, value in zip(metadata, result):
            user_data_result_set[attribute[0]] = value
        return JSONResponse(content={
            "message" : user_data_result_set,
            "success" : True,
            }, status_code=200)
    else:
        return JSONResponse(content={
            "message": "Failed to get user data",
            "success" : False
            }, status_code=500)