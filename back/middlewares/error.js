class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super()
    this.statusCode = statusCode
    this.message = message
  }
}

const handleError = (err, req, res) => {
  if (err instanceof ErrorHandler) {
    console.error(err.message)
    const { statusCode, message } = err
    res.status(statusCode).json({
      status: 'error',
      statusCode,
      message,
    })
  } else {
    console.error(err)
    res.status(500).json({ status: 'error', message: 'Internal server error' })
  }
}

export { ErrorHandler, handleError }
