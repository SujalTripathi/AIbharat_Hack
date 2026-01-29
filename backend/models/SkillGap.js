const mongoose = require('mongoose');

const skillGapSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  currentSkills: [String],
  requiredSkills: [String],
  missingSkills: [String],
  matchPercentage: {
    type: Number,
    min: 0,
    max: 100
  },
  recommendations: [{
    skill: String,
    resources: [String],
    estimatedTime: String,
    priority: {
      type: String,
      enum: ['High', 'Medium', 'Low']
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('SkillGap', skillGapSchema);
