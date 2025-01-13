const express = require('express')
const PassportHelper = require('../helpers/passport.helper')
const OrderService = require('./../services/order.service.js')

const orderService = new OrderService()

const router = express.Router()

router.use(PassportHelper.authenticate('jwt'))

router.get('/my-orders', async (req, res, next) => {
  try {
    const userId = req.user.sub
    const profileOrders = await orderService.findByUserId(userId)
    res.json(profileOrders)
  } catch (error) {
    next(error)
  }
})

module.exports = router
