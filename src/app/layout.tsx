'use client';

import './globals.css';
import { Inter, Poppins } from 'next/font/google';
import { useState } from 'react';
import AgeVerification from '@/components/AgeVerification';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const poppins = Poppins({ 
  subsets: ['latin'], 
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins' 
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAgeVerified, setIsAgeVerified] = useState(false);

  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <title>Demo Smoke - Premium Smoke Shop & Accessories</title>
        <meta name="description" content="Premium smoke shop offering quality vapes, glass, accessories, and more. Must be 21+ to enter." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="font-sans antialiased">
        <AuthProvider>
          <CartProvider>
            {!isAgeVerified ? (
              <AgeVerification onVerified={() => setIsAgeVerified(true)} />
            ) : (
              children
            )}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
} 