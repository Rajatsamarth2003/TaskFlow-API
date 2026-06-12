// src/config/database.js
// In-memory store for demo (replace with real PostgreSQL in production)
// To use PostgreSQL: npm install pg and update config below

const { v4: uuidv4 } = require('uuid');

// ============================================================
// IN-MEMORY DATABASE (Demo Mode - works without PostgreSQL)
// ============================================================
const store = {
  users: [],
  tasks: [],
};

const db = {
  // User operations
  users: {
    findAll: () => store.users,
    findById: (id) => store.users.find((u) => u.id === id),
    findByEmail: (email) => store.users.find((u) => u.email === email.toLowerCase()),
    create: (data) => {
      const user = { id: uuidv4(), ...data, email: data.email.toLowerCase(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
      store.users.push(user);
      return user;
    },
    update: (id, data) => {
      const idx = store.users.findIndex((u) => u.id === id);
      if (idx === -1) return null;
      store.users[idx] = { ...store.users[idx], ...data, updatedAt: new Date().toISOString() };
      return store.users[idx];
    },
    delete: (id) => {
      const idx = store.users.findIndex((u) => u.id === id);
      if (idx === -1) return false;
      store.users.splice(idx, 1);
      return true;
    },
    count: () => store.users.length,
  },

  // Task operations
  tasks: {
    findAll: (filters = {}) => {
      let tasks = store.tasks;
      if (filters.userId) tasks = tasks.filter((t) => t.userId === filters.userId);
      if (filters.status) tasks = tasks.filter((t) => t.status === filters.status);
      if (filters.priority) tasks = tasks.filter((t) => t.priority === filters.priority);
      return tasks;
    },
    findById: (id) => store.tasks.find((t) => t.id === id),
    findByIdAndUser: (id, userId) => store.tasks.find((t) => t.id === id && t.userId === userId),
    create: (data) => {
      const task = { id: uuidv4(), ...data, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
      store.tasks.push(task);
      return task;
    },
    update: (id, data) => {
      const idx = store.tasks.findIndex((t) => t.id === id);
      if (idx === -1) return null;
      store.tasks[idx] = { ...store.tasks[idx], ...data, updatedAt: new Date().toISOString() };
      return store.tasks[idx];
    },
    delete: (id) => {
      const idx = store.tasks.findIndex((t) => t.id === id);
      if (idx === -1) return false;
      store.tasks.splice(idx, 1);
      return true;
    },
    count: () => store.tasks.length,
    countByUser: (userId) => store.tasks.filter((t) => t.userId === userId).length,
  },
};

// ============================================================
// POSTGRESQL CONFIG (Uncomment to use real DB)
// ============================================================
/*
const { Pool } = require('pg');
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

const connectDB = async () => {
  try {
    await pool.query('SELECT NOW()');
    console.log('✅ PostgreSQL connected');
  } catch (err) {
    console.error('❌ DB connection failed:', err.message);
    process.exit(1);
  }
};
*/

const connectDB = async () => {
  console.log('✅ In-memory database initialized (demo mode)');
  console.log('   → For production, configure PostgreSQL in .env and uncomment pg code');
};

module.exports = { db, connectDB };
