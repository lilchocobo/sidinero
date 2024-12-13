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

// Denominated in ETH
const useBTokenPrice = () => {
  return 0.000001
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

  console.log({tokenAmount, amount, amountUSD})


  return (
    <div className="flex flex-col items-center text-center px-4">
      <div className="relative w-full mb-2">
        <div className="relative">
          <span className="absolute left-0 top-1/2 -translate-y-1/2 text-4xl font-bold text-white">$</span>
          <input
            type="number"
            value={amountUSD.toString()}
            onChange={(e) => onChange(e.target.value)}
            placeholder="0"
            className="w-full bg-transparent text-4xl font-bold text-white placeholder-white/30 outline-none text-center pl-8"
            aria-label="Amount to buy"
          />
        </div>
        <div className="mt-2 text-sm text-white/70">
          {hasInsufficientFunds ? (
            <span className="text-red-400">Insufficient funds</span>
          ) : (
            `You'll receive ${formatNumber(tokenAmount)} ${tokenSymbol}`
          )}
        </div>
      </div>
    </div>
  );
}