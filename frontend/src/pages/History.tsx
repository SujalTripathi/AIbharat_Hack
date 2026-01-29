import React, { useState, useEffect } from 'react';
import { History as HistoryIcon, FileText, MessageSquare, TrendingUp, Award, Clock, Target, CheckCircle, AlertCircle } from 'lucide-react';
import { userAPI } from '../services/api';
import { getUserId } from '../utils/storage';
import LoadingSpinner from '../components/LoadingSpinner';
import Alert from '../components/Alert';

const History: React.FC = () => {
  const [history, setHistory] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'resume' | 'interview' | 'skillgap'>('resume');

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    const userId = getUserId();
    
    if (!userId) {
      setError('Please upload your resume first to view history');
      setLoading(false);
      return;
    }

    try {
      const response = await userAPI.getHistory(userId);
      setHistory(response.data.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch history');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <LoadingSpinner message="Loading your history..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-8">
        <Alert type="error" message={error} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 py-12 px-8">
      <div className="max-w-7xl mx-auto animate-fadeIn">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl mb-6 animate-float shadow-2xl shadow-indigo-500/30">
            <HistoryIcon className="text-white" size={48} />
          </div>
          <h1 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-600 bg-clip-text text-transparent">
              Your Activity History
            </span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Track your progress and review past analyses
          </p>
        </div>

        {/* Stats Overview */}
        {history?.stats && (
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 hover:scale-105 transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl mb-4">
                <FileText className="text-white" size={32} />
              </div>
              <div className="text-5xl font-bold text-white mb-2">
                {history.stats.latestAtsScore || 'N/A'}
              </div>
              <div className="text-sm text-gray-400">Latest ATS Score</div>
            </div>
            
            <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 hover:scale-105 transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl mb-4">
                <MessageSquare className="text-white" size={32} />
              </div>
              <div className="text-5xl font-bold text-white mb-2">
                {history.stats.totalInterviews}
              </div>
              <div className="text-sm text-gray-400">Mock Interviews</div>
            </div>
            
            <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 hover:scale-105 transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl mb-4">
                <Award className="text-white" size={32} />
              </div>
              <div className="text-5xl font-bold text-white mb-2">
                {history.stats.averageInterviewScore}
              </div>
              <div className="text-sm text-gray-400">Avg Interview Score</div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-2 mb-8">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('resume')}
              className={`flex-1 px-6 py-4 font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                activeTab === 'resume'
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <FileText size={20} />
              Resume Analyses
            </button>
            <button
              onClick={() => setActiveTab('interview')}
              className={`flex-1 px-6 py-4 font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                activeTab === 'interview'
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <MessageSquare size={20} />
              Interview Sessions
            </button>
            <button
              onClick={() => setActiveTab('skillgap')}
              className={`flex-1 px-6 py-4 font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                activeTab === 'skillgap'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <TrendingUp size={20} />
              Skill Gap Reports
            </button>
          </div>
        </div>

        {/* Resume Analyses */}
        {activeTab === 'resume' && (
          <div className="space-y-6">
            {history?.resumeAnalyses && history.resumeAnalyses.length > 0 ? (
              history.resumeAnalyses.map((analysis: any, index: number) => (
                <div 
                  key={analysis._id} 
                  className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:scale-102 transition-all duration-300 animate-slideUp" 
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg">
                          <FileText className="text-white" size={20} />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">Resume Analysis</h3>
                          <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                            <Clock size={14} />
                            {formatDate(analysis.createdAt)}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl border-4 ${
                        analysis.atsScore >= 80 ? 'text-green-400 bg-green-500/20 border-green-500/40' :
                        analysis.atsScore >= 60 ? 'text-yellow-400 bg-yellow-500/20 border-yellow-500/40' : 
                        'text-red-400 bg-red-500/20 border-red-500/40'
                      }`}>
                        <div className="text-2xl font-bold">{analysis.atsScore}</div>
                      </div>
                      <div className="text-xs text-gray-400 mt-2">ATS Score</div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-5">
                      <h4 className="text-sm font-semibold text-green-400 mb-3 flex items-center gap-2">
                        <CheckCircle size={16} />
                        Strengths
                      </h4>
                      <ul className="text-sm text-green-200 space-y-2">
                        {analysis.analysis?.content?.strengths?.slice(0, 3).map((s: string, i: number) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-green-400 mt-0.5">•</span>
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-5">
                      <h4 className="text-sm font-semibold text-red-400 mb-3 flex items-center gap-2">
                        <AlertCircle size={16} />
                        Improvements
                      </h4>
                      <ul className="text-sm text-red-200 space-y-2">
                        {analysis.analysis?.content?.weaknesses?.slice(0, 3).map((w: string, i: number) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-red-400 mt-0.5">•</span>
                            {w}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
                <FileText className="text-gray-500 mx-auto mb-4" size={64} />
                <p className="text-gray-400 text-lg">
                  No resume analyses yet. Upload your resume to get started!
                </p>
              </div>
            )}
          </div>
        )}

        {/* Interview Sessions */}
        {activeTab === 'interview' && (
          <div className="space-y-6">
            {history?.interviews && history.interviews.length > 0 ? (
              history.interviews.map((interview: any, index: number) => (
                <div 
                  key={interview._id} 
                  className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:scale-102 transition-all duration-300 animate-slideUp"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg">
                          <MessageSquare className="text-white" size={20} />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">{interview.jobRole}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-400 mt-1">
                            <div className="flex items-center gap-1">
                              <Clock size={14} />
                              {formatDate(interview.createdAt)}
                            </div>
                            <div className="flex items-center gap-1">
                              <Target size={14} />
                              {interview.questions?.length || 0} questions
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl border-4 ${
                        interview.overallScore >= 70 ? 'text-green-400 bg-green-500/20 border-green-500/40' :
                        interview.overallScore >= 50 ? 'text-yellow-400 bg-yellow-500/20 border-yellow-500/40' : 
                        'text-red-400 bg-red-500/20 border-red-500/40'
                      }`}>
                        <div className="text-2xl font-bold">{interview.overallScore}</div>
                      </div>
                      <div className="text-xs text-gray-400 mt-2">Overall Score</div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {interview.strengths && interview.strengths.length > 0 && (
                      <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-5">
                        <h4 className="text-sm font-semibold text-green-400 mb-3 flex items-center gap-2">
                          <CheckCircle size={16} />
                          Strengths
                        </h4>
                        <ul className="text-sm text-green-200 space-y-2">
                          {interview.strengths.slice(0, 3).map((s: string, i: number) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-green-400 mt-0.5">•</span>
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {interview.improvements && interview.improvements.length > 0 && (
                      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-5">
                        <h4 className="text-sm font-semibold text-yellow-400 mb-3 flex items-center gap-2">
                          <AlertCircle size={16} />
                          Areas to Improve
                        </h4>
                        <ul className="text-sm text-yellow-200 space-y-2">
                          {interview.improvements.slice(0, 3).map((imp: string, i: number) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-yellow-400 mt-0.5">•</span>
                              {imp}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
                <MessageSquare className="text-gray-500 mx-auto mb-4" size={64} />
                <p className="text-gray-400 text-lg">
                  No interview sessions yet. Start practicing with Mock Interview!
                </p>
              </div>
            )}
          </div>
        )}

        {/* Skill Gap Reports */}
        {activeTab === 'skillgap' && (
          <div className="space-y-6">
            {history?.skillGaps && history.skillGaps.length > 0 ? (
              history.skillGaps.map((gap: any, index: number) => (
                <div 
                  key={gap._id} 
                  className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:scale-102 transition-all duration-300 animate-slideUp"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg">
                          <TrendingUp className="text-white" size={20} />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">
                            {gap.jobId?.title || 'Job Analysis'}
                          </h3>
                          {gap.jobId?.company && (
                            <p className="text-sm text-gray-300">{gap.jobId.company}</p>
                          )}
                          <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                            <Clock size={14} />
                            {formatDate(gap.createdAt)}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl border-4 ${
                        gap.matchPercentage >= 70 ? 'text-green-400 bg-green-500/20 border-green-500/40' :
                        gap.matchPercentage >= 50 ? 'text-yellow-400 bg-yellow-500/20 border-yellow-500/40' : 
                        'text-red-400 bg-red-500/20 border-red-500/40'
                      }`}>
                        <div>
                          <div className="text-2xl font-bold">{gap.matchPercentage}%</div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-400 mt-2">Match</div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-400 mb-3">Missing Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {gap.missingSkills?.slice(0, 6).map((skill: string, i: number) => (
                          <span key={i} className="px-3 py-1 bg-red-500/20 border border-red-500/40 text-red-300 rounded-lg text-xs">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-semibold text-gray-400 mb-3">Learning Path</h4>
                      <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                        <p className="text-sm text-purple-200">
                          {gap.recommendations?.length || 0} learning paths suggested
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
                <TrendingUp className="text-gray-500 mx-auto mb-4" size={64} />
                <p className="text-gray-400 text-lg">
                  No skill gap analyses yet. Analyze your skills against job requirements!
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
