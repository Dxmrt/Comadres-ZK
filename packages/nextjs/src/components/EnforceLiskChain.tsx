'use client';
import { useEffect } from 'react';
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi';
import { liskSepolia } from '@/config/chains';
export const EnforceLiskChain = () => {
  const { isConnected } = useAccount();
  const { chain } = useNetwork();
  const { switchNetwork, chains } = useSwitchNetwork();
  useEffect(() => {
    if (!isConnected) return;
    if (!chain || chain.id !== liskSepolia.id) {
      const target = chains?.find(c => c.id === liskSepolia.id);
      if (target && switchNetwork) switchNetwork(target.id);
    }
  }, [isConnected, chain?.id, switchNetwork, chains]);
  return null;
};
export default EnforceLiskChain;