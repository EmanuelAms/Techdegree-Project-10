# Techdegree-Project-10
 My 10th Techdegree Project

This project is a full stack application.
It combines a react client with the rest api developed in the project 9.
The app consists in a web interface to access a school database, allowing users to view, create, update, and delete courses.

CORS support has been added to the REST API, enabled in the api/app.js file, to make requests from the React application to the REST API.

The javascript files which have been written for this project can be found in the client\src directory :
index.js - entry point of the app
App.js - main container component
Context.js - high order component to use Context to allow Data to be accessed by other components
Data.js - Data with methods to sign up, sign in, and authenticate users, as well as create, update, and delete courses
PrivateRoute.js - high order component for routes that require authentification
Components folder - various components to be displayed in different routes of the app

To successfully launch the app, the "npm install" and "npm start" terminal commands must be typed into both the \api and \client directories.
The app can be viewed at the "http://localhost:3000/" url in a web browser.
