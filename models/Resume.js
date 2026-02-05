const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema(
  {
    file: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Resume', resumeSchema, 'resume');
