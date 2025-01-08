'use strict'

const { OrderSchema, Order } = require('../models/order.model.js')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(Order.tableName, OrderSchema)
  },

  async down(queryInterface) {
    await queryInterface.dropTable(Order.tableName)
  }
}
