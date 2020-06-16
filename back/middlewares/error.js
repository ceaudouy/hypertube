/* eslint-disable no-unused-vars */
import { ValidationError } from 'sequelize'

const formatErrors = errors => {
  const formated = []
  errors.map(error => {
    formated.push(error.message)
  })
  return formated
}

class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super()
    this.statusCode = statusCode
    this.message = message
  }
}

const handleError = (err, req, res, next) => {
  if (err instanceof ErrorHandler) {
    console.error(err.message)
    const { statusCode, message } = err
    res.status(statusCode).json({
      status: 'error',
      statusCode,
      message,
    })
  } else if (err instanceof ValidationError) {
    res.status(400).json({
      status: 'error',
      statusCode: 400,
      message: formatErrors(err.errors),
    })
  } else {
    console.error(err)
    res.status(500).json({
      status: 'error',
      statusCode: 500,
      message: 'Internal server error',
    })
  }
}

export { ErrorHandler, handleError }
