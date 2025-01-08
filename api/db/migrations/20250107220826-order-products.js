'use strict'

const {
  OrderProductSchema,
  OrderProduct
} = require('../models/joins/order-product.model.js')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(OrderProduct.tableName, OrderProductSchema)
  },

  async down(queryInterface) {
    await queryInterface.dropTable(OrderProduct.tableName)
  }
}
