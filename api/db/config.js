// https://sequelize.org/docs/v6/other-topics/migrations/

const ENVIRONMENT = require('./../config/environment.js')

const USER = ENVIRONMENT.DB_USER
const PASSWORD = ENVIRONMENT.DB_PASSWORD

const URI = `postgres://${USER}:${PASSWORD}@${ENVIRONMENT.DB_HOST}:${ENVIRONMENT.DB_PORT}/${ENVIRONMENT.DB_NAME}`

module.exports = {
  development: {
    url: URI,
    dialect: 'postgres'
  },
  production: {
    url: URI,
    dialect: 'postgres'
  }
}
