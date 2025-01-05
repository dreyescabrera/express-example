const { ValidationError: SequelizeValidationError } = require('sequelize')

function logErrors(err, req, res, next) {
  console.error(err)
  next(err)
}

/** @type {import('express').ErrorRequestHandler} */
function errorHandler(err, _req, res, _next) {
  res.status(500).json({
    message: err.message,
    stack: err.stack
  })
}

/** @type {import('express').ErrorRequestHandler} */
function boomErrorHandler(err, _req, res, next) {
  const isError = err.isBoom
  if (!isError) return next(err)

  const { output } = err
  res.status(output.statusCode).json(output.payload)
}

/** @type {import('express').ErrorRequestHandler} */
function sequelizeErrorHandler(err, _req, res, next) {
  const isError = err instanceof SequelizeValidationError
  if (!isError) return next(err)

  const messages = err.errors.map(({ message }) => message)
  res.status(400).json({ messages: messages })
}

module.exports = {
  logErrors,
  errorHandler,
  boomErrorHandler,
  sequelizeErrorHandler
}
