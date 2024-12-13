import { useContractReads } from 'wagmi'
import { Address } from 'viem'
import { abi as MockERC20 } from "../lib/abi/MockERC20.json"
import { TokenConfig } from './useTokens'
import { useTokens } from './useTokens'


export interface TokenData extends TokenConfig {
  name: string
  symbol: string
  decimals: number
  isLoading: boolean
  isError: boolean
}

export function useTokenData(tokenAddress?: Address): {
  data: TokenData | undefined;
  isLoading: boolean;
  isError: boolean;
} {
  const {tokens} = useTokens();
  const token = tokens?.find((t: TokenConfig) => t.address === tokenAddress);

  const { data: contractData, isError, isLoading } = useContractReads({
    contracts: [
      {
        address: tokenAddress,
        abi: MockERC20,
        functionName: 'name',
      },
      {
        address: tokenAddress,
        abi: MockERC20,
        functionName: 'symbol',
      },
      {
        address: tokenAddress,
        abi: MockERC20,
        functionName: 'decimals',
      },
    ],
    enabled: !!tokenAddress,
  })

  const tokenData = token && contractData ? {
    ...token,
    address: tokenAddress!,
    name: contractData[0]?.result as string,
    symbol: contractData[1]?.result as string,
    decimals: Number(contractData[2]?.result),
    isLoading: false,
    isError: false
  } : undefined;

  return {
    data: tokenData,
    isLoading: isLoading || !tokens,
    isError
  }
}