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

## 🚀 Estrategia de Escalabilidad

## 📊 Arquitectura para el Crecimiento
Este MVP está diseñado como base para una infraestructura de resistencia feminista escalable y descentralizada:

<img width="832" height="599" alt="image" src="https://github.com/user-attachments/assets/6176cf53-a221-4ba7-a4db-13e6a44d0d7c" />        

## 🎯 Fases de Evolución
**Fase 1: Fundación Sólida (0-3 meses)**

Backend persistente: Migración de API en memoria → PostgreSQL + Prisma
Autenticación robusta: SIWE + JWT con refresh tokens
Monitoreo: Logs, métricas y alertas básicas
Testing: Suite completa de tests automatizados

**Fase 2: Funcionalidades Clave (3-6 meses)**

Sistema de reputación: Contratos inteligentes para confianza verificable
Notificaciones tiempo real: WebSockets + Push notifications
Geolocalización inteligente: Matching por proximidad sin comprometer privacidad
Mobile PWA: Aplicación móvil con capacidades offline

**Fase 3: ZK & Privacidad Avanzada (6-9 meses)**

Semaphore completo: Pruebas ZK para identidad y reputación
Privacidad por capas: Múltiples niveles de protección de datos
DAO governance: Decisiones descentralizadas de la comunidad
Multi-chain: Soporte para Polygon, Optimism, Base

**Fase 4: Ecosistema Global (9-12 meses)**

App nativa móvil: React Native con biometrics
Integraciones: ONGs, servicios emergencia, ride-sharing
Expansión internacional: Localización y partnerships regionales
Infraestructura distribuida: Nodos globales resistentes a censura

## 🔒 Principios de Escalabilidad
**Seguridad y Privacidad**

Nunca sacrificar privacidad por conveniencia
Auditorías constantes de contratos y infraestructura
Encriptación end-to-end en todas las comunicaciones
Zero-trust architecture en todos los componentes

**Descentralización Real**

Sin puntos únicos de falla en la infraestructura
Gobernanza distribuida entre la comunidad
Datos replicados geográficamente
Código abierto y auditabilité por la comunidad

**Sostenibilidad Financiera**

**Grants y funding** de organizaciones Web3 y derechos humanos
**Modelo freemium** con funciones premium opcionales
**Treasury DAO** manejada por la comunidad
**Partnerships estratégicos** con ONGs y gobiernos progresistas

## 📈 Métricas de Impacto

Apps tradicionales optimizan para ads. Comadres ZK optimiza para supervivencia.

## 🔧 Técnicas

**Uptime >99.9%:** Funciona 24/7, resistente a censura
**Response <200ms:** Más rápido que Instagram porque vidas dependen
**ZK proofs <5s:** Privacidad sin sacrificar velocidad
**Scale 100K+:** Red global descentralizada

## 💜 Sociales (Impacto real)

**Matching >90%:** 9 de 10 solicitudes atendidas (vs servicios tradicionales ~60%)
**Retention >70%:** Comadres activas = red fuerte
**Coverage 50+:** Ciudades globales sin fronteras
**Trust >4.8/5:** Confianza verificable on-chain

## 🎯 Web3 Difference
Apps Web2: MAU, ads, engagement → profit

**Comadres ZK: vidas protegidas, resistencia a censura → liberación**

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
