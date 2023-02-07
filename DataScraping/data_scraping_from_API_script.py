##request library is used to make a request to a web page or an API to extract data from there.
import requests
import pandas as pd
## json library is used to convert the extrated data into json format for easy understanding of data.
import json
## API link.
url = "http://universities.hipolabs.com/search?country=India"
## .get() function sends a GET request to the specified url.
result = requests.get(url)
## .json() is used to convert the extracted data into json format.
myjson = result.json()
print(myjson)
## .DataFrame() is used to convert the json file into a python data frame.
df = pd.DataFrame(myjson)
## Then we convert the data frame into any format that we like.Maybe .xlsx file or .csv file
df.to_excel('college_info.xlsx')
print("Mission Accomplished")
