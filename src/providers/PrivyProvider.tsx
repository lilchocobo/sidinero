import { PrivyProvider as BasePrivyProvider } from '@privy-io/react-auth';
import { blast, blastSepolia } from "viem/chains"

const BLAST_SEPOLIA = {
  id: 168587773,
  name: 'Blast Sepolia',
  network: 'blast-sepolia',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://sepolia.blast.io'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Blastscan',
      url: 'https://sepolia.blastscan.io',
    },
  },
  testnet: true,
}



export function PrivyProvider({ children }: { children: React.ReactNode }) {
  return (
    <BasePrivyProvider
      appId="cm43auhef001d70jozvlxrayu"
      config={{
        appearance: {
          theme: 'light',
          accentColor: '#8B5CF6', // Purple-500
          logo: '/icons/icon-192.png',
        },
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
          noPromptOnSignature: true,
        },
        loginMethods: ['wallet', 'email', 'discord'],
        defaultChain: BLAST_SEPOLIA,
        supportedChains: [BLAST_SEPOLIA],
        wallet: {
          createOnLogin: true,
        },
      }}
    >
      {children}
    </BasePrivyProvider>
  );
}