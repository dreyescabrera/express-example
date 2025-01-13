const Joi = require('joi')

const email = Joi.string().email()

const passwordRecoverySchema = Joi.object({
  email: email.required()
})

module.exports = {
  passwordRecoverySchema
}
