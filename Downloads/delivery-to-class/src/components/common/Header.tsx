'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useOrders } from '../../context/OrderContext';
import { ShoppingBag, MapPin, Bike, Store, Shield, Bell, ChevronDown, LogOut } from 'lucide-react';

export const Header: React.FC = () => {
  const { user, role, logout, selectedCollege, colleges, setSelectedCollege } = useAuth();
  const { items } = useCart();
  const { orders } = useOrders();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const totalCartCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const activeOrdersCount = orders.filter(
    (o) => o.status !== 'DELIVERED' && o.status !== 'CANCELLED'
  ).length;

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-9 z-40 backdrop-blur-md bg-white/90 dark:bg-slate-900/90 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1 font-black text-lg tracking-tight text-slate-900 dark:text-white">
              <span>Delivery</span>
              <span className="text-brand-500">To Class</span>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium -mt-1">
              Campus Break Delivery
            </p>
          </div>
        </Link>

        {/* Location / Campus Selector Pill */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300">
          <MapPin className="w-3.5 h-3.5 text-brand-500 animate-bounce shrink-0" />
          <select
            value={selectedCollege?.id || colleges[0]?.id}
            onChange={(e) => {
              const matched = colleges.find((c) => c.id === e.target.value);
              if (matched) setSelectedCollege(matched);
            }}
            className="bg-transparent font-bold text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer"
          >
            {colleges.map((col) => (
              <option key={col.id} value={col.id} className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">
                {col.name} ({col.code})
              </option>
            ))}
          </select>
        </div>

        {/* Navigation Actions */}
        <div className="flex items-center gap-3">
          
          {/* Quick links per role */}
          {role === 'CUSTOMER' && (
            <>
              <Link
                href="/cart"
                className="relative p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 transition-all"
                title="View Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalCartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brand-500 text-white font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                    {totalCartCount}
                  </span>
                )}
              </Link>

              <Link
                href="/orders/active"
                className="relative hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 font-semibold text-xs border border-amber-200 dark:border-amber-800"
              >
                <Bell className="w-4 h-4 text-amber-500" />
                <span>Orders</span>
                {activeOrdersCount > 0 && (
                  <span className="bg-amber-500 text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                    {activeOrdersCount}
                  </span>
                )}
              </Link>
            </>
          )}

          {role === 'SHOP_OWNER' && (
            <Link
              href="/shop-owner"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-brand-500 text-white font-semibold text-xs shadow-md shadow-brand-500/20"
            >
              <Store className="w-4 h-4" />
              <span className="hidden sm:inline">Shop Dashboard</span>
            </Link>
          )}

          {role === 'DELIVERY_PARTNER' && (
            <Link
              href="/partner"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 text-white font-semibold text-xs shadow-md shadow-emerald-600/20"
            >
              <Bike className="w-4 h-4" />
              <span className="hidden sm:inline">Partner Console</span>
            </Link>
          )}

          {role === 'ADMIN' && (
            <Link
              href="/admin"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-600 text-white font-semibold text-xs shadow-md shadow-indigo-600/20"
            >
              <Shield className="w-4 h-4" />
              <span className="hidden sm:inline">Admin Panel</span>
            </Link>
          )}

          {/* User Profile dropdown */}
          <div className="relative">
            <button
              suppressHydrationWarning
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-sm text-slate-800 dark:text-white">
                {user?.name ? user.name[0].toUpperCase() : 'U'}
              </div>
              <span className="hidden sm:block text-xs font-semibold text-slate-800 dark:text-slate-200 max-w-[100px] truncate">
                {user?.name || 'Guest User'}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-700">
                  <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {user?.name}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                    {user?.email}
                  </p>
                  <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold bg-brand-100 text-brand-700 dark:bg-brand-950 dark:text-brand-300">
                    {role}
                  </span>
                </div>

                <div className="py-1">
                  <Link
                    href="/partner/register"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50"
                  >
                    <Bike className="w-4 h-4 text-emerald-500" />
                    <span>Become Delivery Partner</span>
                  </Link>

                  <button
                    suppressHydrationWarning
                    onClick={() => {
                      setIsProfileOpen(false);
                      logout();
                    }}
                    className="w-full text-left flex items-center gap-2 px-4 py-2 text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};
