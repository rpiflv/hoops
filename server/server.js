require('dotenv').config({ path: './.env' });

const knex = require('./knex');
const express = require('express');
const app = express();
require('dotenv').config({ path: './.env' });

const KEY = process.env.APISPORT_KEY || 'ciao';
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY || '';
const cors = require('cors');

const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

const authToken = require("./authToken");


app.use(express.json());
app.use(cors());

const path = require("path");
const { match } = require("assert");
app.use(express.static(path.resolve(__dirname, "../client/build")));
app.use(express.static("public"));


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/', async (req, res) => {
    try {
        const news = await fetch('http://site.api.espn.com/apis/site/v2/sports/basketball/nba/news')
        .then((fetchedData) => fetchedData.json());
        
        const liveMatches = await fetch('https://cdn.nba.com/static/json/liveData/scoreboard/todaysScoreboard_00.json')
        .then((fetchedData) => fetchedData.json());
        
        Promise.all([news, liveMatches])
        .then(data => res.send(data))
    } catch (err) {
        console.log(err);
    }
});

// USE THIS FOR DAULY GAME API CALLS
// app.get('/api/games/:year/:month/:day', async (req, res) => {
//     try {
//         fetch(`https://api.sportradar.com/nba/trial/v8/en/games/${req.params.year}/${req.params.month}/${req.params.day}/schedule.json?api_key=${process.env.SPORTRADAR_KEY}`)
//             .then(data => data.json())
//             .then((fetchedData) => res.send(fetchedData))

//         // res.send({ news: news, matches: matches })
//     } catch (err) {
//         res.render("/api/games")
//     }
// })

// USE THIS FOR DAULY [MOCK] GAME API CALLS
app.get('/api/games/:year/:month/:day', async (req, res) => {
    var data = require("../client/src/components/gamefakeday.json");
    res.send(data);
});

// USE THIS FOR GAME API CALLS
// app.get('/api/games/:gameId', (req, res) => {
//     fetch(`https://api.sportradar.com/nba/trial/v8/en/games/${req.params.gameId}/summary.json?api_key=${process.env.SPORTRADAR_KEY}`)
//     .then(res => res.json())
//     .then(fetchedData => res.send(fetchedData))
//     .catch(err => {
//         console.log(err)
//     })
// })

// USE THIS FOR [MOCK] GAME API CALLS
app.get('/api/games/:gameId', async (req, res) => {
    var data = require('../client/src/components/gamefake.json')
    res.send(data);
});


app.get('/api/teams', (req, res) => {
    fetch("https://v2.nba.api-sports.io/standings?league=standard&season=2022", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
            "x-rapidapi-key": KEY
        }
    })
        .then((res) => res.json())
        .then((data) => res.send(data))
        .catch(err => {
            console.log(err);
        });

})

