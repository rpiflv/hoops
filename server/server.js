const express = require('express');
const app = express();
require('dotenv').config({ path: './.env' })


app.listen(process.env.PORT, () => {
    console.log(`Listening to port: ${process.env.PORT}`)
})