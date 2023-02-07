##Connecting mysql server to python using mysql.connector 
import mysql.connector
import pandas as pd
##Establishing the connection
conn = mysql.connector.connect(host = "localhost" , user = "root" , password = "siddharth22" , database = "siddharth")
## Importing the .csv file using read_csv().
## Setting index_col as false to not force pandas to not use first column as the index
## Setting delimiter as ' , ' to use it to separate each fields. 
empdata = pd.read_csv("C:\\Users\\siddh\\OneDrive\\Desktop\\output.csv" , index_col = False , delimiter = ',')
print(empdata.head())
cur = conn.cursor()
cur.execute("create table disable_data(disability_category varchar(20) , participants int , ballots_completed int , ballots_terminated int , accuracy varchar(15) , ttc varchar(25))")
print("Table created.")
for i,row in empdata.iterrows():
    sql = "insert into disable_data values (%s,%s,%s,%s,%s,%s)"
    cur.execute(sql,tuple(row))
print("recorded")
conn.commit()
