'use client';
import React, { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'react-hot-toast';

export default function RequestForm() {
  const { createRequest, setView, fetchMyRequests } = useApp();
  const [message, setMessage] = useState('');
  const [area, setArea] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!area.trim()) { toast.error('Por favor indica tu ubicación (ciudad/barrio)'); return; }
    const r = await createRequest(message.trim() || 'Solicitud', area.trim());
    if (r) {
      toast.success('Solicitud creada');
      await fetchMyRequests();
      setView('my_request');
    } else {
      toast.error('No se pudo crear la solicitud');
    }
  };

  return (
    <div className="min-h-screen bg-comadres-primary/60">
      <div className="container mx-auto px-4 py-10 max-w-2xl">
        <Card className="bg-white/90">
          <CardHeader>
            <CardTitle className="text-comadres-dark">Pedir acompañamiento</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={submit}>
              <div>
                <Label className="text-comadres-dark">Ubicación (se revelará solo al asignarse)</Label>
                <input
                  className="mt-1 w-full rounded-md border border-comadres-light-alt bg-white px-3 py-2 text-sm"
                  placeholder="Ej: Madrid – Centro, o Barcelona – Gràcia"
                  value={area}
                  onChange={e => setArea(e.target.value)}
                />
              </div>
              <div>
                <Label className="text-comadres-dark">Mensaje o descripción</Label>
                <Textarea
                  className="mt-1 h-28"
                  placeholder="Cuéntanos brevemente qué necesitas (privado)"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="secondary" onClick={() => setView('home')}>Cancelar</Button>
                <Button type="submit">Enviar solicitud</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}