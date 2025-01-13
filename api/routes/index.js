const express = require('express')
const productsRouter = require('./products.router.js')
const categoriesRouter = require('./categories.router.js')
const authRouter = require('./auth.router.js')
const usersRouter = require('./users.router.js')
const orderRouter = require('./orders.router.js')
const customersRouter = require('./customers.router.js')
const profileRouter = require('./profile.router.js')

function routerApi(app) {
  const router = express.Router()
  app.use('/api/v1', router)
  router.use('/products', productsRouter)
  router.use('/categories', categoriesRouter)
  router.use('/users', usersRouter)
  router.use('/orders', orderRouter)
  router.use('/customers', customersRouter)
  router.use('/auth', authRouter)
  router.use('/profile', profileRouter)
}

module.exports = routerApi
