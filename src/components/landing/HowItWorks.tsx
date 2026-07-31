'use client';

import React from 'react';
import { ShoppingBag, Store, Bike, CheckCircle2, ShieldCheck, Banknote } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Order To Classroom',
      description: 'Select nearby campus canteen or xerox shop. Enter your Building, Floor & Classroom # and pick your Break Slot.',
      icon: <ShoppingBag className="w-6 h-6 text-brand-500" />
    },
    {
      step: '02',
      title: 'Shop Prepares Items',
      description: 'The shop receives your order and gets your rolls, cold coffee, or lab printouts fresh & ready before break.',
      icon: <Store className="w-6 h-6 text-amber-500" />
    },
    {
      step: '03',
      title: 'Student Partner Delivers',
      description: 'A student delivery partner accepts the order and walks/rides to your classroom building during break time.',
      icon: <Bike className="w-6 h-6 text-emerald-500" />
    },
    {
      step: '04',
      title: 'Pay Direct Cash or UPI',
      description: 'Collect your order at your classroom desk and pay the delivery partner directly via Cash or Instant UPI QR Code!',
      icon: <Banknote className="w-6 h-6 text-indigo-500" />
    }
  ];

  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-900/50 rounded-3xl my-12 border border-slate-200 dark:border-slate-800 p-6 sm:p-10">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          How Delivery To Class Works
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 font-medium">
          Zero online platform commission. Fast break-time delivery directly to college classrooms.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((s) => (
          <div
            key={s.step}
            className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-sm relative group hover:border-brand-500 transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center group-hover:scale-110 transition-transform">
                {s.icon}
              </div>
              <span className="text-2xl font-black text-slate-300 dark:text-slate-700">
                {s.step}
              </span>
            </div>

            <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2">
              {s.title}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {s.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10 p-4 rounded-2xl bg-brand-500/10 border border-brand-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-left">
          <ShieldCheck className="w-8 h-8 text-brand-500 shrink-0" />
          <div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              100% Direct P2P Cash/UPI Payment
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              The website NEVER holds your money or takes payment gateway fees. All payments go 100% directly to the student courier.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
