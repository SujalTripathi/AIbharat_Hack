import React, { useState, useEffect } from 'react';
import { MessageSquare, Send, CheckCircle, XCircle, Clock, Award } from 'lucide-react';
import { interviewAPI } from '../services/api';
import { getUserId } from '../utils/storage';
import LoadingSpinner from '../components/LoadingSpinner';
import Alert from '../components/Alert';

interface Question {
  question: string;
  type: string;
  difficulty: string;
  answer?: string;
  score?: number;
  feedback?: string;
}

const MockInterview: React.FC = () => {
  const [jobRole, setJobRole] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('entry');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [evaluating, setEvaluating] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (questions.length > 0 && !completed && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [questions, completed, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleGenerateQuestions = async () => {
    if (!jobRole) {
      setError('Please enter a job role');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await interviewAPI.getQuestions(jobRole, experienceLevel, 5);
      setQuestions(response.data.data.questions);
      setCurrentQuestionIndex(0);
      setCompleted(false);
      setTimeLeft(600);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to generate questions');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitAnswer = async () => {
    if (!currentAnswer.trim()) {
      setError('Please provide an answer');
      return;
    }

    setEvaluating(true);
    setError('');

    try {
      const currentQuestion = questions[currentQuestionIndex];
      const response = await interviewAPI.evaluateAnswer(
        currentQuestion.question,
        currentAnswer,
        jobRole
      );

      const evaluation = response.data.data;
      
      const updatedQuestions = [...questions];
      updatedQuestions[currentQuestionIndex] = {
        ...currentQuestion,
        answer: currentAnswer,
        score: evaluation.score,
        feedback: evaluation.feedback
      };
      setQuestions(updatedQuestions);

      setShowFeedback(true);
      
      setTimeout(() => {
        setShowFeedback(false);
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setCurrentAnswer('');
        } else {
          const userId = getUserId();
          if (userId) {
            interviewAPI.saveSession({
              userId,
              jobRole,
              questions: updatedQuestions
            });
          }
          setCompleted(true);
        }
      }, 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to evaluate answer');
    } finally {
      setEvaluating(false);
    }
  };

  const calculateOverallScore = () => {
    const answeredQuestions = questions.filter(q => q.score !== undefined);
    if (answeredQuestions.length === 0) return 0;
    const total = answeredQuestions.reduce((sum, q) => sum + (q.score || 0), 0);
    return Math.round((total / answeredQuestions.length) * 10);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500/20 text-green-300 border-green-500/40';
      case 'medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40';
      case 'hard': return 'bg-red-500/20 text-red-300 border-red-500/40';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/40';
    }
  };

  return (
    <div className="h-screen w-full flex flex-col bg-gradient-to-br from-slate-900 to-slate-800 overflow-hidden">
      {error && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4">
          <Alert type="error" message={error} onClose={() => setError('')} />
        </div>
      )}

      {questions.length === 0 ? (
        <div className="flex-1 flex items-center justify-center px-8">
          <div className="max-w-2xl w-full animate-fadeIn">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl mb-6 animate-float shadow-2xl shadow-green-500/30">
                <MessageSquare className="text-white" size={40} />
              </div>
              <h1 className="text-5xl font-bold text-white mb-4">
                Mock Interview <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">AI</span>
              </h1>
              <p className="text-lg text-gray-300">
                Practice interviews with AI-generated questions and get instant feedback
              </p>
            </div>

            <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Job Role
                  </label>
                  <input
                    type="text"
                    value={jobRole}
                    onChange={(e) => setJobRole(e.target.value)}
                    placeholder="e.g., Frontend Developer, Data Scientist"
                    className="w-full px-6 py-4 bg-slate-700/30 border-2 border-transparent focus:border-green-500 rounded-xl text-white text-lg placeholder-gray-500 transition-all duration-300"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Experience Level
                  </label>
                  <select
                    value={experienceLevel}
                    onChange={(e) => setExperienceLevel(e.target.value)}
                    className="w-full px-6 py-4 bg-slate-700/30 border-2 border-transparent focus:border-green-500 rounded-xl text-white text-lg transition-all duration-300"
                    disabled={loading}
                  >
                    <option value="entry">Entry Level (0-2 years)</option>
                    <option value="mid">Mid Level (3-5 years)</option>
                    <option value="senior">Senior Level (6+ years)</option>
                  </select>
                </div>

                <button
                  onClick={handleGenerateQuestions}
                  disabled={loading || !jobRole}
                  className="w-full px-12 py-5 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full text-white text-lg font-semibold hover:scale-105 hover:shadow-2xl hover:shadow-green-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {loading ? 'Generating Questions...' : 'Start Interview'}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : !completed ? (
        <>
          {/* Sticky Header */}
          <div className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-lg border-b border-white/10 px-8 py-4">
            <div className="flex justify-between items-center max-w-6xl mx-auto">
              <div className="flex items-center gap-3">
                <span className="text-lg text-gray-300">
                  Question <span className="text-white font-bold">{currentQuestionIndex + 1}</span> of {questions.length}
                </span>
              </div>
              
              <div className={`px-4 py-2 rounded-full border ${getDifficultyColor(questions[currentQuestionIndex].difficulty)}`}>
                <span className="text-sm font-semibold uppercase">{questions[currentQuestionIndex].difficulty}</span>
              </div>
              
              <div className="flex items-center gap-2 text-gray-300">
                <Clock size={20} />
                <span className={`text-lg font-mono ${timeLeft < 60 ? 'text-red-400 animate-pulse' : ''}`}>
                  {formatTime(timeLeft)}
                </span>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 overflow-y-auto px-8 py-12">
            <div className="max-w-4xl mx-auto space-y-8">
              {/* Question Card */}
              <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-12 shadow-2xl animate-slideUp">
                <div className="mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase bg-blue-500/20 text-blue-300 border border-blue-500/40`}>
                    {questions[currentQuestionIndex].type}
                  </span>
                </div>
                <h2 className="text-3xl font-medium text-white leading-relaxed">
                  {questions[currentQuestionIndex].question}
                </h2>
              </div>

              {/* Answer Input */}
              <div className="space-y-4 animate-fadeIn" style={{animationDelay: '0.2s'}}>
                <textarea
                  value={currentAnswer}
                  onChange={(e) => setCurrentAnswer(e.target.value)}
                  placeholder="Type your answer here... Be specific and provide examples."
                  rows={12}
                  className="w-full min-h-[320px] p-6 bg-slate-700/30 border-2 border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl text-lg leading-relaxed text-white placeholder-gray-500 resize-none transition-all duration-300"
                  disabled={evaluating}
                />
                
                <div className="flex justify-between items-center">
                  <span className={`text-sm ${currentAnswer.length > 800 ? 'text-orange-400' : currentAnswer.length > 950 ? 'text-red-400' : 'text-gray-400'}`}>
                    {currentAnswer.length} / 1000 characters
                  </span>
                  
                  <div className="flex gap-4">
                    <button
                      onClick={() => {
                        setCurrentAnswer('');
                        if (currentQuestionIndex < questions.length - 1) {
                          setCurrentQuestionIndex(currentQuestionIndex + 1);
                        }
                      }}
                      className="px-6 py-3 text-gray-400 hover:text-white transition-colors"
                      disabled={evaluating}
                    >
                      Skip
                    </button>
                    
                    <button
                      onClick={handleSubmitAnswer}
                      disabled={evaluating || !currentAnswer.trim()}
                      className="px-12 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full text-lg font-semibold text-white hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-3"
                    >
                      {evaluating ? (
                        <>
                          <LoadingSpinner />
                          <span>Evaluating...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Answer</span>
                          <Send size={20} />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Previous Answers */}
              {currentQuestionIndex > 0 && (
                <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Previous Answers</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {questions.slice(0, currentQuestionIndex).map((q, index) => (
                      <div
                        key={index}
                        className="bg-slate-700/30 p-4 rounded-lg border border-white/10"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-400">Q{index + 1}</span>
                          <span className={`text-lg font-bold ${q.score && q.score >= 7 ? 'text-green-400' : q.score && q.score >= 5 ? 'text-yellow-400' : 'text-red-400'}`}>
                            {q.score}/10
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Feedback Panel */}
          {showFeedback && questions[currentQuestionIndex].score !== undefined && (
            <div className="fixed inset-x-0 bottom-0 bg-slate-800/90 backdrop-blur-lg rounded-t-3xl p-8 shadow-2xl border-t border-white/20 animate-slideUp z-50">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-start gap-8">
                  <div className="flex-shrink-0">
                    <div className={`w-28 h-28 rounded-full flex items-center justify-center ${questions[currentQuestionIndex].score! >= 7 ? 'bg-green-500/20 border-4 border-green-500' : 'bg-yellow-500/20 border-4 border-yellow-500'}`}>
                      <span className={`text-4xl font-bold ${questions[currentQuestionIndex].score! >= 7 ? 'text-green-400' : 'text-yellow-400'}`}>
                        {questions[currentQuestionIndex].score}/10
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {questions[currentQuestionIndex].score! >= 7 ? '🎉 Great Answer!' : '💡 Good Effort!'}
                    </h3>
                    <p className="text-gray-300 mb-4">{questions[currentQuestionIndex].feedback}</p>
                    <div className="text-sm text-gray-400">
                      {currentQuestionIndex < questions.length - 1 ? 'Moving to next question...' : 'Completing interview...'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Progress Bar */}
          <div className="fixed bottom-0 left-0 right-0 h-2 bg-slate-900 z-40">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 transition-all duration-400 ease-out shadow-[0_0_20px_rgba(59,130,246,0.6)]"
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </>
      ) : (
        <div className="flex-1 overflow-y-auto px-8 py-12">
          <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
            {/* Overall Score */}
            <div className="text-center py-12 backdrop-blur-lg bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl">
              <div className="inline-flex items-center justify-center w-32 h-32 bg-white/10 rounded-full mb-6 border-4 border-green-500">
                <span className="text-6xl font-bold text-green-400">{calculateOverallScore()}</span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Interview Completed!</h2>
              <p className="text-xl text-gray-300">Overall Performance Score</p>
            </div>

            {/* Detailed Results */}
            <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Award className="text-yellow-400" size={28} />
                Interview Summary
              </h3>
              <div className="space-y-6">
                {questions.map((q, index) => (
                  <div
                    key={index}
                    className="backdrop-blur-md bg-slate-800/50 border border-white/10 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-sm font-medium text-gray-300">Question {index + 1}</span>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor(q.difficulty)}`}>
                            {q.difficulty}
                          </span>
                        </div>
                        <p className="text-white font-medium mb-3">{q.question}</p>
                      </div>
                      <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                        {q.score && q.score >= 7 ? (
                          <CheckCircle className="text-green-400" size={24} />
                        ) : (
                          <XCircle className="text-yellow-400" size={24} />
                        )}
                        <span className="text-2xl font-bold text-white">{q.score}/10</span>
                      </div>
                    </div>

                    <div className="bg-slate-700/30 rounded-lg p-4 mb-3">
                      <p className="text-sm text-gray-300">
                        <span className="font-medium text-gray-400">Your answer: </span>
                        {q.answer}
                      </p>
                    </div>

                    {q.feedback && (
                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                        <p className="text-sm text-blue-200">
                          <span className="font-medium">Feedback: </span>
                          {q.feedback}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setQuestions([]);
                setJobRole('');
                setCurrentQuestionIndex(0);
                setCurrentAnswer('');
                setCompleted(false);
                setTimeLeft(600);
              }}
              className="w-full px-12 py-5 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full text-white text-lg font-semibold hover:scale-105 hover:shadow-2xl hover:shadow-green-500/50 transition-all duration-300"
            >
              Start New Interview
            </button>
          </div>
        </div>
      )}

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm z-50">
          <LoadingSpinner message="Generating interview questions..." />
        </div>
      )}
    </div>
  );
};

export default MockInterview;
