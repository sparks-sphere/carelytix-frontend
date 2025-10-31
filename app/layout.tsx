import { StoreProvider } from '@/components/providers/StoreProvider';
import './globals.css';
import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/sonner';
export const metadata: Metadata = {
  metadataBase: new URL('https://elitesalon.com'),
  title: 'Carelytics - Transform Your Salon Business',
  description:
    'Streamline appointments, manage clients, track inventory, and grow your revenue with our all-in-one salon management platform.',
  keywords:
    'salon management, appointment booking, salon software, beauty business, spa management',
  openGraph: {
    title: 'EliteSalon - Transform Your Salon Business',
    description:
      'Streamline appointments, manage clients, track inventory, and grow your revenue with our all-in-one salon management platform.',
    type: 'website',
    url: 'https://elitesalon.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EliteSalon - Transform Your Salon Business',
    description:
      'Streamline appointments, manage clients, track inventory, and grow your revenue with our all-in-one salon management platform.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans">
        <StoreProvider>{children}</StoreProvider>
        <Toaster />
      </body>
    </html>
  );
}
