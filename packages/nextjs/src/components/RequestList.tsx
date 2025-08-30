
'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { useApp, type ComadreRequest } from '@/contexts/AppContext';
import { FLAGS } from '@/config/flags';
import { registerICOnchain } from '@/services/chain';
import { toast } from 'react-hot-toast';

export function RequestsList() {
  const { requests, fetchRequests, setView, identityCommitment } = useApp();

  useEffect(() => { fetchRequests(); }, [fetchRequests]);

  const pending = requests.filter((r: ComadreRequest) => (r.status ?? 'pending') === 'pending');
  const assigned = requests.filter((r: ComadreRequest) => r.status === 'assigned');

  return (
    <div className="min-h-screen bg-comadres-light">
      <div className="bg-comadres-primary/10 border-b border-comadres-primary/30">
        <div className="container mx-auto px-4 py-4 flex items-center gap-3">
          <Button variant="ghost" onClick={() => setView('home')} className="text-comadres-dark">
            <ArrowLeft className="w-5 h-5 mr-2" /> Volver
          </Button>
          <h1 className="text-xl font-semibold text-comadres-dark">Solicitudes</h1>

          {FLAGS.onchain && identityCommitment && (
            <Button
              onClick={async () => {
                const res = await registerICOnchain(identityCommitment as string);
                if (res.ok) toast.success(`Anchored ${res.txHash ?? ''}`);
                else toast.error(res.error ?? 'Error al anclar');
              }}
              className="ml-auto bg-comadres-accent text-white"
            >
              Anclar mi identidad on-chain
            </Button>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-6">
        <section>
          <h2 className="text-comadres-dark font-semibold mb-3">Pendientes</h2>
          <div className="grid gap-3">
            {pending.map(r => (
              <Card key={r.id} className="bg-white border-comadres-light-alt">
                <CardHeader>
                  <CardTitle className="text-comadres-dark text-base">Solicitud</CardTitle>
                </CardHeader>
                <CardContent className="text-comadres-dark">
                  <p className="mb-2">{r.message ?? 'Solicitud'}</p>
                  <Badge variant="secondary" className="bg-comadres-primary/10 text-comadres-dark">pendiente</Badge>
                </CardContent>
              </Card>
            ))}
            {pending.length === 0 && <p className="text-comadres-gray">No hay solicitudes pendientes.</p>}
          </div>
        </section>

        <section>
          <h2 className="text-comadres-dark font-semibold mb-3">Asignadas</h2>
          <div className="grid gap-3">
            {assigned.map(r => (
              <Card key={r.id} className="bg-white border-comadres-light-alt">
                <CardHeader>
                  <CardTitle className="text-comadres-dark text-base">Solicitud</CardTitle>
                </CardHeader>
                <CardContent className="text-comadres-dark flex items-center gap-3">
                  <span>{r.message ?? 'Solicitud'}</span>
                  <Badge className="bg-green-600 text-white">asignada</Badge>
                </CardContent>
              </Card>
            ))}
            {assigned.length === 0 && <p className="text-comadres-gray">Ninguna asignada todavía.</p>}
          </div>
        </section>
      </div>
    </div>
  );
}

export default RequestsList;
