
# Pekingese Corner 🐶

## Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Running the Application](#running-the-application)
- [Running the JSON Server](#running-the-json-server)
- [Screenshots](#screenshots)

## About the Project
Pekingese Corner is a React-based blog application offering in-depth information on Pekingese dogs. The app incorporates React Router v6, Axios, custom hooks, and the Context API.

## Features

- **Dynamic Routing using React Router v6**
- **Data Fetching using Axios**
- **Custom Hooks** (`useAxiosFetch`, `useWindowSize`)
- **Router hooks and links for navigation**
- **Context API for state management**

## Running the Application

To get the application up and running, you need to execute two separate commands in different terminal instances.


First, navigate to your project directory and run the following command to start the React application:

```bash
npm start
````

## Running the JSON Server
This project uses `json-server` for a mock backend. Open another terminal instance, navigate to your project directory, and run the following command to start the JSON server:

```bash
npx json-server -p 3500 -w data/db.json
```

## Screenshots

![Home page mobile](https://github.com/private-lazy-val/react-blog/assets/56920579/5664a98f-df3d-417a-ab4a-0bc91d7bf9f6)
![Post mobile](https://github.com/private-lazy-val/react-blog/assets/56920579/d586d879-0a6a-4fc7-a5f5-90a06e1afbda)
![New post mobile](https://github.com/private-lazy-val/react-blog/assets/56920579/f5e4efd1-3aca-432e-83e6-5bf081e0c452)
![Home page desktop](https://github.com/private-lazy-val/react-blog/assets/56920579/58dbf79d-d4ec-4a7a-9331-eb5cbeebdc1c)

