const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  resume: {
    type: String, // File path or URL
  },
  resumeText: {
    type: String, // Extracted text from PDF
  },
  resumeData: {
    type: Object, // Structured data from resume
    skills: [String],
    experience: [String],
    education: [String]
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('User', userSchema);
