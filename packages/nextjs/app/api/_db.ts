export type ComadreRequest = {
  id: string;
  message: string;
  area?: string;
  status: 'pending' | 'assigned';
  createdAt: number;
  assignedTo?: string;
  owner?: string; // address of requester
};

type DB = { requests: ComadreRequest[] };
const g = globalThis as unknown as { __COMADRES_DB__?: DB };

if (!g.__COMADRES_DB__) {
  g.__COMADRES_DB__ = {
    requests: [
      { id: '1', message: 'Necesito acompañamiento para una cita médica el próximo martes.', status: 'pending', createdAt: Date.now() - 86400000, area: 'Madrid' },
      { id: '3', message: 'Ayuda para presentar una denuncia por violencia doméstica.', status: 'pending', createdAt: Date.now() - 172800000, area: 'Barcelona' },
    ],
  };
}
const db = g.__COMADRES_DB__!;

const genId = () => (Date.now().toString(36) + Math.random().toString(36).slice(2, 8));

export function listRequests(owner?: string) {
  const all = db.requests.slice().sort((a,b) => b.createdAt - a.createdAt);
  if (owner) {
    const ow = owner.toLowerCase();
    return all.filter(r => (r.owner ?? '').toLowerCase() == ow);
  }
  return all;
}

export function createRequest(message: string, area?: string, owner?: string) {
  const item: ComadreRequest = { id: genId(), message, area, status: 'pending', createdAt: Date.now(), owner };
  db.requests.unshift(item); return item;
}

export function assignRequestById(id: string, comadre = 'you') {
  const idx = db.requests.findIndex(r => r.id === id);
  if (idx === -1) return null;
  const r = db.requests[idx];
  if (r.status !== 'assigned') { r.status = 'assigned'; r.assignedTo = comadre; }
  db.requests[idx] = r; return r;
}