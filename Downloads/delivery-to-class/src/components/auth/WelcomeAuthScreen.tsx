'use client';

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import {
  ShoppingBag,
  User,
  Bike,
  Store,
  Shield,
  ArrowRight,
  Sparkles,
  MapPin,
  Clock,
  Lock,
  Mail,
  Zap,
  CheckCircle2
} from 'lucide-react';

export const WelcomeAuthScreen: React.FC = () => {
  const { loginWithRole, loginWithEmail } = useAuth();
  const [selectedRole, setSelectedRole] = useState<UserRole>('CUSTOMER');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;

    if (isRegisterMode) {
      loginWithRole(selectedRole, nameInput || emailInput.split('@')[0], emailInput);
    } else {
      loginWithEmail(emailInput, selectedRole);
    }
  };

  const handleDemoLogin = (role: UserRole) => {
    loginWithRole(role);
  };

  const rolesConfig: {
    id: UserRole;
    title: string;
    subtitle: string;
    icon: React.ReactNode;
    accentBg: string;
    accentText: string;
    border: string;
    demoName: string;
  }[] = [
    {
      id: 'CUSTOMER',
      title: 'Student Customer',
      subtitle: 'Order snacks, coffee & xerox printouts to your classroom desk during break',
      icon: <User className="w-5 h-5" />,
      accentBg: 'bg-brand-500',
      accentText: 'text-brand-500',
      border: 'border-brand-500',
      demoName: 'Alex Johnson (Student)'
    },
    {
      id: 'DELIVERY_PARTNER',
      title: 'Delivery Partner',
      subtitle: 'Earn cash/UPI during your free break hours delivering items across campus',
      icon: <Bike className="w-5 h-5" />,
      accentBg: 'bg-emerald-600',
      accentText: 'text-emerald-500',
      border: 'border-emerald-500',
      demoName: 'Rahul Sharma (Student Courier)'
    },
    {
      id: 'SHOP_OWNER',
      title: 'Shop Owner',
      subtitle: 'Manage canteen orders, Xerox requests & inventory for campus students',
      icon: <Store className="w-5 h-5" />,
      accentBg: 'bg-amber-500',
      accentText: 'text-amber-500',
      border: 'border-amber-500',
      demoName: 'Chief Chef (Canteen Owner)'
    },
    {
      id: 'ADMIN',
      title: 'Super Admin',
      subtitle: 'Global management across all college campuses, shops, and partner approvals',
      icon: <Shield className="w-5 h-5" />,
      accentBg: 'bg-indigo-600',
      accentText: 'text-indigo-500',
      border: 'border-indigo-500',
      demoName: 'Global Super Admin Officer'
    }
  ];

  const activeRoleConfig = rolesConfig.find((r) => r.id === selectedRole) || rolesConfig[0];

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between relative overflow-hidden font-sans">
      {/* Background Gradients & Glow Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-500/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Header bar */}
      <header className="max-w-7xl w-full mx-auto px-6 py-6 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-brand-500 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-brand-500/30">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <span className="font-black text-xl tracking-tight text-white flex items-center gap-1">
              Delivery <span className="text-brand-500">To Class</span>
            </span>
            <p className="text-[10px] text-slate-400 font-medium -mt-1">
              Hyperlocal Campus Desk Delivery
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300">
          <MapPin className="w-3.5 h-3.5 text-brand-500 animate-pulse" />
          <span>Multi-Campus Delivery Platform</span>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">
        {/* Left Column: Product Value Pitch */}
        <div className="lg:col-span-6 space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-400 font-bold text-xs">
            <Sparkles className="w-4 h-4 text-brand-400 animate-bounce" />
            <span>Classroom Break Desk Delivery Service</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
            Hungry in Class? <br />
            <span className="bg-gradient-to-r from-brand-400 via-amber-400 to-orange-400 bg-clip-text text-transparent">
              Delivered to your Desk.
            </span>
          </h1>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-lg">
            Order fresh snacks, coffee, juices, stationery, and xerox printouts delivered right to your classroom seat during 10:15 AM and 1:00 PM break slots.
          </p>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-3 gap-4 pt-2 border-t border-slate-900">
            <div>
              <p className="text-2xl font-black text-white">10-15m</p>
              <p className="text-[11px] text-slate-400">Break Delivery</p>
            </div>
            <div>
              <p className="text-2xl font-black text-amber-400">4 Campuses</p>
              <p className="text-[11px] text-slate-400">Radius Filtered</p>
            </div>
            <div>
              <p className="text-2xl font-black text-emerald-400">50+ Student</p>
              <p className="text-[11px] text-slate-400">Couriers Active</p>
            </div>
          </div>
        </div>

        {/* Right Column: Role Selection & Login Form */}
        <div className="lg:col-span-6 bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          
          {/* Section Header */}
          <div>
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
              <span>Select Your Role to Login</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Choose your role below to enter your customized portal:
            </p>
          </div>

          {/* 4 Role Cards Selection */}
          <div className="grid grid-cols-2 gap-3">
            {rolesConfig.map((r) => {
              const isSelected = selectedRole === r.id;
              return (
                <button
                  key={r.id}
                  onClick={() => {
                    setSelectedRole(r.id);
                    setIsRegisterMode(false);
                  }}
                  suppressHydrationWarning
                  className={`p-3.5 rounded-2xl border text-left transition-all relative ${
                    isSelected
                      ? `${r.border} bg-slate-800 shadow-lg scale-[1.02]`
                      : 'border-slate-800 bg-slate-950/60 hover:bg-slate-800/50 text-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className={`p-2 rounded-xl ${
                        isSelected ? `${r.accentBg} text-white` : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {r.icon}
                    </div>
                    {isSelected && (
                      <CheckCircle2 className={`w-4 h-4 ${r.accentText}`} />
                    )}
                  </div>

                  <p className="font-bold text-xs text-white truncate">{r.title}</p>
                  <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">{r.subtitle}</p>
                </button>
              );
            })}
          </div>

          {/* Form Box */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-slate-200">
                {isRegisterMode ? `Register as ${activeRoleConfig.title}` : `${activeRoleConfig.title} Login`}
              </span>
              <button
                type="button"
                onClick={() => setIsRegisterMode(!isRegisterMode)}
                suppressHydrationWarning
                className="text-xs font-semibold text-brand-400 hover:underline"
              >
                {isRegisterMode ? 'Already have an account? Login' : 'Need an account? Register'}
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-3" suppressHydrationWarning>
              {isRegisterMode && (
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    suppressHydrationWarning
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
              )}

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">Campus Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    placeholder={selectedRole === 'ADMIN' ? 'admin@deliverytoclass.com' : 'student@campus.edu'}
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    suppressHydrationWarning
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-[11px] font-semibold text-slate-400">Password</label>
                  {!isRegisterMode && (
                    <button
                      type="button"
                      onClick={() => setShowForgotPassword(true)}
                      suppressHydrationWarning
                      className="text-[10px] font-medium text-slate-400 hover:text-brand-400"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    suppressHydrationWarning
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                suppressHydrationWarning
                className={`w-full py-3 rounded-xl ${activeRoleConfig.accentBg} hover:opacity-90 text-white font-bold text-xs shadow-lg flex items-center justify-center gap-2 transition-all active:scale-98`}
              >
                <span>{isRegisterMode ? 'Create Account & Continue' : 'Login & Grant Permissions'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Quick 1-Click Demo Login button */}
            <div className="pt-2 border-t border-slate-800/80">
              <button
                type="button"
                onClick={() => handleDemoLogin(selectedRole)}
                suppressHydrationWarning
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 transition-all border border-slate-700"
              >
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Quick 1-Click Demo Login as {activeRoleConfig.demoName.split(' ')[0]}</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer bar */}
      <footer className="max-w-7xl w-full mx-auto px-6 py-4 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2 z-10">
        <p>© 2026 Delivery to Class. Hyperlocal Campus Logistics Engine.</p>
        <div className="flex items-center gap-4">
          <span>Supported: SRM IST • IIT Madras • VIT Vellore • Anna Univ</span>
        </div>
      </footer>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 text-white">
            <h3 className="text-base font-bold flex items-center gap-2">
              <Mail className="w-4 h-4 text-brand-400" />
              <span>Reset Account Password</span>
            </h3>

            {resetEmailSent ? (
              <div className="space-y-3 text-center py-2">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <p className="text-xs text-slate-300">
                  A password reset link has been sent to <strong>{resetEmail}</strong>. Please check your inbox or campus email.
                </p>
                <button
                  onClick={() => {
                    setShowForgotPassword(false);
                    setResetEmailSent(false);
                    setResetEmail('');
                  }}
                  suppressHydrationWarning
                  className="w-full py-2.5 rounded-xl bg-brand-500 text-xs font-bold text-white"
                >
                  Back to Login
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (resetEmail.trim()) {
                    setResetEmailSent(true);
                  }
                }}
                className="space-y-3"
                suppressHydrationWarning
              >
                <p className="text-xs text-slate-400">
                  Enter your registered campus email address and we'll send you instructions to reset your password.
                </p>
                <div>
                  <input
                    type="email"
                    required
                    placeholder="student@campus.edu"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    suppressHydrationWarning
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(false)}
                    suppressHydrationWarning
                    className="w-1/2 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    suppressHydrationWarning
                    className="w-1/2 py-2.5 rounded-xl bg-brand-500 text-white text-xs font-bold"
                  >
                    Send Link
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
