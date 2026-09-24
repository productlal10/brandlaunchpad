import type { Metadata } from 'next';
import { Syne, Sora } from 'next/font/google';
import './globals.css';

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
});

const sora = Sora({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sora',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://launchpad.lal10.com'),
  title: 'LAL10 FashionOS · Fashion Brand Operating System & Advisory',
  description:
    'An operating system for founders entering fashion — from market intelligence, product strategy and assortment planning to sourcing advisory and marketplace readiness.',
  keywords: [
    'Lal10',
    'FashionOS',
    'Fashion brand advisory',
    'Apparel supply chain',
    'Assortment planning',
    'Myntra onboarding',
    'Indian textile manufacturing',
    'MSME factory network',
  ],
  authors: [{ name: 'Lal10 FashionOS' }],
  icons: {
    icon: [
      { url: '/logo.png', type: 'image/png' },
      { url: '/favicon.ico' },
      { url: 'https://www.lal10.com/logo.png', type: 'image/png' }
    ],
    apple: '/logo.png',
    shortcut: '/favicon.ico',
  },
  openGraph: {
    title: 'LAL10 FashionOS · Your fashion brand, built on supply-chain intelligence.',
    description:
      'The playbook behind launching & scaling brands. Designed, sampled, produced & shipped across womenswear, menswear & kidswear.',
    type: 'website',
    images: ['/images/hero-bg.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${syne.variable} ${sora.variable}`}>
      <head>
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://unpkg.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />
        <link rel="dns-prefetch" href="https://unpkg.com" />
        <script src="https://unpkg.com/lucide@latest" defer></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
        <script src="https://unpkg.com/lenis@1.1.18/dist/lenis.min.js"></script>
      </head>
      <body className="bg-white text-[#0A0C0D] antialiased selection:bg-[#0B3A53]/15 selection:text-[#0A0C0D]">
        {children}
      </body>
    </html>
  );
}
