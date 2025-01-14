'use strict'

const { UserSchema, User } = require('../models/user.model.js')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const columns = await queryInterface.describeTable(User.tableName)

    if (!columns.recoveryToken) {
      await queryInterface.addColumn(
        User.tableName,
        'recoveryToken',
        UserSchema.recoveryToken
      )
    }
  },

  async down(queryInterface) {
    await queryInterface.removeColumn(User.tableName, 'recoveryToken')
  }
}
