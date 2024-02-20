import mysql.connector

# database connection removed from other python files so you can call it
# TODO: remove hard coded user and password to remove security flaw
datasource = mysql.connector.connect(
    host="localhost",
    user="root",
    password="password",
    database="phb"
)