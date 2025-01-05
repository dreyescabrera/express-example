'use strict'

const { CustomerSchema, Customer } = require('../models/customer.model.js')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(Customer.tableName, CustomerSchema)
  },

  async down(queryInterface) {
    await queryInterface.dropTable(Customer.tableName)
  }
}
