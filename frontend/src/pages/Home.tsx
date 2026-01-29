import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, MessageSquare, TrendingUp, Briefcase, Sparkles, ArrowRight } from 'lucide-react';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: 'AI Resume & ATS Checker',
      description: 'Upload your resume and get instant ATS compatibility score with AI-powered suggestions.',
      icon: FileText,
      path: '/resume',
      gradient: 'from-blue-500 to-cyan-500',
      iconBg: 'from-blue-400 to-cyan-400'
    },
    {
      title: 'Mock Interview AI',
      description: 'Practice interviews with AI-generated questions and get detailed feedback on your answers.',
      icon: MessageSquare,
      path: '/interview',
      gradient: 'from-green-500 to-emerald-500',
      iconBg: 'from-green-400 to-emerald-400'
    },
    {
      title: 'Skill Gap Analyzer',
      description: 'Identify missing skills and get personalized learning recommendations for your dream job.',
      icon: TrendingUp,
      path: '/skill-gap',
      gradient: 'from-purple-500 to-pink-500',
      iconBg: 'from-purple-400 to-pink-400'
    },
    {
      title: 'Job Recommendations',
      description: 'Get AI-matched job recommendations based on your skills and experience.',
      icon: Briefcase,
      path: '/jobs',
      gradient: 'from-orange-500 to-red-500',
      iconBg: 'from-orange-400 to-red-400'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-8 py-20">
        <div className="text-center space-y-8 animate-fadeIn">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-3xl mb-6 animate-float shadow-2xl shadow-blue-500/50">
            <Sparkles className="text-white" size={40} />
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 animate-slideUp">
            Career<span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">AI</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto animate-slideUp" style={{animationDelay: '0.2s'}}>
            AI-Powered Career Placement Tool
          </p>
          
          <p className="text-lg text-gray-400 max-w-2xl mx-auto animate-slideUp" style={{animationDelay: '0.3s'}}>
            Your intelligent companion for resume optimization, interview preparation, skill development, and job matching
          </p>

          <button
            onClick={() => navigate('/resume')}
            className="inline-flex items-center space-x-3 px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-white text-lg font-semibold hover:scale-110 hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 animate-slideUp"
            style={{animationDelay: '0.4s'}}
          >
            <span>Get Started</span>
            <ArrowRight size={20} />
          </button>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-16 max-w-3xl mx-auto animate-slideUp" style={{animationDelay: '0.5s'}}>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">95%</div>
              <div className="text-sm text-gray-400">ATS Pass Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">10K+</div>
              <div className="text-sm text-gray-400">Interviews Practiced</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">50+</div>
              <div className="text-sm text-gray-400">Job Opportunities</div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section className="relative px-8 pb-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-16 animate-fadeIn">
            Everything You Need to <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Land Your Dream Job</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.path}
                  onClick={() => navigate(feature.path)}
                  className="group relative backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-8 cursor-pointer hover:scale-105 hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-2xl hover:shadow-cyan-500/20 animate-slideUp"
                  style={{animationDelay: `${0.1 * index}s`}}
                >
                  {/* Gradient Glow on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
                  
                  <div className="relative z-10">
                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.iconBg} rounded-xl mb-6 shadow-lg`}>
                      <Icon className="text-white" size={32} />
                    </div>
                    
                    <h3 className="text-2xl font-semibold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {feature.description}
                    </p>
                    
                    <div className="flex items-center text-cyan-400 font-medium group-hover:translate-x-2 transition-transform">
                      <span>Get Started</span>
                      <ArrowRight size={18} className="ml-2" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
