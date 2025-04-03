# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


#version 4

- Countries-API project folder 
    - version-1
    - version-2
    - version-3
    - version-4
    - server

-Frontend
1. Refactor the code (either Local Storage or firebase), so that the user actios are tied to calling an API fetch request to the (localhost:3000/end-point". Example, fetch - localstorage:3000/add-user-profile to send user profile data)
2. If your browser is displaying, CORS issue in the console, check in! 

- Web Server/API
1. Creating a folder in the oot countries-api folder, calling it 'server'
2. Inside the server folder, create the web server instance: 
    A. addinf npm + package.jsom, installing express, installing pg, assing your .gitignore, add the src folder
3. Add the config file to connect to our database. This will be the same as the programming_languages project. 
4. Build our express app(in our index.js file), starting with our imports and the Express boilerplate code. 

This part will be the most custom to the project:
5. refernece our API endpoint document, and creare the endpoints and helper functions for each user action. POST - user submit form, POST - user adds a asaved country, GET = get user data, etc. 
6. (Optional) Test your endpoints using postman, example: submit the user form as a JSON object (sending the users name. email, bio, and country). When your serve is running on localhost:3000, you should be able to submit the JSON object in Postman, and see that the user data has been added as a new row of data in your database (You can check this by clicking Viea All Data in PGadmin )

-Database
1. create the table schema for the tables that U will need in my database (CREATE TABLE commands, listing the columns + data types) 
        A. saved-countries, users, country_count
        B. You can refernece your airtable project for the table structure + data types
2. Connect to our local database using PGadmin. 
3. Run the commands to create our data tables