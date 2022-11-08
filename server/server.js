const fetch = (...args) =>
    import("node-fetch").then(({ default: fetch }) => fetch(...args));

const express = require('express');
const app = express();
require('dotenv').config({ path: './.env' })

const cors = require('cors')

app.use(express.json())
app.use(cors())
app.use("/", express.static(__dirname + "/build")); // "/public"



app.get('/api/teams', async (req, res) => {
    await fetch('https://data.nba.net/data/10s/prod/v1/2022/teams.json')
        .then((fetchedData) => fetchedData.json())
        .then(data => res.send(data.league.standard))
})

app.listen(process.env.PORT, () => {
    console.log(`Listening to port: ${process.env.PORT}`)
})