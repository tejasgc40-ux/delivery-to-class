'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Shop } from '../../types';
import { calculateDistanceKm, calculateWalkingMinutes } from '../../lib/utils';
import { Star, MapPin, Clock, ArrowRight, CheckCircle, Phone } from 'lucide-react';

interface ShopCardProps {
  shop: Shop;
  userLat?: number;
  userLng?: number;
}

export const ShopCard: React.FC<ShopCardProps> = ({
  shop,
  userLat = 12.9725,
  userLng = 77.5950
}) => {
  const distanceKm = calculateDistanceKm(userLat, userLng, shop.lat, shop.lng);
  const walkingTimeMin = calculateWalkingMinutes(distanceKm);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-700/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group">
      
      {/* Shop Cover Image */}
      <div className="relative h-44 w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
        <img
          src={shop.imageUrl}
          alt={shop.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className="px-2.5 py-1 rounded-xl bg-slate-900/80 backdrop-blur-md text-white font-bold text-[10px] tracking-wide uppercase">
            {shop.category}
          </span>
          <span
            className={`px-2.5 py-1 rounded-xl text-[10px] font-bold backdrop-blur-md ${
              shop.isOpen
                ? 'bg-emerald-500/90 text-white'
                : 'bg-rose-500/90 text-white'
            }`}
          >
            {shop.isOpen ? '● Open for Break' : '○ Closed'}
          </span>
        </div>

        {/* Rating Badge */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs shadow-md">
          <Star className="w-3.5 h-3.5 fill-slate-950" />
          <span>{shop.rating}</span>
          <span className="text-[10px] text-slate-800 font-semibold">({shop.totalReviews})</span>
        </div>
      </div>

      {/* Details Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-brand-500 transition-colors line-clamp-1">
            {shop.name}
          </h3>

          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-1">
            <MapPin className="w-3.5 h-3.5 text-brand-500 shrink-0" />
            <span className="truncate">{shop.address}</span>
          </div>

          <div className="flex items-center gap-3 mt-3 text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-900/60 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-sky-500" />
              <span>{walkingTimeMin} min walk</span>
            </div>
            <span>•</span>
            <div className="text-slate-500">
              {Math.round(distanceKm * 1000)}m away
            </div>
          </div>

          {/* Delivery Break Slots */}
          <div className="mt-3">
            <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">
              Available Delivery Slots
            </p>
            <div className="flex flex-wrap gap-1">
              {shop.deliveryBreakSlots.slice(0, 2).map((slot) => (
                <span
                  key={slot}
                  className="px-2 py-0.5 rounded-lg bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300 text-[10px] font-semibold border border-brand-200/50 dark:border-brand-800/50"
                >
                  {slot}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* View Menu CTA */}
        <Link
          href={`/shops/${shop.id}`}
          className="w-full py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs text-center transition-all flex items-center justify-center gap-1.5 shadow-md shadow-brand-500/20"
        >
          <span>View Menu & Order</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

    </div>
  );
};
