
# __Hoops!__

## What it is
This application let you browse NBA Teams and Players, pick your favorite players, and add your notes to it.

   <a href="https://hoops.onrender.com/">Go to deployed version >>></a> <br/>
   :warning: when launching the app for the first time, it may take some time to load 

## How it works & features




Browse the app using the navbar. Sign up and login to enjoy more fetaures. What you can do:
- Latest NBA news from ESPN <br/>
![Screen_Recording_2023-06-05_at_20_47_28_AdobeExpress](https://github.com/rpiflv/hoops/assets/67497636/3712e84e-8d41-479c-80c3-9108ee910f28)

- LIVE updates on current games <br/>
![Screen_Recording_2023-06-05_at_20_34_19_AdobeExpress](https://github.com/rpiflv/hoops/assets/67497636/01c9f1ad-f187-4161-bf04-6135f4492fc3)

- Standings and schedules <br/>
![Screen_Recording_2023-06-05_at_20_59_03_AdobeExpress](https://github.com/rpiflv/hoops/assets/67497636/0e95ba98-f385-46b7-a057-d67cfa7b562f)

![Screen_Recording_2023-06-05_at_20_52_50_AdobeExpress](https://github.com/rpiflv/hoops/assets/67497636/bcf236e7-4125-462d-88e9-1ad0e2d0eb23)

- Stats on every team, player and game <br/>
![Screen_Recording_2023-06-05_at_21_02_02_AdobeExpress](https://github.com/rpiflv/hoops/assets/67497636/ed141c73-6584-4490-847e-b70a78cb67c4) <br/>
![Screen_Recording_2023-06-05_at_21_11_04_AdobeExpress](https://github.com/rpiflv/hoops/assets/67497636/76b2ddee-56cd-4e88-b986-45edf756e8ed)

- Personal notes and every player (only if logged in) <br/>
![Screen_Recording_2023-06-05_at_21_42_19_AdobeExpress](https://github.com/rpiflv/hoops/assets/67497636/65ffad9a-429e-434c-a59a-5a4acf093137)

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
