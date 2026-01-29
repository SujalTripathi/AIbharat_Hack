const mongoose = require('mongoose');

const interviewResultSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job'
  },
  jobRole: {
    type: String,
    required: true
  },
  questions: [{
    question: String,
    answer: String,
    score: Number,
    feedback: String
  }],
  overallScore: {
    type: Number,
    min: 0,
    max: 100
  },
  feedback: {
    type: String
  },
  strengths: [String],
  improvements: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('InterviewResult', interviewResultSchema);
