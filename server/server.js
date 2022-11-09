const fetch = (...args) =>
    import("node-fetch").then(({ default: fetch }) => fetch(...args));

const express = require('express');
const app = express();
require('dotenv').config({ path: './.env' })

const cors = require('cors')

app.use(express.json())
app.use(cors())

const path = require("path");
app.use(express.static(path.resolve(__dirname, "../client/build")));
app.use(express.static("public"));

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/api/teams', async (req, res) => {
    await fetch('https://data.nba.net/data/10s/prod/v1/2022/teams.json')
        .then((fetchedData) => fetchedData.json())
        .then(data => res.send(data.league.standard))
})

app.get('/api/teams/:teamId', async (req, res) => {
    const teamID = req.params.teamId;
    console.log(teamID)
    await fetch(`http://data.nba.net/data/10s/prod/v1/2022/players.json`)
        .then((fetchedData) => fetchedData.json())
        .then(data => {
            res.send(data)
        }
        )
})

app.listen(process.env.PORT, () => {
    console.log(`Listening to port: ${process.env.PORT}`)
})