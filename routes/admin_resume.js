const express = require('express');
const router = express.Router();
const Resume = require('../models/Resume');
const multer = require('multer');
const path = require('path');

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, 'resume.pdf'); // overwrite every time
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF allowed'));
    }
  }
});

// Admin Resume Page
router.get('/', async (req, res) => {
  const resume = await Resume.findOne();
  res.render('admin_resume', { resume });
});

// Upload / Replace Resume
router.post('/', upload.single('resume'), async (req, res) => {
  const filePath = '/uploads/resume.pdf';

  const existing = await Resume.findOne();
  if (existing) {
    existing.file = filePath;
    await existing.save();
  } else {
    await Resume.create({ file: filePath });
  }

  res.redirect('/admin/resume');
});

module.exports = router;
