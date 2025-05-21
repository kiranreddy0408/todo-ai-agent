
const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const { improveWriting } = require('../services/aiService');

router.get('/', todoController.getAll);
router.get('/:id', todoController.getById);
router.post('/', todoController.create);
router.put('/:id', todoController.update);
router.delete('/:id', todoController.remove);
router.post('/send-summary', todoController.sendSummaryToSlack);

// Improve Writing API
router.post('/improve-writing', async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required.' });
  }

  try {
    const improved = await improveWriting(title, description);
    res.json(improved);
  } catch (error) {
    console.error('Error improving writing:', error);
    res.status(500).json({ error: 'Failed to improve writing.' });
  }
});

module.exports = router;
