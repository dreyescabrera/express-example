'use strict'

const { OrderSchema, Order } = require('../models/order.model.js')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const OrderSchemaWithVirtualTotal = Object.assign({}, OrderSchema)
    delete OrderSchemaWithVirtualTotal.total

    await queryInterface.createTable(
      Order.tableName,
      OrderSchemaWithVirtualTotal
    )
  },

  async down(queryInterface) {
    await queryInterface.dropTable(Order.tableName)
  }
}
