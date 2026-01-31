import React, { useState, useEffect, useCallback } from 'react';
import { MessageSquare, Clock, Award, ChevronRight, SkipForward } from 'lucide-react';
import { interviewAPI } from '../services/api';
import ModernLoader from '../components/ModernLoader';
import { showToast, triggerConfetti } from '../utils/toast';

interface Question {
  question: string;
  type: string;
  difficulty: string;
  context?: string;
  answer?: string;
  score?: number;
  feedback?: any;
}

const MockInterviewModern: React.FC = () => {
  const [jobRole, setJobRole] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('entry');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [evaluating, setEvaluating] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(180); // 3 minutes per question
  const [feedback, setFeedback] = useState<any>(null);

  const handleSubmit = useCallback(async () => {
    if (!currentAnswer.trim()) {
      showToast.error('Please provide an answer');
      return;
    }

    setEvaluating(true);

    try {
      const currentQuestion = questions[currentQuestionIndex];
      const response = await interviewAPI.evaluateAnswer(
        currentQuestion.question,
        currentAnswer,
        jobRole
      );

      const evaluation = response.data.data;
      setFeedback(evaluation);
      setSubmitted(true);
      
      const updatedQuestions = [...questions];
      updatedQuestions[currentQuestionIndex] = {
        ...currentQuestion,
        answer: currentAnswer,
        score: evaluation.score,
        feedback: evaluation
      };
      setQuestions(updatedQuestions);

      if (evaluation.score >= 70) {
        showToast.success('Excellent answer!');
      } else if (evaluation.score >= 40) {
        showToast.info('Good effort!');
      }
    } catch (err: any) {
      showToast.error(err.response?.data?.message || 'Evaluation failed');
    } finally {
      setEvaluating(false);
    }
  }, [currentAnswer, currentQuestionIndex, jobRole, questions]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (questions.length > 0 && !completed && !submitted && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [questions, completed, submitted, timeRemaining, handleSubmit]);

  // Keyboard shortcut
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'Enter' && currentAnswer.trim() && !submitted) {
        handleSubmit();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentAnswer, submitted, handleSubmit]);

  const handleGenerateQuestions = async () => {
    if (!jobRole.trim()) {
      showToast.error('Please enter a job role');
      return;
    }

    setLoading(true);

    try {
      const response = await interviewAPI.getQuestions(jobRole, experienceLevel, 5);
      setQuestions(response.data.data.questions);
      setCurrentQuestionIndex(0);
      setCompleted(false);
      setTimeRemaining(180);
      setSubmitted(false);
      showToast.success('Interview started! Good luck! 🚀');
    } catch (err: any) {
      showToast.error(err.response?.data?.message || 'Failed to generate questions');
    } finally {
      setLoading(false);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentAnswer('');
      setSubmitted(false);
      setFeedback(null);
      setTimeRemaining(180);
    } else {
      setCompleted(true);
      triggerConfetti();
      showToast.success('Interview completed! Great job! 🎉', true);
    }
  };

  const handleSkip = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentAnswer('');
      setSubmitted(false);
      setFeedback(null);
      setTimeRemaining(180);
      showToast.info('Question skipped');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <ModernLoader message="Generating Interview Questions" subMessage="Preparing your personalized interview..." />
      </div>
    );
  }

  if (evaluating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <ModernLoader 
          message="Evaluating Your Answer" 
          subMessage="Our AI is analyzing your response..." 
          showSteps={true}
          steps={[
            { label: 'Understanding Context', status: 'completed' },
            { label: 'Analyzing Content', status: 'active' },
            { label: 'Generating Feedback', status: 'pending' }
          ]}
        />
      </div>
    );
  }

  if (completed) {
    const avgScore = questions.reduce((acc, q) => acc + (q.score || 0), 0) / questions.filter(q => q.score).length;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 sm:py-12 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mb-6 animate-float">
            <Award className="text-white" size={48} />
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Interview Completed! 🎉
          </h1>
          
          <div className="backdrop-blur-lg bg-slate-800/40 border border-slate-700/50 rounded-2xl p-8">
            <div className="relative w-40 h-40 mx-auto mb-6">
              <svg className="transform -rotate-90 w-full h-full">
                <circle cx="80" cy="80" r="70" stroke="rgba(148, 163, 184, 0.2)" strokeWidth="10" fill="none"/>
                <circle 
                  cx="80" 
                  cy="80" 
                  r="70" 
                  stroke={avgScore >= 70 ? '#10b981' : avgScore >= 40 ? '#fbbf24' : '#ef4444'}
                  strokeWidth="10" 
                  fill="none"
                  strokeDasharray={`${(avgScore/100) * 440} 440`}
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-bold text-white">{Math.round(avgScore)}</span>
                <span className="text-sm text-gray-400 mt-1">Avg Score</span>
              </div>
            </div>
            
            <p className="text-xl text-gray-300 mb-6">
              {avgScore >= 70 ? '🌟 Outstanding performance!' : avgScore >= 40 ? '👍 Good job! Room for improvement.' : '💪 Keep practicing!'}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <p className="text-sm text-blue-400 mb-1">Total Questions</p>
                <p className="text-3xl font-bold text-white">{questions.length}</p>
              </div>
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <p className="text-sm text-green-400 mb-1">Answered</p>
                <p className="text-3xl font-bold text-white">{questions.filter(q => q.answer).length}</p>
              </div>
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                <p className="text-sm text-purple-400 mb-1">Avg Score</p>
                <p className="text-3xl font-bold text-white">{Math.round(avgScore)}%</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.location.reload()}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-xl font-semibold text-white transition-all hover:scale-105"
            >
              Start New Interview
            </button>
            <button
              onClick={() => window.location.href = '/history'}
              className="px-8 py-4 bg-slate-700 hover:bg-slate-600 rounded-xl font-semibold text-white transition-all hover:scale-105"
            >
              View History
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 sm:py-12 px-4 sm:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 animate-fade-in-up">
            <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full mb-6 animate-float">
              <MessageSquare className="text-white" size={48} />
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                AI Mock Interview
              </span>
            </h1>
            <p className="text-base sm:text-lg text-gray-300">
              Practice with AI-powered interview questions tailored to your role
            </p>
          </div>

          <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-3">
                  🎯 Job Role
                </label>
                <input
                  type="text"
                  value={jobRole}
                  onChange={(e) => setJobRole(e.target.value)}
                  placeholder="e.g., Software Engineer, Product Manager"
                  className="w-full px-6 py-4 bg-slate-800/50 border-2 border-transparent focus:border-cyan-500 rounded-xl text-white placeholder-gray-500 transition-all duration-300 focus:ring-4 focus:ring-cyan-500/20 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-3">
                  📊 Experience Level
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { value: 'entry', label: 'Entry Level', emoji: '🌱' },
                    { value: 'mid', label: 'Mid Level', emoji: '🚀' },
                    { value: 'senior', label: 'Senior', emoji: '⭐' }
                  ].map((level) => (
                    <button
                      key={level.value}
                      onClick={() => setExperienceLevel(level.value)}
                      className={`px-6 py-4 rounded-xl font-semibold transition-all hover:scale-105 ${
                        experienceLevel === level.value
                          ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg'
                          : 'bg-slate-800/50 text-gray-300 hover:bg-slate-800'
                      }`}
                    >
                      <span className="text-2xl mb-2 block">{level.emoji}</span>
                      {level.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleGenerateQuestions}
                disabled={!jobRole.trim() || loading}
                className="w-full px-10 py-5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-xl text-white text-lg font-semibold hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
              >
                <MessageSquare size={24} />
                Start Mock Interview
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="h-screen w-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col overflow-hidden">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-lg border-b border-white/10 px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
              <MessageSquare className="text-white" size={20} />
            </div>
            <h1 className="text-base sm:text-xl font-bold text-white hidden sm:block">Mock Interview</h1>
          </div>
          
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="text-xs sm:text-sm text-gray-300 font-medium">
              <span className="text-cyan-400">{currentQuestionIndex + 1}</span> / <span className="text-cyan-400">{questions.length}</span>
            </span>
            <div className="hidden sm:flex items-center gap-2">
              {questions.map((_, i) => (
                <div 
                  key={i}
                  className={`w-2 h-2 rounded-full ${
                    i < currentQuestionIndex ? 'bg-green-500' :
                    i === currentQuestionIndex ? 'bg-cyan-500 animate-pulse' :
                    'bg-slate-600'
                  }`}
                />
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700">
            <Clock className="text-orange-400" size={16} />
            <span className="font-mono text-sm sm:text-lg font-semibold text-white">
              {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
            </span>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-4 sm:px-8 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          {/* Question Card */}
          <div className="backdrop-blur-lg bg-slate-800/40 rounded-2xl p-6 sm:p-12 shadow-2xl border border-slate-700/50 animate-fade-in-up">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <span className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold ${
                currentQuestion.difficulty === 'EASY' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                currentQuestion.difficulty === 'MEDIUM' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                'bg-red-500/20 text-red-400 border border-red-500/30'
              }`}>
                {currentQuestion.difficulty}
              </span>
              <span className="px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                {currentQuestion.type}
              </span>
            </div>
            
            <h2 className="text-xl sm:text-2xl md:text-4xl font-medium text-white leading-relaxed mb-6">
              {currentQuestion.question}
            </h2>
            
            {currentQuestion.context && (
              <div className="mt-6 p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                <p className="text-sm text-blue-300 flex items-start gap-2">
                  <span className="text-lg">💡</span>
                  <span><strong>Context:</strong> {currentQuestion.context}</span>
                </p>
              </div>
            )}
          </div>
          
          {/* Answer Input or Feedback */}
          {!submitted ? (
            <div className="space-y-4 animate-fade-in-up">
              <textarea
                value={currentAnswer}
                onChange={(e) => setCurrentAnswer(e.target.value)}
                placeholder="Type your answer here... Be specific and provide examples."
                className="w-full min-h-[250px] sm:min-h-[350px] bg-slate-800/30 backdrop-blur-sm border-2 border-slate-700 focus:border-cyan-500 rounded-xl p-4 sm:p-6 text-base sm:text-lg text-white placeholder-gray-500 leading-relaxed resize-y transition-all focus:ring-4 focus:ring-cyan-500/20 focus:outline-none"
                maxLength={1000}
              />
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400 text-xs sm:text-sm">
                  Press <kbd className="px-2 py-1 bg-slate-700 rounded text-xs">Ctrl + Enter</kbd> to submit
                </span>
                <span className={`font-mono text-xs sm:text-sm ${
                  currentAnswer.length > 800 ? 'text-orange-400' :
                  currentAnswer.length === 1000 ? 'text-red-400' :
                  'text-gray-400'
                }`}>
                  {currentAnswer.length} / 1000
                </span>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={handleSubmit}
                  disabled={!currentAnswer.trim()}
                  className="flex-1 px-6 sm:px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:from-slate-700 disabled:to-slate-700 disabled:cursor-not-allowed rounded-xl font-semibold text-white text-base sm:text-lg shadow-lg hover:shadow-[0_0_40px_rgba(6,182,212,0.4)] transition-all hover:scale-105 disabled:hover:scale-100 flex items-center justify-center gap-3"
                >
                  <ChevronRight size={20} />
                  Submit Answer
                </button>
                
                <button
                  onClick={handleSkip}
                  className="px-6 py-4 bg-slate-700/50 hover:bg-slate-700 rounded-xl font-semibold text-gray-300 border border-slate-600 transition-all hover:scale-105 flex items-center justify-center gap-2"
                >
                  <SkipForward size={18} />
                  Skip
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6 animate-fade-in-up">
              {/* Score Badge */}
              <div className="flex flex-col items-center justify-center p-6 sm:p-8 backdrop-blur-lg bg-gradient-to-br from-slate-800/40 to-purple-900/20 rounded-2xl border border-slate-700/50">
                <div className="relative w-24 h-24 sm:w-32 sm:h-32 mb-6">
                  <svg className="transform -rotate-90 w-full h-full">
                    <circle cx="50%" cy="50%" r="58" stroke="rgba(148, 163, 184, 0.2)" strokeWidth="8" fill="none"/>
                    <circle 
                      cx="50%" 
                      cy="50%" 
                      r="58" 
                      stroke={feedback?.score >= 70 ? '#10b981' : feedback?.score >= 40 ? '#fbbf24' : '#ef4444'}
                      strokeWidth="8" 
                      fill="none"
                      strokeDasharray={`${((feedback?.score || 0)/100) * 365} 365`}
                      strokeLinecap="round"
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl sm:text-4xl font-bold text-white">{feedback?.score || 0}</span>
                  </div>
                </div>
                <p className="text-lg sm:text-xl font-semibold text-gray-300">Your Score</p>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  {feedback?.score >= 70 ? '🌟 Excellent answer!' : feedback?.score >= 40 ? '👍 Good effort!' : '💪 Needs improvement'}
                </p>
              </div>
              
              {/* Detailed Feedback */}
              {feedback && (
                <div className="backdrop-blur-lg bg-slate-800/40 rounded-xl p-4 sm:p-6 border border-slate-700/50">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-4">Detailed Feedback</h3>
                  <p className="text-gray-300 leading-relaxed text-sm sm:text-base">{feedback.feedback}</p>
                </div>
              )}
              
              <button
                onClick={handleNextQuestion}
                className="w-full px-6 sm:px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl font-semibold text-white text-base sm:text-lg shadow-lg hover:shadow-[0_0_40px_rgba(168,85,247,0.4)] transition-all hover:scale-105 flex items-center justify-center gap-3"
              >
                {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Complete Interview'}
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      </main>
      
      {/* Bottom Progress Bar */}
      <div className="h-2 bg-slate-800 relative">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-500 ease-out shadow-[0_0_20px_rgba(59,130,246,0.5)]"
          style={{width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`}}
        />
      </div>
    </div>
  );
};

export default MockInterviewModern;
