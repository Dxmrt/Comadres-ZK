'use client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heart, Shield, Users } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { useAccount } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { ConnectWalletButton } from '@/components/ConnectWalletButton';
import { FLAGS } from '@/config/flags';
import { toast } from 'react-hot-toast';

function LandingPage() {
  const { setView, userVerified, setRole } = useApp();
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();

  const goRequester = () => {
    if (!isConnected) { openConnectModal?.(); return; }
    setRole('requester'); setView('request_form');
  };
  const goComadre = () => {
    if (!isConnected) { openConnectModal?.(); return; }
    if (FLAGS.zkpassRequiredForComadre && !userVerified) { toast('Please verify with zkPass'); return; }
    setRole('comadre'); setView('comadre_list');
  };

  return (
    <div className="min-h-screen bg-comadres-primary">
      {/* Banner con CTA centrado + Connect Wallet a la derecha */}
      <div className="bg-comadres-accent text-white">
        <div className="container mx-auto px-4 py-2 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-2">
          <div className="hidden md:block" />
          <p className="text-sm font-medium text-center">
            🌸 Únete a nuestra red de acompañamiento seguro y confidencial
          </p>
          <ConnectWalletButton className="justify-self-center md:justify-self-end" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <div className="flex justify-center items-center mb-6">
            <div className="bg-white rounded-full p-6 shadow-lg">
              <Heart className="w-12 h-12 text-comadres-accent" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-comadres-dark mb-4">Comadres ZK</h1>
          <p className="text-xl text-comadres-dark/80 max-w-2xl mx-auto mb-8">
            Red de acompañamiento seguro para mujeres. Privacidad garantizada, apoyo real cuando más lo necesitas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={goRequester} size="lg" className="bg-comadres-accent hover:bg-comadres-accent/90 text-white px-8 py-4 text-lg font-semibold shadow-lg">
              Pedir acompañamiento
            </Button>
            <Button onClick={goComadre} size="lg" variant="secondary" className="bg-white hover:bg-gray-50 text-comadres-dark border-2 border-white px-8 py-4 text-lg font-semibold shadow-lg">
              Ser comadre
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Card className="p-6 text-center bg-comadres-light border-none shadow-lg">
            <Shield className="w-10 h-10 text-comadres-accent mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-comadres-dark mb-2">Privacidad Total</h3>
            <p className="text-comadres-gray text-sm">Zero-knowledge: tu información permanece privada y encriptada</p>
          </Card>
          <Card className="p-6 text-center bg-comadres-light border-none shadow-lg">
            <Users className="w-10 h-10 text-comadres-accent mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-comadres-dark mb-2">Red Confiable</h3>
            <p className="text-comadres-gray text-sm">Comunidad verificada de mujeres dispuestas a acompañar</p>
          </Card>
          <Card className="p-6 text-center bg-comadres-light border-none shadow-lg">
            <Heart className="w-10 h-10 text-comadres-accent mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-comadres-dark mb-2">Apoyo Real</h3>
            <p className="text-comadres-gray text-sm">Acompañamiento emocional y físico cuando más lo necesitas</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
export default LandingPage;
