const boom = require('@hapi/boom')
const sequelize = require('../lib/sequelize')
const { Product } = require('../db/models/product.model')

class ProductsService {
  #products

  constructor() {
    this.#products = sequelize.models[Product.modelName]
  }

  async create(data) {
    const newProduct = await this.#products.create(data)
    return newProduct
  }

  async find() {
    const rows = await this.#products.findAll({
      include: [Product.categoryRelation]
    })
    return rows
  }

  async findOne(id) {
    const product = await this.#findProductById(id)
    return product
  }

  async update(id, changes) {
    const product = await this.#findProductById(id)
    const updatedProduct = await product.update(changes)
    return updatedProduct
  }

  async delete(id) {
    const product = await this.#findProductById(id)
    await product.destroy()
    return { id }
  }

  async #findProductById(id) {
    const product = await this.#products.findByPk(id)
    if (!product) {
      throw boom.notFound('product not found')
    }
    return product
  }
}

module.exports = ProductsService
