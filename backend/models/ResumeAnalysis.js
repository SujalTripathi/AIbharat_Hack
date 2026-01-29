const mongoose = require('mongoose');

const resumeAnalysisSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  atsScore: {
    type: Number,
    min: 0,
    max: 100,
    required: true
  },
  analysis: {
    keywordMatches: [String],
    missingKeywords: [String],
    formatting: {
      score: Number,
      issues: [String]
    },
    content: {
      score: Number,
      strengths: [String],
      weaknesses: [String]
    }
  },
  suggestions: [{
    type: String
  }],
  improvedSections: {
    type: Object
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ResumeAnalysis', resumeAnalysisSchema);
