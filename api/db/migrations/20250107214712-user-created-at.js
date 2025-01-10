'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const columns = await queryInterface.describeTable('users')

    if (columns.createdAt) {
      await queryInterface.renameColumn('users', 'createdAt', 'created_at')
    }
  },

  async down(queryInterface) {
    await queryInterface.renameColumn('users', 'created_at', 'createdAt')
  }
}
