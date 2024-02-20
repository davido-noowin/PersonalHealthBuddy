from fastapi import FastAPI
from database_connection import datasource

cursor = datasource.cursor()
cursor.execute("SHOW DATABASES;")
for x in cursor:
    print(x)

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}