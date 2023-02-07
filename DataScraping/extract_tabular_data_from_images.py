import cv2
import pandas as pd
import pytesseract

# Read image
image = cv2.imread('C:\\Users\\siddh\\OneDrive\\Desktop\\5846745.jpg')
gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

# Apply Otsu threshold
thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)[1]

# Pass image to tesseract
custom_config = r'--oem 3 --psm 6'
text = pytesseract.image_to_string(thresh, config=custom_config)
##print(text)

# Split text into lines
lines = text.split('\n')

# Create an empty dataframe
df = pd.DataFrame(columns=['Column 1', 'Column 2', 'Column 3' , 'Column 4' , 'Column 5'])

# Extract data from lines
for line in lines:
    items = line.split()
    if len(items) == 5:
        df = df.append({'Column 1': items[0], 'Column 2': items[1], 'Column 3': items[2] , 'Column 4' : items[3] , 'Column 5' : items[4]}, ignore_index=True)

# Print dataframe
print(df)
