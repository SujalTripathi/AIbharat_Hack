import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, MessageSquare, TrendingUp, Briefcase, Sparkles, ArrowRight, Zap, Target, Award, Users, BarChart3, Brain, CheckCircle, Star } from 'lucide-react';
import Logo from '../components/Logo';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const features = [
    {
      title: 'AI Resume & ATS Checker',
      description: 'Upload your resume and get instant ATS compatibility score with AI-powered suggestions to optimize for applicant tracking systems.',
      icon: FileText,
      path: '/resume',
      gradient: 'from-blue-500 to-cyan-500',
      iconBg: 'from-blue-400 to-cyan-400',
      benefits: ['Instant ATS Score', 'Smart Suggestions', 'Keyword Optimization']
    },
    {
      title: 'Mock Interview AI',
      description: 'Practice interviews with AI-generated questions tailored to your role and get detailed feedback on your answers with improvement tips.',
      icon: MessageSquare,
      path: '/interview',
      gradient: 'from-green-500 to-emerald-500',
      iconBg: 'from-green-400 to-emerald-400',
      benefits: ['Role-based Questions', 'Real-time Feedback', 'Performance Analytics']
    },
    {
      title: 'Skill Gap Analyzer',
      description: 'Identify missing skills and get personalized learning recommendations with curated resources for your dream job.',
      icon: TrendingUp,
      path: '/skill-gap',
      gradient: 'from-purple-500 to-pink-500',
      iconBg: 'from-purple-400 to-pink-400',
      benefits: ['Skill Mapping', 'Learning Paths', 'Progress Tracking']
    },
    {
      title: 'Job Recommendations',
      description: 'Get AI-matched job recommendations based on your skills, experience, and career aspirations with match percentages.',
      icon: Briefcase,
      path: '/jobs',
      gradient: 'from-orange-500 to-red-500',
      iconBg: 'from-orange-400 to-red-400',
      benefits: ['Smart Matching', 'Salary Insights', 'Application Tips']
    }
  ];

  const whyChooseUs = [
    {
      icon: Brain,
      title: 'Advanced AI Technology',
      description: 'Powered by cutting-edge AI models for accurate analysis and personalized recommendations'
    },
    {
      icon: Zap,
      title: 'Instant Results',
      description: 'Get comprehensive feedback and insights in seconds, not days'
    },
    {
      icon: Target,
      title: 'Personalized Approach',
      description: 'Tailored strategies based on your unique skills, experience, and goals'
    },
    {
      icon: Award,
      title: 'Proven Success',
      description: '10,000+ professionals have improved their career prospects with CareerAI'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Software Engineer',
      company: 'Tech Corp',
      image: 'SJ',
      rating: 5,
      text: 'CareerAI helped me improve my resume ATS score from 65 to 92. I landed 3 interviews in the first week!'
    },
    {
      name: 'Michael Chen',
      role: 'Product Manager',
      company: 'StartupXYZ',
      image: 'MC',
      rating: 5,
      text: 'The mock interview feature was a game-changer. I felt so prepared for my actual interviews.'
    },
    {
      name: 'Priya Sharma',
      role: 'Data Scientist',
      company: 'AI Labs',
      image: 'PS',
      rating: 5,
      text: 'The skill gap analysis showed me exactly what to learn. Got my dream job in 2 months!'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Advanced Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-20 left-1/3 w-[400px] h-[400px] bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1.5s'}}></div>
        </div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:100px_100px]"></div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-8 py-20">
        <div className="text-center space-y-8 animate-fadeIn max-w-5xl mx-auto">
          {/* Animated Logo */}
          <div className="flex justify-center mb-8 animate-float">
            <Logo size="lg" showText={false} className="scale-125" />
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white mb-6 animate-slideUp leading-tight">
            Career<span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">AI</span>
          </h1>
          
          <p className="text-2xl sm:text-3xl md:text-4xl text-transparent bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text font-bold animate-slideUp mb-4" style={{animationDelay: '0.2s'}}>
            AI-Powered Career Placement Tool
          </p>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto animate-slideUp leading-relaxed px-4" style={{animationDelay: '0.3s'}}>
            Your intelligent companion for resume optimization, interview preparation, skill development, and job matching. Land your dream job with the power of AI.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slideUp" style={{animationDelay: '0.4s'}}>
            <button
              onClick={() => navigate('/resume')}
              className="group relative inline-flex items-center space-x-3 px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full text-white text-base sm:text-lg font-bold hover:scale-110 hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 w-full sm:w-auto"
            >
              <span>Get Started Free</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button
              onClick={() => navigate('/history')}
              className="inline-flex items-center space-x-3 px-8 sm:px-10 py-4 sm:py-5 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-full text-white text-base sm:text-lg font-bold hover:bg-white/20 hover:scale-105 transition-all duration-300 w-full sm:w-auto"
            >
              <Users size={20} />
              <span>View History</span>
            </button>
          </div>

          {/* Enhanced Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 pt-12 sm:pt-16 max-w-4xl mx-auto animate-slideUp" style={{animationDelay: '0.5s'}}>
            <div className="text-center p-4 sm:p-6 backdrop-blur-lg bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 hover:scale-105 transition-all duration-300">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text mb-2">95%</div>
              <div className="text-xs sm:text-sm text-gray-400 font-medium">ATS Pass Rate</div>
            </div>
            <div className="text-center p-4 sm:p-6 backdrop-blur-lg bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 hover:scale-105 transition-all duration-300">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text mb-2">10K+</div>
              <div className="text-xs sm:text-sm text-gray-400 font-medium">Interviews Practiced</div>
            </div>
            <div className="text-center p-4 sm:p-6 backdrop-blur-lg bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 hover:scale-105 transition-all duration-300">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text mb-2">50+</div>
              <div className="text-xs sm:text-sm text-gray-400 font-medium">Job Opportunities</div>
            </div>
            <div className="text-center p-4 sm:p-6 backdrop-blur-lg bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 hover:scale-105 transition-all duration-300">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text mb-2">4.9★</div>
              <div className="text-xs sm:text-sm text-gray-400 font-medium">User Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section className="relative px-4 sm:px-8 pb-20 sm:pb-32">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-white mb-6 animate-fadeIn">
            Everything You Need to <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">Land Your Dream Job</span>
          </h2>
          <p className="text-center text-gray-400 text-base sm:text-lg mb-12 sm:mb-16 max-w-3xl mx-auto">
            Our comprehensive AI-powered tools cover every aspect of your job search journey
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.path}
                  onClick={() => navigate(feature.path)}
                  onMouseEnter={() => setHoveredFeature(index)}
                  onMouseLeave={() => setHoveredFeature(null)}
                  className="group relative backdrop-blur-lg bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 cursor-pointer hover:scale-105 hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-2xl hover:shadow-cyan-500/20 animate-slideUp"
                  style={{animationDelay: `${0.1 * index}s`}}
                >
                  {/* Gradient Glow on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-300`}></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-6">
                      <div className={`inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br ${feature.iconBg} rounded-2xl shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                        <Icon className="text-white" size={32} />
                      </div>
                      
                      <div className={`px-4 py-2 rounded-full text-xs font-bold bg-gradient-to-r ${feature.gradient} text-white shadow-lg transform ${hoveredFeature === index ? 'scale-105' : 'scale-100'} transition-all`}>
                        NEW
                      </div>
                    </div>
                    
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-300 mb-6 leading-relaxed text-sm sm:text-base">
                      {feature.description}
                    </p>

                    {/* Benefits List */}
                    <div className="space-y-2 mb-6">
                      {feature.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-gray-400">
                          <CheckCircle size={16} className="text-green-400 flex-shrink-0" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex items-center text-cyan-400 font-bold group-hover:translate-x-2 transition-transform text-sm sm:text-base">
                      <span>Get Started Now</span>
                      <ArrowRight size={18} className="ml-2" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="relative px-4 sm:px-8 pb-20 sm:pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6">
              Why Choose <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">CareerAI</span>?
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-3xl mx-auto">
              We combine cutting-edge AI technology with proven career strategies to give you an unfair advantage
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {whyChooseUs.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 hover:scale-105 hover:border-cyan-400/30 transition-all duration-300 animate-slideUp"
                  style={{animationDelay: `${0.1 * index}s`}}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-2xl mb-4">
                    <Icon className="text-cyan-400" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative px-4 sm:px-8 pb-20 sm:pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6">
              Trusted by <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">10,000+</span> Professionals
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-3xl mx-auto">
              See what our users say about their success with CareerAI
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 hover:bg-white/10 hover:scale-105 hover:border-yellow-400/30 transition-all duration-300 animate-slideUp"
                style={{animationDelay: `${0.1 * index}s`}}
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                
                <p className="text-gray-300 text-sm sm:text-base mb-6 leading-relaxed italic">
                  "{testimonial.text}"
                </p>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    {testimonial.image}
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">{testimonial.name}</div>
                    <div className="text-gray-400 text-xs">{testimonial.role} • {testimonial.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-4 sm:px-8 pb-20 sm:pb-32">
        <div className="max-w-5xl mx-auto">
          <div className="relative backdrop-blur-lg bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-white/20 rounded-3xl p-8 sm:p-12 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 animate-pulse"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6">
                Ready to Transform Your <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Career</span>?
              </h2>
              <p className="text-gray-300 text-base sm:text-lg mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed">
                Join thousands of professionals who have already accelerated their career journey with CareerAI
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate('/resume')}
                  className="group inline-flex items-center justify-center space-x-3 px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full text-white text-base sm:text-lg font-bold hover:scale-110 hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300"
                >
                  <Sparkles size={20} />
                  <span>Start Free Trial</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              
              <p className="text-gray-400 text-xs sm:text-sm mt-6">
                No credit card required • Get started in 60 seconds
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
