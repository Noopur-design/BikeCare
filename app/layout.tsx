import type { Metadata } from 'next';
import { Fraunces, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/Toast';
import { ImageFallback, ToTop, MobileCTA } from '@/components/SiteChrome';

const serif = Fraunces({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
});
const sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'BIKECARE — Premium Bike Service. Zero Downtime.',
    template: '%s — BIKECARE',
  },
  description:
    'Expert bike service with genuine parts, certified technicians and free doorstep pickup. Keep your ride running perfect with BIKECARE.',
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Crect width='24' height='24' rx='6' fill='%23C96A3D'/%3E%3Ccircle cx='12' cy='12' r='6' fill='none' stroke='white' stroke-width='1.4'/%3E%3Ccircle cx='12' cy='12' r='1.6' fill='white'/%3E%3C/svg%3E",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Toaster />
        <ToTop />
        <MobileCTA />
        <ImageFallback />
      </body>
    </html>
  );
}
