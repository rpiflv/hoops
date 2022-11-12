const fetch = (...args) =>
    import("node-fetch").then(({ default: fetch }) => fetch(...args));
require('dotenv').config({ path: './.env' })

const knex = require('./knex')
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
    try {
        await fetch('https://data.nba.net/data/10s/prod/v1/2022/teams.json')
            .then((fetchedData) => fetchedData.json())
            .then(data => res.send(data.league.standard))
    } catch (error) {
        console.error(error)
    }
})

app.get('/api/teams/:teamId', async (req, res) => {
    try {
        await fetch(`http://data.nba.net/data/10s/prod/v1/2022/players.json`)
            .then((fetchedData) => fetchedData.json())
            .then(data => {
                res.send(data)
            }
            )
    } catch (error) {
        console.error(error)
    }
})

app.post('/api/teams/:teamId/:playerId', async (req, res) => {
    const playerId = req.params.playerId;
    try {
        await knex('fav_players').insert({
            player_id: playerId
        })
            .then(() => console.log('added to favorite'))
        console.log('added to db')
    } catch (error) {
        console.error(error)
    }
})
app.get('/api/myplayers', async (req, res) => {
    try {
        const allPlayers = await fetch(`http://data.nba.net/data/10s/prod/v1/2022/players.json`)
            .then((fetchedData) => fetchedData.json())
        try {
            const favPlayers = await knex('fav_players').select({
                id: "id",
                playerId: "player_id",
                notes: "notes"
            })
            res.send({ allPlayers: allPlayers.league.standard, favPlayers: favPlayers })
        } catch (error) {
            console.error(error)
        }
    } catch (error) {
        console.error(error)
    }
})

app.delete('/api/myplayers/:playerId', async (req, res) => {
    const playerId = req.params.playerId;
    try {
        await knex('fav_players')
            .where('player_id', playerId).del()
            .then(() => console.log('item deleted'))
    } catch (error) {
        console.error(error)
    }
})

app.get('/api/myplayers/:playerId', async (req, res) => {
    const playerId = req.params.playerId
    try {
        const allPlayers = await fetch(`http://data.nba.net/data/10s/prod/v1/2022/players.json`)
            .then((fetchedData) => fetchedData.json())

        try {
            const notes = await knex('fav_players')
                .select({
                    notes: "notes"
                })
                .where('player_id', playerId)
            res.send({ allPlayers: allPlayers.league.standard, notes: notes })
        } catch (error) {
            console.error(error)
        }
    } catch (error) {
        console.error(error)
    }
})

app.post('/api/myplayers/:playerId/edit', async (req, res) => {
    const notes = req.body;
    const playerId = req.params.playerId;
    try {

        await knex('fav_players')
            .update(notes)
            .where('player_id', playerId)
    } catch (error) {
        console.error(error)
    }
})

app.listen(process.env.PORT, () => {
    console.log(`Listening to port: ${process.env.PORT}`)
})