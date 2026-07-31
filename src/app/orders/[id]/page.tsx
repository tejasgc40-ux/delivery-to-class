'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useOrders } from '../../../context/OrderContext';
import { CampusMapWrapper } from '../../../components/map/CampusMapWrapper';
import { getStatusBadge, formatCurrency, generateUpiUri } from '../../../lib/utils';
import { Clock, MapPin, CheckCircle2, Circle, Phone, QrCode, ArrowLeft, Bike, Store, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function OrderTrackingPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;
  const { orders, markPaymentReceived } = useOrders();

  // Find target order or default to latest order
  const order = orders.find((o) => o.id === orderId || o.orderNumber === orderId) || orders[0];

  const [showUpiModal, setShowUpiModal] = useState(false);

  if (!order) {
    return (
      <div className="max-w-md mx-auto text-center py-24 space-y-4">
        <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-black text-slate-900 dark:text-white">No Order Found</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          We couldn't find an order matching this link. It may have been removed or the link is incorrect.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 rounded-2xl bg-brand-500 text-white font-bold text-xs shadow-md hover:bg-brand-600 transition-all"
        >
          Back to Campus Shops
        </Link>
      </div>
    );
  }

  const badge = getStatusBadge(order.status);

  // Status timeline steps
  const steps = [
    { id: 'PLACED', label: 'Order Placed' },
    { id: 'ACCEPTED_BY_SHOP', label: 'Shop Accepted' },
    { id: 'PREPARING', label: 'Preparing Items' },
    { id: 'READY_FOR_PICKUP', label: 'Ready for Pickup' },
    { id: 'ACCEPTED_BY_PARTNER', label: 'Partner Assigned' },
    { id: 'PICKED_UP', label: 'On the Way to Class' },
    { id: 'DELIVERED', label: 'Delivered to Desk' },
  ];

  const currentStepIndex = steps.findIndex((s) => s.id === order.status);

  const upiUri = generateUpiUri(
    order.upiId || 'rahul.student@okicici',
    order.partnerName || 'Student Partner',
    order.totalAmount,
    order.orderNumber
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Campus Shops</span>
          </button>
          <div className="flex items-center gap-3">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Order {order.orderNumber}
            </h1>
            <span className={`px-3 py-1 rounded-xl text-xs font-bold ${badge.bgClass} ${badge.textClass}`}>
              {badge.label}
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Slot: <strong className="text-slate-800 dark:text-slate-200">{order.deliverySlot}</strong> • Shop: <strong className="text-brand-500">{order.shopName}</strong>
          </p>
        </div>

        {/* UPI Pay CTA if pending payment */}
        {order.paymentMethod === 'UPI' && (
          <button
            onClick={() => setShowUpiModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 self-start sm:self-auto"
          >
            <QrCode className="w-4 h-4" />
            <span>Pay Partner via UPI QR</span>
          </button>
        )}
      </div>

      {/* Visual State Machine Progress Timeline */}
      <div className="surface-card p-6 space-y-5">
        <h3 className="font-bold text-xs text-slate-400 uppercase tracking-wider">
          Classroom Delivery Progress
        </h3>

        <ol className="space-y-0">
          {steps.map((step, idx) => {
            const isDone = idx <= currentStepIndex;
            const isCurrent = idx === currentStepIndex;
            const isLast = idx === steps.length - 1;
            return (
              <li key={step.id} className="flex items-start gap-3">
                <div className="relative flex flex-col items-center">
                  <div
                    className={`flex items-center justify-center w-6 h-6 rounded-full transition-all ${
                      isDone
                        ? 'text-brand-500'
                        : 'text-slate-300 dark:text-slate-700'
                    } ${isCurrent ? 'scale-110' : ''}`}
                  >
                    {isDone ? <CheckCircle2 className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
                  </div>
                  {!isLast && (
                    <div
                      className={`w-0.5 h-8 -translate-y-0 transition-colors ${
                        idx < currentStepIndex ? 'bg-brand-500' : 'bg-slate-200 dark:bg-slate-800'
                      }`}
                    />
                  )}
                </div>
                <div className={`pb-8 ${isLast ? 'pb-0' : ''}`}>
                  <p
                    className={`text-sm ${
                      isCurrent
                        ? 'font-black text-brand-500'
                        : isDone
                        ? 'font-semibold text-slate-700 dark:text-slate-300'
                        : 'font-medium text-slate-400 dark:text-slate-600'
                    }`}
                  >
                    {step.label}
                  </p>
                  {isCurrent && (
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Current status</p>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Live Map Tracking */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-brand-500" />
            <span>Live Campus Map Tracker (OpenStreetMap & Leaflet)</span>
          </span>
          <span className="text-emerald-400 font-semibold">● Courier Active</span>
        </div>
        
        <CampusMapWrapper
          userLat={12.9725}
          userLng={77.5950}
          courierLat={order.partnerLat || 12.9724}
          courierLng={order.partnerLng || 77.5949}
          courierName={order.partnerName || 'Student Partner'}
          destinationLat={12.9725}
          destinationLng={77.5950}
          height="350px"
        />
      </div>

      {/* Delivery Partner & Address Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Partner Card */}
        <div className="surface-card p-5 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
            <Bike className="w-4 h-4 text-emerald-500" />
            <span>Assigned Student Partner</span>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center font-bold">
                🚴
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                  {order.partnerName || 'Assigning Student Courier...'}
                </h4>
                <p className="text-xs text-slate-500">Student Delivery Partner</p>
              </div>
            </div>

            {order.partnerPhone && (
              <a
                href={`tel:${order.partnerPhone}`}
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-emerald-500 hover:text-white transition-colors"
                title="Call Partner"
              >
                <Phone className="w-4 h-4" />
              </a>
            )}
          </div>

          {order.paymentStatus === 'PAID_TO_PARTNER' ? (
            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-2 border border-emerald-200 dark:border-emerald-800">
              <CheckCircle2 className="w-4 h-4" />
              <span>Payment Verified & Collected by Partner</span>
            </div>
          ) : (
            <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 text-xs font-bold flex items-center justify-between border border-amber-200 dark:border-amber-800">
              <span>Pay {formatCurrency(order.totalAmount)} via {order.paymentMethod}</span>
              <button
                onClick={() => markPaymentReceived(order.id)}
                className="px-2.5 py-1 rounded-lg bg-amber-500 text-white text-[10px] font-bold hover:bg-amber-600"
              >
                Mark Paid
              </button>
            </div>
          )}
        </div>

        {/* Address Card */}
        <div className="surface-card p-5 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
            <MapPin className="w-4 h-4 text-brand-500" />
            <span>Classroom Destination</span>
          </div>

          <div className="space-y-1 text-xs">
            <p className="font-bold text-sm text-slate-900 dark:text-white">
              Block: {order.deliveryAddress.blockName}
            </p>
            <p className="text-slate-600 dark:text-slate-300 font-semibold">
              Classroom: {order.deliveryAddress.classroomNumber} {order.deliveryAddress.floorNumber ? `• Floor: ${order.deliveryAddress.floorNumber}` : ''}
            </p>
            {order.deliveryAddress.landmark && (
              <p className="text-slate-400">
                Landmark: <strong>{order.deliveryAddress.landmark}</strong>
              </p>
            )}
            <p className="text-slate-500 pt-1">
              Contact Mobile: <strong>{order.deliveryAddress.contactPhone}</strong>
            </p>
            {order.deliveryAddress.deliveryInstructions && (
              <p className="text-slate-400 italic pt-1">
                Instructions: "{order.deliveryAddress.deliveryInstructions}"
              </p>
            )}
          </div>
        </div>

      </div>

      {/* Order Items Table */}
      <div className="surface-card p-6 space-y-4">
        <h3 className="font-bold text-sm text-slate-900 dark:text-white">Ordered Products</h3>
        <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
          {order.items.map((item) => (
            <div key={item.product.id} className="py-2.5 flex justify-between items-center">
              <span>{item.quantity}x {item.product.name}</span>
              <span className="font-bold">{formatCurrency(item.unitPrice * item.quantity)}</span>
            </div>
          ))}
          <div className="pt-3 flex justify-between font-black text-sm text-slate-900 dark:text-white">
            <span>Total Payable Amount</span>
            <span className="text-brand-500">{formatCurrency(order.totalAmount)}</span>
          </div>
        </div>
      </div>

      {/* Direct UPI Modal */}
      {showUpiModal && (
        <div className="fixed inset-0 bg-slate-950/80 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 max-w-sm w-full border border-slate-200 dark:border-slate-700 text-center space-y-4">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">Pay Partner via Direct UPI</h3>
            <p className="text-xs text-slate-500">Scan QR code using GPay, PhonePe or Paytm</p>

            <div className="bg-white p-4 rounded-2xl border-2 border-dashed border-emerald-500 inline-block">
              {/* Simulated QR Code placeholder visually */}
              <div className="w-44 h-44 bg-slate-900 text-white rounded-xl flex flex-col items-center justify-center p-2 font-mono text-[10px]">
                <QrCode className="w-24 h-24 text-emerald-400 mb-2" />
                <span>UPI ID: {order.upiId || 'rahul.student@okicici'}</span>
                <span className="font-bold text-amber-400 mt-1">Amount: {formatCurrency(order.totalAmount)}</span>
              </div>
            </div>

            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 rounded-xl text-xs font-semibold text-emerald-700 dark:text-emerald-300">
              100% Direct P2P Payment. No platform fee!
            </div>

            <button
              onClick={() => setShowUpiModal(false)}
              className="w-full py-2.5 rounded-xl bg-slate-900 text-white dark:bg-slate-700 text-xs font-bold"
            >
              Done / Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
