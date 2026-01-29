const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const User = require('../models/User');
const aiService = require('../services/aiService');

// Get all jobs
router.get('/', async (req, res) => {
  try {
    const { type, search } = req.query;
    
    let filter = { isActive: true };
    
    if (type) {
      filter.type = type;
    }
    
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } }
      ];
    }

    const jobs = await Job.find(filter).sort({ postedDate: -1 });

    res.json({
      success: true,
      data: jobs
    });
  } catch (error) {
    console.error('Get jobs error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get job by ID
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    res.json({
      success: true,
      data: job
    });
  } catch (error) {
    console.error('Get job error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get job recommendations for user
router.post('/recommendations', async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required'
      });
    }

    const user = await User.findById(userId);
    
    if (!user || !user.resumeText) {
      return res.status(404).json({
        success: false,
        message: 'User resume not found'
      });
    }

    // Get all active jobs
    const jobs = await Job.find({ isActive: true }).limit(50);

    // Analyze match for each job
    const recommendations = await Promise.all(
      jobs.map(async (job) => {
        try {
          const match = await aiService.generateJobMatch(
            user.resumeText,
            job.description,
            job.title
          );

          return {
            job: {
              id: job._id,
              title: job.title,
              company: job.company,
              description: job.description.substring(0, 200) + '...',
              skills: job.skills,
              salary: job.salary,
              location: job.location,
              type: job.type
            },
            matchPercentage: match.matchPercentage,
            reasons: match.reasons,
            concerns: match.concerns,
            interviewTips: match.interviewTips
          };
        } catch (error) {
          console.error(`Error matching job ${job._id}:`, error);
          return null;
        }
      })
    );

    // Filter out failed matches and sort by match percentage
    const validRecommendations = recommendations
      .filter(r => r !== null)
      .sort((a, b) => b.matchPercentage - a.matchPercentage)
      .slice(0, 10); // Top 10 recommendations

    res.json({
      success: true,
      data: validRecommendations
    });
  } catch (error) {
    console.error('Recommendations error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Seed sample jobs (for development)
router.post('/seed', async (req, res) => {
  try {
    const sampleJobs = [
      {
        title: 'Frontend Developer',
        description: 'We are looking for a skilled Frontend Developer with experience in React, TypeScript, and modern web technologies. You will be responsible for building responsive user interfaces and working closely with our design team.',
        skills: ['React', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Tailwind'],
        company: 'TechCorp Inc',
        salary: '$80,000 - $120,000',
        location: 'Remote',
        type: 'Full-time',
        experience: '2-4 years'
      },
      {
        title: 'Full Stack Engineer',
        description: 'Join our team as a Full Stack Engineer! Work on exciting projects using Node.js, React, and MongoDB. Experience with AWS and Docker is a plus.',
        skills: ['Node.js', 'React', 'MongoDB', 'Express', 'AWS', 'Docker'],
        company: 'StartupXYZ',
        salary: '$90,000 - $140,000',
        location: 'San Francisco, CA',
        type: 'Full-time',
        experience: '3-5 years'
      },
      {
        title: 'Machine Learning Intern',
        description: 'Exciting opportunity for ML enthusiasts! Work with our data science team on real-world ML projects using Python, TensorFlow, and PyTorch.',
        skills: ['Python', 'Machine Learning', 'TensorFlow', 'PyTorch', 'Data Science'],
        company: 'AI Innovations',
        salary: '$25/hour',
        location: 'New York, NY',
        type: 'Internship',
        experience: '0-1 years'
      },
      {
        title: 'Backend Developer',
        description: 'We need a Backend Developer proficient in Python/Django or Node.js/Express. Experience with PostgreSQL and RESTful APIs required.',
        skills: ['Python', 'Django', 'PostgreSQL', 'REST API', 'Docker'],
        company: 'DataFlow Systems',
        salary: '$85,000 - $130,000',
        location: 'Austin, TX',
        type: 'Full-time',
        experience: '2-5 years'
      },
      {
        title: 'DevOps Engineer',
        description: 'Looking for a DevOps Engineer with strong experience in AWS, Kubernetes, and CI/CD pipelines. Help us scale our infrastructure.',
        skills: ['AWS', 'Kubernetes', 'Docker', 'Jenkins', 'Terraform', 'CI/CD'],
        company: 'CloudTech Solutions',
        salary: '$100,000 - $150,000',
        location: 'Seattle, WA',
        type: 'Full-time',
        experience: '3-6 years'
      }
    ];

    await Job.deleteMany({}); // Clear existing jobs
    const jobs = await Job.insertMany(sampleJobs);

    res.json({
      success: true,
      message: `${jobs.length} sample jobs added`,
      data: jobs
    });
  } catch (error) {
    console.error('Seed error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
