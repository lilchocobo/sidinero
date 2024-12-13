import { useReadContract, useChainId, useWriteContract } from 'wagmi'
import { abi as BTokenFactoryABI } from '../../lib/abi/BTokenFactory.json'
import { CONTRACTS } from '../../lib/constants'
import { Address } from 'viem'
import { toast } from 'react-hot-toast'

// Base hook to get contract address for current chain
export function useBTokenFactoryAddress() {
    const chainId = useChainId()
    return CONTRACTS[chainId]?.BTokenFactory
}

// Check if an address is a deployer
export function useBTokenFactoryDeployer({
    deployerAddress
}: {
    deployerAddress: Address
}) {
    const contractAddress = useBTokenFactoryAddress()

    return useReadContract({
        address: contractAddress,
        abi: BTokenFactoryABI,
        functionName: 'deployers',
        args: [deployerAddress],
    })
}

// Get implementation contract at specific index
export function useBTokenFactoryImpl({
    index
}: {
    index: bigint
}) {
    const contractAddress = useBTokenFactoryAddress()

    return useReadContract({
        address: contractAddress,
        abi: BTokenFactoryABI,
        functionName: 'implContracts',
        args: [index],
    })
}

// Get salt for specific token parameters
export function useBTokenFactorySalt({
    name,
    symbol,
    reserve
}: {
    name: string
    symbol: string
    reserve: Address
}) {
    const contractAddress = useBTokenFactoryAddress()

    return useReadContract({
        address: contractAddress,
        abi: BTokenFactoryABI,
        functionName: 'getSalt',
        args: [name, symbol, reserve],
    })
}

// Deploy a new BToken with pre-calculated salt
export function useBTokenFactoryDeploy({
    name,
    symbol,
}: {
    name: string
    symbol: string
}) {
    const chainId = useChainId()
    const bTokenFactoryAddress = useBTokenFactoryAddress()
    const reserve = CONTRACTS[chainId]?.ReserveAsset ?? '0x9EC3c936B6d5eD6AAb6Ed7E3176fd44bCf3907EA'

    // Calculate the salt
    const { data: salt } = useBTokenFactorySalt({ name, symbol, reserve })
    const { writeContractAsync, ...rest } = useWriteContract()

    // Only allow deployment when we have the salt and reserve
    const deploy = async ({onSuccess, onError, onSettled}: {onSuccess: () => void, onError: (error: Error) => void, onSettled?: () => void}) => {
        try {
            if (!salt) throw new Error('Salt not calculated')
            if (!reserve) throw new Error('No reserve asset for this chain')

            return await writeContractAsync(
                {
                    address: bTokenFactoryAddress,
                    abi: BTokenFactoryABI,
                    functionName: 'deploy',
                    args: [name, symbol, reserve, salt],
                },
                {
                    onSuccess,
                    onError,
                    onSettled,
                }
            )
        } catch (error) {
            console.error('Failed to deploy token:', error)
            toast.error(`Failed to deploy token`)
            throw error
        }
    }

    return {
        deploy,
        salt,
        reserve,
        ...rest
    }
}