// src/controllers/admin.controller.js
const { db } = require('../config/database');
const { sendSuccess, sendNotFound } = require('../utils/response');

// GET /api/v1/admin/users  (admin only)
const getAllUsers = async (req, res, next) => {
  try {
    const users = db.users.findAll().map(({ password, ...u }) => u);
    return sendSuccess(res, { users, count: users.length }, 'All users fetched');
  } catch (err) {
    next(err);
  }
};

// GET /api/v1/admin/stats
const getStats = async (req, res, next) => {
  try {
    const users = db.users.findAll();
    const tasks = db.tasks.findAll();

    const stats = {
      totalUsers: users.length,
      adminUsers: users.filter((u) => u.role === 'admin').length,
      regularUsers: users.filter((u) => u.role === 'user').length,
      totalTasks: tasks.length,
      tasksByStatus: {
        todo: tasks.filter((t) => t.status === 'todo').length,
        in_progress: tasks.filter((t) => t.status === 'in_progress').length,
        done: tasks.filter((t) => t.status === 'done').length,
      },
      tasksByPriority: {
        low: tasks.filter((t) => t.priority === 'low').length,
        medium: tasks.filter((t) => t.priority === 'medium').length,
        high: tasks.filter((t) => t.priority === 'high').length,
      },
    };

    return sendSuccess(res, stats, 'Stats fetched');
  } catch (err) {
    next(err);
  }
};

// DELETE /api/v1/admin/users/:id
const deleteUser = async (req, res, next) => {
  try {
    const user = db.users.findById(req.params.id);
    if (!user) return sendNotFound(res, 'User not found');

    if (user.id === req.user.id) {
      return res.status(400).json({ success: false, message: 'Cannot delete your own account' });
    }

    db.users.delete(req.params.id);
    return sendSuccess(res, null, 'User deleted');
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllUsers, getStats, deleteUser };
