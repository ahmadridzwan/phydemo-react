'use client';

import { useEffect, useState } from 'react';

interface LoadingProps {
  onComplete?: () => void;
  useTimer?: boolean;
  className?: string;
}

const Loading = ({
  onComplete,
  useTimer = false,
  className = '',
}: LoadingProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!useTimer) return;

    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete, useTimer]);

  if (!isVisible) return null;

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <video
        src="/assets/pulse.mp4"
        autoPlay
        loop
        muted
        className="w-max h-max"
      />
    </div>
  );
};

export default Loading;
