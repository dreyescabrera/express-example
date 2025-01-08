const express = require('express')
const {
  createOrderSchema,
  getOrderSchema,
  addItemSchema
} = require('./../schemas/order.schema.js')
const OrderService = require('./../services/order.service.js')
const { validatorHandler } = require('./../middlewares/validator.handler.js')

const router = express.Router()
const service = new OrderService()

router.get(
  '/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const order = await service.findOne(id)
      res.json(order)
    } catch (error) {
      next(error)
    }
  }
)

router.post(
  '/',
  validatorHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body
      const newOrder = await service.create(body)
      res.status(201).json(newOrder)
    } catch (error) {
      next(error)
    }
  }
)

router.post(
  '/add-item',
  validatorHandler(addItemSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body
      const order = await service.addItem(body)
      res.json(order)
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
