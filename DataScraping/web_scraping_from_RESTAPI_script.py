##request library is used to make a request to a web page or an API to extract data from there.
import requests
import pandas as pd
## json library is used to convert the extrated data into json format for easy understanding of data.
import json
## API link.
url = "https://free-nba.p.rapidapi.com/players"
## header in RESTApis contain the key and host value as these apis are not public and need key value to be used.
headers = {
    "X-RapidAPI-Key" : 'e50a454735mshb4b32b898dba6b8p169f4fjsna8c6b9338217' , 
    'X-RapidAPI-Host': 'free-nba.p.rapidapi.com'
}
##Sends a request of the specified method to the specified url.
result = requests.request("GET" , url,headers = headers)
##Convert extracted info to Json file.
myjson = result.json()
print(myjson)
myjson_data = myjson['data']
##Create a data frame of the json file.
df= pd.DataFrame(myjson_data)
## Convert the data frame in .xlsx format file.
df.to_excel('movie_info.xlsx')
print("Successful")
