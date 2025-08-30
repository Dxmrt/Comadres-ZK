
'use client';
import { FLAGS } from '@/config/flags';
import { toast } from 'react-hot-toast';

function toBytes32(x: string): `0x${string}` {
  try {
    if (x.startsWith('0x')) return x as `0x${string}`;
    const bi = BigInt(x);
    let hex = bi.toString(16);
    if (hex.length % 2) hex = '0' + hex;
    while (hex.length < 64) hex = '0' + hex;
    return ('0x' + hex) as `0x${string}`;
  } catch {
    return ('0x' + x.padStart(64, '0').slice(-64)) as `0x${string}`;
  }
}

async function getContract(name: 'IdentityCommitmentRegistry' | 'MatchAnchor') {
  if (!FLAGS.onchain) throw new Error('On-chain disabled by flags');
  const meta = await import(`@/contracts/${name}.json`).then((m:any) => m.default || m);
  const { ethers } = await import('ethers');
  // @ts-ignore
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  return new (ethers as any).Contract(meta.address, meta.abi, signer);
}

export async function registerICOnchain(ic: string) {
  if (!FLAGS.onchain) return { ok: true, txHash: null };
  try {
    const c = await getContract('IdentityCommitmentRegistry');
    const icHex = toBytes32(ic);
    const tx = await c.register(icHex);
    toast.loading('Anchoring IC on-chain...', { id: 'anchor-ic' });
    const receipt = await tx.wait();
    toast.success('IC anchored', { id: 'anchor-ic' });
    return { ok: true, txHash: receipt?.hash ?? tx?.hash ?? null };
  } catch (e: any) {
    toast.error(e?.message || 'Failed to anchor IC');
    return { ok: false, error: e?.message };
  }
}
