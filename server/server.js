const fetch = (...args) =>
    import("node-fetch").then(({ default: fetch }) => fetch(...args));
require('dotenv').config({ path: './.env' })

const knex = require('./knex')
const express = require('express');
const app = express();
require('dotenv').config({ path: './.env' })

const cors = require('cors')

const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const users = require("./usersDB"); // mock DB to test login

const authToken = require("./authToken")


app.use(express.json())
app.use(cors())

const path = require("path");
app.use(express.static(path.resolve(__dirname, "../client/build")));
app.use(express.static("public"));


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/api/', async (req, res) => {
    try {
        await fetch('https://nba-latest-news.p.rapidapi.com/news/source/espn', {
            headers: {
                'X-RapidAPI-Key': '38850b2764mshee7a6652b1706b6p11e2e0jsnafce3b9c28e6',
                'X-RapidAPI-Host': 'nba-latest-news.p.rapidapi.com'
            }
        })
            .then((fetchedData) => fetchedData.json())
            .then(data => res.send(data))
    } catch (err) {
        console.log(err)
    }
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
            player_id: playerId,
            notes: '---'
        })
            .then(() => console.log('added to favorite'))
    } catch (error) {
        console.error(error)
    }
})
app.get('/api/myplayers', authToken, async (req, res) => {
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

app.delete('/api/myplayers/:playerId', authToken, async (req, res) => {
    const playerId = req.params.playerId;
    try {
        await knex('fav_players')
            .where('player_id', playerId).del()
            .then(() => console.log('item deleted'))
    } catch (error) {
        console.error(error)
    }
})

app.get('/api/myplayers/:playerId', authToken, async (req, res) => {
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

app.post('/api/myplayers/:playerId/edit', authToken, async (req, res) => {
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

app.post('/api/signup/',
    [
        check('email', 'Invalid email').isEmail(),
        check('password', "Password should be at least 5 char long").isLength({ min: 5 })
    ], async (req, res) => {
        const { email, password, username } = req.body;

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.send(errors)
        }

        // make KNEX query here
        // let user = users.find((user) => {
        //     return email === user.email;
        // })

        const salt10 = await bcrypt.genSalt(10)
        const hashedPWD = await bcrypt.hash(password, salt10)

        try {
            await knex('users').insert({
                email: email,
                password: hashedPWD,
                username: username
            })

        } catch (err) {
            console.log(err)
        }

        // if (user) {
        //     return res.send('User already exists')
        // }

        const accessToken = await JWT.sign(
            { username },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "5m" }
        )

        res.json(accessToken)
    })

app.post('/api/login/', async (req, res) => {
    const { email, password } = req.body;

    let user;

    try {
        await knex('users').where('email', email).first()
            .then((data) => user = data)
    } catch (err) {

    }

    if (!user) {
        return res.send("Email does not exist")
    }
    let isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        return res.send("Credentials are not correct")
    }

    const accessToken = await JWT.sign(
        { email },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: "1m",
        }
    );

    const refreshToken = await JWT.sign(
        { email },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: "90d",
        }
    );

    refreshTokens.push(refreshToken)

    res.json({
        accessToken,
        refreshToken
    });
})

// this should be stored in the DB
let refreshTokens = [];

app.post('/api/token', async (req, res) => {

    const refreshToken = req.header("x-auth-token")

    if (!refreshToken) {
        res.send("Token not found!")
    }

    if (!refreshTokens.includes(refreshToken)) {
        res.send("Invalid refresh token")
    }

    try {
        const user = await JWT.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );
        const { email } = user;
        const accessToken = await JWT.sign(
            { email },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "10m" }
        );
        res.json({ accessToken });
    } catch (err) {
        res.send("invalid token")
    }
})

app.delete("/api/logout/", (req, res) => {
    const refreshToken = req.header("x-auth-token")

    refreshTokens = refreshTokensl.filter((token) => token !== refreshToken)
})

app.listen(process.env.PORT, () => {
    console.log(`Listening to port: ${process.env.PORT}`)
})