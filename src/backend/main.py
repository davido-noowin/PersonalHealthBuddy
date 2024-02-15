# main.py - might change this later but this is for testing
# python version 3.12.2
# to install:
# pip install fastapi
# pip install uvicorn[standard]
# to run: python -m uvicorn main:app --reload

from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}