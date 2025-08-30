# 🌸 Comadres ZK — MVP  

Red de acompañamiento seguro para mujeres, con conexión a **Lisk Sepolia** y flujo mínimo para crear y asignar solicitudes.  
Este MVP está centrado en **privacidad práctica (SIWE)** y preparado para añadir **Semaphore** y on-chain mínimo.  

---

## ✨ Funcionalidades (MVP)

- 🔗 Conectar wallet con **RainbowKit/Wagmi** (fijado a Lisk Sepolia).  
- 🔑 Autenticación **SIWE básica** (sin contraseñas) para gating de acciones.  
- 👥 **Flujo por roles**:  
  - **Solicitante** → crea solicitud (Ubicación privada + Mensaje) → *“Mi solicitud”* (Pendiente / Asignada).  
  - **Comadre** → ve *“Pendientes”* → *“Asignarme”* → pasa a *“Asignadas a ti”* y se revela la Ubicación.  
- 📡 **API en memoria**: crear / listar / asignar solicitudes.  
- 🎨 **Tema y UI** con paleta *“Comadres”*.  

---

## 🧱 Tech Stack

- ⚛️ **Next.js (App Router)**  
- 🦄 **Wagmi + RainbowKit** (Lisk Sepolia)  
- 🎨 **Tailwind + DaisyUI**  
- 📘 **TypeScript**  
- ⏳ (Preparado) **Semaphore** y on-chain mínimo con *viem*  

---

## 📂 Estructura (monorepo)

```bash
.
├─ package.json            # workspaces
├─ packages/
│  └─ nextjs/              # app web
│     ├─ app/              # rutas API y páginas
│     ├─ src/
│     │  ├─ components/    # UI: Landing, RequestForm, ComadreView, etc.
│     │  ├─ contexts/      # AppContext (estado global)
│     │  ├─ config/        # chains.ts, flags.ts
│     │  └─ services/      # web3, onchain.ts (eventos Lisk)
│     └─ public/           # assets (+ /semaphore artefactos cuando se añada)
└─ README.md
```

## ✅ Requisitos

Node 18+

Yarn

Wallet en Lisk Sepolia (MetaMask, etc.)

## 🔧 Configuración

Variables opcionales en packages/nextjs/.env.local:

#### Dirección del contrato mínimo (si activas on-chain)
NEXT_PUBLIC_REGISTRY_ADDRESS=0x...

#### Activa escritura on-chain de eventos (true/false)
NEXT_PUBLIC_ONCHAIN=true

#### Opcional: WalletConnect. Si no lo pones, usa 'demo'
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=xxxx

Flags en src/config/flags.ts:

export const FLAGS = {
  onchain: true,                    // activa eventos on-chain (Lisk)
  semaphoreRequiredToAssign: false, // exigir prueba de Semaphore al asignar
  zkpassRequiredForComadre: false,  // reservado
};

## ▶️ Cómo ejecutar

yarn
yarn dev
abre http://localhost:3000
