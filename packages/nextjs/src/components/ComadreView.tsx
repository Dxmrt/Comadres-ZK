'use client';

import React, { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Heart, Clock, MapPin } from 'lucide-react';
import { useApp, type ComadreRequest } from '@/contexts/AppContext';
import { useAccount } from 'wagmi';

function formatDate(ms?: number) {
  if (!ms) return 'hace un momento';
  const d = new Date(ms);
  return d.toLocaleString(undefined, { day: '2-digit', month: 'long', hour: '2-digit', minute: '2-digit' });
}

export default function ComadreView() {
  const { address } = useAccount();
  const { requests, fetchRequests, assignRequest, setView } = useApp();

  useEffect(() => { fetchRequests(); }, [fetchRequests]);

  const handleAssign = async (id: string) => {
    const u = await assignRequest(id);
    if (u) toast.success('Solicitud asignada');
  };

  const pending = requests.filter(r => (r.status ?? 'pending') === 'pending');
  const assigned = requests.filter(r => r.status === 'assigned' && r.assignedTo?.toLowerCase() === (address ?? '').toLowerCase());

  return (
    <div className="min-h-screen bg-comadres-primary/60">
      {/* Top bar */}
      <div className="bg-white/80 backdrop-blur border-b border-comadres-light-alt">
        <div className="container mx-auto px-4 py-3 flex items-center gap-3">
          <Button variant="ghost" onClick={() => setView('home')} className="text-comadres-dark">
            <ArrowLeft className="w-5 h-5 mr-2" /> Volver
          </Button>
          <h1 className="text-lg font-semibold text-comadres-dark">Ser comadre</h1>
          <span className="ml-auto text-sm text-comadres-gray">{assigned.length} solicitudes activas</span>
        </div>
      </div>

      {/* Banner */}
      <div className="container mx-auto px-4 mt-6">
        <div className="rounded-xl border border-comadres-light-alt bg-white/70 shadow-center p-4 flex items-start gap-3">
          <div className="shrink-0 rounded-full bg-comadres-accent/15 p-2">
            <Heart className="w-5 h-5 text-comadres-accent" />
          </div>
          <div className="text-comadres-dark">
            <div className="font-semibold mb-1">Gracias por ser parte de nuestra red</div>
            <p className="text-sm text-comadres-gray">
              Como comadre, puedes elegir las solicitudes en las que te sientes cómoda ayudando.
            </p>
          </div>
        </div>
      </div>

      {/* Lists */}
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Pendientes */}
        <section>
          <h2 className="text-comadres-dark font-semibold mb-3">Solicitudes disponibles</h2>
          <div className="grid gap-4">
            {pending.map((r: ComadreRequest) => (
              <Card key={r.id} className="bg-white/90">
                <CardHeader className="flex-row items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge className="bg-comadres-accent/15 text-comadres-dark">Pendiente</Badge>
                    <div className="flex items-center text-sm text-comadres-gray">
                      <Clock className="w-4 h-4 mr-1" /> Publicado {formatDate(r.createdAt)}
                    </div>
                  </div>
                  <div className="text-sm text-comadres-gray">#{r.id?.slice(0, 6)}</div>
                </CardHeader>
                <CardContent className="text-comadres-dark">
                  <p className="mb-3">{r.message ?? 'Solicitud'}</p>
                  <div className="flex items-center text-sm text-comadres-gray mb-4">
                    <MapPin className="w-4 h-4 mr-1" /> Ubicación privada (se revelará al asignarse)
                  </div>
                  <div className="flex justify-end">
                    <Button onClick={() => handleAssign(r.id!)} className="bg-comadres-accent hover:opacity-90 text-white">
                      Asignarme
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            {pending.length === 0 && <p className="text-comadres-gray">No hay solicitudes disponibles ahora mismo.</p>}
          </div>
        </section>

        {/* Asignadas a mí */}
        <section>
          <h2 className="text-comadres-dark font-semibold mb-3">Asignadas a ti</h2>
          <div className="grid gap-4">
            {assigned.map((r: ComadreRequest) => (
              <Card key={r.id} className="bg-white/90">
                <CardHeader className="flex-row items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge className="bg-green-600 text-white">Asignada</Badge>
                    <div className="flex items-center text-sm text-comadres-gray">
                      <Clock className="w-4 h-4 mr-1" /> Desde {formatDate(r.createdAt)}
                    </div>
                  </div>
                  <div className="text-sm text-comadres-gray">#{r.id?.slice(0, 6)}</div>
                </CardHeader>
                <CardContent className="text-comadres-dark">
                  <p className="mb-2">{r.message ?? 'Solicitud'}</p>
                  <p className="text-sm text-comadres-gray">
                    <MapPin className="w-4 h-4 inline-block mr-1" />
                    {r.area ? <> Ubicación: <span className="font-medium text-comadres-dark">{r.area}</span></> : ' Ubicación: privada'}
                  </p>
                </CardContent>
              </Card>
            ))}
            {assigned.length === 0 && <p className="text-comadres-gray">Aún no tienes solicitudes asignadas.</p>}
          </div>
        </section>
      </div>
    </div>
  );
}