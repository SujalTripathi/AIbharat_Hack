import React from 'react';

interface ModernLoaderProps {
  message?: string;
  subMessage?: string;
  type?: 'circular' | 'progress' | 'skeleton';
  progress?: number;
  showSteps?: boolean;
  steps?: { label: string; status: 'completed' | 'active' | 'pending' }[];
}

const ModernLoader: React.FC<ModernLoaderProps> = ({
  message = 'Processing...',
  subMessage = 'Please wait while we process your request',
  type = 'circular',
  progress = 0,
  showSteps = false,
  steps = [
    { label: 'Parsing Content', status: 'completed' },
    { label: 'Analyzing Keywords', status: 'active' },
    { label: 'Generating Insights', status: 'pending' }
  ]
}) => {
  if (type === 'circular') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-6 animate-fade-in-up">
        {/* Animated gradient circle */}
        <div className="relative w-32 h-32">
          <div className="absolute inset-0 rounded-full border-4 border-slate-700"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-cyan-500 border-r-blue-500 animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 animate-pulse"></div>
          </div>
        </div>
        
        {/* Pulsing text */}
        <div className="text-center space-y-2">
          <p className="text-xl font-semibold text-white animate-pulse">
            {message}
          </p>
          <p className="text-sm text-gray-400">
            {subMessage}
          </p>
        </div>
        
        {/* Progress steps */}
        {showSteps && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-sm mt-4">
            {steps.map((step, index) => (
              <React.Fragment key={index}>
                <span className={`flex items-center gap-2 ${
                  step.status === 'completed' ? 'text-green-400' :
                  step.status === 'active' ? 'text-cyan-400 animate-pulse' :
                  'text-gray-500'
                }`}>
                  {step.status === 'completed' && (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  )}
                  {step.status === 'active' && (
                    <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                  )}
                  {step.status === 'pending' && (
                    <div className="w-4 h-4 rounded-full border-2 border-gray-600"></div>
                  )}
                  {step.label}
                </span>
                {index < steps.length - 1 && (
                  <span className="hidden sm:inline text-gray-600">→</span>
                )}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (type === 'progress') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-6 animate-fade-in-up">
        <div className="w-full max-w-md space-y-4">
          <div className="text-center space-y-2">
            <p className="text-xl font-semibold text-white">
              {message}
            </p>
            <p className="text-sm text-gray-400">
              {subMessage}
            </p>
          </div>
          
          {/* Progress bar */}
          <div className="relative">
            <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full transition-all duration-500 relative overflow-hidden"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
              </div>
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-400">
              <span>Processing...</span>
              <span className="font-mono font-semibold">{progress}%</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'skeleton') {
    return (
      <div className="space-y-4 animate-fade-in-up">
        <div className="skeleton h-8 rounded-lg"></div>
        <div className="skeleton h-32 rounded-lg"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="skeleton h-24 rounded-lg"></div>
          <div className="skeleton h-24 rounded-lg"></div>
        </div>
        <div className="skeleton h-48 rounded-lg"></div>
      </div>
    );
  }

  return null;
};

export default ModernLoader;
