'use client';
import { useEffect, useState } from 'react';
import { RainbowKitProvider, darkTheme, lightTheme } from '@rainbow-me/rainbowkit';
import { useTheme } from 'next-themes';
import { Toaster } from 'react-hot-toast';
import { WagmiConfig } from 'wagmi';
import { wagmiConfig } from '~~/services/web3/wagmiConfig';
import { appChains } from '~~/services/web3/wagmiConnectors';
export const ScaffoldEthAppWithProviders = ({ children }: { children: React.ReactNode }) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={appChains.chains} initialChain={appChains.chains[0]} theme={resolvedTheme === 'dark' ? darkTheme() : lightTheme()}>
        {mounted && children}
        <Toaster />
      </RainbowKitProvider>
    </WagmiConfig>
  );
};