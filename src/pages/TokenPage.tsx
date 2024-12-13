import { useParams } from 'react-router-dom';
import { TokenPage as TokenContent } from '../components/Token/TokenPage';
import { useTokenData } from '../hooks/useTokenData';
import { Address } from 'viem';

export function TokenPage() {
  const { tokenId } = useParams();
  const { data: token, isLoading, isError } = useTokenData(tokenId as Address);
  if (!token) {
    return <div>Token not found</div>;
  }

  return (
    <TokenContent 
      token={token}
    />
  );
}