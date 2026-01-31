import React, { useState, useEffect } from 'react';
import { TrendingUp, BookOpen, Clock, CheckCircle, Target, Award, ExternalLink, Play, Star } from 'lucide-react';
import { skillGapAPI, jobsAPI } from '../services/api';
import { getUserId } from '../utils/storage';
import ModernLoader from '../components/ModernLoader';
import { showToast } from '../utils/toast';

interface Job {
  _id: string;
  title: string;
  company: string;
  skills: string[];
}

interface LearningResource {
  title: string;
  platform: string;
  url: string;
  duration: string;
  rating?: number;
  platformColor: string;
}

const SkillGapModern: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJobId, setSelectedJobId] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await jobsAPI.getAll();
      setJobs(response.data.data);
    } catch (err) {
      showToast.error('Failed to fetch jobs');
    }
  };

  const handleAnalyze = async () => {
    const userId = getUserId();
    
    if (!userId) {
      showToast.error('Please upload your resume first (Go to Resume Checker)');
      return;
    }

    if (!selectedJobId) {
      showToast.error('Please select a job to analyze');
      return;
    }

    setAnalyzing(true);

    try {
      const response = await skillGapAPI.analyze(userId, selectedJobId);
      setAnalysis(response.data.data);
      showToast.success('Analysis complete!');
    } catch (err: any) {
      showToast.error(err.response?.data?.message || 'Analysis failed');
    } finally {
      setAnalyzing(false);
    }
  };

  // Enhanced learning resources with real links
  const getResourcesForSkill = (skillName: string): LearningResource[] => {
    const skillLower = skillName.toLowerCase();
    
    // Map of skills to actual learning resources
    const resourceMap: { [key: string]: LearningResource[] } = {
      'react': [
        {
          title: 'React - The Complete Guide 2024',
          platform: 'Udemy',
          url: 'https://www.udemy.com/course/react-the-complete-guide-incl-redux/',
          duration: '48h',
          rating: 4.6,
          platformColor: 'bg-purple-600'
        },
        {
          title: 'Full React Course 2024',
          platform: 'YouTube',
          url: 'https://www.youtube.com/watch?v=bMknfKXIFA8',
          duration: '12h',
          rating: 4.8,
          platformColor: 'bg-red-600'
        },
        {
          title: 'React Specialization',
          platform: 'Coursera',
          url: 'https://www.coursera.org/specializations/react',
          duration: '3 months',
          rating: 4.7,
          platformColor: 'bg-blue-600'
        }
      ],
      'javascript': [
        {
          title: 'JavaScript - The Complete Guide',
          platform: 'Udemy',
          url: 'https://www.udemy.com/course/javascript-the-complete-guide-2020-beginner-advanced/',
          duration: '52h',
          rating: 4.6,
          platformColor: 'bg-purple-600'
        },
        {
          title: 'JavaScript Tutorial for Beginners',
          platform: 'YouTube',
          url: 'https://www.youtube.com/watch?v=W6NZfCO5SIk',
          duration: '6h',
          rating: 4.9,
          platformColor: 'bg-red-600'
        },
        {
          title: 'JavaScript for Beginners',
          platform: 'Coursera',
          url: 'https://www.coursera.org/learn/javascript-basics',
          duration: '4 weeks',
          rating: 4.5,
          platformColor: 'bg-blue-600'
        }
      ],
      'python': [
        {
          title: 'Complete Python Bootcamp',
          platform: 'Udemy',
          url: 'https://www.udemy.com/course/complete-python-bootcamp/',
          duration: '22h',
          rating: 4.6,
          platformColor: 'bg-purple-600'
        },
        {
          title: 'Python for Everybody',
          platform: 'YouTube',
          url: 'https://www.youtube.com/watch?v=8DvywoWv6nI',
          duration: '14h',
          rating: 4.9,
          platformColor: 'bg-red-600'
        },
        {
          title: 'Python for Everybody Specialization',
          platform: 'Coursera',
          url: 'https://www.coursera.org/specializations/python',
          duration: '8 months',
          rating: 4.8,
          platformColor: 'bg-blue-600'
        }
      ],
      'node': [
        {
          title: 'Node.js - The Complete Guide',
          platform: 'Udemy',
          url: 'https://www.udemy.com/course/nodejs-the-complete-guide/',
          duration: '40h',
          rating: 4.6,
          platformColor: 'bg-purple-600'
        },
        {
          title: 'Node.js Tutorial for Beginners',
          platform: 'YouTube',
          url: 'https://www.youtube.com/watch?v=TlB_eWDSMt4',
          duration: '3h',
          rating: 4.8,
          platformColor: 'bg-red-600'
        },
        {
          title: 'Server-side Development with NodeJS',
          platform: 'Coursera',
          url: 'https://www.coursera.org/learn/server-side-nodejs',
          duration: '4 weeks',
          rating: 4.7,
          platformColor: 'bg-blue-600'
        }
      ],
      'typescript': [
        {
          title: 'Understanding TypeScript',
          platform: 'Udemy',
          url: 'https://www.udemy.com/course/understanding-typescript/',
          duration: '15h',
          rating: 4.7,
          platformColor: 'bg-purple-600'
        },
        {
          title: 'TypeScript Course for Beginners',
          platform: 'YouTube',
          url: 'https://www.youtube.com/watch?v=BwuLxPH8IDs',
          duration: '9h',
          rating: 4.8,
          platformColor: 'bg-red-600'
        }
      ],
      'mongodb': [
        {
          title: 'MongoDB - The Complete Guide',
          platform: 'Udemy',
          url: 'https://www.udemy.com/course/mongodb-the-complete-developers-guide/',
          duration: '16h',
          rating: 4.6,
          platformColor: 'bg-purple-600'
        },
        {
          title: 'MongoDB Crash Course',
          platform: 'YouTube',
          url: 'https://www.youtube.com/watch?v=-56x56UppqQ',
          duration: '2h',
          rating: 4.7,
          platformColor: 'bg-red-600'
        }
      ],
      'aws': [
        {
          title: 'AWS Certified Solutions Architect',
          platform: 'Udemy',
          url: 'https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/',
          duration: '28h',
          rating: 4.7,
          platformColor: 'bg-purple-600'
        },
        {
          title: 'AWS Full Course',
          platform: 'YouTube',
          url: 'https://www.youtube.com/watch?v=ulprqHHWlng',
          duration: '10h',
          rating: 4.8,
          platformColor: 'bg-red-600'
        }
      ],
      'docker': [
        {
          title: 'Docker Mastery: with Kubernetes',
          platform: 'Udemy',
          url: 'https://www.udemy.com/course/docker-mastery/',
          duration: '19h',
          rating: 4.6,
          platformColor: 'bg-purple-600'
        },
        {
          title: 'Docker Tutorial for Beginners',
          platform: 'YouTube',
          url: 'https://www.youtube.com/watch?v=fqMOX6JJhGo',
          duration: '3h',
          rating: 4.9,
          platformColor: 'bg-red-600'
        }
      ]
    };

    // Check for matches
    for (const [key, resources] of Object.entries(resourceMap)) {
      if (skillLower.includes(key) || key.includes(skillLower)) {
        return resources;
      }
    }

    // Default resources
    return [
      {
        title: `${skillName} Complete Course`,
        platform: 'Udemy',
        url: `https://www.udemy.com/courses/search/?q=${encodeURIComponent(skillName)}`,
        duration: 'Various',
        platformColor: 'bg-purple-600'
      },
      {
        title: `${skillName} Tutorial`,
        platform: 'YouTube',
        url: `https://www.youtube.com/results?search_query=${encodeURIComponent(skillName + ' tutorial')}`,
        duration: 'Various',
        platformColor: 'bg-red-600'
      },
      {
        title: `${skillName} Courses`,
        platform: 'Coursera',
        url: `https://www.coursera.org/search?query=${encodeURIComponent(skillName)}`,
        duration: 'Various',
        platformColor: 'bg-blue-600'
      }
    ];
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'YouTube':
        return (
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        );
      case 'Udemy':
        return <BookOpen className="w-6 h-6 text-white" />;
      case 'Coursera':
        return <Award className="w-6 h-6 text-white" />;
      default:
        return <BookOpen className="w-6 h-6 text-white" />;
    }
  };

  if (analyzing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 flex items-center justify-center">
        <ModernLoader message="Analyzing Skill Gaps" subMessage="Comparing your skills with industry requirements..." />
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 py-8 sm:py-12 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 animate-fade-in-up">
            <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl mb-6 animate-float shadow-2xl shadow-purple-500/30">
              <TrendingUp className="text-white" size={48} />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                Skill Gap Analyzer
              </span>
            </h1>
            <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto px-4">
              Compare your skills with industry requirements and get personalized learning paths
            </p>
          </div>

          <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-3">
                  🎯 Select Target Job
                </label>
                <select
                  value={selectedJobId}
                  onChange={(e) => setSelectedJobId(e.target.value)}
                  className="w-full px-6 py-4 bg-slate-800/50 border-2 border-transparent focus:border-cyan-500 rounded-xl text-white transition-all duration-300 focus:ring-4 focus:ring-cyan-500/20 focus:outline-none"
                >
                  <option value="">Choose a job role...</option>
                  {jobs.map((job) => (
                    <option key={job._id} value={job._id}>
                      {job.title} - {job.company}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleAnalyze}
                disabled={!selectedJobId || analyzing}
                className="w-full px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl text-white text-lg font-semibold hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
              >
                <Target size={24} />
                Analyze Skill Gaps
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Analysis Results Display
  const matchScore = analysis.matchScore || 75;
  const skillsToLearn = analysis.missingSkills?.length || 5;
  const timeline = analysis.estimatedTime || '3-6 months';
  const readiness = analysis.careerReadiness || 68;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 py-8 sm:py-12 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12 animate-fade-in-up">
        {/* Header */}
        <header className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent mb-4">
            Skill Gap Analysis
          </h1>
          <p className="text-gray-400 text-base sm:text-lg">
            Your personalized learning roadmap
          </p>
        </header>
        
        {/* Stats Dashboard */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="backdrop-blur-lg bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-6 hover:scale-105 transition-transform">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                <CheckCircle className="text-white" size={24} />
              </div>
              <span className="text-4xl font-bold text-green-400">{matchScore}%</span>
            </div>
            <p className="text-gray-300 font-medium">Skills Match</p>
            <p className="text-sm text-gray-500 mt-1">Industry alignment</p>
          </div>
          
          <div className="backdrop-blur-lg bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-xl p-6 hover:scale-105 transition-transform">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                <BookOpen className="text-white" size={24} />
              </div>
              <span className="text-4xl font-bold text-orange-400">{skillsToLearn}</span>
            </div>
            <p className="text-gray-300 font-medium">Skills to Learn</p>
            <p className="text-sm text-gray-500 mt-1">Missing competencies</p>
          </div>
          
          <div className="backdrop-blur-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-6 hover:scale-105 transition-transform">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <Clock className="text-white" size={24} />
              </div>
              <span className="text-2xl sm:text-3xl font-bold text-blue-400">{timeline}</span>
            </div>
            <p className="text-gray-300 font-medium">Timeline</p>
            <p className="text-sm text-gray-500 mt-1">To reach proficiency</p>
          </div>
          
          <div className="backdrop-blur-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-6 hover:scale-105 transition-transform">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Award className="text-white" size={24} />
              </div>
              <span className="text-4xl font-bold text-purple-400">{readiness}%</span>
            </div>
            <p className="text-gray-300 font-medium">Career Readiness</p>
            <p className="text-sm text-gray-500 mt-1">Overall preparedness</p>
          </div>
        </section>

        {/* Learning Roadmap */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 flex items-center gap-3 flex-wrap">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Personalized Learning Path
            </span>
            <span className="px-3 py-1 text-xs bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white">
              CURATED
            </span>
          </h2>
          
          {(analysis.missingSkills || ['React', 'Node.js', 'TypeScript', 'AWS', 'Docker']).map((skill: string, index: number) => {
            const resources = getResourcesForSkill(skill);
            const priority = index < 2 ? 'High' : index < 4 ? 'Medium' : 'Low';
            const gapPercentage = 100 - (matchScore - (index * 8));
            
            return (
              <div 
                key={index}
                className="backdrop-blur-lg bg-slate-800/40 border border-slate-700/50 rounded-xl p-4 sm:p-6 mb-4 hover:bg-slate-800/60 transition-all hover:shadow-xl"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br ${
                      priority === 'High' ? 'from-red-500 to-orange-500' :
                      priority === 'Medium' ? 'from-yellow-500 to-orange-400' :
                      'from-green-500 to-emerald-500'
                    } flex items-center justify-center font-bold text-white text-lg sm:text-xl flex-shrink-0`}>
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-white">{skill}</h3>
                      <p className="text-xs sm:text-sm text-gray-400">Programming Language</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      priority === 'High' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                      priority === 'Medium' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                      'bg-green-500/20 text-green-400 border border-green-500/30'
                    }`}>
                      {priority} Priority
                    </span>
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-semibold border border-blue-500/30">
                      3-4 weeks
                    </span>
                  </div>
                </div>
                
                {/* Gap Percentage Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>Skill Gap</span>
                    <span className="font-semibold">{gapPercentage}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${
                        priority === 'High' ? 'from-red-500 to-orange-500' :
                        priority === 'Medium' ? 'from-yellow-500 to-orange-400' :
                        'from-green-500 to-emerald-500'
                      } transition-all duration-1000`}
                      style={{width: `${gapPercentage}%`}}
                    />
                  </div>
                </div>
                
                {/* Learning Resources - WORKING EXTERNAL LINKS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {resources.map((resource, i) => (
                    <a
                      key={i}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 p-4 bg-slate-900/50 hover:bg-slate-900 border border-slate-700 hover:border-cyan-500/50 rounded-lg transition-all hover:scale-105 hover:shadow-lg"
                    >
                      <div className={`w-10 h-10 rounded-lg ${resource.platformColor} flex items-center justify-center flex-shrink-0`}>
                        {getPlatformIcon(resource.platform)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-white truncate group-hover:text-cyan-400 transition-colors">
                          {resource.title}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                          <span>{resource.platform}</span>
                          <span>•</span>
                          <span>{resource.duration}</span>
                          {resource.rating && (
                            <>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                {resource.rating}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      
                      <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors flex-shrink-0" />
                    </a>
                  ))}
                </div>
                
                {/* Start Learning Button */}
                <button 
                  onClick={() => window.open(resources[0]?.url, '_blank')}
                  className="mt-4 w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 rounded-lg font-semibold text-white transition-all hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <Play size={18} />
                  Start Learning Now
                </button>
              </div>
            );
          })}
        </section>
        
        {/* Export Button */}
        <div className="flex justify-center">
          <button 
            onClick={() => showToast.info('PDF export feature coming soon!')}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl font-semibold text-white shadow-lg hover:shadow-[0_0_40px_rgba(168,85,247,0.4)] transition-all hover:scale-105 flex items-center gap-3"
          >
            <Award size={20} />
            Export Learning Roadmap (PDF)
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkillGapModern;
