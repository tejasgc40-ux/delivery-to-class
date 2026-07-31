'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { Home, Store, ShoppingBag, Clock, User, Bike, Shield } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const pathname = usePathname();
  const { role } = useAuth();
  const { items } = useCart();
  const totalCartCount = items.reduce((sum, i) => sum + i.quantity, 0);

  const getRoleConsoleLink = () => {
    switch (role) {
      case 'SHOP_OWNER':
        return { label: 'Shop', href: '/shop-owner', icon: Store };
      case 'DELIVERY_PARTNER':
        return { label: 'Partner', href: '/partner', icon: Bike };
      case 'ADMIN':
        return { label: 'Admin', href: '/admin', icon: Shield };
      default:
        return { label: 'Earn', href: '/partner/register', icon: Bike };
    }
  };

  const roleLink = getRoleConsoleLink();

  const navItems = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Cart', href: '/cart', icon: ShoppingBag, count: totalCartCount },
    { label: 'Orders', href: '/orders/active', icon: Clock },
    { label: roleLink.label, href: roleLink.href, icon: roleLink.icon },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 px-4 py-2 shadow-lg">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center gap-1 transition-all relative ${
                isActive
                  ? 'text-brand-500 scale-105 font-bold'
                  : 'text-slate-500 dark:text-slate-400 font-medium'
              }`}
            >
              <div className="relative">
                <Icon className="w-5 h-5" />
                {item.count && item.count > 0 ? (
                  <span className="absolute -top-1.5 -right-2 bg-brand-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {item.count}
                  </span>
                ) : null}
              </div>
              <span className="text-[10px]">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
