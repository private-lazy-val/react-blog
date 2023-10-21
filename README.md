
# Pekingese Corner 🐶

## Table of Contents

- [About](#about)
- [Branch Details](#branch-details)
- [Hosting](#hosting)
- [Running the Application Locally](#running-the-application-locally)
- [Running the JSON Server Locally](#running-the-json-server-locally)
- [Screenshots](#screenshots)

## About
Pekingese Corner is a React-based open platform offering in-depth information on Pekingese dogs. The app incorporates Redux, React Router v6, Axios, custom hooks, and Context API.

## Branch Details
- **Main Branch**: Utilizes `Redux` for state management with the integration of `AsyncThunk` and `Entity Adapter`.
- **feature/context-api Branch**: Uses `Context API` for state management.

## Hosting
The front-end of Pekingese Corner is hosted on `Vercel`. 
The back-end, which is a mock backend using json-server, is hosted on `Heroku`.

### Front-end (Vercel)
[Visit the Live Website](https://pekingese-blog.vercel.app/)
### Back-end (Heroku)
[Heroku API Base URL](https://pekingese-blog-8ceaec0c8c78.herokuapp.com/)

## Running the Application locally

To get the application up and running, you need to execute two separate commands in different terminal instances.

First, navigate to your project directory and run the following command to start the React application:

```bash
npm run dev
````

## Running the JSON Server locally
This project uses `json-server` for a mock backend. Open another terminal instance, navigate to your project directory, and run the following command to start the JSON server:

```bash
npm run server
```


## Screenshots

![Home page mobile](https://github.com/private-lazy-val/react-blog/assets/56920579/e042f424-5c55-41ea-ace9-58b97d7ce568)
![Post mobile](https://github.com/private-lazy-val/react-blog/assets/56920579/320981d6-3123-470c-8629-31668bbefcc2)
![New post mobile](https://github.com/private-lazy-val/react-blog/assets/56920579/c769a398-1379-4fb6-bcfa-eae5f8522dc6)
![Home page desktop](https://github.com/private-lazy-val/react-blog/assets/56920579/01f0466c-b031-418b-ad84-2423c509f7e3)

