'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext';
import { UserRole } from '../../../types';
import { ShoppingBag, Mail, ArrowRight, User, Bike, Store, Shield } from 'lucide-react';

const ROLE_OPTIONS: { value: UserRole; label: string; icon: React.ElementType }[] = [
  { value: 'CUSTOMER', label: 'Student Customer', icon: User },
  { value: 'DELIVERY_PARTNER', label: 'Delivery Partner', icon: Bike },
  { value: 'SHOP_OWNER', label: 'Shop Owner', icon: Store },
  { value: 'ADMIN', label: 'Administrator', icon: Shield },
];

export default function LoginPage() {
  const router = useRouter();
  const { loginWithEmail } = useAuth();
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>('CUSTOMER');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    loginWithEmail(email, role);
    router.push('/');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="surface-card p-8 shadow-xl space-y-6 text-center relative overflow-hidden">
          {/* Ambient gradient glow */}
          <div className="absolute -top-24 -right-24 w-56 h-56 bg-gradient-to-br from-brand-500/20 to-pink-500/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-pink-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-brand-500/30">
              <ShoppingBag className="w-7 h-7" aria-hidden="true" />
            </div>
          </div>

          <div className="relative">
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">Welcome Back</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Login to Delivery To Class
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5 text-left relative">
            <div>
              <label htmlFor="login-email" className="text-xs font-bold text-slate-600 dark:text-slate-300">
                Campus Email
              </label>
              <div className="relative mt-1.5">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" aria-hidden="true" />
                <input
                  id="login-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@campus.edu"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white transition-colors focus:border-brand-500"
                />
              </div>
            </div>

            <fieldset>
              <legend className="text-xs font-bold text-slate-600 dark:text-slate-300 mb-1.5">
                Select Role
              </legend>
              <div className="grid grid-cols-2 gap-2">
                {ROLE_OPTIONS.map(({ value, label, icon: Icon }) => {
                  const isSelected = role === value;
                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setRole(value)}
                      aria-pressed={isSelected}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                        isSelected
                          ? 'bg-brand-500 border-brand-500 text-white shadow-md'
                          : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-brand-300 dark:hover:border-brand-700'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span className="truncate">{label}</span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <button
              type="submit"
              disabled={!email}
              className="w-full py-3 rounded-xl bg-brand-500 hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-xs shadow-md shadow-brand-500/20 transition-all flex items-center justify-center gap-1.5"
            >
              <span>Login to Campus Platform</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-slate-500 dark:text-slate-400">
          Demo login — no password required. Pick any role to explore that experience.
        </p>
      </div>
    </div>
  );
}
