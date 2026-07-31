import React from 'react';
import type { Metadata, Viewport } from 'next';
import 'leaflet/dist/leaflet.css';
import './globals.css';
import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';
import { OrderProvider } from '../context/OrderContext';
import { AppAuthWrapper } from '../components/auth/AppAuthWrapper';

export const metadata: Metadata = {
  title: 'Delivery To Class | Campus Hyperlocal Delivery',
  description: 'Order food, snacks, cold coffee & xerox printouts delivered directly to your classroom desk during break hours.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-brand-500 selection:text-white">
        <AuthProvider>
          <CartProvider>
            <OrderProvider>
              <AppAuthWrapper>{children}</AppAuthWrapper>
            </OrderProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
