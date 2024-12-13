import React from 'react';
import { X } from 'lucide-react';
import { StepOne } from './steps/StepOne';
import { StepTwo } from './steps/StepTwo';
import { StepThree } from './steps/StepThree';
import { TokenDetails } from '../../types';

interface LaunchModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentStep: number;
  tokenDetails: TokenDetails;
  setTokenDetails: (details: TokenDetails) => void;
  onNextStep: () => void;
}

export function LaunchModal({
  isOpen,
  onClose,
  currentStep,
  tokenDetails,
  setTokenDetails,
  onNextStep,
}: LaunchModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-purple-500 w-full max-w-md mx-4 rounded-3xl overflow-hidden relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-yellow-300 hover:text-yellow-400"
        >
          <X size={24} />
        </button>
        
        <div className="p-6">
          <div className="flex justify-center mb-4">
            <div className="flex gap-2">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`w-12 h-2 rounded-full ${
                    step <= currentStep ? 'bg-yellow-300' : 'bg-purple-400'
                  }`}
                />
              ))}
            </div>
          </div>

          {currentStep === 1 && <StepOne onNext={onNextStep} />}
          {currentStep === 2 && (
            <StepTwo
              tokenDetails={tokenDetails}
              setTokenDetails={setTokenDetails}
              onNext={onNextStep}
            />
          )}
          {currentStep === 3 && (
            <StepThree
              tokenDetails={tokenDetails}
              onClose={onClose}
            />
          )}
        </div>
      </div>
    </div>
  );
}