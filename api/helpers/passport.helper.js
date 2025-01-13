const passport = require('passport')
const LocalStrategy = require('../strategies/local.strategy')
const JwtStrategy = require('../strategies/jwt.strategy')

class PassportHelper {
  static init(app) {
    app.use(passport.initialize())
  }

  static async initStrategies() {
    passport.use(LocalStrategy)
    passport.use(JwtStrategy)
  }

  static authenticate(strategy) {
    return passport.authenticate(strategy, { session: false })
  }
}

module.exports = PassportHelper
