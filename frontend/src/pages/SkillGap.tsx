import React, { useState, useEffect } from 'react';
import { TrendingUp, BookOpen, Clock, AlertCircle, CheckCircle, Target, Award, ExternalLink } from 'lucide-react';
import { skillGapAPI, jobsAPI } from '../services/api';
import { getUserId } from '../utils/storage';
import LoadingSpinner from '../components/LoadingSpinner';
import Alert from '../components/Alert';

interface Job {
  _id: string;
  title: string;
  company: string;
  skills: string[];
}

const SkillGap: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJobId, setSelectedJobId] = useState('');
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await jobsAPI.getAll();
      setJobs(response.data.data);
    } catch (err) {
      console.error('Failed to fetch jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyze = async () => {
    const userId = getUserId();
    
    if (!userId) {
      setError('Please upload your resume first (Go to Resume Checker)');
      return;
    }

    if (!selectedJobId) {
      setError('Please select a job to analyze');
      return;
    }

    setAnalyzing(true);
    setError('');

    try {
      const response = await skillGapAPI.analyze(userId, selectedJobId);
      setAnalysis(response.data.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Analysis failed');
    } finally {
      setAnalyzing(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-500/20 text-red-300 border-red-500/40';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40';
      case 'Low': return 'bg-green-500/20 text-green-300 border-green-500/40';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/40';
    }
  };

  const getPriorityBorderColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'border-l-red-500';
      case 'Medium': return 'border-l-yellow-500';
      case 'Low': return 'border-l-green-500';
      default: return 'border-l-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 py-12 px-8">
      <div className="max-w-7xl mx-auto">
        {error && (
          <div className="mb-6">
            <Alert type="error" message={error} onClose={() => setError('')} />
          </div>
        )}

        {!analysis ? (
          <div className="animate-fadeIn">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl mb-6 animate-float shadow-2xl shadow-purple-500/30">
                <TrendingUp className="text-white" size={48} />
              </div>
              <h1 className="text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                  Skill Gap Analyzer
                </span>
              </h1>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Identify missing skills and get personalized learning recommendations
              </p>
            </div>

            <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-10 shadow-2xl">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Select Target Job
                  </label>
                  <select
                    value={selectedJobId}
                    onChange={(e) => setSelectedJobId(e.target.value)}
                    className="w-full px-6 py-4 bg-slate-800/50 border-2 border-transparent focus:border-purple-500 rounded-xl text-white text-lg transition-all duration-300"
                    disabled={analyzing || loading}
                  >
                    <option value="">-- Select a job --</option>
                    {jobs.map((job) => (
                      <option key={job._id} value={job._id}>
                        {job.title} at {job.company}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedJobId && (
                  <div className="backdrop-blur-md bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 animate-slideUp">
                    <h3 className="font-semibold text-blue-300 mb-4 flex items-center gap-2">
                      <Target size={20} />
                      Required Skills:
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {jobs.find(j => j._id === selectedJobId)?.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-blue-500/20 border border-blue-500/40 text-blue-200 rounded-full text-sm font-medium hover:bg-blue-500/30 transition-all duration-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  onClick={handleAnalyze}
                  disabled={analyzing || !selectedJobId}
                  className="w-full px-12 py-5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white text-lg font-semibold hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {analyzing ? 'Analyzing...' : 'Analyze Skill Gap'}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8 animate-fadeIn">
            {/* Stats Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg">
                    <CheckCircle className="text-white" size={24} />
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-white">{analysis.currentSkills.length}</div>
                    <div className="text-sm text-gray-400">Your Skills</div>
                  </div>
                </div>
                <div className="h-2 rounded-full bg-gray-700 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-500 to-emerald-400 w-full"></div>
                </div>
              </div>

              <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg">
                    <AlertCircle className="text-white" size={24} />
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-white">{analysis.missingSkills.length}</div>
                    <div className="text-sm text-gray-400">Missing Skills</div>
                  </div>
                </div>
                <div className="h-2 rounded-full bg-gray-700 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-red-500 to-pink-400 transition-all duration-1000"
                    style={{ width: `${(analysis.missingSkills.length / (analysis.currentSkills.length + analysis.missingSkills.length)) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg">
                    <Award className="text-white" size={24} />
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-white">{analysis.matchPercentage}%</div>
                    <div className="text-sm text-gray-400">Match Score</div>
                  </div>
                </div>
                <div className="h-2 rounded-full bg-gray-700 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-1000"
                    style={{ width: `${analysis.matchPercentage}%` }}
                  ></div>
                </div>
              </div>

              <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg">
                    <Clock className="text-white" size={24} />
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-white">
                      {analysis.recommendations ? Math.max(...analysis.recommendations.map((r: any) => parseInt(r.estimatedTime) || 0)) : 0}
                    </div>
                    <div className="text-sm text-gray-400">Weeks to Learn</div>
                  </div>
                </div>
                <div className="h-2 rounded-full bg-gray-700 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-yellow-500 to-orange-400 w-3/4"></div>
                </div>
              </div>
            </div>

            {/* Skills Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {/* Your Skills */}
              <div>
                <h2 className="text-3xl font-bold text-green-400 mb-6 flex items-center gap-3">
                  <CheckCircle size={32} />
                  Your Skills
                </h2>
                <div className="flex flex-wrap gap-3">
                  {analysis.currentSkills.map((skill: string, index: number) => (
                    <div
                      key={index}
                      className="px-4 py-2 rounded-full bg-green-500/20 border border-green-500/40 text-green-300 hover:bg-green-500/30 hover:scale-105 transition-all duration-300 flex items-center gap-2 animate-slideUp"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <CheckCircle size={16} />
                      <span className="font-medium">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Missing Skills */}
              <div>
                <h2 className="text-3xl font-bold text-red-400 mb-6 flex items-center gap-3">
                  <AlertCircle size={32} />
                  Skills to Learn
                </h2>
                <div className="flex flex-wrap gap-3">
                  {analysis.missingSkills.map((skill: string, index: number) => (
                    <div
                      key={index}
                      className="px-4 py-2 rounded-full bg-red-500/20 border border-red-500/40 text-red-300 hover:bg-red-500/30 hover:scale-105 transition-all duration-300 flex items-center gap-2 animate-slideUp"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <AlertCircle size={16} />
                      <span className="font-medium">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Match Score Visualization */}
            <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-10 text-center shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-8">Skills Match Analysis</h2>
              <div className="relative inline-flex items-center justify-center">
                <svg width="250" height="250">
                  <defs>
                    <linearGradient id="matchGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={analysis.matchPercentage >= 70 ? '#10b981' : '#fbbf24'} />
                      <stop offset="100%" stopColor={analysis.matchPercentage >= 70 ? '#34d399' : '#fcd34d'} />
                    </linearGradient>
                  </defs>
                  <circle
                    cx="125"
                    cy="125"
                    r="110"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="20"
                    fill="none"
                  />
                  <circle
                    cx="125"
                    cy="125"
                    r="110"
                    stroke="url(#matchGradient)"
                    strokeWidth="20"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${(analysis.matchPercentage / 100) * 691} 691`}
                    transform="rotate(-90 125 125)"
                  />
                </svg>
                <div className="absolute">
                  <div className={`text-6xl font-bold ${analysis.matchPercentage >= 70 ? 'text-green-400' : 'text-yellow-400'}`}>
                    {analysis.matchPercentage}%
                  </div>
                </div>
              </div>
              <p className="text-gray-300 mt-8 text-lg">
                {analysis.matchPercentage >= 70 && '🎉 Great match! You have most of the required skills'}
                {analysis.matchPercentage >= 50 && analysis.matchPercentage < 70 && '💪 Good potential! Focus on learning the missing skills'}
                {analysis.matchPercentage < 50 && '📚 Consider upskilling to improve your chances'}
              </p>
            </div>

            {/* Learning Path Recommendations */}
            {analysis.recommendations && analysis.recommendations.length > 0 && (
              <div>
                <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                  <BookOpen className="text-blue-400" size={32} />
                  <span className="bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
                    Learning Path Recommendations
                  </span>
                </h2>
                <div className="space-y-6">
                  {analysis.recommendations.map((rec: any, index: number) => (
                    <div
                      key={index}
                      className={`backdrop-blur-md bg-slate-800/50 border-l-4 ${getPriorityBorderColor(rec.priority)} rounded-xl p-6 hover:scale-102 hover:shadow-xl transition-all duration-300 animate-slideUp`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-white mb-2">{rec.skill}</h3>
                          {rec.estimatedTime && (
                            <div className="flex items-center text-gray-400 gap-2">
                              <Clock size={18} />
                              <span>{rec.estimatedTime} to learn</span>
                            </div>
                          )}
                        </div>
                        <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${getPriorityColor(rec.priority)}`}>
                          {rec.priority} Priority
                        </span>
                      </div>

                      {/* Visual Gap Bar */}
                      <div className="mb-6">
                        <div className="flex justify-between text-sm text-gray-400 mb-2">
                          <span>Impact on Job Match</span>
                          <span>{rec.priority === 'High' ? '85%' : rec.priority === 'Medium' ? '60%' : '30%'}</span>
                        </div>
                        <div className="h-3 rounded-full bg-gray-700 overflow-hidden">
                          <div
                            className={`h-full ${rec.priority === 'High' ? 'bg-gradient-to-r from-red-500 to-pink-500' : rec.priority === 'Medium' ? 'bg-gradient-to-r from-yellow-500 to-orange-500' : 'bg-gradient-to-r from-green-500 to-emerald-500'} transition-all duration-1000`}
                            style={{ width: rec.priority === 'High' ? '85%' : rec.priority === 'Medium' ? '60%' : '30%' }}
                          ></div>
                        </div>
                      </div>

                      {rec.resources && rec.resources.length > 0 && (
                        <div className="backdrop-blur-md bg-blue-500/10 border border-blue-500/20 rounded-lg p-5">
                          <p className="text-sm font-semibold text-blue-300 mb-3 flex items-center gap-2">
                            <BookOpen size={18} />
                            Recommended Resources:
                          </p>
                          <div className="space-y-2">
                            {rec.resources.map((resource: string, rIndex: number) => (
                              <div
                                key={rIndex}
                                className="flex items-start gap-3 text-sm text-blue-200 hover:text-blue-100 transition-colors group"
                              >
                                <ExternalLink size={16} className="flex-shrink-0 mt-0.5 opacity-60 group-hover:opacity-100" />
                                <span>{resource}</span>
                              </div>
                            ))}
                          </div>
                          <button className="mt-4 w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg text-white font-medium hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                            <span>Start Learning</span>
                            <ExternalLink size={18} />
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => {
                setAnalysis(null);
                setSelectedJobId('');
              }}
              className="w-full px-12 py-5 backdrop-blur-md bg-white/10 border border-white/20 rounded-full text-white text-lg font-semibold hover:bg-white/20 transition-all duration-300"
            >
              Analyze Another Job
            </button>
          </div>
        )}

        {(loading || analyzing) && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm">
            <LoadingSpinner message={analyzing ? 'AI is analyzing your skill gaps...' : 'Loading jobs...'} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillGap;
