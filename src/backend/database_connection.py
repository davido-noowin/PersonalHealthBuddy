import mysql.connector

# database connection removed from other python files so you can call it
datasource = mysql.connector.connect(
    host="localhost",
    user="mytestuser",
    password="My6$Password",
    database="PHB"
)
