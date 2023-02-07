import requests
from bs4 import BeautifulSoup
import pandas as pd
url = "https://www.worldometers.info/coronavirus/"
page = requests.get(url)
print(page)
print("Successful")
soup = BeautifulSoup(page.text , 'lxml')
##print(soup)
table1 = soup.find('table' , id = 'main_table_countries_today')
##print(table1)
headers = []
for i in table1.find_all('th'):
    title = i.text
    headers.append(title)
headers[10] = "TotalCases/1M Pop"
##print(headers)
mydata = pd.DataFrame(columns = headers)
##print(mydata)
##Create a for loop to fill mydata
for j in table1.find_all('tr')[1:]:
    row_data = j.find_all('td')
    row = [i.text  for i in row_data]
    length = len(mydata)
    mydata.loc[length] = row
print(mydata)
##export to excel.
mydata.to_excel('mydata.xlsx' , index = False)
pd.read_excel('mydata.xlsx')
print("Mission Accomplished")



    

