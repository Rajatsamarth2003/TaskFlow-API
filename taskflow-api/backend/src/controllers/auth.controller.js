// src/controllers/auth.controller.js
const bcrypt = require('bcryptjs');
const { db } = require('../config/database');
const { generateToken } = require('../utils/jwt');
const { sendSuccess, sendCreated, sendError, sendBadRequest } = require('../utils/response');

// POST /api/v1/auth/register
const register = async (req, res, next) => {
  try {
    const { name, email, password, role = 'user' } = req.body;

    // Check for existing user
    const existing = db.users.findByEmail(email);
    if (existing) {
      return sendBadRequest(res, 'Email already registered');
    }

    // Hash password (salt rounds = 12)
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = db.users.create({ name: name.trim(), email, password: hashedPassword, role });

    // Generate token
    const token = generateToken({ id: user.id, email: user.email, role: user.role });

    const { password: _, ...safeUser } = user;
    return sendCreated(res, { token, user: safeUser }, 'User registered successfully');
  } catch (err) {
    next(err);
  }
};

// POST /api/v1/auth/login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = db.users.findByEmail(email);
    if (!user) {
      return sendError(res, 'Invalid email or password', 401);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return sendError(res, 'Invalid email or password', 401);
    }

    const token = generateToken({ id: user.id, email: user.email, role: user.role });

    const { password: _, ...safeUser } = user;
    return sendSuccess(res, { token, user: safeUser }, 'Login successful');
  } catch (err) {
    next(err);
  }
};

// GET /api/v1/auth/me
const getMe = async (req, res, next) => {
  try {
    return sendSuccess(res, { user: req.user }, 'Profile fetched');
  } catch (err) {
    next(err);
  }
};

// PUT /api/v1/auth/me
const updateMe = async (req, res, next) => {
  try {
    const { name } = req.body;
    const updated = db.users.update(req.user.id, { name: name?.trim() });
    const { password: _, ...safeUser } = updated;
    return sendSuccess(res, { user: safeUser }, 'Profile updated');
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login, getMe, updateMe };
