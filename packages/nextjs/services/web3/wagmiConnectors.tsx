import { configureChains } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import { walletConnectWallet, metaMaskWallet, coinbaseWallet } from '@rainbow-me/rainbowkit/wallets';
import { liskSepolia } from '@/config/chains';

const { chains, publicClient, webSocketPublicClient } = configureChains([liskSepolia], [publicProvider()]);
export const appChains = { chains, publicClient, webSocketPublicClient };

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'demo';
const appName = 'Las Comadres ZK';

export const wallets = [
  {
    groupName: 'Recommended',
    wallets: [
      metaMaskWallet({ projectId, chains }),
      walletConnectWallet({ projectId, chains }),
      coinbaseWallet({ appName, chains }),
    ],
  },
];

export const wagmiConnectors = connectorsForWallets(wallets);