const mongoose = require('mongoose');

const ContactInfoSchema = new mongoose.Schema({
  email: String,
  phone: String,
  location: String,
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ContactInfo', ContactInfoSchema);
