const Joi = require('joi')

const email = Joi.string().email()
const token = Joi.string().required()
const password = Joi.string().min(8).required()

const passwordRecoverySchema = Joi.object({
  email: email.required()
})

const passwordChangeSchema = Joi.object({
  token: token.required(),
  password: password.required()
})

module.exports = {
  passwordRecoverySchema,
  passwordChangeSchema
}
