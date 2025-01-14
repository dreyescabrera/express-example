const boom = require('@hapi/boom')
const crypto = require('crypto')
const { Buffer } = require('buffer')
const MailerHelper = require('../helpers/mailer.helper')
const UserService = require('./user.service.js')
const CryptoHelper = require('../helpers/crypto.helper')
const userService = new UserService()

class AuthService {
  async sendRecoveryEmail(email) {
    try {
      const user = await userService.findByEmail(email)
      const recoveryToken = CryptoHelper.generateToken(user)

      await MailerHelper.sendEmail(
        email,
        'Recuperación de contraseña',
        `Ingresa a este link -> http://localhost:3000/recovery?token=${recoveryToken}`
      )

      await userService.update(user.id, { recoveryToken })

      return true
    } catch (error) {
      if (error.output?.statusCode === 404) {
        throw boom.unauthorized()
      }

      throw error
    }
  }

  async changePassword(token, password) {
    try {
      const payload = CryptoHelper.verifyToken(token)
      const user = await userService.findOneWithSensitiveData(payload.sub)

      const aBuffer = Buffer.from(user.recoveryToken)
      const bBuffer = Buffer.from(token)

      if (!crypto.timingSafeEqual(aBuffer, bBuffer)) {
        throw boom.unauthorized()
      }

      const hashedPassword = await CryptoHelper.hashPassword(password)

      await userService.update(user.id, {
        password: hashedPassword,
        recoveryToken: null
      })

      return true
    } catch {
      throw boom.unauthorized()
    }
  }
}

module.exports = AuthService
