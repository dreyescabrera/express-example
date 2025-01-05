const express = require('express')
const productsRouter = require('./products.router.js')
const categoriesRouter = require('./categories.router.js')
const usersRouter = require('./users.router.js')
const orderRouter = require('./orders.router.js')
const customersRouter = require('./customers.router.js')

function routerApi(app) {
  const router = express.Router()
  app.use('/api/v1', router)
  router.use('/products', productsRouter)
  router.use('/categories', categoriesRouter)
  router.use('/users', usersRouter)
  router.use('/orders', orderRouter)
  router.use('/customers', customersRouter)
}

module.exports = routerApi
