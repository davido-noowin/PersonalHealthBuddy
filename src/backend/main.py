from fastapi import FastAPI

from userLogin import router as userLoginRouter
from createUser import router as createUserRouter

from root import router as rootRouter
from getFood import router as foodLogRouter
from getExercise import router as exerciseLogRouter
from getWellness import router as wellnessLogRouter
from getScoreRec import router as scoreRecRouter
from updateStepCount import router as stepCountRouter
from logExercise import router as logExerciseRouter


app = FastAPI()

app.include_router(userLoginRouter)
app.include_router(createUserRouter)

app.include_router(rootRouter)
app.include_router(foodLogRouter)
app.include_router(exerciseLogRouter)
app.include_router(logExerciseRouter)
app.include_router(wellnessLogRouter)
app.include_router(scoreRecRouter)
app.include_router(stepCountRouter)
