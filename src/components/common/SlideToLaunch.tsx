import React, { useState, useRef, useEffect } from 'react';

interface SlideToLaunchProps {
  onComplete: () => void;
  hasInsufficientFunds?: boolean;
}

export function SlideToLaunch({ onComplete, hasInsufficientFunds }: SlideToLaunchProps) {
  const [position, setPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const maxPosition = useRef(0);

  useEffect(() => {
    if (containerRef.current) {
      maxPosition.current = containerRef.current.offsetWidth - 64; // 64 is button width
    }
  }, []);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (isCompleted) return;
    setIsDragging(true);
  };

  const handleDrag = (e: MouseEvent | TouchEvent) => {
    if (!isDragging || !containerRef.current || isCompleted) return;

    const rect = containerRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const newPosition = Math.max(0, Math.min(clientX - rect.left, maxPosition.current));
    
    setPosition(newPosition);

    if (newPosition >= maxPosition.current * 0.9) {
      setIsDragging(false);
      setPosition(maxPosition.current);
      setIsCompleted(true);
      onComplete();
    }
  };

  const handleDragEnd = () => {
    if (!isDragging || isCompleted) return;
    setIsDragging(false);
    if (position < maxPosition.current * 0.9) {
      setPosition(0);
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleDrag);
    window.addEventListener('mouseup', handleDragEnd);
    window.addEventListener('touchmove', handleDrag);
    window.addEventListener('touchend', handleDragEnd);

    return () => {
      window.removeEventListener('mousemove', handleDrag);
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchmove', handleDrag);
      window.removeEventListener('touchend', handleDragEnd);
    };
  }, [isDragging, position]);

  // Calculate the progress percentage for the border
  const progressPercentage = Math.min((position / maxPosition.current) * 100, 100);

  return (
    <div 
      ref={containerRef}
      style={{
        borderColor: hasInsufficientFunds 
          ? 'rgb(248, 113, 113)' // red-400
          : `rgb(${Math.round(22 * (1 - progressPercentage/100) + 34 * (progressPercentage/100))}, 
               ${Math.round(22 * (1 - progressPercentage/100) + 197 * (progressPercentage/100))}, 
               ${Math.round(22 * (1 - progressPercentage/100) + 94 * (progressPercentage/100))})`,
      }}
      className={`relative h-16 rounded-full overflow-hidden border-2 ${
        hasInsufficientFunds 
          ? 'bg-red-400/20' 
          : 'bg-gradient-to-r from-green-400/50 to-green-400/100'
      }`}
    >
      <div className={`absolute inset-0 flex items-center justify-end pr-12 font-bold ${
        hasInsufficientFunds ? 'text-red-400' : 'text-black'
      }`}>
        {hasInsufficientFunds ? 'INSUFFICIENT FUNDS' : (isCompleted ? 'LAUNCHING...' : 'SLIDE TO LAUNCH')}
      </div>
      <div
        onMouseDown={hasInsufficientFunds ? undefined : handleDragStart}
        onTouchStart={hasInsufficientFunds ? undefined : handleDragStart}
        style={{ 
          transform: `translateX(${position}px)`,
          transition: isCompleted ? 'none' : position === 0 ? 'transform 0.2s ease-out' : 'none'
        }}
        className={`absolute left-0 top-0 bottom-0 w-16 flex items-center justify-center 
          rounded-full cursor-grab transition-colors
          ${isDragging ? 'cursor-grabbing' : ''}
          ${hasInsufficientFunds ? 'bg-red-400' : 'bg-green-400'}
          ${isCompleted ? 'bg-green-500' : ''}`}
      >
        <img src="/svg/devil.svg" alt="arrow-right" className="w-16 h-16" />
      </div>
    </div>
  );
}