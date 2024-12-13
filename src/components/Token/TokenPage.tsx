import { Settings, Crown, Twitter, Send } from 'lucide-react';
import { LineChart } from './LineChart';
import { usePrivy } from '@privy-io/react-auth';
import { useTokenData } from '../../hooks/useTokenData';
import { TokenConfig } from '../../hooks/useTokens';
import { useState } from 'react';
import { BuyDrawer } from './BuyDrawer';

interface TokenPageProps {
  token: TokenConfig; 
}

export function TokenPage({ token }: TokenPageProps) {
  const { login, authenticated } = usePrivy();
  const { name, symbol, isLoading } = useTokenData(token.address);
  const [isBuyDrawerOpen, setIsBuyDrawerOpen] = useState(false);

  // Add basic loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleBuyClick = () => {
    if (!authenticated) {
      login();
    } else {
      setIsBuyDrawerOpen(true);
    }
  };

  return (
    <div className="h-full overflow-y-auto pb-40">
      <div className="p-4 space-y-4">
        {/* Existing token page content */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-5xl font-mono text-purple-600">$0.81</div>
            <div className="inline-flex items-center gap-2 bg-green-400/20 px-3 py-1 rounded-full">
              <span className="text-green-600">▲ 48%</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-full border-2 border-purple-600 flex items-center justify-center">
              <Settings className="w-5 h-5 text-purple-600" />
            </button>
            <button className="w-10 h-10 rounded-full border-2 border-purple-600 flex items-center justify-center">
              <Crown className="w-5 h-5 text-purple-600" />
            </button>
          </div>
        </div>

        <div className="h-64">
          <LineChart />
        </div>

        <div className="grid grid-cols-3 text-center py-4">
          <div>
            <div className="text-purple-600 text-2xl font-medium">33</div>
            <div className="text-sm text-purple-600/70">Holders</div>
          </div>
          <div>
            <div className="text-purple-600 text-2xl font-medium">33M</div>
            <div className="text-sm text-purple-600/70">Volume</div>
          </div>
          <div>
            <div className="text-purple-600 text-2xl font-medium">33M</div>
            <div className="text-sm text-purple-600/70">M.Cap</div>
          </div>
        </div>

        <div className="bg-purple-600 rounded-3xl overflow-hidden">
          <div className="p-6 text-white">
            <div className="flex items-center gap-4">
              <img
                src={token.metadata.image}
                alt={name}
                className="w-14 h-14 rounded-full"
              />
              <div>
                <div className="font-mono text-xl">${symbol}</div>
                <div className="text-base text-white/70">{name}</div>
              </div>
            </div>
            <p className="mt-3 text-lg">The official {name} token</p>
            <div className="flex gap-3 mt-4">
              <button className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <Twitter className="w-6 h-6" />
              </button>
              <button className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <Send className="w-6 h-6" />
              </button>
            </div>
          </div>

          {authenticated && (
            <div className="bg-purple-500/50 backdrop-blur-sm p-6">
              <div className="text-white/70">You hold</div>
              <div className="text-white font-mono text-2xl mt-1">48,841 ${symbol}</div>
              <div className="text-white/70">0.0004 $USD</div>
            </div>
          )}
        </div>

        <div className="bg-purple-500 rounded-3xl p-4 text-white">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-yellow-300 flex items-center justify-center">
              <span className="text-black text-sm">😊</span>
            </div>
            <span className="font-mono">$YES</span>
          </div>
          <p className="mt-2">HAHAHA so fucking bullish lmao</p>
          <button className="mt-4 w-12 h-12 rounded-full bg-yellow-300 flex items-center justify-center text-2xl text-black">
            +
          </button>
        </div>
      </div>

      <div className="fixed bottom-24 left-0 right-0 px-4 grid grid-cols-2 gap-4">
        <button 
          onClick={handleBuyClick}
          className="bg-green-400 hover:bg-green-500 transition-colors text-black py-3 rounded-full font-bold text-lg shadow-lg text-center"
        >
          <span className={authenticated ? '' : 'block w-full text-center'}>
            {authenticated ? 'BUY' : 'LOGIN TO BUY'}
          </span>
        </button>
        {authenticated && (
          <button className="bg-white hover:bg-gray-100 transition-colors text-black py-3 rounded-full font-bold text-lg shadow-lg">
            SELL
          </button>
        )}
      </div>

      <BuyDrawer 
        isOpen={isBuyDrawerOpen}
        onClose={() => setIsBuyDrawerOpen(false)}
        symbol={symbol || ''}
        price="$0.81"
      />
    </div>
  );
}