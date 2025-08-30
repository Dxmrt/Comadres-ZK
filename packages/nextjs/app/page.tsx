'use client';
import { AppProvider } from '@/contexts/AppContext';
import EnforceLiskChain from '@/components/EnforceLiskChain';
import AppRoot from '@/components/AppRoot';
export default function Page() {
  return (
    <AppProvider>
      <EnforceLiskChain />
      <AppRoot />
    </AppProvider>
  );
}