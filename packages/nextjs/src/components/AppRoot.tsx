'use client';
import React from 'react';
import { useApp } from '@/contexts/AppContext';
import LandingPage from '@/components/LandingPage';
import RequestForm from '@/components/RequestForm';
import ComadreView from '@/components/ComadreView';
import MyRequestView from '@/components/MyRequestView';

export default function AppRoot() {
  const { currentView } = useApp();
  switch (currentView) {
    case 'request_form': return <RequestForm />;
    case 'my_request': return <MyRequestView />;
    case 'comadre_list': return <ComadreView />;
    default: return <LandingPage />;
  }
}