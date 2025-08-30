'use client';

import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { useAccount } from 'wagmi';

export type View = 'home' | 'request_form' | 'my_request' | 'comadre_list';
export type Role = 'guest' | 'requester' | 'comadre';

export type ComadreRequest = {
  id?: string;
  message: string;
  area?: string;
  status?: 'pending' | 'assigned';
  createdAt?: number;
  assignedTo?: string;
  owner?: string;
};

type AppCtx = {
  currentView: View;
  setView: (v: View) => void;
  role: Role;
  setRole: (r: Role) => void;

  requests: ComadreRequest[];
  fetchRequests: () => Promise<void>;

  myRequests: ComadreRequest[];
  fetchMyRequests: () => Promise<void>;

  createRequest: (message: string, area?: string) => Promise<ComadreRequest | null>;
  assignRequest: (id: string) => Promise<ComadreRequest | null>;

  userVerified: boolean;
  setVerified: (v: boolean) => void;
  identity?: string;
  setIdentity: (ic: string) => void;
};

const Ctx = createContext<AppCtx | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setView] = useState<View>('home');
  const [role, setRole] = useState<Role>('guest');
  const [requests, setRequests] = useState<ComadreRequest[]>([]);
  const [myRequests, setMyRequests] = useState<ComadreRequest[]>([]);
  const [userVerified, setVerified] = useState(false);
  const [identity, setIdentity] = useState<string | undefined>(undefined);
  const { address } = useAccount();

  const fetchRequests = useCallback(async () => {
    try {
      const r = await fetch('/api/requests');
      const data = await r.json();
      setRequests((data.items ?? []) as ComadreRequest[]);
    } catch (e) {
      console.error(e);
    }
  }, []);

  const fetchMyRequests = useCallback(async () => {
    try {
      if (!address) {
        setMyRequests([]);
        return;
      }
      const r = await fetch('/api/requests?owner=' + encodeURIComponent(address));
      const data = await r.json();
      setMyRequests((data.items ?? []) as ComadreRequest[]);
    } catch (e) {
      console.error(e);
    }
  }, [address]);

  const createRequest = useCallback(
    async (message: string, area?: string) => {
      try {
        const r = await fetch('/api/requests', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ message, area, owner: address }),
        });
        if (!r.ok) return null;
        const created = (await r.json()) as ComadreRequest;
       
        setMyRequests(prev => [created, ...prev]);
        return created;
      } catch (e) {
        console.error(e);
        return null;
      }
    },
    [address],
  );

  const assignRequest = useCallback(
    async (id: string) => {
      try {
        const r = await fetch(`/api/requests/${id}/assign`, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ comadre: address ?? 'you' }),
        });
        if (!r.ok) return null;
        const updated = (await r.json()) as ComadreRequest;
        setRequests(prev => prev.map(x => (x.id === id ? updated : x)));
        setMyRequests(prev => prev.map(x => (x.id === id ? updated : x)));
        return updated;
      } catch (e) {
        console.error(e);
        return null;
      }
    },
    [address],
  );

  const value = useMemo<AppCtx>(
    () => ({
      currentView,
      setView,
      role,
      setRole,
      requests,
      fetchRequests,
      myRequests,
      fetchMyRequests,
      createRequest,
      assignRequest,
      userVerified,
      setVerified,
      identity,
      setIdentity,
    }),
    [
      currentView,
      role,
      requests,
      myRequests,
      fetchRequests,
      fetchMyRequests,
      createRequest,
      assignRequest,
      userVerified,
      identity,
    ],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

export const useApp = () => {
  const v = useContext(Ctx);
  if (!v) throw new Error('useApp must be used within AppProvider');
  return v;
};
