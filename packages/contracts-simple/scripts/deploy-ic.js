/* eslint-disable no-console */
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const solc = require('solc');
const { ethers } = require('ethers');

const RPC = process.env.LISK_RPC_URL || 'https://rpc.sepolia-api.lisk.com';
const PK = process.env.PRIVATE_KEY;

if (!PK) {
  console.error('Missing PRIVATE_KEY in .env');
  process.exit(1);
}

async function compile() {
  const file = path.join(__dirname, '../contracts/IdentityCommitmentRegistry.sol');
  const source = fs.readFileSync(file, 'utf8');
  const input = {
    language: 'Solidity',
    sources: { 'IdentityCommitmentRegistry.sol': { content: source } },
    settings: { optimizer: { enabled: true, runs: 200 }, outputSelection: { '*': { '*': ['abi', 'evm.bytecode'] } } },
  };
  const output = JSON.parse(solc.compile(JSON.stringify(input)));
  if (output.errors) {
    const errs = output.errors.filter(e => e.severity === 'error');
    if (errs.length) {
      console.error(errs);
      process.exit(1);
    }
  }
  const contract = output.contracts['IdentityCommitmentRegistry.sol']['IdentityCommitmentRegistry'];
  return { abi: contract.abi, bytecode: '0x' + contract.evm.bytecode.object };
}

async function main() {
  const { abi, bytecode } = await compile();
  const provider = new ethers.JsonRpcProvider(RPC);
  const wallet = new ethers.Wallet(PK, provider);
  console.log('Deployer:', await wallet.getAddress());
  const factory = new ethers.ContractFactory(abi, bytecode, wallet);
  const contract = await factory.deploy();
  console.log('Deploy tx:', contract.deploymentTransaction().hash);
  const deployed = await contract.waitForDeployment();
  const address = await deployed.getAddress();
  console.log('Deployed at:', address);

  // Write frontend artifact
  const outDir = path.join(__dirname, '../../nextjs/src/contracts');
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'IdentityCommitmentRegistry.json'), JSON.stringify({ address, abi }, null, 2));
  console.log('Wrote frontend artifact:', path.join(outDir, 'IdentityCommitmentRegistry.json'));
}

main().catch(e => { console.error(e); process.exit(1); });