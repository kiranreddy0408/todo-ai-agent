const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const todoRoutes = require('./routes/todoRoutes'); // adjust path as needed
app.use('/api/todos', todoRoutes);

app.get('/', (req, res) => {
  res.send('Todo Summary Assistant backend is running!');
});

module.exports = serverless(app);