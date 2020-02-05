# Balanced Gym App

Balanced Gym React App

App used to log Gym Routines using the balanced gym algorithm to select the next exercise


# Dependencies:

- create-react-app --typescript
- yarn add redux
- yarn add react-redux
- yarn add @types/react-redux --dev
- yarn add @reduxjs/toolkit --dev
- npx -p @storybook/cli sb init --type react --story-format=csf-ts
- yarn add @material-ui/core
- yarn add @material-ui/icons
- yarn add react-router-dom
- yarn add @types/react-router-dom --dev
- yarn add npm-run-all --dev
- yarn add react-swipeable-views
- yarn add @types/react-swipeable-views --dev
- yarn add frappe-charts
- yarn add prettier --dev --exact
- yarn add moment  

# Model
- yarn add jest @types/jest ts-jest --dev

# Heroku

heroku config:set REACT_APP_SERVER=https://balanced-gym-app-dev.herokuapp.com


# Startup

yarn dev for development will start client port 3000 & server port 5001
yarn build will compile client and pack it into the server
yarn start will start only the server 

## Issue with port already in use:

- pkill -f node
