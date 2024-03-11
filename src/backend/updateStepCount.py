from fastapi import APIRouter
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from database_connection import datasource


router = APIRouter()

UPDATE_STEP_COUNT_QUERY = """
    UPDATE exercise
    SET steps = steps + %s
    WHERE username = %s AND date = CURDATE();
    """


class UpdateRequest(BaseModel):
    """
    This is a class that the create user api call expects to see.
    This comes from the data sent over through React Native
    using the fetch api and POST method
    """

    username: str
    step_count: int


@router.post("/api/update-step-count")
async def updateStepCount(request: UpdateRequest):
    print("request", request)
    result = None

    try:
        cursor = datasource.cursor()
        cursor.execute(UPDATE_STEP_COUNT_QUERY, (request.step_count, request.username))
        result = cursor.rowcount
        datasource.commit()
    except Exception as e:
        print(f"Unable to execute the query: {e}")

    if result:
        return JSONResponse(
            content={
                "message": f"Updated {result} row(s) in Exercise Table",
                "success": True,
            },
            status_code=200,
        )
    else:
        return JSONResponse(
            content={
                "message": "Failed to update Exercise Table",
                "success": False,
            },
            status_code=500,
        )
