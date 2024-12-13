import { useBalance } from '../../hooks/useBalance';
import { formatNumber } from '../../utils/formatNumber';

interface BuyAmountProps {
  amount: number;
  amountUSD: number;
  tokenAmount: number;
  onChange: (value: string) => void;
  tokenSymbol: string;
  hasInsufficientFunds?: boolean;
}



export function BuyAmount({ 
  amount, 
  amountUSD, 
  onChange, 
  tokenSymbol,
  tokenAmount
}: BuyAmountProps) {
  const { balance } = useBalance();
  const hasInsufficientFunds = amount > balance;

  return (
    <div className="flex flex-col items-center gap-8 py-4 mb-4">
      {/* Amount Input Section */}
      <div className="relative w-full">
        <div className="relative flex items-center justify-center">
          <span className="absolute left-1/2 -translate-x-[160px] text-6xl font-bold text-white">$</span>
          <input
            type="number"
            value={amountUSD.toString()}
            onChange={(e) => onChange(e.target.value)}
            placeholder="0"
            className="w-full bg-transparent text-6xl font-bold text-white placeholder-white/30 outline-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            aria-label="Amount to buy"
          />
        </div>
      </div>

      {/* Token Amount Display */}
      <div>
        {hasInsufficientFunds ? (
          <span className="text-red-400 text-xl">Insufficient funds</span>
        ) : (
          <div className="text-center">
            <div className="text-white/50 text-lg mb-2">You'll receive</div>
            <div className="text-white font-semibold text-2xl">
              {formatNumber(tokenAmount)} {tokenSymbol}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}