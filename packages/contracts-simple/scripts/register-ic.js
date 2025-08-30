/* eslint-disable no-console */
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { ethers } = require('ethers');

const RPC = process.env.LISK_RPC_URL || 'https://rpc.sepolia-api.lisk.com';
const PK = process.env.PRIVATE_KEY;

function toBytes32(x) {
  if (typeof x !== 'string') x = String(x);
  if (x.startsWith('0x')) return x;
  try {
    let hex = BigInt(x).toString(16);
    if (hex.length % 2) hex = '0' + hex;
    while (hex.length < 64) hex = '0' + hex;
    return '0x' + hex;
  } catch {
    return '0x' + x.padStart(64, '0').slice(-64);
  }
}

async function main() {
  const artifact = path.join(__dirname, '../../nextjs/src/contracts/IdentityCommitmentRegistry.json');
  if (!fs.existsSync(artifact)) {
    console.error('Missing frontend artifact. Deploy first.');
    process.exit(1);
  }
  const { address, abi } = JSON.parse(fs.readFileSync(artifact, 'utf8'));
  const provider = new ethers.JsonRpcProvider(RPC);
  const wallet = new ethers.Wallet(PK, provider);
  const c = new ethers.Contract(address, abi, wallet);
  const value = process.argv[2] || '12345678901234567890';
  const ic = toBytes32(value);
  console.log('Registering IC:', ic);
  const tx = await c.register(ic);
  console.log('Sent tx:', tx.hash);
  const receipt = await tx.wait();
  console.log('Mined in block:', receipt.blockNumber);
  console.log('Explorer:', `https://sepolia-blockscout.lisk.com/tx/${tx.hash}`);
}

main().catch(e => { console.error(e); process.exit(1); });