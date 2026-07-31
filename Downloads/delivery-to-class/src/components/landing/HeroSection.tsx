'use client';

import React from 'react';
import Link from 'next/link';
import { Search, Zap, Clock, ShieldCheck, ArrowRight, Sparkles, MapPin } from 'lucide-react';

interface HeroSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 bg-gradient-to-b from-brand-50/60 via-white to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 transition-colors">
      
      {/* Decorative gradient glow blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-gradient-to-tr from-brand-500/20 to-amber-500/10 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Campus Status Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-100 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 text-xs font-bold shadow-sm">
            <Zap className="w-3.5 h-3.5 text-brand-500 fill-brand-500 animate-pulse" />
            <span>Next Break Delivery Slot: 10:15 AM Morning Break</span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
            Food & Xerox Delivered <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-brand-500 via-amber-500 to-brand-600 bg-clip-text text-transparent">
              Directly To Your Classroom
            </span>
          </h1>

          <p className="text-sm sm:text-lg text-slate-600 dark:text-slate-300 font-medium leading-relaxed max-w-2xl mx-auto">
            Order snacks, hot coffee, stationery & xerox printouts from campus-nearby shops. Delivered right to your classroom desk during break hours by fellow student couriers!
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mt-8">
          <div className="relative flex items-center bg-white dark:bg-slate-800 rounded-2xl p-2 shadow-xl border border-slate-200 dark:border-slate-700 focus-within:ring-2 focus-within:ring-brand-500 transition-all">
            <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search canteen rolls, cold coffee, stationery, xerox print..."
              suppressHydrationWarning
              className="w-full px-3 py-2 bg-transparent text-sm text-slate-900 dark:text-white focus:outline-none placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                suppressHydrationWarning
                className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 px-2"
              >
                Clear
              </button>
            )}
            <button
              suppressHydrationWarning
              className="bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs px-5 py-3 rounded-xl transition-all shadow-md shrink-0 flex items-center gap-1.5"
            >
              <span>Find Shops</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Highlight Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12">
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md p-4 rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-sm text-center">
            <Clock className="w-5 h-5 text-brand-500 mx-auto mb-1" />
            <div className="text-lg font-black text-slate-900 dark:text-white">Break Hours</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Classroom Desk Delivery</div>
          </div>

          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md p-4 rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-sm text-center">
            <ShieldCheck className="w-5 h-5 text-emerald-500 mx-auto mb-1" />
            <div className="text-lg font-black text-slate-900 dark:text-white">Cash or UPI</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Direct to Student Courier</div>
          </div>

          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md p-4 rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-sm text-center">
            <MapPin className="w-5 h-5 text-sky-500 mx-auto mb-1" />
            <div className="text-lg font-black text-slate-900 dark:text-white">Leaflet GPS</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Live Campus Route</div>
          </div>

          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md p-4 rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-sm text-center">
            <Sparkles className="w-5 h-5 text-amber-500 mx-auto mb-1" />
            <div className="text-lg font-black text-slate-900 dark:text-white">Student Earn</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Earn Between Classes</div>
          </div>
        </div>

      </div>
    </section>
  );
};
