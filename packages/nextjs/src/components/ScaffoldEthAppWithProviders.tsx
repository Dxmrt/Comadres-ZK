'use client';
import { useEffect, useState } from 'react';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { Toaster } from 'react-hot-toast';
import { WagmiConfig } from 'wagmi';
import { wagmiConfig } from '@/services/web3/wagmiConfig';
import { appChains } from '@/services/web3/wagmiConnectors';

export const ScaffoldEthAppWithProviders = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        chains={appChains.chains}
        initialChain={appChains.chains[0]}
        modalSize="compact"
        theme={darkTheme({ accentColor: '#C76782', accentColorForeground: '#000', borderRadius: 'medium' })}
      >
        {mounted && children}
        <Toaster position="top-right" />
      </RainbowKitProvider>
    </WagmiConfig>
  );
};