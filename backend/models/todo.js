// models/todo.js

// This file defines the Todo model and helper functions for CRUD operations.

const sql = require('../db/index.js');

// this code creates todos table if it doesn't exist
const createTable = async () => {
  await sql`
    CREATE TABLE IF NOT EXISTS todos (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      completed BOOLEAN DEFAULT false,
      priority VARCHAR(20) DEFAULT 'normal',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
};

createTable();

module.exports = {
  // Get all todos
  async getAll() {
    return await sql`SELECT * FROM todos ORDER BY id DESC`;
  },

  // Get a todo by id
  async getById(id) {
    const result = await sql`SELECT * FROM todos WHERE id = ${id}`;
    return result[0];
  },

  // Create a new todo
  async create({ title, description, priority }) {
    const result = await sql`
      INSERT INTO todos (title, description, priority)
      VALUES (${title}, ${description}, ${priority || 'normal'})
      RETURNING *`;
    return result[0];
  },

  // Update a todo
  async update(id, { title, description, completed, priority }) {
    const result = await sql`
      UPDATE todos
      SET title = ${title},
          description = ${description},
          completed = ${completed},
          priority = ${priority}
      WHERE id = ${id}
      RETURNING *`;
    return result[0];
  },

  // Delete a todo
  async remove(id) {
    await sql`DELETE FROM todos WHERE id = ${id}`;
    return { success: true };
  },
};
