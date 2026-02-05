const mongoose = require('mongoose');

const SocialSchema = new mongoose.Schema({
  github: { type: String, default: '' },
  linkedin: { type: String, default: '' },
  instagram: { type: String, default: '' }
});

module.exports = mongoose.model('Social', SocialSchema);
