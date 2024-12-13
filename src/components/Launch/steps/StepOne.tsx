import React from 'react';

interface StepOneProps {
  onNext: () => void;
}

export function StepOne({ onNext }: StepOneProps) {
  return (
    <div className="flex flex-col flex-1">
      <div className="flex-1 flex items-center justify-center px-6">
        <h2 className="text-3xl font-bold text-yellow-300 text-center">
          creators make money when someone buys or sells your token
        </h2>
      </div>
      
      <div className="p-6">
        <button
          onClick={onNext}
          className="w-full py-4 px-6 bg-yellow-300 text-black text-xl font-bold rounded-full hover:bg-yellow-400 transition-colors"
        >
          I'm ready
        </button>
      </div>
    </div>
  );
}