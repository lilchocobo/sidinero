import React, { useEffect, useState } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { Drawer } from 'vaul';
import { useAuth } from '../../context/AuthContext';

interface WelcomeScreenProps {
  forcedAuth?: boolean;
}

export function WelcomeScreen({ forcedAuth = false }: WelcomeScreenProps) {
  const { login } = usePrivy();
  const { isDrawerOpen, closeDrawer } = useAuth();
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  // Add keyboard detection
  useEffect(() => {
    const handleResize = () => {
      const isKeyboardVisible = window.visualViewport?.height !== window.innerHeight;
      setKeyboardOpen(!!isKeyboardVisible);
    };

    window.visualViewport?.addEventListener('resize', handleResize);
    return () => window.visualViewport?.removeEventListener('resize', handleResize);
  }, []);

  const handleLogin = (e: React.MouseEvent) => {
    e.stopPropagation();
    login();
  };

  return (
    <Drawer.Root 
      open={isDrawerOpen} 
      onOpenChange={forcedAuth ? undefined : closeDrawer}
      shouldScaleBackground
      modal={forcedAuth}
      dismissible={!forcedAuth}
    >
      <Drawer.Portal>
        <Drawer.Overlay 
          className="fixed inset-0 bg-black/40" 
          onClick={(e) => e.stopPropagation()}
        />
        <Drawer.Content 
          className={`bg-purple-600 flex flex-col rounded-t-[10px] fixed bottom-0 left-0 right-0 
            ${keyboardOpen ? 'h-screen' : 'h-[96vh] max-h-[96vh]'}`}
        >
          <div className="p-4 pb-20 flex-1 overflow-y-auto relative">
            <button
              onClick={closeDrawer}
              className="absolute top-4 right-4 text-yellow-300 hover:text-yellow-400 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex gap-2 justify-center mb-12">
              <div className="w-12 h-2 rounded-full bg-yellow-300" />
              <div className="w-12 h-2 rounded-full bg-gray-300/30" />
              <div className="w-12 h-2 rounded-full bg-gray-300/30" />
            </div>

            <div className="max-w-md mx-auto flex flex-col items-center">
              <div className="relative w-full mb-8">
                <img 
                  src="/svg/uppies_2.svg" 
                  alt="Yes Money Logo" 
                  className="absolute left-1/2 -translate-x-1/2 top-0 w-56 h-64 mx-auto animate-[fadeInUp_0.6s_ease-out]"
                />
              </div>

              <div className="flex flex-col items-center mt-24 z-10">
                <h1 className="text-5xl font-bold text-yellow-300 mb-2">yes.money</h1>
                <p className="text-yellow-100 text-lg mb-16">invest in attention</p>
              </div>

              <button
                onClick={handleLogin}
                className="w-full mb-4 px-8 py-4 bg-yellow-300 text-purple-600 rounded-full font-bold text-lg hover:bg-yellow-400 transition-colors"
              >
                create account
              </button>
              <button
                onClick={handleLogin}
                className="w-full px-8 py-4 bg-yellow-300 text-purple-600 rounded-full font-bold text-lg hover:bg-yellow-400 transition-colors"
              >
                sign in to existing
              </button>
            </div>
          </div>
          
          {!forcedAuth && (
            <div 
              className={`fixed bottom-0 left-0 right-0 p-4 bg-purple-600
                ${keyboardOpen ? 'pb-4' : 'pb-[calc(1rem+env(safe-area-inset-bottom))]'}`}
            >
              <button
                onClick={closeDrawer}
                className="w-full px-8 py-4 border-2 border-yellow-300 text-yellow-300 rounded-full font-bold text-lg hover:bg-yellow-300/10 transition-colors"
              >
                Cancel
              </button>
            </div>
          )}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}