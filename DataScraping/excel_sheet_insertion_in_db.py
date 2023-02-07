##sqlalchemy is used to connect our sql database with python. 
from sqlalchemy import create_engine
## we use pandas to import a .csv or .xlsx file to python and convert into an dataframe.
import pandas as pd
## mysql-pymysql is by default. Here root is the user , siddharth22 is password, localhost is  host, 3306 is port and siddharth is the database.
engine = create_engine("mysql+pymysql://" + "root" + ":" + "siddharth22" + "@" + "localhost" + ":" + "3306" + "/" + "siddharth" + "?" + "charset=utf8mb4")

conn = engine.connect()
## Importing excel file in Python using .ExcelFile() func.
excel_file = pd.ExcelFile("C:\\Users\\siddh\\OneDrive\\Desktop\\Python Scripts\\mydata.xlsx")
## Parsing the data of our worksheet in python by accessing the sheetname
excel_dataframe = excel_file.parse(sheet_name = "Sheet1")
## to_sql is used to create a new table in a data base and check if connection is established then upload the pandas dataframe to the sql database
excel_dataframe.to_sql("my_data", conn, if_exists="append")
print("Succesful")
