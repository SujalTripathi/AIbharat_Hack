const express = require('express');
const router = express.Router();
const SkillGap = require('../models/SkillGap');
const User = require('../models/User');
const Job = require('../models/Job');
const aiService = require('../services/aiService');

// Analyze skill gap
router.post('/analyze', async (req, res) => {
  try {
    const { userId, jobId } = req.body;

    if (!userId || !jobId) {
      return res.status(400).json({
        success: false,
        message: 'User ID and Job ID are required'
      });
    }

    const user = await User.findById(userId);
    const job = await Job.findById(jobId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    const currentSkills = user.resumeData?.skills || [];
    
    // Analyze skill gap using AI
    const gapAnalysis = await aiService.analyzeSkillGap(
      currentSkills,
      job.description
    );

    // Calculate match percentage
    const requiredSkills = job.skills;
    const matchingSkills = currentSkills.filter(skill => 
      requiredSkills.some(req => req.toLowerCase() === skill.toLowerCase())
    );
    
    const matchPercentage = requiredSkills.length > 0
      ? Math.round((matchingSkills.length / requiredSkills.length) * 100)
      : 0;

    // Save skill gap analysis
    const skillGap = new SkillGap({
      userId,
      jobId,
      currentSkills,
      requiredSkills,
      missingSkills: gapAnalysis.missingSkills,
      matchPercentage: gapAnalysis.matchPercentage || matchPercentage,
      recommendations: gapAnalysis.recommendations
    });

    await skillGap.save();

    res.json({
      success: true,
      data: {
        currentSkills,
        requiredSkills,
        missingSkills: gapAnalysis.missingSkills,
        matchPercentage: skillGap.matchPercentage,
        recommendations: gapAnalysis.recommendations
      }
    });
  } catch (error) {
    console.error('Skill gap analysis error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get skill gap history for user
router.get('/history/:userId', async (req, res) => {
  try {
    const skillGaps = await SkillGap.find({ userId: req.params.userId })
      .populate('jobId')
      .sort({ createdAt: -1 })
      .limit(20);

    res.json({
      success: true,
      data: skillGaps
    });
  } catch (error) {
    console.error('History error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get skill gap for specific job
router.get('/:userId/:jobId', async (req, res) => {
  try {
    const skillGap = await SkillGap.findOne({
      userId: req.params.userId,
      jobId: req.params.jobId
    }).populate('jobId');

    if (!skillGap) {
      return res.status(404).json({
        success: false,
        message: 'Skill gap analysis not found'
      });
    }

    res.json({
      success: true,
      data: skillGap
    });
  } catch (error) {
    console.error('Get skill gap error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
