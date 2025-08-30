import '@rainbow-me/rainbowkit/styles.css';
import { Metadata } from 'next';
import { ScaffoldEthAppWithProviders } from '@/components/ScaffoldEthAppWithProviders';
import ThemeProvider from '@/components/ThemeProvider';
import '../styles/globals.css';

const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : `http://localhost:${process.env.PORT || 3000}`;
const imageUrl = `${baseUrl}/thumbnail.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: { default: 'Las Comadres ZK', template: '%s | Las Comadres ZK' },
  description: 'Las Comadres ZK — MVP',
  openGraph: { title: { default: 'Las Comadres ZK', template: '%s | Las Comadres ZK' }, description: 'MVP', images: [{ url: imageUrl }] },
  twitter: { card: 'summary_large_image', images: [imageUrl], title: { default: 'Las Comadres ZK', template: '%s | Las Comadres ZK' }, description: 'MVP' },
  icons: { icon: [{ url: '/favicon.ico', sizes: '32x32', type: 'image/png' }] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" data-theme="comadres" suppressHydrationWarning>
      <body className="bg-comadres-primary text-comadres-dark">
        <ThemeProvider>
          <ScaffoldEthAppWithProviders>{children}</ScaffoldEthAppWithProviders>
        </ThemeProvider>
      </body>
    </html>
  );
}