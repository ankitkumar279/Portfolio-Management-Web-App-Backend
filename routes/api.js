const express = require('express');
const router = express.Router();

const Tool = require('../models/Tool');
const Certification = require('../models/Certification');
const ContactInfo = require('../models/ContactInfo');
const Social = require('../models/Social');
const Project = require('../models/Project');
const Skill = require('../models/Skill');
const Resume = require('../models/Resume');

// Tools
router.get('/tools', async (req, res) => {
  try {
    const tools = await Tool.find().sort({ createdAt: -1 });
    res.json(tools);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Certifications
router.get('/certifications', async (req, res) => {
  try {
    const certs = await Certification.find().sort({ createdAt: -1 });
    res.json(certs);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Contact Info
router.get('/contact', async (req, res) => {
  try {
    const contact = await ContactInfo.findOne();
    res.json(contact || {});
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Social Links
router.get('/social', async (req, res) => {
  try {
    const social = await Social.findOne();
    res.json(social || {});
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Projects
router.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Skills
router.get('/skills', async (req, res) => {
  try {
    const skills = await Skill.find().sort({ createdAt: -1 });
    res.json(skills);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});


// Resume
router.get('/resume', async (req, res) => {
  const resume = await Resume.findOne();
  res.json({ resumeUrl: resume?.file || null });
});

module.exports = router;
