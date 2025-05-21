const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

const todoRoutes = require('./routes/todoRoutes');
app.use('/api/todos', todoRoutes);

app.get('/', (req, res) => {
  res.send('Todo Summary Assistant backend is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});