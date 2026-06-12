// src/utils/response.js

const sendSuccess = (res, data = null, message = 'Success', statusCode = 200) => {
  const response = { success: true, message };
  if (data !== null) response.data = data;
  return res.status(statusCode).json(response);
};

const sendError = (res, message = 'Something went wrong', statusCode = 500, errors = null) => {
  const response = { success: false, message };
  if (errors) response.errors = errors;
  return res.status(statusCode).json(response);
};

const sendCreated = (res, data, message = 'Resource created successfully') =>
  sendSuccess(res, data, message, 201);

const sendNotFound = (res, message = 'Resource not found') =>
  sendError(res, message, 404);

const sendUnauthorized = (res, message = 'Unauthorized') =>
  sendError(res, message, 401);

const sendForbidden = (res, message = 'Access denied') =>
  sendError(res, message, 403);

const sendBadRequest = (res, message = 'Bad request', errors = null) =>
  sendError(res, message, 400, errors);

module.exports = { sendSuccess, sendError, sendCreated, sendNotFound, sendUnauthorized, sendForbidden, sendBadRequest };