app.get('/api/teams/:teamId', (req, res) => {
    const rosterInfo = fetch(`https://v2.nba.api-sports.io/players?season=2022&team=${req.params.teamId}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
            "x-rapidapi-key": KEY
        }
    })
        .then((data) =>
            data.json()
        );

    const playersList = fetch(`https://data.nba.net/data/10s/prod/v1/2022/players.json`)
        .then((fetchedData) => fetchedData.json());

    Promise.all([rosterInfo, playersList])
        .then(([rosterInfo, playersList]) => {

            const rosterAPI = rosterInfo.response;
            const playersJSON = playersList.league.standard;

            rosterAPI?.map(playerAPI => {
                personID = playersJSON.filter(
                    playerJson => playerJson.lastName === playerAPI.lastname && playerJson.firstName === playerAPI.firstname
                );
                playerAPI['personID'] = personID[0]?.personId;
            })
            return rosterAPI;
        })
        .then(roster => {
            res.send(roster)
        });
})


app.post('/api/teams/:teamId/:playerId/:user_id', async (req, res) => {
    const playerId = req.params.playerId;
    const user_id = req.params.user_id;

    try {
        await knex('fav_players').insert({
            player_id: playerId,
            notes: '---',
            user_id: user_id
        })
            .then(() => console.log('added to favorite'));
    } catch (error) {
        console.error(error);
    }
})
app.get('/api/myplayers/:user_id', authToken, async (req, res) => {
    const user_id = req.params.user_id;
    try {
        const allPlayers = await fetch(`http://data.nba.net/data/10s/prod/v1/2022/players.json`)
            .then((fetchedData) => fetchedData.json())
        try {
            const favPlayers = await knex('fav_players').select({
                id: "id",
                playerId: "player_id",
                notes: "notes"
            }).where("user_id", user_id)
            res.send({ allPlayers: allPlayers.league.standard, favPlayers: favPlayers });
        } catch (error) {
            console.error(error);
        }
    } catch (error) {
        console.error(error);
    }
})

app.delete('/api/myplayers/:playerId', authToken, async (req, res) => {
    const playerId = req.params.playerId;
    try {
        await knex('fav_players')
            .where('player_id', playerId).del()
            .then(() => console.log('item deleted'));
    } catch (error) {
        console.error(error);
    }
})

app.get('/api/myplayers/:playerId/:user_id', authToken, async (req, res) => {
    const playerId = req.params.playerId;
    const user_id = req.params.user_id;
    try {
        const allPlayers = await fetch(`http://data.nba.net/data/10s/prod/v1/2022/players.json`)
            .then((fetchedData) => fetchedData.json());
        try {
            const notes = await knex('fav_players')
                .select({
                    notes: "notes"
                })
                .where('player_id', playerId)
                .where('user_id', user_id);
            try {
                const extraNotes = await knex('notes')
                    .join('fav_players', 'notes.fav_player_id', '=', 'fav_players.id')
                    .select({
                        note_content: "note_content",
                        created_at: "created_at",
                        id: "notes.id"
                    })
                    .where('player_id', playerId)
                    .where('user_id', user_id);
                // console.log(extraNotes)
                res.send({ allPlayers: allPlayers.league.standard, notes: notes, extraNotes: extraNotes })
            } catch (err) {
                console.log(err);
            }
        } catch (error) {
            console.error(error);
        }
    } catch (error) {
        console.error(error);
    }
})

app.post('/api/myplayers/:playerId/:user_id/edit', authToken, async (req, res) => {
    const notes = req.body;
    const user_id = req.params.user_id;
    const playerId = req.params.playerId;
    try {
        await knex('fav_players')
            .update(notes)
            .where('player_id', playerId)
            .where('user_id', user_id);
    } catch (error) {
        console.error(error);
    }
})

app.post('/api/myplayers/:playerId/:user_id/add', authToken, async (req, res) => {
    const extraNote = req.body.extraNote;
    const user_id = req.params.user_id;
    const playerId = req.params.playerId;
    const favPlayerId = await knex('fav_players')
        .select('id')
        .where('user_id', user_id)
        .where('player_id', playerId).first();
    try {
        await knex('notes')
            .insert({
                note_content: extraNote,
                fav_player_id: favPlayerId.id
            })
            .where('user_id', user_id)
            .where('player_id', playerId);
        console.log('extra note added');
    } catch (err) {
        console.log(err);
    }
})

app.delete('/api/myplayers/:playerId/:user_id/delete/:noteId', authToken, async (req, res) => {
    const noteId = req.params.noteId;
    try {
        await knex('notes')
            .where('notes.id', noteId).del()
            .then(() => console.log('note deleted'));
    } catch (error) {
        console.error(error);
    }

})

app.post('/api/signup/',
    [
        check('email', 'Invalid email').isEmail(),
        check('password', "Password should be at least 5 char long").isLength({ min: 5 })
    ], async (req, res) => {
        const { email, password, username } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
              errors: errors.array(),
            });
          }

        //   let user = users.find((user) => {
        //     return user.email === email;
        //   });
      
        //   if (user) {
        //     return res.status(200).json({
        //       errors: [
        //         {
        //           email: user.email,
        //           msg: "The user already exists",
        //         },
        //       ],
        //     });
        //   }
        
        //
        knex('users')
        .select('*')
        .where('email', email)
        .first()
        .then(user => {
        if (user) {
            res.status(404).json({
                errors: [
                    {
                        msg: `User with email ${email} already exists`,
                    },
                ],
            }
            )
            
        } else {
          res.json(user);
        }})
        .catch(err => {
        res.status(500).json({ error: err.message });
        });
        //
        const salt10 = await bcrypt.genSalt(10);
        const hashedPWD = await bcrypt.hash(password, salt10);

        try {
            await knex('users').insert({
                email: email,
                password: hashedPWD,
                username: username
            });
        } catch (err) {
            console.log(err);
        }
        const accessToken = await JWT.sign(
            { username },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "5m" }
        )
        res.json(accessToken);
    })

app.post('/api/login/', async (req, res) => {
    const { email, password } = req.body;
    let user;
    try {
        await knex('users').where('email', email).first()
            .then((data) => user = data);
    } catch (err) {
        console.log(err);
    }
    if (!user) {
        return res.status(400).json({
          errors: [
            {
              msg: "Invalid credentials",
            },
          ],
        });
    }
    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({
          errors: [
            {
              msg: "Email or password is invalid",
            },
          ],
        });
      }

    const accessToken = await JWT.sign(
        { email },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: "20m",
        }
    );

    const refreshToken = await JWT.sign(
        { email },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: "90d",
        }
    );

    refreshTokens.push(refreshToken);

    res.json({
        accessToken,
        refreshToken,
        user_id: user.id
    });
})

// this should be stored in the DB
let refreshTokens = [];

app.post('/api/token', async (req, res) => {

    const refreshToken = req.header("x-auth-token");

    if (!refreshToken) {
        res.send("Token not found!");
    }

    if (!refreshTokens.includes(refreshToken)) {
        res.send("Invalid refresh token");
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
        res.send("invalid token");
    }
});

app.delete("/api/logout/", (req, res) => {
    const refreshToken = req.header("x-auth-token");
    refreshTokens = refreshTokensl.filter((token) => token !== refreshToken);
})

app.listen(process.env.PORT, () => {
    console.log(`Listening to port: ${process.env.PORT}`);
})