'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext';
import { UserRole } from '../../../types';
import { ShoppingBag, Lock, Mail, ArrowRight } from 'lucide-react';
import Link from 'next/link';

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
    <div className="max-w-md mx-auto py-12 space-y-6">
      <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-6 text-center">
        <div className="w-12 h-12 rounded-2xl bg-brand-500 text-white flex items-center justify-center mx-auto shadow-md shadow-brand-500/20">
          <ShoppingBag className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">Welcome Back</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Login to Delivery To Class
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 text-left">
          <div>
            <label className="text-xs font-bold text-slate-600 dark:text-slate-300">Campus Email</label>
            <div className="relative mt-1">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@campus.edu"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-600 dark:text-slate-300">Select Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as UserRole)}
              className="w-full mt-1 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
            >
              <option value="CUSTOMER">Student Customer</option>
              <option value="DELIVERY_PARTNER">Delivery Partner</option>
              <option value="SHOP_OWNER">Shop Owner</option>
              <option value="ADMIN">Administrator</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shadow-md shadow-brand-500/20 transition-all flex items-center justify-center gap-1.5"
          >
            <span>Login to Campus Platform</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
