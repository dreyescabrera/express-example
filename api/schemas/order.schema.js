const Joi = require('joi')

const id = Joi.number().integer()
const amount = Joi.number().integer()

const getOrderSchema = Joi.object({
  id: id.required()
})

const addItemSchema = Joi.object({
  orderId: id.required(),
  productId: id.required(),
  amount: amount.required()
})

module.exports = {
  getOrderSchema,
  addItemSchema
}
