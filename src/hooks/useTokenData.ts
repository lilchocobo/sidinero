import { useContractReads } from 'wagmi'
import { Address } from 'viem'
import { abi as MockERC20 } from "../lib/abi/MockERC20.json"


interface TokenData {
  name: string
  symbol: string
  decimals: number
  isLoading: boolean
  isError: boolean
}

export function useTokenData(tokenAddress?: Address): TokenData {
  const { data, isError, isLoading } = useContractReads({
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

  return {
    name: (data?.[0]?.result as string) ?? '',
    symbol: (data?.[1]?.result as string) ?? '',
    decimals: Number(data?.[2]?.result ?? 0),
    isLoading,
    isError,
  }
}
