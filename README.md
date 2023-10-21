
# Pekingese Corner 🐶

## Table of Contents

- [About the Project](#about-the-project)
- [Branch Details](#branch-details)
- [Features](#features)
- [Hosting](#hosting)
- [Running the Application Locally](#running-the-application-locally)
- [Screenshots](#screenshots)

## About the Project
Pekingese Corner is a React-based open platform offering in-depth information on Pekingese dogs. The app incorporates Redux, React Router v6, Axios, custom hooks, and Context API.

## Branch Details
- **Main Branch**: Utilizes `Redux` for state management with the integration of `AsyncThunk` and `Entity Adapter`.
- **feature/context-api Branch**: Uses `Context API` for state management.

## Features
- **Dynamic Routing using React Router v6**
- **Data Fetching using Axios**
- **Custom Hooks** (`useAxiosFetch`, `useWindowSize`, `useScrollToTop`)
- **Router hooks and links for navigation**
- **Context API**

## Hosting
The front-end of Pekingese Corner is hosted on `Vercel`. 
The back-end, which is a mock backend using json-server, is hosted on `Heroku`.

### Front-end (Vercel)
[Visit the Live Website](https://pekingese-blog.vercel.app/)
### Back-end (Heroku)
[Heroku API Base URL](https://pekingese-blog-8ceaec0c8c78.herokuapp.com/)

## Running the Application Locally

To get the application up and running, as well as to start `json-server` mock backend on your local machine, execute the following command:

```bash
npm run dev
````

## Screenshots

![Home page mobile](https://github.com/private-lazy-val/react-blog/assets/56920579/e042f424-5c55-41ea-ace9-58b97d7ce568)
![Post mobile](https://github.com/private-lazy-val/react-blog/assets/56920579/320981d6-3123-470c-8629-31668bbefcc2)
![New post mobile](https://github.com/private-lazy-val/react-blog/assets/56920579/c769a398-1379-4fb6-bcfa-eae5f8522dc6)
![Home page desktop](https://github.com/private-lazy-val/react-blog/assets/56920579/01f0466c-b031-418b-ad84-2423c509f7e3)

