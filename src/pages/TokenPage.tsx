import { useParams } from 'react-router-dom';
import { TokenPage as TokenContent } from '../components/Token/TokenPage';
import { TokenConfig, useTokens } from '../hooks/useTokens';

export function TokenPage() {
  const { tokenId } = useParams();
  const {tokens} = useTokens();
  const token = tokens?.find((t: TokenConfig) => t.address === tokenId);
  
  if (!token) {
    return <div>Token not found</div>;
  }
  
  return (
    <TokenContent 
      token={token}
    />
  );
}