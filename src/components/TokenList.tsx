import { TokenCard, TokenData } from './TokenCard';

interface TokenListProps {
  tokens: TokenData[];
}

export function TokenList({ tokens }: TokenListProps) {
  return (
    <div>
      {tokens.map((token) => (
        <TokenCard key={token.symbol} {...token} />
      ))}
    </div>
  );
} 