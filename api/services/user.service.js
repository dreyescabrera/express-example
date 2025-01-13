const boom = require('@hapi/boom')
const sequelize = require('../lib/sequelize')
const CryptoHelper = require('../helpers/crypto.helper')
const { User } = require('../db/models/user.model')

class UserService {
  #users

  constructor() {
    this.#users = sequelize.models[User.modelName]
  }

  async create(data) {
    const hashedUser = await CryptoHelper.getHashedUser(data)
    const newUser = await this.#users.create(hashedUser)
    this.removePassword(newUser)
    return newUser
  }

  async find() {
    const rows = await this.#users.findAll({
      include: [User.customerRelation]
    })
    rows.forEach(this.removePassword)
    return rows
  }

  async findOne(id) {
    const user = await this.#findUserById(id, {
      include: [User.customerRelation]
    })
    this.removePassword(user)
    return user
  }

  async findByEmail(email) {
    const user = await this.#users.findOne({
      where: { email }
    })
    this.#validateUser(user)
    return user
  }

  async update(id, changes) {
    const user = await this.#findUserById(id)
    const updatedUser = await user.update(changes)
    this.removePassword(updatedUser)
    return updatedUser
  }

  async delete(id) {
    const user = await this.#findUserById(id)
    await user.destroy()
    return { id }
  }

  removePassword(user) {
    delete user.dataValues.password
    return user
  }

  async #findUserById(id, { include }) {
    const user = await this.#users.findByPk(id, {
      include
    })
    this.#validateUser(user)
    return user
  }

  #validateUser(user) {
    if (!user) {
      throw boom.notFound('user not found')
    }
  }
}

module.exports = UserService
