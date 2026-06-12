// src/middleware/auth.js
const { verifyToken } = require('../utils/jwt');
const { sendUnauthorized, sendForbidden } = require('../utils/response');
const { db } = require('../config/database');

const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return sendUnauthorized(res, 'No token provided. Use: Authorization: Bearer <token>');
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    const user = db.users.findById(decoded.id);
    if (!user) {
      return sendUnauthorized(res, 'User no longer exists');
    }

    // Attach user to request (exclude password)
    const { password, ...safeUser } = user;
    req.user = safeUser;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return sendUnauthorized(res, 'Token expired. Please login again.');
    }
    if (err.name === 'JsonWebTokenError') {
      return sendUnauthorized(res, 'Invalid token');
    }
    return sendUnauthorized(res, 'Authentication failed');
  }
};

// Role-based access: authorize('admin') or authorize('admin', 'user')
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) return sendUnauthorized(res);
    if (!roles.includes(req.user.role)) {
      return sendForbidden(res, `Access denied. Required role(s): ${roles.join(', ')}`);
    }
    next();
  };
};

module.exports = { authenticate, authorize };
