const boom = require('@hapi/boom')
const sequelize = require('../lib/sequelize')
const { Order } = require('../db/models/order.model')
const { Customer } = require('../db/models/customer.model')
const { OrderProduct } = require('../db/models/joins/order-product.model')
const CustomerService = require('./customer.service')

const customerService = new CustomerService()

class OrderService {
  #orders
  #orderProducts

  constructor() {
    this.#orders = sequelize.models[Order.modelName]
    this.#orderProducts = sequelize.models[OrderProduct.modelName]
  }

  async create(userId) {
    const customer = await customerService.findByUserId(userId)
    const newOrder = await this.#orders.create({
      customerId: customer.id
    })
    return newOrder
  }

  async addItem(data) {
    const newItem = await this.#orderProducts.create(data)
    return newItem
  }

  async find() {
    const rows = await this.#orders.findAll()
    return rows
  }

  async findByUserId(userId) {
    const rows = await this.#orders.findAll({
      where: {
        '$customer.user_id$': userId
      },
      include: [Order.customerRelation, Order.productRelation]
    })
    return rows
  }

  async findOne(id) {
    const order = await this.#findOrderById(id, {
      include: [
        {
          association: Order.customerRelation,
          include: [Customer.userRelation]
        },
        Order.productRelation
      ]
    })
    return order
  }

  async update(id, changes) {
    return {
      id,
      changes
    }
  }

  async delete(id) {
    return { id }
  }

  async #findOrderById(id, { include }) {
    const order = await this.#orders.findByPk(id, {
      include
    })
    if (!order) {
      throw boom.notFound('order not found')
    }
    return order
  }
}

module.exports = OrderService
