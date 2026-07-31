'use client';

import React, { useState } from 'react';
import { useOrders } from '../../context/OrderContext';
import { useAuth } from '../../context/AuthContext';
import { formatCurrency, getStatusBadge } from '../../lib/utils';
import { Bike, CheckCircle2, Clock, MapPin, Phone, QrCode, ShieldCheck, Zap, DollarSign } from 'lucide-react';
import Link from 'next/link';

export default function PartnerConsolePage() {
  const { user } = useAuth();
  const { orders, updateOrderStatus, acceptDelivery, markPaymentReceived, partners } = useOrders();

  const [isAvailable, setIsAvailable] = useState(true);
  const [activeTab, setActiveTab] = useState<'available' | 'my_deliveries'>('available');

  const partnerProfile = partners[0]; // Active demo student partner

  // Available orders for pickup (Shop accepted & preparing or ready)
  const availableOrders = orders.filter(
    (o) => (o.status === 'READY_FOR_PICKUP' || o.status === 'PREPARING') && !o.partnerId
  );

  // Deliveries accepted by this partner
  const myDeliveries = orders.filter((o) => o.partnerId === partnerProfile.userId || o.partnerId === 'partner-1');

  const handleAcceptOrder = (orderId: string) => {
    acceptDelivery(orderId, partnerProfile);
    setActiveTab('my_deliveries');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-slate-900 rounded-3xl p-6 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-bold">
              Student Delivery Partner
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-400 text-slate-950 text-[10px] font-black">
              ✓ Verified ID
            </span>
          </div>
          <h1 className="text-2xl font-black">{partnerProfile.name}</h1>
          <p className="text-xs text-emerald-100 font-medium">
            {partnerProfile.department} • Roll No: {partnerProfile.studentRollNo}
          </p>
        </div>

        {/* Availability Switch */}
        <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20 flex items-center gap-3">
          <div className="text-left text-xs">
            <p className="font-bold">Break Delivery Status</p>
            <p className="text-[11px] text-emerald-200">
              {isAvailable ? '● Ready for Break Orders' : '○ Off Duty / In Class'}
            </p>
          </div>
          <button
            onClick={() => setIsAvailable(!isAvailable)}
            className={`w-12 h-6 rounded-full p-1 transition-colors relative ${
              isAvailable ? 'bg-emerald-400' : 'bg-slate-600'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-slate-950 transition-transform ${
                isAvailable ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-center">
          <DollarSign className="w-5 h-5 text-emerald-500 mx-auto mb-1" />
          <div className="text-xl font-black text-slate-900 dark:text-white">
            {formatCurrency(partnerProfile.earningsToday)}
          </div>
          <div className="text-[11px] text-slate-400 font-medium">Earnings Today</div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-center">
          <Bike className="w-5 h-5 text-brand-500 mx-auto mb-1" />
          <div className="text-xl font-black text-slate-900 dark:text-white">
            {partnerProfile.totalDeliveries}
          </div>
          <div className="text-[11px] text-slate-400 font-medium">Completed Deliveries</div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-center">
          <Zap className="w-5 h-5 text-amber-500 mx-auto mb-1" />
          <div className="text-xl font-black text-slate-900 dark:text-white">
            {availableOrders.length}
          </div>
          <div className="text-[11px] text-slate-400 font-medium">Break Orders Nearby</div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-center">
          <QrCode className="w-5 h-5 text-indigo-500 mx-auto mb-1" />
          <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
            {partnerProfile.upiId}
          </div>
          <div className="text-[11px] text-slate-400 font-medium">Direct UPI ID</div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('available')}
          className={`px-4 py-2 rounded-xl font-bold text-xs transition-all ${
            activeTab === 'available'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
          }`}
        >
          Broadcast Break Orders ({availableOrders.length})
        </button>
        <button
          onClick={() => setActiveTab('my_deliveries')}
          className={`px-4 py-2 rounded-xl font-bold text-xs transition-all ${
            activeTab === 'my_deliveries'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
          }`}
        >
          My Accepted Deliveries ({myDeliveries.length})
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'available' ? (
        <div className="space-y-4">
          {!isAvailable ? (
            <div className="p-8 text-center bg-amber-50 dark:bg-amber-950/40 rounded-3xl border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-xs font-bold">
              Toggle "Break Delivery Status" to ON above to start receiving break orders!
            </div>
          ) : availableOrders.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-2">
              <Clock className="w-10 h-10 text-slate-400 mx-auto" />
              <p className="font-bold text-sm text-slate-800 dark:text-slate-200">No New Orders Broadcast Right Now</p>
              <p className="text-xs text-slate-400">Waiting for canteens & xerox shops to mark orders ready.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {availableOrders.map((ord) => (
                <div
                  key={ord.id}
                  className="surface-card p-5 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-black text-sm text-slate-900 dark:text-white">
                      {ord.shopName}
                    </span>
                    <span className="text-xs font-bold text-emerald-500">
                      Earn ~₹{ord.deliveryFee + ord.tip}
                    </span>
                  </div>

                  <div className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-brand-500" />
                      <span>
                        Deliver to: <strong>Block: {ord.deliveryAddress.blockName} • Class: {ord.deliveryAddress.classroomNumber}</strong>
                        {ord.deliveryAddress.floorNumber ? ` (Floor ${ord.deliveryAddress.floorNumber})` : ''}
                      </span>
                    </div>
                    {ord.deliveryAddress.landmark && (
                      <div className="text-slate-400">Landmark: <strong>{ord.deliveryAddress.landmark}</strong></div>
                    )}
                    <div>Break Slot: <strong>{ord.deliverySlot}</strong></div>
                    <div>Collect from Customer: <strong>{formatCurrency(ord.totalAmount)} ({ord.paymentMethod})</strong></div>
                  </div>

                  <button
                    onClick={() => handleAcceptOrder(ord.id)}
                    className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Accept Break Order</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {myDeliveries.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
              <p className="text-xs text-slate-400">You haven't accepted any active deliveries yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {myDeliveries.map((ord) => {
                const badge = getStatusBadge(ord.status);
                return (
                  <div
                    key={ord.id}
                    className="surface-card p-5 space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-slate-900 dark:text-white">
                            Order {ord.orderNumber}
                          </span>
                          <span className={`px-2.5 py-0.5 rounded-lg text-[11px] font-bold ${badge.bgClass} ${badge.textClass}`}>
                            {badge.label}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Shop: {ord.shopName} • Customer: {ord.customerName}
                        </p>
                      </div>

                      <a
                        href={`tel:${ord.deliveryAddress.contactPhone}`}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold self-start sm:self-auto"
                      >
                        <Phone className="w-3.5 h-3.5 text-brand-500" />
                        <span>Call Student</span>
                      </a>
                    </div>

                    {/* Classroom location */}
                    <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-700 text-xs space-y-1">
                      <p className="font-bold text-slate-900 dark:text-white">
                        📍 Classroom Desk: Block: {ord.deliveryAddress.blockName} — Class: {ord.deliveryAddress.classroomNumber}
                        {ord.deliveryAddress.floorNumber ? ` (Floor ${ord.deliveryAddress.floorNumber})` : ''}
                      </p>
                      {ord.deliveryAddress.landmark && (
                        <p className="text-slate-500 font-medium">
                          Landmark: <strong>{ord.deliveryAddress.landmark}</strong>
                        </p>
                      )}
                      {ord.deliveryAddress.deliveryInstructions && (
                        <p className="text-slate-400 italic">"{ord.deliveryAddress.deliveryInstructions}"</p>
                      )}
                    </div>

                    {/* Status Action Workflow Buttons */}
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      {ord.status === 'ACCEPTED_BY_PARTNER' && (
                        <button
                          onClick={() => updateOrderStatus(ord.id, 'PICKED_UP')}
                          className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs"
                        >
                          Mark Picked Up from Shop
                        </button>
                      )}

                      {ord.status === 'PICKED_UP' && (
                        <button
                          onClick={() => markPaymentReceived(ord.id)}
                          className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Mark Delivered & Payment ({formatCurrency(ord.totalAmount)}) Collected</span>
                        </button>
                      )}

                      {ord.status === 'DELIVERED' && (
                        <span className="text-xs font-bold text-emerald-500 flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Delivery Completed Successfully</span>
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

    </div>
  );
}
