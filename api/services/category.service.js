const boom = require('@hapi/boom')
const sequelize = require('../lib/sequelize')
const { Category } = require('../db/models/category.model')

class CategoryService {
  #categories

  constructor() {
    this.#categories = sequelize.models[Category.modelName]
  }

  async create(data) {
    const newCategory = await this.#categories.create(data)
    return newCategory
  }

  async find() {
    const rows = await this.#categories.findAll()
    return rows
  }

  async findOne(id) {
    const category = await this.#findCategoryById(id, {
      include: [Category.productRelation]
    })
    return category
  }

  async update(id, changes) {
    const category = await this.#findCategoryById(id)
    const updatedCategory = await category.update(changes)
    return updatedCategory
  }

  async delete(id) {
    const category = await this.#findCategoryById(id)
    await category.destroy()
    return { id }
  }

  async #findCategoryById(id, { include }) {
    const category = await this.#categories.findByPk(id, {
      include
    })
    if (!category) {
      throw boom.notFound('category not found')
    }
    return category
  }
}

module.exports = CategoryService
