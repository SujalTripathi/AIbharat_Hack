const express = require('express');
const router = express.Router();
const upload = require('../config/upload');
const pdfService = require('../services/pdfService');
const aiService = require('../services/aiService');
const User = require('../models/User');
const ResumeAnalysis = require('../models/ResumeAnalysis');

// Upload and parse resume
router.post('/upload', upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    console.log('File uploaded:', req.file.filename);
    console.log('File path:', req.file.path);
    console.log('Email:', req.body.email);

    // Extract text and parse resume (with error handling)
    let resumeData;
    try {
      resumeData = await pdfService.parseResume(req.file.path);
      console.log('PDF parsed successfully, extracted', resumeData.skills.length, 'skills');
    } catch (parseError) {
      console.error('PDF parsing error:', parseError);
      // Use fallback data if parsing fails
      resumeData = {
        text: '',
        skills: [],
        email: req.body.email || null,
        phone: null
      };
      console.log('Using fallback resume data');
    }

    // Create or update user
    let user = await User.findOne({ email: req.body.email || resumeData.email });
    
    if (!user) {
      user = new User({
        email: req.body.email || resumeData.email || `user_${Date.now()}@temp.com`,
        resume: req.file.path,
        resumeText: resumeData.text || '',
        resumeData: {
          skills: resumeData.skills || [],
          experience: [],
          education: []
        }
      });
      console.log('Created new user with ID:', user._id);
    } else {
      user.resume = req.file.path;
      user.resumeText = resumeData.text || '';
      user.resumeData = {
        skills: resumeData.skills || [],
        experience: [],
        education: []
      };
      console.log('Updated existing user:', user._id);
    }

    await user.save();

    res.json({
      success: true,
      message: 'Resume uploaded successfully',
      data: {
        userId: user._id,
        skills: resumeData.skills,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Analyze resume for ATS score
router.post('/analyze', async (req, res) => {
  try {
    const { userId } = req.body;

    console.log('📊 Starting resume analysis for user:', userId);

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required'
      });
    }

    const user = await User.findById(userId);
    
    if (!user || !user.resumeText) {
      console.log('❌ User not found or no resume text');
      return res.status(404).json({
        success: false,
        message: 'Resume not found. Please upload a resume first.'
      });
    }

    console.log('✅ User found, analyzing resume...');
    console.log('Resume text length:', user.resumeText.length);

    // Analyze with AI
    const analysis = await aiService.analyzeResume(user.resumeText);
    
    console.log('✅ Analysis completed, saving to database...');

    // Save analysis
    const resumeAnalysis = new ResumeAnalysis({
      userId: user._id,
      resumeText: user.resumeText,
      atsScore: analysis.atsScore,
      strengths: analysis.strengths,
      weaknesses: analysis.weaknesses,
      missingKeywords: analysis.missingKeywords,
      formattingIssues: analysis.formattingIssues,
      suggestions: analysis.suggestions
    });

    await resumeAnalysis.save();
    console.log('✅ Analysis saved successfully');

    res.json({
      success: true,
      message: 'Resume analyzed successfully',
      data: analysis
    });
  } catch (error) {
    console.error('❌ Analysis error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to analyze resume'
    });
  }
});

// Get user's resume history
router.get('/history/:userId', async (req, res) => {
  try {
    const analyses = await ResumeAnalysis.find({ userId: req.params.userId })
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({
      success: true,
      data: analyses
    });
  } catch (error) {
    console.error('Get history error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
