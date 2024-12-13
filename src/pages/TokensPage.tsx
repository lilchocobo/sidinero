import { useTokenData } from '../hooks/useTokenData';
import { useNavigate } from 'react-router-dom';
import { TokenConfig, useTokens } from '../hooks/useTokens';

export function TokensPage() {
  const { tokens, isLoading, error } = useTokens();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return <div className="p-4 text-red-500">Error loading tokens</div>;
  }

  return (
    <div className="p-4 space-y-2">
      {tokens?.map((token: TokenConfig) => (
        <TokenCard key={token.address} token={token} />
      ))}
    </div>
  );
}

function TokenCard({ token }: { token: TokenConfig }) {
  const navigate = useNavigate();
  const tokenAddress = token.address as `0x${string}`;
  const { name, symbol, isLoading, isError } = useTokenData(tokenAddress);

  if (isLoading) {
    return (
      <div className="animate-pulse bg-purple-900/20 rounded-xl p-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-purple-500/20 rounded-full"></div>
          <div className="flex-1">
            <div className="h-4 bg-purple-500/20 rounded w-24"></div>
            <div className="h-3 bg-purple-500/20 rounded w-16 mt-2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return null;
  }

  return (
    <div className="bg-purple-900/20 rounded-xl p-4 flex items-center justify-between hover:bg-purple-900/30 transition-all cursor-pointer"
         onClick={() => navigate(`/token/${tokenAddress}`)}>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-purple-500/20">
          <img 
            src={token.metadata.image} 
            alt={name} 
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <div className="flex items-center gap-1">
            <span className="text-white/90 font-medium">$</span>
            <span className="text-white/90 font-medium">{symbol || '...'}</span>
          </div>
          <div className="text-sm text-white/60">45.6K MCAP</div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex flex-col items-end">
          <div className="text-white/90">$0.03</div>
          <div className="text-[#b4ff00] text-sm">▲ 119.4%</div>
        </div>
        <button 
          className="bg-[#b4ff00] text-black px-4 py-1.5 rounded-full font-medium"
          onClick={(e) => {
            e.stopPropagation();
            // Add buy logic here
          }}
        >
          BUY
        </button>
      </div>
    </div>
  );
}
