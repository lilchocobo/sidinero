import { formatNumber } from '../../utils/formatNumber';

interface BuyAmountProps {
  amount: string;
  onChange: (value: string) => void;
  conversionRate: number;
  tokenSymbol: string;
}

export function BuyAmount({ amount, onChange, conversionRate, tokenSymbol }: BuyAmountProps) {
  const tokenAmount = amount ? Number(amount) * conversionRate : 0;

  return (
    <div className="flex flex-col items-center text-center px-4">
      <div className="relative w-full">
        <div className="relative">
          <span className="absolute left-0 top-1/2 -translate-y-1/2 text-5xl font-bold text-white">$</span>
          <input
            type="number"
            value={amount}
            onChange={(e) => onChange(e.target.value)}
            placeholder="0"
            className="w-full bg-transparent text-5xl font-bold text-white placeholder-white/30 outline-none text-center pl-8"
            aria-label="Amount to buy"
          />
        </div>
        <div className="absolute left-0 right-0 text-center mt-4 text-white/70">
          You'll receive {formatNumber(tokenAmount)} ${tokenSymbol}
        </div>
      </div>
    </div>
  );
}