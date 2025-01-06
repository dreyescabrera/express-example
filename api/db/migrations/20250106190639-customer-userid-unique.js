'use strict'
const { Customer } = require('../models/customer.model.js')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.addConstraint(Customer.tableName, {
      type: 'unique',
      fields: ['user_id'],
      name: 'unique_user_id'
    })
  },

  async down(queryInterface) {
    await queryInterface.removeConstraint(Customer.tableName, 'unique_user_id')
  }
}
