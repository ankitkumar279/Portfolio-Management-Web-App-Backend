const express = require('express');
const router = express.Router();
const Social = require('../models/Social');

// GET admin social page
router.get('/', async (req, res) => {
  try {
    let social = await Social.findOne();
    if (!social) {
      social = await Social.create({ github: '', linkedin: '', instagram: '' });
    }
    res.render('admin_social', { social });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// POST social links update
router.post('/', async (req, res) => {
  try {
    const { github, linkedin, instagram } = req.body;

    // Update existing social or create if it doesn't exist
    await Social.findOneAndUpdate(
      {}, 
      { github, linkedin, instagram }, 
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.redirect('/admin/social');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
