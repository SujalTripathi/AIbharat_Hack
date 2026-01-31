import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, Download, Copy, Sparkles } from 'lucide-react';
import { resumeAPI } from '../services/api';
import { setUserId, setUserEmail } from '../utils/storage';
import ModernLoader from '../components/ModernLoader';
import { showToast, triggerConfetti } from '../utils/toast';

const ResumeCheckerModern: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [score, setScore] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === 'application/pdf') {
        setFile(selectedFile);
        showToast.success('Resume file selected!');
      } else {
        showToast.error('Please upload a PDF file');
        setFile(null);
      }
    }
  };

  const handleUpload = async () => {
    if (!file || !email) {
      showToast.error('Please provide both email and resume file');
      return;
    }

    setLoading(true);
    setAnalyzing(true);

    try {
      const formData = new FormData();
      formData.append('resume', file);
      formData.append('email', email);

      const uploadResponse = await resumeAPI.upload(formData);
      
      if (uploadResponse.data.success) {
        const userId = uploadResponse.data.data.userId;
        setUserId(userId);
        setUserEmail(email);
        
        // Analyze resume
        const response = await resumeAPI.analyze(userId);
        setAnalysis(response.data.data);
        animateScore(response.data.data.atsScore);
        
        showToast.success('Analysis complete!', true);
        triggerConfetti();
      }
    } catch (err: any) {
      showToast.error(err.response?.data?.message || 'Upload failed. Please try again.');
    } finally {
      setLoading(false);
      setAnalyzing(false);
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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast.success('Copied to clipboard!');
  };

  const downloadImprovedResume = () => {
    showToast.info('PDF generation feature coming soon!');
    // TODO: Implement PDF generation
  };

  if (analyzing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4">
        <ModernLoader
          message="Analyzing Your Resume"
          subMessage="Our AI is reviewing your content..."
          type="circular"
          showSteps={true}
          steps={[
            { label: 'Parsing Content', status: 'completed' },
            { label: 'Analyzing Keywords', status: 'active' },
            { label: 'Generating Insights', status: 'pending' }
          ]}
        />
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 sm:py-12 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 animate-fade-in-up">
            <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl mb-6 animate-float shadow-2xl shadow-blue-500/30">
              <FileText className="text-white" size={48} />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                AI Resume & ATS Score Checker
              </span>
            </h1>
            <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto px-4">
              Upload your resume to get instant ATS compatibility score and AI-powered improvements
            </p>
          </div>

          <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl animate-fade-in-up">
            <div className="space-y-6 sm:space-y-8">
              {/* Email Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-3">
                  📧 Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-slate-800/50 border-2 border-transparent focus:border-cyan-500 rounded-xl text-white placeholder-gray-500 transition-all duration-300 focus:ring-4 focus:ring-cyan-500/20 focus:outline-none"
                  disabled={loading}
                />
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-3">
                  📄 Upload Resume (PDF)
                </label>
                <div className="relative border-2 border-dashed border-white/20 rounded-2xl p-8 sm:p-12 text-center hover:border-cyan-500 hover:bg-cyan-500/5 transition-all duration-300">
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
                    <div className="mb-4 p-4 sm:p-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full">
                      <Upload className="text-white" size={36} />
                    </div>
                    {file ? (
                      <div className="flex items-center space-x-3 bg-green-500/20 border border-green-500/40 px-4 sm:px-6 py-2 sm:py-3 rounded-full animate-scale-in">
                        <CheckCircle className="text-green-400" size={20} />
                        <span className="font-semibold text-green-300 text-sm sm:text-base truncate max-w-[200px]">{file.name}</span>
                      </div>
                    ) : (
                      <div>
                        <p className="text-white font-semibold text-base sm:text-lg mb-2">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs sm:text-sm text-gray-400">PDF files only • Maximum 5MB</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              <button
                onClick={handleUpload}
                disabled={!file || !email || loading}
                className="w-full px-6 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-xl sm:rounded-full text-white text-base sm:text-lg font-semibold hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
              >
                <Upload size={20} />
                <span>{loading ? 'Analyzing...' : 'Upload & Analyze Resume'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Analysis Results Display
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 sm:py-12 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8 animate-fade-in-up">
        {/* ATS Score Visualization */}
        <div className="backdrop-blur-lg bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 sm:p-12 text-center">
          <h2 className="text-lg sm:text-xl font-medium text-gray-400 mb-8">ATS Compatibility Score</h2>
          
          <div className="relative w-40 h-40 sm:w-48 sm:h-48 mx-auto mb-8">
            <svg className="transform -rotate-90 w-full h-full">
              <circle
                cx="50%"
                cy="50%"
                r="88"
                stroke="rgba(148, 163, 184, 0.2)"
                strokeWidth="12"
                fill="none"
              />
              <circle
                cx="50%"
                cy="50%"
                r="88"
                stroke={score >= 70 ? '#10b981' : score >= 40 ? '#fbbf24' : '#ef4444'}
                strokeWidth="12"
                fill="none"
                strokeDasharray={`${(score/100) * 553} 553`}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
                style={{ filter: 'drop-shadow(0 0 10px currentColor)' }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                {score}
              </span>
              <span className="text-xs sm:text-sm text-gray-400 mt-2">ATS Score</span>
            </div>
          </div>

          <p className="text-gray-300 text-sm sm:text-base mb-6">
            {score >= 70 ? '🎉 Excellent! Your resume is well-optimized for ATS systems.' :
             score >= 40 ? '👍 Good start! Some improvements recommended.' :
             '⚠️ Your resume needs significant improvements for ATS compatibility.'}
          </p>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {[
            { name: 'Keywords', value: analysis.keywordScore || 85, gradient: 'from-blue-500 to-cyan-500', icon: '🔑' },
            { name: 'Format', value: analysis.formatScore || 92, gradient: 'from-green-500 to-emerald-500', icon: '📐' },
            { name: 'Clarity', value: analysis.clarityScore || 78, gradient: 'from-purple-500 to-pink-500', icon: '✨' },
            { name: 'Impact', value: analysis.impactScore || 88, gradient: 'from-orange-500 to-red-500', icon: '💪' }
          ].map((metric, index) => (
            <div 
              key={index}
              className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-xl p-4 sm:p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]"
            >
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br ${metric.gradient} flex items-center justify-center mb-3 sm:mb-4 text-xl sm:text-2xl`}>
                {metric.icon}
              </div>
              
              <h3 className="text-sm sm:text-lg font-semibold text-gray-200 mb-2">{metric.name}</h3>
              <p className="text-2xl sm:text-3xl font-bold text-white mb-2">{metric.value}%</p>
              
              <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${metric.gradient} transition-all duration-1000`}
                  style={{width: `${metric.value}%`}}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Strengths & Improvements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Strengths */}
          <div className="backdrop-blur-lg bg-green-500/5 border border-green-500/20 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                <CheckCircle className="text-white" size={20} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-green-400">Strengths</h3>
            </div>
            <ul className="space-y-3">
              {(analysis.strengths || ['Clear formatting', 'Good keyword usage', 'Professional tone']).map((item: string, i: number) => (
                <li key={i} className="flex items-start gap-3 text-green-300 hover:scale-105 transition-transform text-sm sm:text-base">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Improvements */}
          <div className="backdrop-blur-lg bg-orange-500/5 border border-orange-500/20 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                <AlertCircle className="text-white" size={20} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-orange-400">Areas to Improve</h3>
            </div>
            <ul className="space-y-3">
              {(analysis.improvements || ['Add more quantifiable achievements', 'Include relevant keywords', 'Improve section organization']).map((item: string, i: number) => (
                <li key={i} className="flex items-start gap-3 text-orange-300 hover:scale-105 transition-transform text-sm sm:text-base">
                  <span className="text-orange-400 mt-1">!</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* AI-Powered Suggestions */}
        {analysis.suggestions && analysis.suggestions.length > 0 && (
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3 flex-wrap">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                AI-Powered Improvements
              </span>
              <span className="px-3 py-1 text-xs bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white flex items-center gap-1">
                <Sparkles size={12} />
                BETA
              </span>
            </h2>
            
            {analysis.suggestions.map((suggestion: any, index: number) => (
              <div 
                key={index}
                className="backdrop-blur-lg bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 sm:p-6 mb-4 hover:bg-slate-800/70 transition-all hover:shadow-xl"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <h3 className="text-lg font-semibold text-white">{suggestion.section || `Improvement ${index + 1}`}</h3>
                  <span className="px-3 py-1 text-xs rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 self-start sm:self-auto">
                    {suggestion.priority || 'Medium'} Priority
                  </span>
                </div>
                
                {/* Suggestion Content */}
                <div className="bg-gradient-to-br from-blue-500/5 to-purple-500/5 border border-blue-500/20 rounded-lg p-4">
                  {typeof suggestion === 'string' ? (
                    <p className="text-gray-200 text-sm leading-relaxed">{suggestion}</p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-red-400 font-semibold text-sm">BEFORE</span>
                        </div>
                        <p className="text-red-200 text-sm leading-relaxed">{suggestion.before || suggestion.original || 'Original text'}</p>
                      </div>
                      
                      <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-green-400 font-semibold text-sm">AFTER</span>
                        </div>
                        <p className="text-green-200 text-sm leading-relaxed">{suggestion.after || suggestion.improved || 'Improved text'}</p>
                        
                        <button 
                          onClick={() => copyToClipboard(suggestion.after || suggestion.improved || '')}
                          className="mt-3 flex items-center gap-2 text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                        >
                          <Copy size={14} />
                          Copy Improved Text
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                
                {suggestion.reason && (
                  <div className="mt-4 flex items-start gap-2 text-sm text-gray-400">
                    <span className="text-blue-400">💡</span>
                    <p><strong className="text-blue-400">Why this matters:</strong> {suggestion.reason}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center">
          <button 
            onClick={downloadImprovedResume}
            className="group relative px-6 sm:px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl font-semibold text-white shadow-lg hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] transition-all hover:scale-105 flex items-center justify-center gap-3"
          >
            <Download size={20} />
            Download Improved Resume
            <span className="absolute -top-2 -right-2 px-2 py-1 bg-yellow-500 text-xs rounded-full text-black font-bold animate-pulse">
              NEW
            </span>
          </button>
          
          <button 
            onClick={() => window.location.reload()}
            className="px-6 sm:px-8 py-4 bg-slate-700/50 hover:bg-slate-700 rounded-xl font-semibold text-white border border-slate-600 transition-all hover:scale-105 flex items-center justify-center gap-3"
          >
            <Upload size={20} />
            Analyze Another Resume
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeCheckerModern;
