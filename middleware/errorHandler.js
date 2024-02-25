import { StatusCodes } from "http-status-codes"

export default (err, req, res, next) => {
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message || 'Internal server Error!!!';
  res.status(statusCode).json({
    error: message
  })
}
