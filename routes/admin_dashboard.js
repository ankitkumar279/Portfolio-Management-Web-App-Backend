const express = require('express');
const router = express.Router();

const Project = require('../models/Project');
const Tool = require('../models/Tool');
const Certification = require('../models/Certification');
const Skill = require('../models/Skill');

router.get('/', async (req, res) => {
  try {
    const projectCount = await Project.countDocuments();
    const toolCount = await Tool.countDocuments();
    const certCount = await Certification.countDocuments();
    const skillCount = await Skill.countDocuments();

    res.render('admin_dashboard', {
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

module.exports = router;
