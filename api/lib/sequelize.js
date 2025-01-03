const { Sequelize } = require('sequelize')
const setupModels = require('./../db/models/index.js')
const ENVIRONMENT = require('./../config/environment.js')

const USER = ENVIRONMENT.DB_USER
const PASSWORD = ENVIRONMENT.DB_PASSWORD

const URI = `postgres://${USER}:${PASSWORD}@${ENVIRONMENT.DB_HOST}:${ENVIRONMENT.DB_PORT}/${ENVIRONMENT.DB_NAME}`

const sequelize = new Sequelize(URI, {
  dialect: 'postgres'
})

setupModels(sequelize)

sequelize.sync()

module.exports = sequelize
