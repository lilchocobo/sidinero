import { Coins } from 'lucide-react';

export interface TokenData {
  symbol: string;
  balance: string;
  value: string;
  change: string;
  isPositive: boolean;
}

export function TokenCard({ symbol, balance, value, change, isPositive }: TokenData) {
  return (
    <div className="mb-4 rounded-2xl bg-violet-500 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="rounded-full bg-white p-2">
            <Coins className="h-6 w-6 text-violet-500" />
          </div>
          <div>
            <h3 className="font-bold text-white">{symbol}</h3>
            <p className="text-sm text-violet-200">{balance}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="font-bold text-white">{value}</p>
            <p className={`text-sm ${isPositive ? 'text-green-300' : 'text-red-300'}`}>
              {change}
            </p>
          </div>
          <button className="rounded-lg bg-yellow-300 px-4 py-2 font-medium text-black hover:bg-yellow-400 hover:text-white transition-colors">
            Sell
          </button>
        </div>
      </div>
    </div>
  );
}