// https://sequelize.org/docs/v6/other-topics/migrations/

const { ENVIRONMENT } = require('./../config/environment.js')

module.exports = {
  development: {
    url: ENVIRONMENT.DB_URL,
    dialect: 'postgres'
  },
  production: {
    url: ENVIRONMENT.DB_URL,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false
      }
    }
  }
}
