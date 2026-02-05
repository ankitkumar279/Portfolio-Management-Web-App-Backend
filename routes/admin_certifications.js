const express = require('express');
const router = express.Router();
const Certification = require('../models/Certification');

// List
router.get('/', async (req, res) => {
  const certs = await Certification.find().sort({ createdAt: -1 });
  res.render('admin_certifications', { certs });
});

// New form
router.get('/new', (req, res) => {
  res.render('form_certification', { cert: {} });
});

// Create
router.post('/', async (req, res) => {
  const { title, year, provider } = req.body;
  await Certification.create({ title, year, provider });
  res.redirect('/admin/certifications');
});

// Edit
router.get('/:id/edit', async (req, res) => {
  const cert = await Certification.findById(req.params.id);
  res.render('form_certification', { cert });
});

// Update
router.put('/:id', async (req, res) => {
  const { title, year, provider } = req.body;
  await Certification.findByIdAndUpdate(req.params.id, { title, year, provider });
  res.redirect('/admin/certifications');
});

// Delete
router.delete('/:id', async (req, res) => {
  await Certification.findByIdAndDelete(req.params.id);
  res.redirect('/admin/certifications');
});

module.exports = router;
