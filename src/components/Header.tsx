import { Search } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const [activeTab, setActiveTab] = useState('trending');

  return (
    <header className="sticky top-0 z-1 bg-gradient-to-r from-black to-black p-4">
      <div className="flex items-center justify-between">
        <div className="flex rounded-full bg-gradient-to-r relative">
          <div
            className={`absolute top-0 bottom-0 w-1/2 rounded-full bg-gradient-to-r from-yellow-100 to-pink-100 transition-all duration-300 ease-in-out ${
              activeTab === 'trending' ? 'left-0' : 'left-1/2'
            }`}
          />
          <button 
            onClick={() => setActiveTab('trending')}
            className={`relative rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-300 ${
              activeTab === 'trending' ? 'text-black' : 'text-white'
            }`}
          >
            trending
          </button>
          <button 
            onClick={() => setActiveTab('holding')}
            className={`relative rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-500 ${
              activeTab === 'holding' ? 'text-black' : 'text-white'
            }`}
          >
            holding
          </button>
        </div>
        <button className="rounded-full bg-white p-2 shadow-md">
          <Search className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}