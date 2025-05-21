
const Todo = require('../models/todo');
const aiService = require('../services/aiService');
const slackService = require('../services/slackService');

module.exports = {
  async getAll(req, res) {
    try {
      const todos = await Todo.getAll();
      res.json(todos);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch todos' });
    }
  },

  async getById(req, res) {
    try {
      const todo = await Todo.getById(req.params.id);
      if (!todo) return res.status(404).json({ error: 'Todo not found' });
      res.json(todo);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch todo' });
    }
  },

  async create(req, res) {
    try {
      const todo = await Todo.create(req.body);
      res.status(201).json(todo);
    } catch (err) {
      res.status(500).json({ error: 'Failed to create todo' });
    }
  },

  async update(req, res) {
    try {
      const todo = await Todo.update(req.params.id, req.body);
      if (!todo) return res.status(404).json({ error: 'Todo not found' });
      res.json(todo);
    } catch (err) {
      res.status(500).json({ error: 'Failed to update todo' });
    }
  },

  async remove(req, res) {
    try {
      await Todo.remove(req.params.id);
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete todo' });
    }
  },

  // Generate summary and send to Slack
  async sendSummaryToSlack(req, res) {
    try {
      const todos = await Todo.getAll();
      const summary = await aiService.generateTodoSummary(todos);
      await slackService.sendToSlack(summary);
      res.json({ success: true, summary });
    } catch (err) {
      res.status(500).json({ error: 'Failed to generate/send summary', details: err.message });
    }
  },
};
