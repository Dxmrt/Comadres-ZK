'use client';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useSiwe } from '@/hooks/useSiwe';
import { useApp } from '@/contexts/AppContext';

type Props = { className?: string };

export function ConnectWalletButton({ className = '' }: Props) {
  const { address, isConnected } = useAccount();
  const { signIn } = useSiwe();
  const { setIdentity } = useApp();
  const [attemptedFor, setAttemptedFor] = useState<string | null>(null);

  useEffect(() => {
    if (!isConnected) return;
    if (attemptedFor && attemptedFor === address) return;
    (async () => {
      try {
        setAttemptedFor(address ?? '__none__');
        const ok = await signIn();
        if (!ok) return;
        const resp = await fetch('/api/identity/init', { method: 'POST' });
        if (!resp.ok) return;
        const data = await resp.json();
        const commitment = String(data?.commitment ?? '');
        try { localStorage.setItem('comadres_ic', commitment); } catch {}
        setIdentity(commitment);
      } catch (e) { console.error(e); }
    })();
  }, [isConnected, address, attemptedFor, signIn, setIdentity]);


  return (
    <ConnectButton.Custom>
      {({ account, chain, openConnectModal, openChainModal, mounted, authenticationStatus }) => {
        const ready = mounted && authenticationStatus !== 'loading';
        const connected = ready && account && chain && (!authenticationStatus || authenticationStatus === 'authenticated');

        return (
          <div
            className={className}
            {...(!ready && { 'aria-hidden': true, style: { opacity: 0, pointerEvents: 'none', userSelect: 'none' } })}
          >
            {connected ? (
              <button
                onClick={openChainModal}
                className="px-4 py-2 rounded-full border border-white/40 bg-white/10 hover:bg-white/20 text-white text-sm"
              >
                {account.displayName}
              </button>
            ) : (
              <button
                onClick={openConnectModal}
                className="px-4 py-2 rounded-full border border-white/40 bg-white/10 hover:bg-white/20 text-white text-sm"
              >
                Connect Wallet
              </button>
            )}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
export default ConnectWalletButton;
