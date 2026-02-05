const express = require('express');
const router = express.Router();
const ContactInfo = require('../models/ContactInfo');

router.get('/', async (req, res) => {
  const info = await ContactInfo.findOne() || {};
  res.render('admin_contact', { info });
});

router.post('/', async (req, res) => {
  const { email, phone, location } = req.body;

  let info = await ContactInfo.findOne();
  if (!info) {
    await ContactInfo.create({ email, phone, location });
  } else {
    await ContactInfo.updateOne({}, { email, phone, location, updatedAt: new Date() });
  }

  res.redirect('/admin/contact');
});

module.exports = router;
