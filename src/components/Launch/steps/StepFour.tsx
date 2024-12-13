import React, { useEffect } from 'react';
import { TokenDetails } from '../../../types';

interface StepFourProps {
  tokenDetails: TokenDetails;
  onClose: () => void;
}

export function StepFour({ tokenDetails, onClose }: StepFourProps) {
  useEffect(() => {
    // Auto close after animation
    const timer = setTimeout(() => {
      onClose();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="flex flex-col items-center justify-center flex-1 p-6">
      <div className="w-32 h-32 mb-8">
        <img
          src="/svg/happy.svg"
          alt="Success"
          className="w-full h-full animate-bounce"
        />
      </div>
      
      <h2 className="text-3xl font-bold text-yellow-300 text-center mb-4">
        Congratulations!
      </h2>
      <p className="text-yellow-300 text-center text-xl mb-2">
        ${tokenDetails.ticker} is now live
      </p>
      <p className="text-yellow-300/60 text-center">
        Redirecting you to your portfolio...
      </p>
    </div>
  );
} 