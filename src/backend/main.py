from fastapi import FastAPI
from database_connection import datasource
from root import router as rootRouter
from userLogin import router as userLoginRouter
from createUser import router as createUserRouter
from getUserData import router as userDataRouter
from getFoodLog import router as foodLogRouter
from getExerciseLog import router as exerciseLogRouter
from getWellnessLog import router as wellnessLogRouter
from getUserScore import router as userScoreRouter


app = FastAPI()

app.include_router(rootRouter)
app.include_router(userLoginRouter)
app.include_router(createUserRouter)
app.include_router(userDataRouter)
app.include_router(foodLogRouter)
app.include_router(exerciseLogRouter)
app.include_router(wellnessLogRouter)
app.include_router(userScoreRouter)