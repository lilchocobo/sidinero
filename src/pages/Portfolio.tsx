import React, { useState, useRef, useEffect } from 'react';
import { Wallet, ArrowUpRight, Coins, Share, Settings } from 'lucide-react';
import { SettingsPanel } from '../components/Settings/SettingsPanel';
import { useWallets } from '@privy-io/react-auth';
import { usePrivy } from '@privy-io/react-auth';
import { TokenList } from '../components/TokenList';
import { TokenData } from '../components/TokenCard';
import { useAccount } from 'wagmi';
import { useBalance } from '../hooks/useBalance';
const portfolioTokens: TokenData[] = [
  {
    symbol: "$YES",
    balance: "15,000 YES",
    value: "$450.00",
    change: "+22.5%",
    isPositive: true,
  },
  {
    symbol: "$PEPE",
    balance: "1,000,000 PEPE",
    value: "$890.00",
    change: "-5.2%",
    isPositive: false,
  },
  {
    symbol: "$DOGE",
    balance: "10,000 DOGE",
    value: "$760.00",
    change: "+12.8%",
    isPositive: true,
  },
];

const tokensList: TokenData[] = [
  {
    symbol: "$USDC",
    balance: "1,000 USDC",
    value: "$1,000.00",
    change: "+0.1%",
    isPositive: true,
  },
];

export function Portfolio() {
  const [showSettings, setShowSettings] = useState(false);
  const [activeTab, setActiveTab] = useState<'holdings' | 'tokens'>('holdings');
  const { wallets } = useWallets();
  const wallet = wallets?.[0];
  const formattedAddress = wallet?.address ? `${wallet.address.slice(0, 4)}....${wallet.address.slice(-4)}` : '';
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
  const holdingsRef = useRef<HTMLButtonElement>(null);
  const tokensRef = useRef<HTMLButtonElement>(null);
  
  const { address } = useAccount();

  const { balance, balanceUSD } = useBalance({
    address: address,
  });

  const [showUSD, setShowUSD] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const balanceContainerStyle = "h-[2.5rem] overflow-hidden cursor-pointer relative";
  const balanceAnimationStyle = "absolute w-full transition-all duration-300";

  useEffect(() => {
    const activeButton = activeTab === 'holdings' ? holdingsRef.current : tokensRef.current;
    if (activeButton) {
      const parentElement = activeButton.parentElement;
      const containerElement = parentElement?.parentElement?.parentElement;
      
      if (parentElement && containerElement) {
        const parentRect = parentElement.getBoundingClientRect();
        const containerRect = containerElement.getBoundingClientRect();
        
        setUnderlineStyle({
          left: parentRect.left - containerRect.left,
          width: parentRect.width,
        });
      }
    }
  }, [activeTab]);

  const handleTabChange = (tab: 'holdings' | 'tokens') => {
    if (tab === activeTab || isAnimating) return;
    setIsAnimating(true);
    setActiveTab(tab);
    setTimeout(() => setIsAnimating(false), 300); // Match transition duration
  };

  return (
    <div className="mb-20 p-4">
      <div className="mb-6 rounded-3xl bg-gradient-to-r from-violet-600 to-violet-400 p-6">
        <div className="mb-4 flex items-center justify-between">

          <div className="flex items-center space-x-2">
            <img src="/svg/neutral.svg" alt="Smiley" className="h-12 w-12" />

            <button className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
              <span className="text-white text-lg ">{formattedAddress}</span>
            </button>
          </div>

          {/* Open in Wallet */}
          <button
            className="rounded-full bg-white p-2 "
            onClick={() => setShowSettings(true)}
          >
            <Settings className="h-6 w-6 text-violet-500" />
          </button>

          {/* Open in Wallet */}
          {/* <div className="flex gap-2">
            <button className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
              <div className="flex items-center space-x-1">
                <span>View on Chain</span>
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </button>
            <div className="flex gap-2">
              <button
                className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm"
                onClick={() => setShowSettings(true)}
              >
                <Settings size={24} />
              </button>
            </div>
          </div> */}


        </div>
        <div className={balanceContainerStyle} onClick={() => setShowUSD(prev => !prev)}>
          <div
            className={balanceAnimationStyle}
            style={{
              transform: showUSD ? 'translateY(-100%)' : 'translateY(0)',
              opacity: showUSD ? 0 : 1,
            }}
          >
            <h2 className="text-2xl font-bold text-white">
              {balance ? `${Number(balance).toFixed(8)} ETH` : '0.00 ETH'}
            </h2>
          </div>
          <div
            className={balanceAnimationStyle}
            style={{
              transform: showUSD ? 'translateY(0)' : 'translateY(100%)',
              opacity: showUSD ? 1 : 0,
            }}
          >
            <h2 className="text-2xl font-bold text-white">
              {balanceUSD ? `$${Number(balanceUSD).toFixed(2)} USD` : '$0.00 USD'}
            </h2>
          </div>
        </div>
        <p className="text-violet-200">Total Portfolio Value</p>
      </div>

      <div className="mb-4 relative">
        <div className="flex">
          <div className="relative">
            <button
              ref={holdingsRef}
              className={`px-2 py-2 font-semibold ${
                activeTab === 'holdings' ? 'text-white' : 'text-white/60'
              }`}
              onClick={() => handleTabChange('holdings')}
            >
              <span>Your Holdings</span>
            </button>
          </div>
          <div className="relative">
            <button
              ref={tokensRef}
              className={`px-2 py-2 font-semibold ${
                activeTab === 'tokens' ? 'text-white' : 'text-white/60'
              }`}
              onClick={() => handleTabChange('tokens')}
            >
              Your Tokens
            </button>
          </div>
        </div>
        <div 
          className="absolute h-0.5 bg-violet-500 transition-all duration-300 rounded-full"
          style={{
            bottom: 0,
            left: underlineStyle.left,
            width: underlineStyle.width,
          }}
        />
      </div>

      <div className="relative overflow-hidden h-[calc(100vh-300px)]">
        {/* Holdings List */}
        <div
          className={`absolute w-full transition-transform duration-300 ease-in-out ${
            isAnimating ? 'pointer-events-none' : ''
          }`}
          style={{
            transform: `translateX(${activeTab === 'holdings' ? '0' : '-110%'})`
          }}
        >
          <TokenList tokens={portfolioTokens} />
        </div>

        {/* Tokens List */}
        <div
          className={`absolute w-full transition-transform duration-300 ease-in-out ${
            isAnimating ? 'pointer-events-none' : ''
          }`}
          style={{
            transform: `translateX(${activeTab === 'tokens' ? '0' : '110%'})`
          }}
        >
          <TokenList tokens={tokensList} />
        </div>
      </div>

      {showSettings && (
        <SettingsPanel onClose={() => setShowSettings(false)} />
      )}
    </div>
  );
}


