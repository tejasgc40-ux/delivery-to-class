'use client';

import React, { useState } from 'react';
import { useOrders } from '../context/OrderContext';
import { useAuth } from '../context/AuthContext';
import { HeroSection } from '../components/landing/HeroSection';
import { CategoryGrid } from '../components/landing/CategoryGrid';
import { ShopCard } from '../components/shop/ShopCard';
import { CampusMapWrapper } from '../components/map/CampusMapWrapper';
import { HowItWorks } from '../components/landing/HowItWorks';
import { calculateDistanceKm } from '../lib/utils';
import { Map, Grid, Store, Bike, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const { shops } = useOrders();
  const { selectedCollege } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');

  // Filter shops by search query, category, and selected campus radius
  const filteredShops = shops.filter((shop) => {
    const matchesSearch =
      shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shop.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shop.address.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' || shop.category === selectedCategory;

    // Radius filter (or shop associated with collegeId)
    let inCampusRadius = true;
    if (selectedCollege) {
      if (shop.collegeId) {
        inCampusRadius = shop.collegeId === selectedCollege.id;
      } else {
        const dist = calculateDistanceKm(selectedCollege.lat, selectedCollege.lng, shop.lat, shop.lng);
        inCampusRadius = dist <= (selectedCollege.radiusKm || 5);
      }
    }

    return matchesSearch && matchesCategory && inCampusRadius;
  });

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <HeroSection
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Category Pills */}
      <CategoryGrid
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Section Header & View Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Store className="w-5 h-5 text-brand-500" />
            <span>Nearby Campus Shops</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-brand-100 text-brand-700 dark:bg-brand-950 dark:text-brand-300 font-bold">
              {filteredShops.length} Available
            </span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            All shops deliver to classrooms inside {selectedCollege?.name || 'SRM Tech Park Campus'} within {selectedCollege?.radiusKm || 3.5} km radius.
          </p>
        </div>

        {/* View Toggle (Grid vs Map) */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl border border-slate-200 dark:border-slate-700 self-start sm:self-auto">
          <button
            onClick={() => setViewMode('grid')}
            suppressHydrationWarning
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
              viewMode === 'grid'
                ? 'bg-brand-500 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>Grid View</span>
          </button>
          <button
            onClick={() => setViewMode('map')}
            suppressHydrationWarning
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
              viewMode === 'map'
                ? 'bg-brand-500 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            <Map className="w-3.5 h-3.5" />
            <span>Campus Map</span>
          </button>
        </div>
      </div>

      {/* Main Content: Map or Grid */}
      {viewMode === 'map' ? (
        <div className="space-y-4">
          <div className="p-3 bg-slate-900 text-slate-300 rounded-xl text-xs flex items-center justify-between border border-slate-800">
            <span>Click any shop marker to view details & walking distance from Tech Park.</span>
            <span className="text-emerald-400 font-semibold">● Leaflet OpenStreetMap</span>
          </div>
          <CampusMapWrapper shops={filteredShops} height="480px" />
        </div>
      ) : filteredShops.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredShops.map((shop) => (
            <ShopCard key={shop.id} shop={shop} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
          <Store className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            No Shops Found for "{searchQuery || selectedCategory}"
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            Try resetting your search query or choosing another campus category.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="px-4 py-2 rounded-xl bg-brand-500 text-white text-xs font-bold hover:bg-brand-600"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* How it Works Section */}
      <HowItWorks />

      {/* Become Delivery Partner Callout */}
      <div className="bg-gradient-to-r from-brand-600 via-amber-600 to-orange-700 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
        <div className="max-w-2xl relative z-10 space-y-3">
          <span className="px-3 py-1 rounded-full bg-white/20 text-white font-bold text-xs inline-block">
            Student Opportunity
          </span>
          <h2 className="text-2xl sm:text-4xl font-black">
            Are you a student with free break hours?
          </h2>
          <p className="text-xs sm:text-sm text-brand-100 leading-relaxed">
            Join 50+ student couriers on campus. Accept delivery requests to nearby classroom buildings during your 10:15 AM or 1:00 PM breaks and earn ₹200–₹500 daily directly via Cash or UPI!
          </p>
          <div className="pt-2">
            <Link
              href="/partner/register"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white text-slate-950 font-black text-xs hover:bg-slate-100 shadow-lg transition-transform active:scale-95"
            >
              <Bike className="w-4 h-4 text-brand-600" />
              <span>Register as Student Partner</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
