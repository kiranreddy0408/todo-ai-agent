// models/todo.js

// This file defines the Todo model and helper functions for CRUD operations.

const db = require('../db');

// this code creates todos table if it doesn't exist
const createTable = async () => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS todos (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      completed BOOLEAN DEFAULT false,
      priority VARCHAR(20) DEFAULT 'normal',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
};


createTable();

module.exports = {
  // Get all todos
  async getAll() {
    const res = await db.query('SELECT * FROM todos ORDER BY id DESC');
    return res.rows;
  },

  // Get a todo by id
  async getById(id) {
    const res = await db.query('SELECT * FROM todos WHERE id = $1', [id]);
    return res.rows[0];
  },

  // Create a new todo
  async create({ title, description, priority }) {
    const res = await db.query(
      'INSERT INTO todos (title, description, priority) VALUES ($1, $2, $3) RETURNING *',
      [title, description, priority || 'normal']
    );
    return res.rows[0];
  },

  // Update a todo
  async update(id, { title, description, completed, priority }) {
    const res = await db.query(
      'UPDATE todos SET title = $1, description = $2, completed = $3, priority = $4 WHERE id = $5 RETURNING *',
      [title, description, completed, priority, id]
    );
    return res.rows[0];
  },

  // Delete a todo
  async remove(id) {
    await db.query('DELETE FROM todos WHERE id = $1', [id]);
    return { success: true };
  },
};
