import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ className = '', showText = true, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl'
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Career AI Logo - Circuit Brain with Growth Arrow */}
      <div className={`${sizeClasses[size]} relative flex-shrink-0`}>
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {/* Outer circle with gradient */}
          <defs>
            <linearGradient id="circleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#06b6d4', stopOpacity: 1 }} />
            </linearGradient>
            <linearGradient id="arrowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#06b6d4', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          
          {/* Circuit pattern circle */}
          <circle cx="100" cy="100" r="85" fill="none" stroke="url(#circleGrad)" strokeWidth="8" opacity="0.3" />
          
          {/* Circuit nodes */}
          <circle cx="60" cy="70" r="6" fill="#3b82f6" />
          <circle cx="140" cy="70" r="6" fill="#8b5cf6" />
          <circle cx="60" cy="130" r="6" fill="#06b6d4" />
          <circle cx="140" cy="130" r="6" fill="#3b82f6" />
          
          {/* Circuit lines */}
          <line x1="60" y1="70" x2="100" y2="85" stroke="#3b82f6" strokeWidth="3" opacity="0.6" />
          <line x1="140" y1="70" x2="100" y2="85" stroke="#8b5cf6" strokeWidth="3" opacity="0.6" />
          <line x1="60" y1="130" x2="100" y2="115" stroke="#06b6d4" strokeWidth="3" opacity="0.6" />
          <line x1="140" y1="130" x2="100" y2="115" stroke="#3b82f6" strokeWidth="3" opacity="0.6" />
          
          {/* Central brain/mountain shape */}
          <path 
            d="M 70 100 Q 85 80 100 85 Q 115 80 130 100" 
            fill="none" 
            stroke="url(#circleGrad)" 
            strokeWidth="6"
            strokeLinecap="round"
          />
          
          {/* Growth arrow */}
          <path 
            d="M 90 140 L 130 100 L 170 60" 
            fill="none" 
            stroke="url(#arrowGrad)" 
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <polygon 
            points="170,60 160,70 180,70" 
            fill="url(#arrowGrad)"
          />
          <polygon 
            points="170,60 160,70 170,80" 
            fill="url(#arrowGrad)"
          />
          
          {/* AI Brain icon in the corner */}
          <g transform="translate(150, 150)">
            <circle cx="0" cy="0" r="20" fill="#8b5cf6" opacity="0.2" />
            <path 
              d="M -8 -5 Q -8 -10 0 -10 Q 8 -10 8 -5 L 8 5 Q 8 10 0 10 Q -8 10 -8 5 Z" 
              fill="#8b5cf6"
            />
            <circle cx="-4" cy="-2" r="2" fill="white" />
            <circle cx="4" cy="-2" r="2" fill="white" />
            <path d="M -6 3 Q 0 6 6 3" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </g>
        </svg>
      </div>
      
      {showText && (
        <span className={`${textSizeClasses[size]} font-bold tracking-tight`}>
          <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
            Career
          </span>
          <span className="text-white ml-1">AI</span>
        </span>
      )}
    </div>
  );
};

export default Logo;
