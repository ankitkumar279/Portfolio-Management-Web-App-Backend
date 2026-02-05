const mongoose = require('mongoose');

const CertificationSchema = new mongoose.Schema({
  title: String,
  year: String,
  provider: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Certification', CertificationSchema);
