'use client';

import React, { useState } from 'react';
import { useOrders } from '../../context/OrderContext';
import { formatCurrency } from '../../lib/utils';
import { Shield, Store, Bike, CheckCircle2, AlertTriangle, Users, BarChart3, FileText } from 'lucide-react';

export default function AdminPanelPage() {
  const { shops, partners, orders, approvePartner, approveShop } = useOrders();
  const [activeTab, setActiveTab] = useState<'overview' | 'partners' | 'shops' | 'complaints'>('overview');

  const totalGMV = orders.reduce((sum, o) => sum + o.totalAmount, 0);

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-slate-900 rounded-3xl p-6 text-white shadow-xl flex items-center justify-between">
        <div>
          <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-bold">
            Administrator Control Panel
          </span>
          <h1 className="text-2xl font-black mt-1">Campus Super Admin</h1>
          <p className="text-xs text-indigo-100">
            SRM & University Campus Delivery Operations
          </p>
        </div>
        <Shield className="w-10 h-10 text-indigo-300" />
      </div>

      {/* Analytics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-center">
          <BarChart3 className="w-5 h-5 text-indigo-500 mx-auto mb-1" />
          <div className="text-xl font-black text-slate-900 dark:text-white">
            {formatCurrency(totalGMV)}
          </div>
          <div className="text-[11px] text-slate-400 font-medium">Campus GMV</div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-center">
          <FileText className="w-5 h-5 text-brand-500 mx-auto mb-1" />
          <div className="text-xl font-black text-slate-900 dark:text-white">
            {orders.length}
          </div>
          <div className="text-[11px] text-slate-400 font-medium">Total Orders Handled</div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-center">
          <Bike className="w-5 h-5 text-emerald-500 mx-auto mb-1" />
          <div className="text-xl font-black text-slate-900 dark:text-white">
            {partners.length}
          </div>
          <div className="text-[11px] text-slate-400 font-medium">Verified Student Couriers</div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-center">
          <Store className="w-5 h-5 text-amber-500 mx-auto mb-1" />
          <div className="text-xl font-black text-slate-900 dark:text-white">
            {shops.length}
          </div>
          <div className="text-[11px] text-slate-400 font-medium">Registered Campus Shops</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl font-bold text-xs ${
            activeTab === 'overview' ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
          }`}
        >
          Overview & Log
        </button>
        <button
          onClick={() => setActiveTab('partners')}
          className={`px-4 py-2 rounded-xl font-bold text-xs ${
            activeTab === 'partners' ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
          }`}
        >
          Partner Approvals ({partners.length})
        </button>
        <button
          onClick={() => setActiveTab('shops')}
          className={`px-4 py-2 rounded-xl font-bold text-xs ${
            activeTab === 'shops' ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
          }`}
        >
          Campus Shops ({shops.length})
        </button>
      </div>

      {/* Tab: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-4">
          <h3 className="font-bold text-base text-slate-900 dark:text-white">Recent System Orders Log</h3>
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-4 divide-y divide-slate-100 dark:divide-slate-800">
            {orders.map((ord) => (
              <div key={ord.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2">
                <div>
                  <span className="font-bold text-slate-900 dark:text-white">{ord.orderNumber}</span>
                  <span className="text-slate-400"> — {ord.customerName} ({ord.deliveryAddress.building})</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-brand-500">{formatCurrency(ord.totalAmount)}</span>
                  <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-semibold">{ord.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Partners Approval */}
      {activeTab === 'partners' && (
        <div className="space-y-4">
          <h3 className="font-bold text-base text-slate-900 dark:text-white">Student Delivery Partners</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {partners.map((pt) => (
              <div key={pt.userId} className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center gap-3">
                  <img src={pt.studentIdCardUrl} alt={pt.name} className="w-14 h-14 object-cover rounded-2xl border" />
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">{pt.name}</h4>
                    <p className="text-xs text-slate-400">{pt.department} • Roll: {pt.studentRollNo}</p>
                    <p className="text-xs text-emerald-500 font-bold">UPI: {pt.upiId}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                  <span className={`font-bold ${pt.isApproved ? 'text-emerald-500' : 'text-amber-500'}`}>
                    {pt.isApproved ? '✓ Verified Partner' : 'Pending Verification'}
                  </span>
                  {!pt.isApproved && (
                    <button
                      onClick={() => approvePartner(pt.userId)}
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-xs"
                    >
                      Approve Student ID
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Shops */}
      {activeTab === 'shops' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {shops.map((s) => (
            <div key={s.id} className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">{s.name}</h4>
                <p className="text-xs text-slate-400">{s.category} • {s.campusBuilding}</p>
                <p className="text-xs text-amber-500 font-bold">Rating: ⭐ {s.rating}</p>
              </div>
              <span className={`px-2.5 py-1 rounded-xl text-xs font-bold ${s.isOpen ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                {s.isOpen ? 'Active' : 'Offline'}
              </span>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
