'use strict'

const { ProductSchema, Product } = require('../models/product.model.js')
const { CategorySchema, Category } = require('../models/category.model.js')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(Category.tableName, CategorySchema)
    await queryInterface.createTable(Product.tableName, ProductSchema)
  },

  async down(queryInterface) {
    await queryInterface.dropTable(Category.tableName)
    await queryInterface.dropTable(Product.tableName)
  }
}
