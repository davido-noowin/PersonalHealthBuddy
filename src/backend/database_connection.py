import mysql.connector

# database connection removed from other python files so you can call it
datasource = mysql.connector.connect(
    host="localhost",
    user="root",
    password="password",
    database="PHB"
)