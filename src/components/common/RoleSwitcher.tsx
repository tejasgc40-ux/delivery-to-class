'use client';

import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { User, Store, Bike, Shield, Sparkles } from 'lucide-react';

export const RoleSwitcher: React.FC = () => {
  const { role, switchRole } = useAuth();

  const rolesList: { id: UserRole; label: string; icon: React.ReactNode }[] = [
    { id: 'CUSTOMER', label: 'Student Customer', icon: <User className="w-3.5 h-3.5" /> },
    { id: 'SHOP_OWNER', label: 'Shop Owner', icon: <Store className="w-3.5 h-3.5" /> },
    { id: 'DELIVERY_PARTNER', label: 'Delivery Partner', icon: <Bike className="w-3.5 h-3.5" /> },
    { id: 'ADMIN', label: 'Campus Admin', icon: <Shield className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="bg-slate-900 text-slate-200 px-3 py-2 text-xs border-b border-slate-800 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 font-medium text-brand-400">
          <Sparkles className="w-4 h-4 animate-pulse" />
          <span>Interactive Demo Role Switcher:</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-1.5">
          {rolesList.map((r) => {
            const isActive = role === r.id;
            return (
              <button
                key={r.id}
                onClick={() => switchRole(r.id)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-medium transition-all ${
                  isActive
                    ? 'bg-brand-500 text-white shadow-orange-glow shadow-sm font-semibold scale-105'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                }`}
              >
                {r.icon}
                <span>{r.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
