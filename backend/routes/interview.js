const express = require('express');
const router = express.Router();
const aiService = require('../services/aiService');
const InterviewResult = require('../models/InterviewResult');

// Generate interview questions
router.post('/questions', async (req, res) => {
  try {
    const { jobRole, experienceLevel = 'entry', count = 5 } = req.body;

    if (!jobRole) {
      return res.status(400).json({
        success: false,
        message: 'Job role is required'
      });
    }

    const questions = await aiService.generateInterviewQuestions(
      jobRole,
      experienceLevel,
      count
    );

    res.json({
      success: true,
      data: {
        jobRole,
        questions
      }
    });
  } catch (error) {
    console.error('Generate questions error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Evaluate interview answer
router.post('/evaluate', async (req, res) => {
  try {
    const { question, answer, jobRole } = req.body;

    if (!question || !answer || !jobRole) {
      return res.status(400).json({
        success: false,
        message: 'Question, answer, and job role are required'
      });
    }

    const evaluation = await aiService.evaluateAnswer(question, answer, jobRole);

    res.json({
      success: true,
      data: evaluation
    });
  } catch (error) {
    console.error('Evaluate answer error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Save interview session
router.post('/save', async (req, res) => {
  try {
    const { userId, jobRole, questions, jobId } = req.body;

    if (!userId || !jobRole || !questions) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Calculate overall score
    const scores = questions.map(q => q.score || 0);
    const overallScore = scores.reduce((a, b) => a + b, 0) / scores.length * 10;

    // Extract strengths and improvements
    const strengths = [];
    const improvements = [];
    
    questions.forEach(q => {
      if (q.feedback) {
        if (q.score >= 7) {
          strengths.push(`Strong answer for: ${q.question.substring(0, 50)}...`);
        } else {
          improvements.push(`Improve: ${q.question.substring(0, 50)}...`);
        }
      }
    });

    const interviewResult = new InterviewResult({
      userId,
      jobId,
      jobRole,
      questions,
      overallScore: Math.round(overallScore),
      strengths,
      improvements,
      feedback: `Overall performance: ${overallScore >= 70 ? 'Good' : 'Needs improvement'}`
    });

    await interviewResult.save();

    res.json({
      success: true,
      data: {
        resultId: interviewResult._id,
        overallScore: interviewResult.overallScore,
        strengths,
        improvements
      }
    });
  } catch (error) {
    console.error('Save interview error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get interview history
router.get('/history/:userId', async (req, res) => {
  try {
    const results = await InterviewResult.find({ userId: req.params.userId })
      .populate('jobId')
      .sort({ createdAt: -1 })
      .limit(20);

    res.json({
      success: true,
      data: results
    });
  } catch (error) {
    console.error('History error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
