
# __Hoops!__

## What it is
This application let you browse NBA Teams and Players, pick your favorite players, and add your notes to it.

   <a href="https://hoops.onrender.com/">Go to deployed version >>></a>

## How it works
In the homepage you will immediately see the laterst News, just click on the title and you will be sent to the article itself.
If you want to look up for a player, click on Teams in the navbar, then on the team to get the Roster. You will have the option to add the player to your Favorite Players. Try it! You can then go to My Players, where you can find the players you favorited before. In the player box, along with the basic information of the player, you can find the Notes section. Click on it to expand and read. 
If you want to add notes, go to Details and the edit the input field.


## Tech
The fronend has been created with React, and Reacr-Bootstrap for a better styling. The FE sends request to the Express Server, set in Nodejs, which pull data from the PostgreSQL database using Knex, or send request to different third party APIs. 


## How to run it
First, create a .env file in the root directory where you will add the following environment varialbles:

PORT=[port number]

DATABASE_NAME=[your local database name]

DATABASE_USER=[username of your local database] * Windows only

DATABASE_PWD=[password of your local database]

NODE_ENV=development

ACCESS_TOKEN_SECRET=[any random value]

Then you have to create a second `.env` file in the `client` folder, and add the following varialble:

REACT_APP_BASE_URL=http://localhost:5050
*make sure you use the same `PORT` number specified in the previous `.env` file .

Make sure that you have installed PostgreSQL14^ in your machine, then run the application locally, by entering the following commands:

> `npm init`

> `npm install`

> `npm run migrate`

> `npm start`

open another terminal
> `cd client`

> `npm start`

## I cannot run it locally! ##
You can also check the application online on https://hoops.onrender.com/ 

-> Due to some restrictions of the free tier, some features might not be functioning after the 9th Feb 2023 <-
