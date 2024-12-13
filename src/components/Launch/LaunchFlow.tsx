import React, { useState, useEffect } from 'react';
import { Drawer } from 'vaul';
import { TokenDetails } from '../../types';
import { StepOne } from './steps/StepOne';
import { StepTwo } from './steps/StepTwo';
import { StepThree } from './steps/StepThree';
import { PostLaunchFlow } from './PostLaunchFlow';

interface LaunchFlowProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LaunchFlow({ isOpen, onClose }: LaunchFlowProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [tokenDetails, setTokenDetails] = useState<TokenDetails>({
    name: '',
    ticker: '',
    image: null,
    address: '',
  });
  const [showSuccessFlow, setShowSuccessFlow] = useState(false);

  // Handle keyboard events
  useEffect(() => {
    const handleResize = () => {
      // Check if keyboard is likely open based on viewport height change
      const isKeyboardVisible = window.visualViewport?.height !== window.innerHeight;
      setKeyboardOpen(!!isKeyboardVisible);
    };

    window.visualViewport?.addEventListener('resize', handleResize);
    return () => window.visualViewport?.removeEventListener('resize', handleResize);
  }, []);

  const handleNextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  // Add new handler for cancel
  const handleCancel = () => {
    // Reset all state
    setCurrentStep(1);
    setTokenDetails({ name: '', ticker: '', image: null, address: '' });
    onClose();
  };

  return (
    <Drawer.Root 
      open={isOpen} 
      onOpenChange={handleCancel}
      shouldScaleBackground
      modal={false}
      dismissible={true}
    >
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content 
          className={`bg-purple-600 flex flex-col rounded-t-[10px] fixed bottom-0 left-0 right-0 
            ${keyboardOpen ? 'h-screen' : 'h-[96vh] max-h-[96vh]'}`}
        >
          {/* Progress Indicators */}
          <div className="flex justify-center py-4 bg-purple-600 sticky top-0 z-10">
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

          {/* Main Content Area */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 pb-24">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-yellow-300 hover:text-yellow-400 transition-colors z-20 bg-purple-600 rounded-full p-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Steps Content */}
              <div className="mt-8">
                {currentStep === 1 && <StepOne onNext={handleNextStep} />}
                {currentStep === 2 && (
                  <StepTwo
                    tokenDetails={tokenDetails}
                    setTokenDetails={setTokenDetails}
                    onNext={handleNextStep}
                  />
                )}
                {currentStep === 3 && (
                  <StepThree
                    tokenDetails={tokenDetails}
                    setTokenDetails={setTokenDetails}
                    onClose={() => {
                      // Reset the flow state
                      setCurrentStep(1);
                      onClose();
                      setShowSuccessFlow(true);
                    }}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Cancel Button - Fixed at bottom */}
          <div 
            className={`sticky bottom-0 left-0 right-0 p-4 bg-purple-600 border-t border-purple-500
              ${keyboardOpen ? 'pb-4' : 'pb-[calc(1rem+env(safe-area-inset-bottom))]'}`}
          >
            <button
              onClick={handleCancel}
              className="w-full px-6 py-3 border-2 border-yellow-300 text-yellow-300 rounded-full font-bold 
                hover:bg-yellow-300/10 transition-colors text-base"
            >
              Cancel
            </button>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
      <PostLaunchFlow 
        isOpen={showSuccessFlow} 
        onClose={() => setShowSuccessFlow(false)} 
        tokenDetails={tokenDetails}

      />
    </Drawer.Root>
  );
}