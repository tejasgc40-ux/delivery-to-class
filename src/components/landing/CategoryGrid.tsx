'use client';

import React from 'react';
import { ShopCategory } from '../../types';
import { Utensils, Coffee, Citrus, Croissant, PenTool, Printer, Pill, ShoppingBag, Cookie, Sparkles } from 'lucide-react';

interface CategoryGridProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const CATEGORIES_WITH_ICONS: { id: ShopCategory | 'All'; label: string; icon: React.ReactNode; color: string }[] = [
  { id: 'All', label: 'All Shops', icon: <Sparkles className="w-4 h-4" />, color: 'bg-brand-500 text-white' },
  { id: 'Restaurants', label: 'Restaurants', icon: <Utensils className="w-4 h-4" />, color: 'bg-red-500 text-white' },
  { id: 'Cafe', label: 'Cafe & Coffee', icon: <Coffee className="w-4 h-4" />, color: 'bg-amber-600 text-white' },
  { id: 'Juice Shop', label: 'Juice & Smoothies', icon: <Citrus className="w-4 h-4" />, color: 'bg-orange-500 text-white' },
  { id: 'Bakery', label: 'Bakery & Puffs', icon: <Croissant className="w-4 h-4" />, color: 'bg-amber-700 text-white' },
  { id: 'Stationery', label: 'Stationery & Pens', icon: <PenTool className="w-4 h-4" />, color: 'bg-blue-600 text-white' },
  { id: 'Xerox', label: 'Xerox & Prints', icon: <Printer className="w-4 h-4" />, color: 'bg-purple-600 text-white' },
  { id: 'Medical', label: 'Medical & First Aid', icon: <Pill className="w-4 h-4" />, color: 'bg-emerald-600 text-white' },
  { id: 'Grocery', label: 'Dorm Grocery', icon: <ShoppingBag className="w-4 h-4" />, color: 'bg-teal-600 text-white' },
  { id: 'Snacks', label: 'Munchies & Snacks', icon: <Cookie className="w-4 h-4" />, color: 'bg-indigo-600 text-white' },
];

export const CategoryGrid: React.FC<CategoryGridProps> = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div className="py-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
          Explore Campus Categories
        </h3>
        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          Select category to filter
        </span>
      </div>

      {/* Horizontal scrollable category pill bar */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-3 scrollbar-none">
        {CATEGORIES_WITH_ICONS.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold text-xs whitespace-nowrap transition-all shadow-sm ${
                isActive
                  ? 'bg-brand-500 text-white shadow-orange-glow ring-2 ring-brand-500 scale-105'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
