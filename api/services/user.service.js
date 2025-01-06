const boom = require('@hapi/boom')
const sequelize = require('../lib/sequelize')
const { User } = require('../db/models/user.model')

class UserService {
  #users

  constructor() {
    this.#users = sequelize.models[User.modelName]
  }

  async create(data) {
    const newUser = await this.#users.create(data)
    return newUser
  }

  async find() {
    const rows = await this.#users.findAll({
      include: [User.customerRelation]
    })
    return rows
  }

  async findOne(id) {
    const user = await this.#findUserById(id, {
      include: [User.customerRelation]
    })
    return user
  }

  async update(id, changes) {
    const user = await this.#findUserById(id)
    const updatedUser = await user.update(changes)
    return updatedUser
  }

  async delete(id) {
    const user = await this.#findUserById(id)
    await user.destroy()
    return { id }
  }

  async #findUserById(id, { include }) {
    const user = await this.#users.findByPk(id, {
      include
    })
    if (!user) {
      throw boom.notFound('user not found')
    }
    return user
  }
}

module.exports = UserService
