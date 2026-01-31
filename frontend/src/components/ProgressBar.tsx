import React from 'react';

interface ProgressBarProps {
  value: number; // 0-100
  max?: number;
  variant?: 'default' | 'gradient' | 'striped';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  label?: string;
  color?: 'blue' | 'green' | 'purple' | 'red' | 'orange' | 'cyan';
  animated?: boolean;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  variant = 'gradient',
  size = 'md',
  showLabel = false,
  label,
  color = 'blue',
  animated = true,
  className = ''
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'h-2';
      case 'md':
        return 'h-3';
      case 'lg':
        return 'h-4';
      default:
        return 'h-3';
    }
  };

  const getColorClasses = () => {
    const colors = {
      blue: 'from-blue-500 to-blue-600',
      green: 'from-green-500 to-green-600',
      purple: 'from-purple-500 to-purple-600',
      red: 'from-red-500 to-red-600',
      orange: 'from-orange-500 to-orange-600',
      cyan: 'from-cyan-500 to-cyan-600'
    };
    return colors[color] || colors.blue;
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'gradient':
        return `bg-gradient-to-r ${getColorClasses()}`;
      case 'striped':
        return `bg-gradient-to-r ${getColorClasses()} bg-striped`;
      case 'default':
        return `bg-${color}-500`;
      default:
        return `bg-gradient-to-r ${getColorClasses()}`;
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {(showLabel || label) && (
        <div className="flex justify-between items-center mb-2">
          {label && <span className="text-sm text-gray-300 font-medium">{label}</span>}
          {showLabel && (
            <span className="text-sm text-gray-400 font-semibold">{Math.round(percentage)}%</span>
          )}
        </div>
      )}
      
      <div className={`w-full bg-slate-700/30 rounded-full overflow-hidden ${getSizeClasses()}`}>
        <div
          className={`${getVariantClasses()} ${getSizeClasses()} rounded-full transition-all duration-500 ease-out ${
            animated ? 'animate-progressFill' : ''
          }`}
          style={{ width: `${percentage}%` }}
        >
          {variant === 'striped' && (
            <div className="h-full w-full bg-stripes animate-stripes" />
          )}
        </div>
      </div>
    </div>
  );
};

// Circular Progress Component
interface CircularProgressProps {
  value: number; // 0-100
  size?: number;
  strokeWidth?: number;
  color?: string;
  showLabel?: boolean;
  label?: string;
  children?: React.ReactNode;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  size = 120,
  strokeWidth = 8,
  color = '#06b6d4',
  showLabel = true,
  label,
  children
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const percentage = Math.min(Math.max(value, 0), 100);
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-700 ease-out"
        />
      </svg>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {children || (
          <>
            {showLabel && (
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">
                  {Math.round(percentage)}%
                </div>
                {label && <div className="text-xs text-gray-400">{label}</div>}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProgressBar;
