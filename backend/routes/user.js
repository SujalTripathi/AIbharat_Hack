const express = require('express');
const router = express.Router();
const User = require('../models/User');
const ResumeAnalysis = require('../models/ResumeAnalysis');
const InterviewResult = require('../models/InterviewResult');
const SkillGap = require('../models/SkillGap');

// Get user profile
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: {
        id: user._id,
        email: user.email,
        skills: user.resumeData?.skills || [],
        hasResume: !!user.resumeText,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get user's complete history
router.get('/:userId/history', async (req, res) => {
  try {
    const userId = req.params.userId;

    const [user, resumeAnalyses, interviews, skillGaps] = await Promise.all([
      User.findById(userId),
      ResumeAnalysis.find({ userId }).sort({ createdAt: -1 }).limit(5),
      InterviewResult.find({ userId }).populate('jobId').sort({ createdAt: -1 }).limit(10),
      SkillGap.find({ userId }).populate('jobId').sort({ createdAt: -1 }).limit(10)
    ]);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: {
        user: {
          id: user._id,
          email: user.email,
          skills: user.resumeData?.skills || []
        },
        resumeAnalyses,
        interviews,
        skillGaps,
        stats: {
          totalInterviews: interviews.length,
          averageInterviewScore: interviews.length > 0
            ? Math.round(interviews.reduce((sum, i) => sum + i.overallScore, 0) / interviews.length)
            : 0,
          latestAtsScore: resumeAnalyses.length > 0 ? resumeAnalyses[0].atsScore : null
        }
      }
    });
  } catch (error) {
    console.error('Get history error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Create or get user by email
router.post('/create', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ email });
      await user.save();
    }

    res.json({
      success: true,
      data: {
        userId: user._id,
        email: user.email,
        isNew: !user.resumeText
      }
    });
  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
