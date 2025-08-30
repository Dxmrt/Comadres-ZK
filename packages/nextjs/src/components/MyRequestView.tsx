'use client';

import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ArrowLeft, MapPin, Shield } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';

function formatDate(ms?: number) {
  if (!ms) return 'hace un momento';
  const d = new Date(ms);
  return d.toLocaleString(undefined, { day: '2-digit', month: 'long', hour: '2-digit', minute: '2-digit' });
}

export default function MyRequestView() {
  const { setView, myRequests, fetchMyRequests } = useApp();
  useEffect(() => { fetchMyRequests(); }, [fetchMyRequests]);
  const latest = myRequests[0];
  return (
    <div className="min-h-screen bg-comadres-primary/60">
      <div className="bg-white/80 backdrop-blur border-b border-comadres-light-alt">
        <div className="container mx-auto px-4 py-3 flex items-center gap-3">
          <Button variant="ghost" onClick={() => setView('home')} className="text-comadres-dark">
            <ArrowLeft className="w-5 h-5 mr-2" /> Volver
          </Button>
          <h1 className="text-lg font-semibold text-comadres-dark">Tu solicitud</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-3xl space-y-6">
        <Card className="bg-white/90">
          <CardHeader className="flex-row items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-comadres-accent" />
              <CardTitle className="m-0">Estado</CardTitle>
            </div>
            <div className="text-sm text-comadres-gray">
              {latest ? <>Creada {formatDate(latest.createdAt)}</> : '—'}
            </div>
          </CardHeader>
          <CardContent className="text-comadres-dark">
            {latest ? (
              <>
                <p className="mb-2">{latest.message}</p>
                <p className="text-sm text-comadres-gray mb-2">
                  <MapPin className="w-4 h-4 inline-block mr-1" />
                  Ubicación: <span className="font-medium">{latest.area || '—'}</span>
                </p>
                <div className="text-sm">
                  <span className="px-2 py-1 rounded-full bg-comadres-accent/15 text-comadres-dark">
                    {latest.status === 'assigned' ? 'Asignada' : 'Pendiente'}
                  </span>
                </div>
              </>
            ) : (
              <p className="text-comadres-gray">No tienes solicitudes todavía.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}