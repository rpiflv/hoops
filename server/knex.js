require('dotenv').config({ path: '../.env' })

const config = require('./db/knexfile')
const knex = require('knex')

const environment = process.env.NODE_ENV;
module.exports = knex(config[environment]);