const Joi = require('joi')

const id = Joi.number().integer()
const name = Joi.string().min(3).max(15)
const phone = Joi.string().min(9)
const userId = Joi.number().integer()

const createCustomerSchema = Joi.object({
  firstName: name.required(),
  lastName: name.required(),
  phone: phone.required(),
  userId: userId.required()
})

const updateCustomerSchema = Joi.object({
  firstName: name,
  lastName: name,
  phone: phone,
  userId: userId
})

const getCustomerSchema = Joi.object({
  id: id.required()
})

module.exports = {
  createCustomerSchema,
  updateCustomerSchema,
  getCustomerSchema
}
