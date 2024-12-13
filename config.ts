import {createConfig} from '@privy-io/wagmi';   
import { http } from 'viem';
import { blastSepolia, blast } from 'wagmi/chains'

export const config = createConfig({
  chains: [blastSepolia, blast],
  transports: {
    [blastSepolia.id]: http(),
    [blast.id]: http(),
  },
})