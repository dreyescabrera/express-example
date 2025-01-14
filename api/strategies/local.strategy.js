const boom = require('@hapi/boom')
const { Strategy } = require('passport-local')
const CryptoHelper = require('./../helpers/crypto.helper.js')
const UserService = require('./../services/user.service.js')

const userService = new UserService()

function reject(doneCallback) {
  return doneCallback(boom.unauthorized('Invalid credentials'), false)
}

const LocalStrategy = new Strategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  async (email, password, done) => {
    try {
      const user = await userService.findByEmail(email)

      const isMatch = await CryptoHelper.comparePassword(
        password,
        user.password
      )
      if (!isMatch) return reject(done)

      userService.removeSensitiveData(user)

      done(null, user)
    } catch (error) {
      done(error, false)
    }
  }
)

module.exports = LocalStrategy
