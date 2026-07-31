'use client';

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { MapPin, Bell, Compass, CheckCircle2, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const PermissionsModal: React.FC = () => {
  const {
    user,
    role,
    selectedCollege,
    requestLocationPermission,
    requestNotificationPermission,
    setOnboardingStep
  } = useAuth();

  const router = useRouter();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isLocating, setIsLocating] = useState(false);
  const [isNotifying, setIsNotifying] = useState(false);
  const [locationDone, setLocationDone] = useState(false);
  const [notificationDone, setNotificationDone] = useState(false);

  const handleLocationRequest = async () => {
    setIsLocating(true);
    await requestLocationPermission();
    setIsLocating(false);
    setLocationDone(true);
    setStep(2);
  };

  const handleNotificationRequest = async () => {
    setIsNotifying(true);
    await requestNotificationPermission();
    setIsNotifying(false);
    setNotificationDone(true);
    setStep(3);
  };

  const handleFinishOnboarding = () => {
    setOnboardingStep('COMPLETED');
    if (role === 'DELIVERY_PARTNER') {
      router.push('/partner');
    } else if (role === 'SHOP_OWNER') {
      router.push('/shop-owner');
    } else if (role === 'ADMIN') {
      router.push('/admin');
    } else {
      router.push('/');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 relative overflow-hidden">
        {/* Background ambient accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-brand-500/10 blur-3xl rounded-full pointer-events-none" />

        {/* Header Badge */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 text-xs font-bold text-brand-600 dark:text-brand-300">
            <Sparkles className="w-3.5 h-3.5 text-brand-500 animate-spin" />
            <span>Welcome, {user?.name.split(' ')[0]}</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
            <span className={step >= 1 ? 'text-brand-500 font-extrabold' : ''}>Step {step} of 3</span>
          </div>
        </div>

        {/* Step 1: Location Permission */}
        {step === 1 && (
          <div className="space-y-5 animate-in fade-in slide-in-from-right-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <MapPin className="w-7 h-7" />
            </div>

            <div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                Location Permission Required
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Delivery to Class requires your GPS location to auto-detect your nearest campus building, show active shops within your campus radius, and calculate desk delivery times.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <span>Your location is strictly used during session breaks to match local campus couriers to your classroom building.</span>
            </div>

            <button
              onClick={handleLocationRequest}
              disabled={isLocating}
              className="w-full py-3.5 px-6 rounded-2xl bg-brand-500 hover:bg-brand-600 text-white font-black text-sm shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2 transition-all active:scale-98 disabled:opacity-60"
            >
              {isLocating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Detecting GPS Coordinates...</span>
                </>
              ) : (
                <>
                  <Compass className="w-4 h-4" />
                  <span>Allow GPS Location Access</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Step 2: Notification Permission */}
        {step === 2 && (
          <div className="space-y-5 animate-in fade-in slide-in-from-right-4">
            <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
              <Bell className="w-7 h-7" />
            </div>

            <div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                Enable Order Notifications
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Never miss your snack orxerox delivery during short 15-minute breaks! Get instant alerts when your order is accepted, ready, or arriving outside your classroom door.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />
              <span>Real-time status alerts for: Order Accepted, Food Ready, Courier En-Route, and Delivered to Desk.</span>
            </div>

            <button
              onClick={handleNotificationRequest}
              disabled={isNotifying}
              className="w-full py-3.5 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 transition-all active:scale-98 disabled:opacity-60"
            >
              {isNotifying ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Requesting Browser Permissions...</span>
                </>
              ) : (
                <>
                  <Bell className="w-4 h-4" />
                  <span>Enable Push Notifications</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Step 3: Campus Detected & Open Dashboard */}
        {step === 3 && (
          <div className="space-y-5 animate-in fade-in slide-in-from-right-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold mb-2">
                Campus Detected via GPS
              </div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                {selectedCollege?.name || 'SRM Tech Park Campus'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                {selectedCollege?.locationName} • Radius: {selectedCollege?.radiusKm} km
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Active Role:</span>
                <span className="font-bold text-slate-900 dark:text-white uppercase">{role}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Location Status:</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">GPS Verified</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Notification Alerts:</span>
                <span className="font-semibold text-indigo-600 dark:text-indigo-400">Active</span>
              </div>
            </div>

            <button
              onClick={handleFinishOnboarding}
              className="w-full py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 transition-all active:scale-98"
            >
              <span>Open Role Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
