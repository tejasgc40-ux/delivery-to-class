'use client';

import React from 'react';
import { useOrders } from '../../../context/OrderContext';
import { getStatusBadge, formatCurrency } from '../../../lib/utils';
import { Clock, MapPin, ArrowRight, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default function ActiveOrdersPage() {
  const { orders } = useOrders();

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <Clock className="w-6 h-6 text-brand-500" />
          <span>My Campus Orders</span>
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Track break deliveries to your classroom desk in real time.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-16 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
          <ShoppingBag className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">No Orders Yet</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Browse canteen rolls, hot puffs, or lab printouts from campus shops!
          </p>
          <Link
            href="/"
            className="inline-block px-5 py-2.5 rounded-xl bg-brand-500 text-white font-bold text-xs"
          >
            Order Now
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((ord) => {
            const badge = getStatusBadge(ord.status);
            return (
              <div
                key={ord.id}
                className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">
                      Order {ord.orderNumber}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-lg text-[11px] font-bold ${badge.bgClass} ${badge.textClass}`}>
                      {badge.label}
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-brand-500">{ord.shopName}</p>

                  <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 pt-1">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>Block: {ord.deliveryAddress.blockName} - Class: {ord.deliveryAddress.classroomNumber}</span>
                    </div>
                    <span>•</span>
                    <div>Slot: {ord.deliverySlot}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100 dark:border-slate-800">
                  <div className="text-right">
                    <div className="text-xs text-slate-400">Total</div>
                    <div className="font-black text-sm text-slate-900 dark:text-white">
                      {formatCurrency(ord.totalAmount)}
                    </div>
                  </div>

                  <Link
                    href={`/orders/${ord.id}`}
                    className="px-4 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
                  >
                    <span>Track Map</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
