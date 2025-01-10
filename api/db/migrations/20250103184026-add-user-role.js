'use strict'

const { UserSchema, User } = require('../models/user.model.js')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const columns = await queryInterface.describeTable(User.tableName)

    if (!columns.role) {
      await queryInterface.addColumn(User.tableName, 'role', UserSchema.role)
    }
  },

  async down(queryInterface) {
    await queryInterface.removeColumn(User.tableName, 'role')
  }
}
