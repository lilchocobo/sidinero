interface TokenPurchaseDetailsProps {
  amount: string;
  tokenSymbol: string;
}

export function TokenPurchaseDetails({ amount, tokenSymbol }: TokenPurchaseDetailsProps) {
  return (
    <div className="text-center mb-8">
      <h2 className="text-4xl font-bold mb-4 text-black">SUCCESS</h2>
      <p className="text-xl text-black">
        You bought {amount} ${tokenSymbol}
      </p>
    </div>
  );
}