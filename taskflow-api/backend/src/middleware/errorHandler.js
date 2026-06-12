// src/middleware/errorHandler.js
const { sendError } = require('../utils/response');

const errorHandler = (err, req, res, next) => {
  console.error(`[ERROR] ${req.method} ${req.path}:`, err.message);

  // Handle specific error types
  if (err.name === 'ValidationError') {
    return sendError(res, err.message, 400);
  }

  if (err.name === 'UnauthorizedError') {
    return sendError(res, 'Unauthorized', 401);
  }

  // Default server error
  const statusCode = err.statusCode || 500;
  const message = process.env.NODE_ENV === 'production'
    ? 'Internal server error'
    : err.message;

  return sendError(res, message, statusCode);
};

const notFoundHandler = (req, res) => {
  return sendError(res, `Route not found: ${req.method} ${req.path}`, 404);
};

module.exports = { errorHandler, notFoundHandler };
