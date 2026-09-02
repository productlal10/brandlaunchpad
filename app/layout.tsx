import type { Metadata } from 'next';
import { Cormorant_Garamond, Manrope } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-manrope',
  display: 'swap',
});

export const metadata: Metadata = {
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
    icon: 'https://www.lal10.com/logo.png',
    apple: 'https://www.lal10.com/logo.png',
    shortcut: 'https://www.lal10.com/logo.png',
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
    <html lang="en" className={`${cormorant.variable} ${manrope.variable}`}>
      <body className="bg-[#FBFAF7] text-[#171615] antialiased selection:bg-[#5B1F28] selection:text-white">
        {children}
      </body>
    </html>
  );
}
