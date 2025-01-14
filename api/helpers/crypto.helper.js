const boom = require('@hapi/boom')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { JWT_SECRET_KEY } = require('./../config/environment.js')

class CryptoHelper {
  static hashPassword(password) {
    return bcrypt.hash(password, 10)
  }

  static async getHashedUser(user) {
    const cloneUser = JSON.parse(JSON.stringify(user))
    cloneUser.password = await this.hashPassword(cloneUser.password)
    return cloneUser
  }

  static comparePassword(password, hash) {
    return bcrypt.compare(password, hash)
  }

  static generateToken(user, expiresIn = '10m') {
    const payload = {
      sub: user.id,
      role: user.role
    }

    return jwt.sign(payload, JWT_SECRET_KEY, {
      expiresIn,
      algorithm: 'HS256'
    })
  }

  static verifyToken(token) {
    try {
      const payload = jwt.verify(token, JWT_SECRET_KEY)
      return payload
    } catch (error) {
      throw boom.unauthorized(error.message)
    }
  }
}

module.exports = CryptoHelper
