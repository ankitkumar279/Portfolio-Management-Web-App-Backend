const express = require('express');
const router = express.Router();

const Project = require('../models/Project');
const Skill = require('../models/Skill');
const Tool = require('../models/Tool');               // ✅ FIX ADDED
const Certification = require('../models/Certification'); // ✅ FIX ADDED

// ----------------------
// ADMIN DASHBOARD
// ----------------------
router.get('/', async (req, res) => {
  try {
    const projectCount = await Project.countDocuments();
    const toolCount = await Tool.countDocuments();                // now works
    const certCount = await Certification.countDocuments();       // now works
    const skillCount = await Skill.countDocuments();

    res.render('admin_home', {
      projectCount,
      toolCount,
      certCount,
      skillCount
    });
  } catch (err) {
    console.error("Dashboard error:", err);
    res.send("Error loading dashboard");
  }
});

// ----------------------
// PROJECT ROUTES
// ----------------------
router.get('/projects', async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  res.render('admin_projects', { projects });
});

router.get('/projects/new', (req, res) => {
  res.render('form_project', { project: {} });
});

router.get('/projects/:id/edit', async (req, res) => {
  const project = await Project.findById(req.params.id);
  res.render('form_project', { project });
});

router.post('/projects', async (req, res) => {
  try {
    const { title, description, link, image, liveDemo, github } = req.body;

    await Project.create({
      title,
      description,
      link,
      image,
      liveDemo: liveDemo || '',
      github: github || ''
    });

    res.redirect('/admin/projects');
  } catch (err) {
    console.error('Error creating project:', err);
    res.status(500).send('Server error while creating project');
  }
});

router.put('/projects/:id', async (req, res) => {
  try {
    const { title, description, link, image, liveDemo, github } = req.body;

    await Project.findByIdAndUpdate(
      req.params.id,
      { title, description, link, image, liveDemo, github },
      { new: true, runValidators: true }
    );

    res.redirect('/admin/projects');
  } catch (err) {
    console.error('Error updating project:', err);
    res.status(500).send('Server error while updating project');
  }
});

router.delete('/projects/:id', async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.redirect('/admin/projects');
  } catch (err) {
    console.error('Error deleting project:', err);
    res.status(500).send('Server error while deleting project');
  }
});

// ----------------------
// SKILL ROUTES
// ----------------------
router.get('/skills', async (req, res) => {
  const skills = await Skill.find().sort({ createdAt: -1 });
  res.render('admin_skills', { skills });
});

router.get('/skills/new', (req, res) => {
  res.render('form_skill', { skill: {} });
});

router.get('/skills/:id/edit', async (req, res) => {
  const skill = await Skill.findById(req.params.id);
  res.render('form_skill', { skill });
});

router.post('/skills', async (req, res) => {
  try {
    const { name, level } = req.body;
    await Skill.create({ name, level });
    res.redirect('/admin/skills');
  } catch (err) {
    console.error('Error creating skill:', err);
    res.status(500).send('Server error while creating skill');
  }
});

router.put('/skills/:id', async (req, res) => {
  try {
    const { name, level } = req.body;

    await Skill.findByIdAndUpdate(
      req.params.id,
      { name, level },
      { new: true, runValidators: true }
    );

    res.redirect('/admin/skills');
  } catch (err) {
    console.error('Error updating skill:', err);
    res.status(500).send('Server error while updating skill');
  }
});

module.exports = router;
