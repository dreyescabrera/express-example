const pg = require('pg')
const { Sequelize } = require('sequelize')
const setupModels = require('./../db/models/index.js')
const ENVIRONMENT = require('./../config/environment.js')

const sequelize = new Sequelize(ENVIRONMENT.DB_URL, {
  dialect: 'postgres',
  dialectModule: ENVIRONMENT.IS_PROD ? pg : undefined,
  logging: ENVIRONMENT.IS_PROD ? false : console.log
})

setupModels(sequelize)

module.exports = sequelize
