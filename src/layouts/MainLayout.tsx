import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
// import { LaunchDrawer } from '../components/LaunchDrawer';
import { LaunchFlow } from '../components/Launch/LaunchFlow';

export function MainLayout() {
  const [isLaunchOpen, setIsLaunchOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const getCurrentPage = () => {
    const path = location.pathname.split('/')[1];
    if (path === 'feed' || path === 'portfolio') {
      return path;
    }
    return 'feed';
  };

  const handlePageChange = (page: string) => {
    navigate(`/${page}`);
  };

  return (
    <div className="fixed inset-0 bg-black">
      <div className="h-full flex flex-col max-w-lg mx-auto">
        <div className="flex-1 overflow-y-auto overflow-x-hidden pb-16">
          <Outlet />
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-10">
          <Navigation
            onLaunch={() => setIsLaunchOpen(true)}
            currentPage={getCurrentPage()}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      <LaunchFlow
        isOpen={isLaunchOpen}
        onClose={() => setIsLaunchOpen(false)}
      />
    </div>
  );
}