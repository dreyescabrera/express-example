const { Strategy, ExtractJwt } = require('passport-jwt')
const { JWT_SECRET_KEY } = require('../config/environment')

const JwtStrategy = new Strategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET_KEY
  },
  (payload, done) => {
    return done(null, payload)
  }
)

module.exports = JwtStrategy
