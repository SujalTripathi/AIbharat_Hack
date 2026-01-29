import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, Download, Copy } from 'lucide-react';
import { resumeAPI } from '../services/api';
import { getUserId, setUserId, setUserEmail } from '../utils/storage';
import LoadingSpinner from '../components/LoadingSpinner';
import Alert from '../components/Alert';

const ResumeChecker: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [error, setError] = useState('');
  const [score, setScore] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === 'application/pdf') {
        setFile(selectedFile);
        setError('');
      } else {
        setError('Please upload a PDF file');
        setFile(null);
      }
    }
  };

  const handleUpload = async () => {
    if (!file || !email) {
      setError('Please provide both email and resume file');
      return;
    }

    setLoading(true);
    setError('');

    try {
      console.log('Starting upload process...');
      const formData = new FormData();
      formData.append('resume', file);
      formData.append('email', email);

      console.log('Uploading resume...');
      const uploadResponse = await resumeAPI.upload(formData);
      console.log('Upload response:', uploadResponse.data);
      
      if (uploadResponse.data.success) {
        const userId = uploadResponse.data.data.userId;
        setUserId(userId);
        setUserEmail(email);
        setUploadSuccess(true);
        
        console.log('Upload successful, analyzing...');
        handleAnalyze(userId);
      } else {
        throw new Error(uploadResponse.data.message || 'Upload failed');
      }
    } catch (err: any) {
      console.error('Upload error:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Upload failed. Please try again.';
      setError(errorMessage);
      setLoading(false);
    }
  };

  const handleAnalyze = async (userId?: string) => {
    const currentUserId = userId || getUserId();
    
    if (!currentUserId) {
      setError('Please upload a resume first');
      return;
    }

    setAnalyzing(true);
    setError('');

    try {
      const response = await resumeAPI.analyze(currentUserId);
      setAnalysis(response.data.data);
      
      // Animate score counter
      animateScore(response.data.data.atsScore);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Analysis failed');
    } finally {
      setAnalyzing(false);
      setLoading(false);
    }
  };

  const animateScore = (targetScore: number) => {
    let current = 0;
    const increment = targetScore / 30;
    const timer = setInterval(() => {
      current += increment;
      if (current >= targetScore) {
        setScore(targetScore);
        clearInterval(timer);
      } else {
        setScore(Math.floor(current));
      }
    }, 30);
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-green-400';
    if (score >= 40) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreGradient = (score: number) => {
    if (score >= 70) return 'greenGradient';
    if (score >= 40) return 'yellowGradient';
    return 'redGradient';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-indigo-900 py-12 px-8">
      <div className="max-w-6xl mx-auto">
        {error && (
          <div className="mb-6">
            <Alert type="error" message={error} onClose={() => setError('')} />
          </div>
        )}

        {!analysis ? (
          <div className="animate-fadeIn">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl mb-6 animate-float shadow-2xl shadow-blue-500/30">
                <FileText className="text-white" size={48} />
              </div>
              <h1 className="text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                  AI Resume & ATS Score Checker
                </span>
              </h1>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Upload your resume to get instant ATS compatibility score and AI-powered improvements
              </p>
            </div>

            <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-10 shadow-2xl">
              <div className="space-y-8">
                {/* Email Input */}
                <div className="animate-slideUp" style={{animationDelay: '0.1s'}}>
                  <label className="block text-sm font-semibold text-gray-300 mb-3">
                    📧 Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className="w-full px-6 py-4 bg-slate-800/50 border-2 border-transparent focus:border-cyan-500 rounded-xl text-white placeholder-gray-500 transition-all duration-300"
                    disabled={loading}
                  />
                </div>

                {/* File Upload */}
                <div className="animate-slideUp" style={{animationDelay: '0.2s'}}>
                  <label className="block text-sm font-semibold text-gray-300 mb-3">
                    📄 Upload Resume (PDF)
                  </label>
                  <div className="relative border-2 border-dashed border-white/20 rounded-2xl p-12 text-center hover:border-cyan-500 hover:bg-cyan-500/5 transition-all duration-300">
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="hidden"
                      id="resume-upload"
                      disabled={loading}
                    />
                    <label
                      htmlFor="resume-upload"
                      className="cursor-pointer flex flex-col items-center"
                    >
                      <div className="mb-4 p-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full">
                        <Upload className="text-white" size={48} />
                      </div>
                      {file ? (
                        <div className="flex items-center space-x-3 bg-green-500/20 border border-green-500/40 px-6 py-3 rounded-full animate-scaleIn">
                          <CheckCircle className="text-green-400" size={24} />
                          <span className="font-semibold text-green-300">{file.name}</span>
                        </div>
                      ) : (
                        <div>
                          <p className="text-white font-semibold text-lg mb-2">
                            Click to upload or drag and drop
                          </p>
                          <p className="text-sm text-gray-400">PDF files only • Maximum 5MB</p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                {uploadSuccess && (
                  <Alert type="success" message="Resume uploaded successfully! Analyzing..." />
                )}

                <button
                  onClick={handleUpload}
                  disabled={!file || !email || loading}
                  className="w-full px-10 py-5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full text-white text-lg font-semibold hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  style={{animationDelay: '0.3s'}}
                >
                  {loading ? (
                    <span className="flex items-center justify-center space-x-3">
                      <LoadingSpinner />
                      <span>Analyzing your resume...</span>
                    </span>
                  ) : (
                    <span className="flex items-center justify-center space-x-3">
                      <Upload size={24} />
                      <span>Upload & Analyze Resume</span>
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8 animate-fadeIn">
            {/* Score Display Hero */}
            <div className="text-center py-16">
              <h2 className="text-lg font-medium text-gray-400 mb-8">ATS Compatibility Score</h2>
              
              {/* Circular Progress */}
              <div className="relative inline-flex items-center justify-center">
                <svg className="transform -rotate-90" width="220" height="220">
                  <defs>
                    <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#34d399" />
                    </linearGradient>
                    <linearGradient id="yellowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fbbf24" />
                      <stop offset="100%" stopColor="#fcd34d" />
                    </linearGradient>
                    <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ef4444" />
                      <stop offset="100%" stopColor="#f87171" />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  <circle
                    cx="110"
                    cy="110"
                    r="100"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="12"
                    fill="none"
                  />
                  <circle
                    cx="110"
                    cy="110"
                    r="100"
                    stroke={`url(#${getScoreGradient(analysis.atsScore)})`}
                    strokeWidth="12"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${(score / 100) * 628} 628`}
                    filter="url(#glow)"
                    style={{ transition: 'stroke-dasharray 0.5s ease' }}
                  />
                </svg>
                <div className="absolute">
                  <div className={`text-7xl font-bold ${getScoreColor(analysis.atsScore)} drop-shadow-[0_0_30px_rgba(34,197,94,0.5)]`}>
                    {score}
                  </div>
                </div>
              </div>

              <p className="text-gray-400 mt-8 text-lg">
                {analysis.atsScore >= 70 && '🎉 Excellent! Your resume is highly ATS-compatible'}
                {analysis.atsScore >= 40 && analysis.atsScore < 70 && '👍 Good! Some improvements recommended'}
                {analysis.atsScore < 40 && '⚠️ Needs improvement. Follow suggestions below'}
              </p>
            </div>

            {/* Breakdown Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: 'Keywords', value: analysis.analysis?.content?.strengths?.length || 0, max: 10, color: 'blue' },
                { label: 'Format', value: analysis.atsScore >= 70 ? 9 : 7, max: 10, color: 'purple' },
                { label: 'Clarity', value: Math.floor(analysis.atsScore / 10), max: 10, color: 'cyan' },
                { label: 'Impact', value: analysis.suggestions?.length ? 10 - analysis.suggestions.length : 8, max: 10, color: 'green' },
              ].map((metric, index) => (
                <div
                  key={index}
                  className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:scale-105 transition-all duration-300"
                >
                  <div className="text-sm text-gray-400 mb-2">{metric.label}</div>
                  <div className="text-4xl font-bold text-white mb-3">{metric.value}/{metric.max}</div>
                  <div className="h-2 rounded-full bg-gray-700 overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r from-${metric.color}-500 to-${metric.color}-400 transition-all duration-1000`}
                      style={{ width: `${(metric.value / metric.max) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Strengths & Weaknesses */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Strengths */}
              <div>
                <div className="backdrop-blur-md bg-green-500/10 border border-green-500/20 rounded-t-xl p-4">
                  <h3 className="text-xl font-bold text-green-400 flex items-center">
                    <CheckCircle className="mr-3" size={24} />
                    Strengths
                  </h3>
                </div>
                <div className="backdrop-blur-md bg-white/5 border border-white/10 border-t-0 rounded-b-xl p-6 space-y-3">
                  {analysis.analysis?.content?.strengths?.map((strength: string, index: number) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20 hover:bg-green-500/20 transition-all duration-300"
                    >
                      <CheckCircle className="text-green-400 flex-shrink-0" size={18} />
                      <span className="text-green-300 text-sm">{strength}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Weaknesses */}
              <div>
                <div className="backdrop-blur-md bg-red-500/10 border border-red-500/20 rounded-t-xl p-4">
                  <h3 className="text-xl font-bold text-red-400 flex items-center">
                    <AlertCircle className="mr-3" size={24} />
                    Areas to Improve
                  </h3>
                </div>
                <div className="backdrop-blur-md bg-white/5 border border-white/10 border-t-0 rounded-b-xl p-6 space-y-3">
                  {analysis.analysis?.content?.weaknesses?.map((weakness: string, index: number) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-all duration-300"
                    >
                      <AlertCircle className="text-red-400 flex-shrink-0" size={18} />
                      <span className="text-red-300 text-sm">{weakness}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* AI Suggestions */}
            {analysis.suggestions && analysis.suggestions.length > 0 && (
              <div className="backdrop-blur-md bg-slate-800/50 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">AI-Powered Suggestions</h3>
                <div className="space-y-4">
                  {analysis.suggestions.map((suggestion: string, index: number) => (
                    <div
                      key={index}
                      className="bg-slate-700/30 rounded-lg p-6 border border-white/10 hover:border-cyan-500/50 transition-all duration-300"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                          {index + 1}
                        </div>
                        <p className="text-gray-300 flex-1">{suggestion}</p>
                        <button className="flex-shrink-0 p-2 hover:bg-white/10 rounded-lg transition-colors">
                          <Copy className="text-gray-400 hover:text-white" size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Improved Sections */}
            {analysis.improvedSections && Object.keys(analysis.improvedSections).length > 0 && (
              <div className="backdrop-blur-md bg-slate-800/50 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">AI-Generated Improvements</h3>
                <div className="space-y-6">
                  {Object.entries(analysis.improvedSections).map(([section, content]: [string, any]) => (
                    <div key={section} className="space-y-3">
                      <h4 className="text-lg font-semibold text-cyan-400 capitalize">{section}</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                          <div className="text-xs text-red-300 mb-2">BEFORE</div>
                          <p className="text-sm text-red-200">Original content...</p>
                        </div>
                        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                          <div className="text-xs text-green-300 mb-2">AFTER</div>
                          <p className="text-sm text-green-200 whitespace-pre-wrap">{content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                className="flex-1 px-10 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full text-white text-lg font-semibold hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 flex items-center justify-center gap-3"
              >
                <Download size={24} />
                <span>Download Improved Resume</span>
              </button>
              
              <button
                onClick={() => {
                  setAnalysis(null);
                  setFile(null);
                  setUploadSuccess(false);
                  setScore(0);
                }}
                className="px-10 py-4 backdrop-blur-md bg-white/10 border border-white/20 rounded-full text-white text-lg font-semibold hover:bg-white/20 transition-all duration-300"
              >
                Analyze Another Resume
              </button>
            </div>
          </div>
        )}

        {analyzing && <LoadingSpinner message="AI is analyzing your resume..." />}
      </div>
    </div>
  );
};

export default ResumeChecker;
