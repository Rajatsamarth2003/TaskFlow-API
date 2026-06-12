// src/controllers/task.controller.js
const { db } = require('../config/database');
const { sendSuccess, sendCreated, sendNotFound, sendForbidden, sendBadRequest } = require('../utils/response');

// GET /api/v1/tasks  (user: own tasks | admin: all tasks)
const getAllTasks = async (req, res, next) => {
  try {
    const { status, priority } = req.query;
    const filters = {};

    // Non-admins can only see their own tasks
    if (req.user.role !== 'admin') {
      filters.userId = req.user.id;
    }

    if (status) filters.status = status;
    if (priority) filters.priority = priority;

    const tasks = db.tasks.findAll(filters);

    return sendSuccess(res, {
      tasks,
      count: tasks.length,
      filters: { status, priority },
    }, 'Tasks fetched');
  } catch (err) {
    next(err);
  }
};

// GET /api/v1/tasks/:id
const getTaskById = async (req, res, next) => {
  try {
    const task = db.tasks.findById(req.params.id);
    if (!task) return sendNotFound(res, 'Task not found');

    // Non-admin can only access their own tasks
    if (req.user.role !== 'admin' && task.userId !== req.user.id) {
      return sendForbidden(res, 'Not authorized to access this task');
    }

    return sendSuccess(res, { task });
  } catch (err) {
    next(err);
  }
};

// POST /api/v1/tasks
const createTask = async (req, res, next) => {
  try {
    const { title, description = '', status = 'todo', priority = 'medium', dueDate = null } = req.body;

    const task = db.tasks.create({
      title: title.trim(),
      description: description.trim(),
      status,
      priority,
      dueDate,
      userId: req.user.id,
      userName: req.user.name,
    });

    return sendCreated(res, { task }, 'Task created successfully');
  } catch (err) {
    next(err);
  }
};

// PUT /api/v1/tasks/:id
const updateTask = async (req, res, next) => {
  try {
    const task = db.tasks.findById(req.params.id);
    if (!task) return sendNotFound(res, 'Task not found');

    if (req.user.role !== 'admin' && task.userId !== req.user.id) {
      return sendForbidden(res, 'Not authorized to update this task');
    }

    const { title, description, status, priority, dueDate } = req.body;
    const updateData = {};
    if (title !== undefined) updateData.title = title.trim();
    if (description !== undefined) updateData.description = description.trim();
    if (status !== undefined) updateData.status = status;
    if (priority !== undefined) updateData.priority = priority;
    if (dueDate !== undefined) updateData.dueDate = dueDate;

    const updated = db.tasks.update(req.params.id, updateData);
    return sendSuccess(res, { task: updated }, 'Task updated successfully');
  } catch (err) {
    next(err);
  }
};

// DELETE /api/v1/tasks/:id
const deleteTask = async (req, res, next) => {
  try {
    const task = db.tasks.findById(req.params.id);
    if (!task) return sendNotFound(res, 'Task not found');

    if (req.user.role !== 'admin' && task.userId !== req.user.id) {
      return sendForbidden(res, 'Not authorized to delete this task');
    }

    db.tasks.delete(req.params.id);
    return sendSuccess(res, null, 'Task deleted successfully');
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllTasks, getTaskById, createTask, updateTask, deleteTask };
