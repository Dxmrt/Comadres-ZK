# 🌸 Comadres ZK — MVP  

Red de acompañamiento seguro para mujeres, con conexión a **Lisk Sepolia** y flujo mínimo para crear y asignar solicitudes.  
Este MVP está centrado en **privacidad práctica (SIWE)** y preparado para añadir **Semaphore** y on-chain mínimo.  

---
## ✨ Problema
Las redes de apoyo feministas ya existen, pero están en constante peligro. Las plataformas centralizadas pueden ser monitoreadas, censuradas o clausuradas. Necesitamos una infraestructura que proteja el anonimato, la autonomía corporal y el derecho a denunciar la violencia sin miedo.

## ✨ Solucion
Por eso nació Comadres_ZK: una plataforma descentralizada y anónima, diseñada como un santuario digital para la solidaridad feminista.

Incorporación anónima y verificada: Con Pruebas de Conocimiento Cero, una Comadre demuestra que está capacitada sin revelar su identidad. Un beneficiario demuestra que cumple con los criterios de acceso sin revelar su identidad ni ubicación.

Coordinación cifrada y descentralizada: Un sistema seguro de emparejamiento conecta las solicitudes cifradas con las Comadres disponibles. Las conversaciones se realizan en canales cifrados de extremo a extremo, imposibles de rastrear.

DAO y tesorería de la resistencia: Gobernanza colectiva y anónima donde las Comadres deciden juntas. Y financiación con criptomonedas privadas que garantiza independencia y protección.

## Comadres ZK

Comadres_ZK no es solo tecnología. Es un acto político.

Impacto social: Protege el derecho a decidir sobre nuestros cuerpos y a denunciar la violencia sin miedo. 

Innovación técnica: ZKPs, DAOs y cifrado de extremo a extremo en un único modelo de resistencia. Cypherpunk y filosofía feminista: Privacidad, libertad y solidaridad como base de la autonomía.

Comadres_ZK es una red imposible de cerrar.

Comadres_ZK: Feminismo y criptografía, codificados en la blockchain.

## Video

Aqui está el link al video de pitch de Comadres ZK: https://www.youtube.com/watch?v=4WR6WZ8qpQ4

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
