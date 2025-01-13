const boom = require('@hapi/boom')
const sequelize = require('../lib/sequelize')
const CryptoHelper = require('../helpers/crypto.helper')
const { Customer } = require('../db/models/customer.model')

class CustomerService {
  #customers

  constructor() {
    this.#customers = sequelize.models[Customer.modelName]
  }

  async create(data) {
    const hashedUser = await CryptoHelper.getHashedUser(data.user)
    data.user = hashedUser

    const newCustomer = await this.#customers.create(data, {
      include: [Customer.userRelation]
    })
    this.#removeCustomerPassword(newCustomer)
    return newCustomer
  }

  async find() {
    const rows = await this.#customers.findAll({
      include: [Customer.userRelation]
    })
    rows.forEach(this.#removeCustomerPassword)
    return rows
  }

  async findOne(id) {
    const customer = await this.#findCustomerById(id, {
      include: [Customer.userRelation]
    })
    this.#removeCustomerPassword(customer)
    return customer
  }

  async findByUserId(userId) {
    const customer = await this.#customers.findOne({
      where: {
        userId
      }
    })
    return customer
  }

  async update(id, changes) {
    const customer = await this.#findCustomerById(id)
    const updatedCustomer = await customer.update(changes)
    this.#removeCustomerPassword(updatedCustomer)
    return updatedCustomer
  }

  async delete(id) {
    const customer = await this.#findCustomerById(id)
    await customer.destroy()
    return { id }
  }

  async #findCustomerById(id, { include }) {
    const customer = await this.#customers.findByPk(id, {
      include
    })
    if (!customer) {
      throw boom.notFound('customer not found')
    }
    return customer
  }

  #removeCustomerPassword(customer) {
    delete customer.dataValues.user.dataValues.password
    return customer
  }
}

module.exports = CustomerService
