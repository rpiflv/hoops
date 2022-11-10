const fetch = (...args) =>
    import("node-fetch").then(({ default: fetch }) => fetch(...args));
require('dotenv').config({ path: './.env' })


const knex = require('knex')({
    client: 'postgresql',
    connection: {
        database: process.env.DATABASE_NAME,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PWD
    },
    pool: {
        min: 2,
        max: 10
    },
    migrations: {
        directory: "./migrations",
    }
})
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

app.get('/api/myplayers', async (req, res) => {
    const allPlayers = await fetch(`http://data.nba.net/data/10s/prod/v1/2022/players.json`)
        .then((fetchedData) => fetchedData.json())

    const favPlayers = await knex('fav_players').select({
        id: "id",
        playerId: "playerId",
        notes: "notes"
    })
    res.send({ allPlayers: allPlayers.league.standard, favPlayers: favPlayers })

})

app.post('/api/teams/:teamId/:playerId', async (req, res) => {
    const playerId = req.params.playerId
    await knex('fav_players').insert({
        playerId: playerId
    })
    console.log('added to db')
})

app.listen(process.env.PORT, () => {
    console.log(`Listening to port: ${process.env.PORT}`)
})