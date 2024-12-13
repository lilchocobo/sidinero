import { useAccount, useBalance as useWagmiBalance } from 'wagmi';

export function useBalance(address?: `0x${string}`) {

    const {address: userAddress} = useAccount()

    // Balance denominated in ETH
    const balance = useWagmiBalance({
        address: address ?? userAddress,
    });

    const balanceETH = Number(balance.data?.formatted);

    const balanceUSD = balanceETH ? (Number(balanceETH) * 4000) : undefined;

    console.log({balanceETH, balanceUSD, balance: balance.data?.formatted});  

    return { balance: balanceETH, balanceUSD };
}
