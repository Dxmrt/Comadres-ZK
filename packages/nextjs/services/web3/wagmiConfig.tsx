import { createConfig } from 'wagmi';
import { wagmiConnectors, appChains } from './wagmiConnectors';
export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: wagmiConnectors,
  publicClient: appChains.publicClient,
  webSocketPublicClient: appChains.webSocketPublicClient,
});