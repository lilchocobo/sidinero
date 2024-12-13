import { TokenData } from '../../hooks/useTokenData';

interface TokenPurchaseDetailsProps {
  amount: string;
  token: TokenData;
}

export function TokenPurchaseDetails({ amount, token }: TokenPurchaseDetailsProps) {
  return (
    <div className="text-center mb-8">
      <h2 className="text-4xl font-bold mb-4 text-black">SUCCESS</h2>
      <p className="text-xl text-black">
        You bought {amount} ${token.symbol}
      </p>
    </div>
  );
}