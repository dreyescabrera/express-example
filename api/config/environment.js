const dotenv = require('dotenv')
const dotenvExpand = require('dotenv-expand')

const env = dotenv.config()
dotenvExpand.expand(env)

const processEnv = process.env

const ENVIRONMENT = {
  MODE: processEnv.NODE_ENV ?? 'dev',
  IS_PROD: ['production', 'prod'].includes(processEnv.NODE_ENV),
  DB_URL: processEnv.DB_DATABASE_URL,
  DB_HOST: processEnv.PG_HOST,
  DB_NAME: processEnv.PG_DB,
  DB_USER: processEnv.PG_USER,
  DB_PASSWORD: processEnv.PG_PASS,
  DB_PORT: processEnv.PG_PORT,
  GMAIL_USER: processEnv.GMAIL_USER,
  GMAIL_PASSWORD: processEnv.GMAIL_PASS
}

const JWT_SECRET_KEY = processEnv.JWT_SECRET_KEY

module.exports = { ENVIRONMENT, JWT_SECRET_KEY }
