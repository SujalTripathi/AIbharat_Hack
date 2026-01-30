require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const fs = require('fs');
const path = require('path');

const app = express();

// Connect to MongoDB (with graceful handling)
connectDB().catch(err => {
  console.warn('\n⚠️  Running without MongoDB connection');
  console.warn('Some features may not work until MongoDB is connected\n');
});

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Middleware
app.use(cors({
  origin: [
    'https://a-ibharat-hack.vercel.app',
    'https://a-ibharat-hack-git-main-sujaltripathis-projects.vercel.app',
    'http://localhost:3000' // Keep for local development
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  maxAge: 86400 // 24 hours
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/resume', require('./routes/resume'));
app.use('/api/interview', require('./routes/interview'));
app.use('/api/jobs', require('./routes/jobs'));
app.use('/api/skill-gap', require('./routes/skillGap'));
app.use('/api/user', require('./routes/user'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'CareerAI API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error occurred:');
  console.error(err.stack);
  
  // Handle Multer errors
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      success: false,
      message: 'File too large. Maximum size is 5MB.'
    });
  }
  
  if (err.message === 'Only PDF files are allowed') {
    return res.status(400).json({
      success: false,
      message: 'Only PDF files are allowed'
    });
  }
  
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
