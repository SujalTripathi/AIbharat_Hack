import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'card';
  width?: string;
  height?: string;
  count?: number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'rectangular',
  width = '100%',
  height = '20px',
  count = 1
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'text':
        return 'h-4 rounded-md';
      case 'circular':
        return 'rounded-full aspect-square';
      case 'rectangular':
        return 'rounded-lg';
      case 'card':
        return 'rounded-2xl h-64';
      default:
        return 'rounded-lg';
    }
  };

  const skeletonElement = (
    <div
      className={`bg-gradient-to-r from-slate-700/50 via-slate-600/50 to-slate-700/50 bg-[length:200%_100%] animate-shimmer ${getVariantClasses()} ${className}`}
      style={{ width, height: variant !== 'circular' ? height : undefined }}
    />
  );

  if (count > 1) {
    return (
      <div className="space-y-3">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index}>{skeletonElement}</div>
        ))}
      </div>
    );
  }

  return skeletonElement;
};

// Preset skeleton components for common use cases
export const CardSkeleton: React.FC = () => (
  <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
    <Skeleton variant="rectangular" height="200px" />
    <Skeleton variant="text" width="80%" />
    <Skeleton variant="text" width="60%" />
    <div className="flex gap-2 mt-4">
      <Skeleton variant="rectangular" width="80px" height="32px" />
      <Skeleton variant="rectangular" width="80px" height="32px" />
    </div>
  </div>
);

export const ListSkeleton: React.FC<{ count?: number }> = ({ count = 3 }) => (
  <div className="space-y-4">
    {Array.from({ length: count }).map((_, index) => (
      <div
        key={index}
        className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-4"
      >
        <Skeleton variant="circular" width="48px" height="48px" />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" width="70%" />
          <Skeleton variant="text" width="40%" />
        </div>
      </div>
    ))}
  </div>
);

export const ProfileSkeleton: React.FC = () => (
  <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-8">
    <div className="flex items-center gap-6 mb-6">
      <Skeleton variant="circular" width="96px" height="96px" />
      <div className="flex-1 space-y-3">
        <Skeleton variant="text" width="200px" height="32px" />
        <Skeleton variant="text" width="150px" />
        <Skeleton variant="text" width="180px" />
      </div>
    </div>
    <div className="space-y-4">
      <Skeleton variant="rectangular" height="100px" />
      <Skeleton variant="rectangular" height="100px" />
    </div>
  </div>
);

export const TableSkeleton: React.FC<{ rows?: number }> = ({ rows = 5 }) => (
  <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
    {/* Header */}
    <div className="bg-white/5 p-4 flex gap-4">
      <Skeleton variant="text" width="30%" />
      <Skeleton variant="text" width="25%" />
      <Skeleton variant="text" width="20%" />
      <Skeleton variant="text" width="25%" />
    </div>
    {/* Rows */}
    {Array.from({ length: rows }).map((_, index) => (
      <div key={index} className="p-4 flex gap-4 border-t border-white/5">
        <Skeleton variant="text" width="30%" />
        <Skeleton variant="text" width="25%" />
        <Skeleton variant="text" width="20%" />
        <Skeleton variant="text" width="25%" />
      </div>
    ))}
  </div>
);

export default Skeleton;
