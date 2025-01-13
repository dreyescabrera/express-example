const { Pool } = require('pg')
const { ENVIRONMENT } = require('./../config/environment.js')

const USER = ENVIRONMENT.DB_USER
const PASSWORD = ENVIRONMENT.DB_PASSWORD

const URI = `postgres://${USER}:${PASSWORD}@${ENVIRONMENT.DB_HOST}:${ENVIRONMENT.DB_PORT}/${ENVIRONMENT.DB_NAME}`

const pool = new Pool({
  connectionString: URI
})

module.exports = pool
