const express = require('express')
const AuthService = require('../services/auth.service')
const CryptoHelper = require('../helpers/crypto.helper')
const PassportHelper = require('../helpers/passport.helper')
const {
  passwordRecoverySchema,
  passwordChangeSchema
} = require('../schemas/auth.schema')
const { validatorHandler } = require('../middlewares/validator.handler')

const router = express.Router()

const authService = new AuthService()

router.post(
  '/login',
  PassportHelper.authenticate('local'),
  (req, res, next) => {
    try {
      const user = req.user
      const token = CryptoHelper.generateToken(user)
      res.json({ token, user })
    } catch (error) {
      next(error)
    }
  }
)

router.post(
  '/recovery',
  validatorHandler(passwordRecoverySchema, 'body'),
  async (req, res, next) => {
    try {
      const { email } = req.body
      await authService.sendRecoveryEmail(email)
      res.status(204).send()
    } catch (error) {
      next(error)
    }
  }
)

router.post(
  '/change-password',
  validatorHandler(passwordChangeSchema, 'body'),
  async (req, res, next) => {
    try {
      const { token, password } = req.body
      await authService.changePassword(token, password)
      res.status(204).send()
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
