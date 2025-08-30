# Las Comadres ZK (MVP)

## Run
yarn
cd packages/nextjs && yarn dev

## Opcional: contratos (Lisk Sepolia)
cp packages/contracts-simple/.env.example packages/contracts-simple/.env

# Rellenar PRIVATE_KEY (cuenta de test) y LISK_RPC_URL
yarn contracts:deploy-ic

# Pegar artefacto generado en packages/nextjs/src/contracts y activar onchain en src/config/flags.ts

## Env
- Nunca commitear .env
