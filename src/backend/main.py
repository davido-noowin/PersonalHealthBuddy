from fastapi import FastAPI
from database_connection import datasource
from root import router as rootRouter
from userLogin import router as userLoginRouter
from createUser import router as createUserRouter


cursor = datasource.cursor()
cursor.execute("SHOW DATABASES;")
for x in cursor:
    print(x)

app = FastAPI()

app.include_router(rootRouter)
app.include_router(userLoginRouter)
app.include_router(createUserRouter)
