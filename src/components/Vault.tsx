import React from 'react';
import { X, Wallet, ArrowRight } from 'lucide-react';

interface VaultProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Vault({ isOpen, onClose }: VaultProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div 
        className={`fixed bottom-0 left-0 right-0 rounded-t-[2rem] bg-gradient-to-b from-green-950 to-black p-6 shadow-xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Launch Token</h2>
          <button 
            onClick={onClose}
            className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl bg-white/5 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="rounded-full bg-green-500 p-2">
                  <Wallet className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Initial Liquidity</p>
                  <p className="text-lg font-bold text-white">5 ETH</p>
                </div>
              </div>
              <button className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white">
                Edit
              </button>
            </div>
          </div>

          <button className="flex w-full items-center justify-between rounded-2xl bg-gradient-to-r from-green-500 to-green-600 p-4 text-white">
            <span className="text-lg font-bold">Launch Token</span>
            <ArrowRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
}