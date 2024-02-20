# PersonalHealthBuddy
CS 125 Project

Figma: https://www.figma.com/file/pfkvQn9LFRR8bIrs9BBbg9/Personal-Health-Buddy

project created using `create-expo-app`

---
### To run:

install all dependancies with `npm install`

initiate development server with `npx expo start`

IGNORE vulnerabilities

Connect mobile device by scanning qr code using camera on IOS or expo go app on android


### Backend Setup

python version 3.12.x

to install:
pip install fastapi
pip install mysql
pip install uvicorn[standard]

to run: python -m uvicorn main:app --reload --host 0.0.0.0 (enter your own ip address)

---
### References:

- React Native setup guide: https://reactnative.dev/docs/environment-setup
- React Native core components: https://reactnative.dev/docs/components-and-apis
- Expo SDK reference (for device features): https://docs.expo.dev/versions/latest/
- React Navigation https://reactnavigation.org/docs/getting-started
- MySQL in Python https://www.w3schools.com/python/python_mysql_getstarted.asp
