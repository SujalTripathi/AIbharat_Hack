import React, { useState, useEffect } from 'react';
import { Briefcase, MapPin, DollarSign, TrendingUp, CheckCircle, AlertCircle, ExternalLink, Star, Building2 } from 'lucide-react';
import { jobsAPI } from '../services/api';
import { getUserId } from '../utils/storage';
import LoadingSpinner from '../components/LoadingSpinner';
import Alert from '../components/Alert';

interface JobRecommendation {
  job: {
    id: string;
    title: string;
    company: string;
    description: string;
    skills: string[];
    salary: string;
    location: string;
    type: string;
  };
  matchPercentage: number;
  reasons: string[];
  concerns: string[];
  interviewTips: string[];
}

const JobRecommendations: React.FC = () => {
  const [recommendations, setRecommendations] = useState<JobRecommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [expandedJob, setExpandedJob] = useState<string | null>(null);

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    const userId = getUserId();
    
    if (!userId) {
      setError('Please upload your resume first (Go to Resume Checker)');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await jobsAPI.getRecommendations(userId);
      setRecommendations(response.data.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch recommendations');
    } finally {
      setLoading(false);
    }
  };

  const getMatchColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-400 bg-green-500/20 border-green-500/40';
    if (percentage >= 60) return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/40';
    return 'text-orange-400 bg-orange-500/20 border-orange-500/40';
  };

  const getMatchGradient = (percentage: number) => {
    if (percentage >= 80) return 'from-green-500 to-emerald-600';
    if (percentage >= 60) return 'from-yellow-500 to-orange-600';
    return 'from-orange-500 to-red-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-8">
      <div className="max-w-7xl mx-auto animate-fadeIn">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl mb-6 animate-float shadow-2xl shadow-orange-500/30">
            <Briefcase className="text-white" size={48} />
          </div>
          <h1 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-600 bg-clip-text text-transparent">
              Job Recommendations
            </span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            AI-matched jobs based on your skills and experience
          </p>
        </div>

        {error && (
          <div className="mb-6">
            <Alert type="error" message={error} onClose={() => setError('')} />
          </div>
        )}

        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm">
            <LoadingSpinner message="AI is analyzing job matches..." />
          </div>
        ) : recommendations.length === 0 ? (
          <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
            <AlertCircle className="text-orange-400 mx-auto mb-4" size={64} />
            <p className="text-gray-300 text-lg">
              No recommendations available. Please upload your resume first.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {recommendations.map((rec, index) => (
              <div 
                key={rec.job.id} 
                className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-white/20 hover:scale-102 transition-all duration-300 shadow-2xl animate-slideUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Job Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="p-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl">
                        <Building2 className="text-white" size={24} />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold text-white mb-1">
                          {rec.job.title}
                        </h2>
                        <p className="text-lg text-gray-300 font-medium">{rec.job.company}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3 text-sm">
                      {rec.job.location && (
                        <span className="flex items-center text-gray-400">
                          <MapPin size={16} className="mr-2" />
                          {rec.job.location}
                        </span>
                      )}
                      {rec.job.salary && (
                        <span className="flex items-center text-green-400">
                          <DollarSign size={16} className="mr-2" />
                          {rec.job.salary}
                        </span>
                      )}
                      <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/40 text-blue-300 rounded-full text-xs font-medium">
                        {rec.job.type}
                      </span>
                    </div>
                  </div>
                  
                  {/* Match Score Badge */}
                  <div className="flex-shrink-0 ml-6">
                    <div className={`relative inline-flex items-center justify-center w-24 h-24 rounded-2xl border-4 ${getMatchColor(rec.matchPercentage)}`}>
                      <div className="text-center">
                        <div className="text-3xl font-bold">{rec.matchPercentage}%</div>
                        <div className="text-xs opacity-80">Match</div>
                      </div>
                      <Star className="absolute -top-2 -right-2 text-yellow-400" size={20} fill="currentColor" />
                    </div>
                  </div>
                </div>

                {/* Job Description */}
                <p className="text-gray-300 mb-6 leading-relaxed">{rec.job.description}</p>

                {/* Skills */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-400 mb-3">Required Skills:</h4>
                  <div className="flex flex-wrap gap-3">
                    {rec.job.skills.map((skill, idx) => (
                      <span key={idx} className="px-4 py-2 bg-slate-700/50 border border-white/10 text-gray-200 rounded-lg text-sm font-medium hover:bg-slate-700 hover:scale-105 transition-all duration-300">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Why Recommended */}
                {rec.reasons && rec.reasons.length > 0 && (
                  <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 mb-6">
                    <h4 className="text-base font-semibold text-green-400 mb-3 flex items-center gap-2">
                      <CheckCircle size={20} />
                      Why this job is a great match:
                    </h4>
                    <ul className="space-y-2">
                      {rec.reasons.map((reason, idx) => (
                        <li key={idx} className="text-sm text-green-200 flex items-start gap-2">
                          <CheckCircle size={16} className="flex-shrink-0 mt-0.5" />
                          {reason}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Expandable Section */}
                <button
                  onClick={() => setExpandedJob(expandedJob === rec.job.id ? null : rec.job.id)}
                  className="w-full px-6 py-3 bg-slate-700/50 hover:bg-slate-700 border border-white/10 rounded-xl text-cyan-400 font-medium transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {expandedJob === rec.job.id ? '↑ Show Less' : '↓ View More Details'}
                  <ExternalLink size={18} />
                </button>

                {expandedJob === rec.job.id && (
                  <div className="mt-6 space-y-6 animate-fadeIn">
                    {/* Concerns */}
                    {rec.concerns && rec.concerns.length > 0 && (
                      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
                        <h4 className="text-base font-semibold text-yellow-400 mb-3 flex items-center gap-2">
                          <AlertCircle size={20} />
                          Things to Consider:
                        </h4>
                        <ul className="space-y-2">
                          {rec.concerns.map((concern, idx) => (
                            <li key={idx} className="text-sm text-yellow-200 flex items-start gap-2">
                              <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                              {concern}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Interview Tips */}
                    {rec.interviewTips && rec.interviewTips.length > 0 && (
                      <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
                        <h4 className="text-base font-semibold text-blue-400 mb-3 flex items-center gap-2">
                          <TrendingUp size={20} />
                          Interview Preparation Tips:
                        </h4>
                        <ul className="space-y-2">
                          {rec.interviewTips.map((tip, idx) => (
                            <li key={idx} className="text-sm text-blue-200 flex items-start gap-2">
                              <TrendingUp size={16} className="flex-shrink-0 mt-0.5" />
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="flex gap-4">
                      <button className="flex-1 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl text-white font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-green-500/50">
                        Apply Now
                      </button>
                      <button className="flex-1 px-8 py-4 bg-slate-700/50 border border-white/20 rounded-xl text-white font-semibold hover:bg-slate-700 transition-all duration-300">
                        Save for Later
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {!loading && recommendations.length > 0 && (
          <div className="text-center mt-12">
            <button
              onClick={fetchRecommendations}
              className="px-10 py-4 backdrop-blur-md bg-white/10 border border-white/20 rounded-full text-white text-lg font-semibold hover:bg-white/20 transition-all duration-300"
            >
              🔄 Refresh Recommendations
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobRecommendations;
