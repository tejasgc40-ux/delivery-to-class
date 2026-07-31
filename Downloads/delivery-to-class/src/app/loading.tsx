'use client';

import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mb-4" />
      <p className="text-sm font-bold text-slate-600 dark:text-slate-300 animate-pulse">
        Loading Campus Delivery Services...
      </p>
    </div>
  );
}
