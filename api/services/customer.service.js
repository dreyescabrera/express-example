const sequelize = require('../lib/sequelize')
const { Customer } = require('../db/models/customer.model')
const boom = require('@hapi/boom')

class CustomerService {
  #customers

  constructor() {
    this.#customers = sequelize.models[Customer.modelName]
  }

  async create(data) {
    const newCustomer = await this.#customers.create(data)
    return newCustomer
  }

  async find() {
    const rows = await this.#customers.findAll()
    return rows
  }

  async findOne(id) {
    const customer = await this.#findCustomerById(id)
    return customer
  }

  async update(id, changes) {
    const customer = await this.#findCustomerById(id)
    const updatedCustomer = await customer.update(changes)
    return updatedCustomer
  }

  async delete(id) {
    const customer = await this.#findCustomerById(id)
    await customer.destroy()
    return { id }
  }

  async #findCustomerById(id) {
    const customer = await this.#customers.findByPk(id)
    if (!customer) {
      throw boom.notFound('customer not found')
    }
    return customer
  }
}

module.exports = CustomerService
