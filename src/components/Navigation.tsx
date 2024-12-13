import React from 'react';
import { CoinsIcon, Home, PlusCircle, TestTube, User } from 'lucide-react';
import { usePrivy } from '@privy-io/react-auth';
import { useAuth } from '../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';

interface NavigationProps {
  onLaunch: () => void;
}

export function Navigation({ onLaunch }: NavigationProps) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { authenticated } = usePrivy();
  const { openDrawer } = useAuth();

  const currentPage = pathname.slice(1) || 'feed'; // Remove leading slash and default to 'feed'

  const handlePortfolioClick = () => {
    if (!authenticated) {
      console.log('!isAuthenticated');
      openDrawer();
    } else {
      console.log('handlePortfolioClick');
      navigate('/portfolio');
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black py-4">
      <div className="flex items-center justify-around">
        <button
          onClick={() => navigate('/feed')}
          className={`flex flex-col items-center ${currentPage === 'feed' ? 'text-yellow-300' : 'text-yellow-300/50'}`}
        >
          <Home className="h-6 w-6" />
          <span className="mt-1 text-xs">Feed</span>
        </button>
        <button
          className={`flex flex-col items-center p-2 no-select ${currentPage === 'tokens' ? 'text-yellow-300' : 'text-yellow-300/50'}`}
          onClick={() => navigate('/tokens')}
        >
          <CoinsIcon size={24} />
          <span className="text-xs mt-1">Tokens</span>
        </button>
        <button
          onClick={onLaunch}
          className="flex flex-col items-center text-green-500"
        >
          <PlusCircle className="h-6 w-6" />
          <span className="mt-1 text-xs">Launch</span>
        </button>
        <button
          onClick={handlePortfolioClick}
          className={`flex flex-col items-center ${currentPage === 'portfolio' ? 'text-yellow-300' : 'text-yellow-300/50'}`}
        >
          <User className="h-6 w-6" />
          <span className="mt-1 text-xs">Portfolio</span>
        </button>
        <button
          onClick={() => navigate('#')}
          className={`flex flex-col items-center ${currentPage === 'test' ? 'text-yellow-300' : 'text-yellow-300/50'}`}
        >
          <TestTube className="h-6 w-6" />
          <span className="mt-1 text-xs">Test</span>
        </button>
      </div>
    </nav>
  );
}