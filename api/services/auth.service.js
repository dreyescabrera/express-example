const boom = require('@hapi/boom')
const MailerHelper = require('../helpers/mailer.helper')
const UserService = require('./user.service.js')

const userService = new UserService()

class AuthService {
  async sendRecoveryEmail(email) {
    try {
      const user = await userService.findByEmail(email)

      MailerHelper.sendEmail(
        email,
        'Recuperación de contraseña',
        `hola ${user.email}`
      )
    } catch (error) {
      if (error.output?.statusCode === 404) {
        throw boom.unauthorized()
      }

      throw error
    }
  }
}

module.exports = AuthService
