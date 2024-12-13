import React from 'react';
import { X, Bell, Download, LogOut } from 'lucide-react';
import { usePrivy } from '@privy-io/react-auth';
import { useNavigate } from 'react-router-dom';
import { UserDetails } from './UserDetails';

interface SettingsPanelProps {
  onClose: () => void;
}

export function SettingsPanel({ onClose }: SettingsPanelProps) {
  const { logout } = usePrivy();
  const navigate = useNavigate();

  const handleSignOut = () => {
    navigate('/');
    logout();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-purple-500 z-50 text-black">
      <div className="p-4">
        <button 
          onClick={onClose}
          className="text-yellow-300 hover:text-yellow-400 transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      <div className="mt-4 mx-4">
        
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden mt-4">
          <button className="w-full px-6 py-4 flex items-center gap-4 hover:bg-black/5 transition-colors">
            <Bell className="text-black" size={24} />
            <span className="text-xl">Notifications</span>
          </button>
          
          <div className="h-px bg-black/10" />
          
          <button className="w-full px-6 py-4 flex items-center gap-4 hover:bg-black/5 transition-colors">
            <Download className="text-black" size={24} />
            <span className="text-xl">Export Keys</span>
          </button>
          
          <div className="h-px bg-black/10" />
          
          <button 
            onClick={handleSignOut}
            className="w-full px-6 py-4 flex items-center gap-4 hover:bg-black/5 transition-colors"
          >
            <LogOut className="text-black" size={24} />
            <span className="text-xl">Sign Out</span>
          </button>
        </div>
        <div className="mt-4 overflow-hidden">  
          <UserDetails />
        </div>

      </div>
    </div>
  );
}