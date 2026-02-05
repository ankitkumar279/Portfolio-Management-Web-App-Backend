const express = require('express');
const router = express.Router();
const Tool = require('../models/Tool');

// List
router.get('/', async (req, res) => {
  const tools = await Tool.find().sort({ createdAt: -1 });
  res.render('admin_tools', { tools });
});

// New
router.get('/new', (req, res) => {
  res.render('form_tool', { tool: {} });
});

// Create
router.post('/', async (req, res) => {
  await Tool.create({ name: req.body.name });
  res.redirect('/admin/tools');
});

// Edit page
router.get('/:id/edit', async (req, res) => {
  const tool = await Tool.findById(req.params.id);
  res.render('form_tool', { tool });
});

// Update
router.put('/:id', async (req, res) => {
  await Tool.findByIdAndUpdate(req.params.id, { name: req.body.name });
  res.redirect('/admin/tools');
});

// Delete
router.delete('/:id', async (req, res) => {
  await Tool.findByIdAndDelete(req.params.id);
  res.redirect('/admin/tools');
});

module.exports = router;
