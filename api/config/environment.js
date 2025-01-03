const dotenv = require('dotenv')

dotenv.config()

const processEnv = process.env

const ENVIRONMENT = {
  DB_HOST: processEnv.PG_HOST,
  DB_NAME: processEnv.PG_DB,
  DB_USER: processEnv.PG_USER,
  DB_PASSWORD: processEnv.PG_PASS,
  DB_PORT: processEnv.PG_PORT
}

module.exports = ENVIRONMENT
