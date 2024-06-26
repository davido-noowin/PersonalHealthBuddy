from fastapi import FastAPI

from userLogin import router as userLoginRouter
from createUser import router as createUserRouter

from root import router as rootRouter
from getFood import router as foodLogRouter
from getExercise import router as exerciseLogRouter
from getWellness import router as wellnessLogRouter
from getScoreRec import router as scoreRecRouter
from logExercise import router as logExerciseRouter
from logFood import router as logFoodRouter
from logWellness import router as logWellnessRouter


app = FastAPI()

app.include_router(userLoginRouter)
app.include_router(createUserRouter)

app.include_router(rootRouter)
app.include_router(foodLogRouter)
app.include_router(logFoodRouter)
app.include_router(exerciseLogRouter)
app.include_router(logExerciseRouter)
app.include_router(wellnessLogRouter)
app.include_router(logWellnessRouter)
app.include_router(scoreRecRouter)
