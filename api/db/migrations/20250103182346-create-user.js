'use strict'

const { UserSchema, User } = require('../models/user.model.js')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(User.tableName, UserSchema)
  },

  async down(queryInterface) {
    await queryInterface.dropTable(User.tableName)
  }
}
