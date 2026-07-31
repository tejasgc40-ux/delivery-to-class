'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const DynamicCampusMap = dynamic(
  () => import('./CampusMap').then((mod) => mod.CampusMapContent),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-80 rounded-2xl bg-slate-100 dark:bg-slate-800 animate-pulse flex flex-col items-center justify-center text-slate-400 gap-2 border border-slate-200 dark:border-slate-700">
        <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs font-semibold">Loading Campus Interactive Leaflet Map...</p>
      </div>
    )
  }
);

export const CampusMapWrapper: React.FC<any> = (props) => {
  return <DynamicCampusMap {...props} />;
};
