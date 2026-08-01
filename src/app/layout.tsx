import React from 'react';
import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';
import { OrderProvider } from '../context/OrderContext';
import { RoleSwitcher } from '../components/common/RoleSwitcher';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { BottomNav } from '../components/common/BottomNav';
import { ToastProvider } from '../components/common/Toast';

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
              <ToastProvider>
                <RoleSwitcher />
                <Header />
                <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
                  {children}
                </main>
                <Footer />
                <BottomNav />
              </ToastProvider>
            </OrderProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
