import React from 'react';
import { X } from 'lucide-react';

interface VaultDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function VaultDrawer({ isOpen, onClose, children }: VaultDrawerProps) {
  return (
    <div
      className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 z-50 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div
        className={`fixed bottom-0 left-0 right-0 bg-purple-500 rounded-t-[2rem] transition-transform duration-300 transform ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ maxHeight: '90vh' }}
      >
        <div className="absolute -top-3 left-0 right-0 flex justify-center">
          <div className="w-12 h-1.5 bg-white/20 rounded-full" />
        </div>
        
        <div className="p-4">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-yellow-300 hover:text-yellow-400 transition-colors"
          >
            <X size={24} />
          </button>
          
          <div className="overflow-y-auto max-h-[calc(90vh-2rem)]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}