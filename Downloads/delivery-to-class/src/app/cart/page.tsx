'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../../context/CartContext';
import { useOrders } from '../../context/OrderContext';
import { useAuth } from '../../context/AuthContext';
import { INITIAL_CAMPUS_BUILDINGS } from '../../lib/mockData';
import { formatCurrency } from '../../lib/utils';
import { PaymentMethod } from '../../types';
import { ShoppingBag, MapPin, Clock, Banknote, ArrowRight, Trash2, ShieldCheck, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function CartPage() {
  const router = useRouter();
  const {
    items,
    shop,
    deliveryAddress,
    setDeliveryAddress,
    deliverySlot,
    setDeliverySlot,
    paymentMethod,
    setPaymentMethod,
    tip,
    setTip,
    deliveryFee,
    subtotal,
    grandTotal,
    removeFromCart,
    updateQuantity,
    clearCart
  } = useCart();

  const { user } = useAuth();
  const { placeOrder } = useOrders();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Selected building object
  const currentBuilding = INITIAL_CAMPUS_BUILDINGS.find((b) => b.name === deliveryAddress.blockName) || INITIAL_CAMPUS_BUILDINGS[0];

  if (items.length === 0 || !shop) {
    return (
      <div className="max-w-md mx-auto text-center py-20 space-y-4">
        <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-black text-slate-900 dark:text-white">Your Cart is Empty</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Add canteen rolls, cold coffee, or xerox printouts from campus shops to start your classroom delivery!
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 rounded-2xl bg-brand-500 text-white font-bold text-xs shadow-md hover:bg-brand-600 transition-all"
        >
          Explore Campus Shops
        </Link>
      </div>
    );
  }

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!deliveryAddress.blockName || !deliveryAddress.blockName.trim()) {
      setFormError('Block Name is required to place an order!');
      return;
    }

    if (!deliveryAddress.classroomNumber || !deliveryAddress.classroomNumber.trim()) {
      setFormError('Classroom Number is required to place an order!');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const createdOrder = placeOrder({
        customerId: user?.id || 'user-demo-student',
        customerName: user?.name || 'Alex Johnson (Student)',
        shopId: shop.id,
        shopName: shop.name,
        shopLat: shop.lat,
        shopLng: shop.lng,
        items,
        totalAmount: grandTotal,
        deliveryFee,
        tip,
        deliveryAddress,
        deliverySlot,
        paymentMethod,
        paymentStatus: 'PENDING'
      });

      clearCart();
      setIsSubmitting(false);
      router.push(`/orders/${createdOrder.id}`);
    }, 800);
  };

  const isFormValid =
    !!deliveryAddress.blockName?.trim() && !!deliveryAddress.classroomNumber?.trim();

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      
      {/* Title */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <ShoppingBag className="w-6 h-6 text-brand-500" />
          <span>Checkout & Classroom Address</span>
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Ordering from <strong className="text-brand-500">{shop.name}</strong>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Cart Items & Address Form */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Order Items Summary List */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Selected Order Items</h3>
              <button onClick={clearCart} className="text-xs text-rose-500 font-bold hover:underline">
                Clear Cart
              </button>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="py-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img src={product.imageUrl} alt={product.name} className="w-12 h-12 rounded-xl object-cover" />
                    <div>
                      <h4 className="font-bold text-xs text-slate-900 dark:text-white">{product.name}</h4>
                      <p className="text-[11px] text-slate-400">{formatCurrency(product.price)} each</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-lg text-xs font-bold">
                      <button onClick={() => updateQuantity(product.id, quantity - 1)} className="px-1 text-slate-500 hover:text-slate-900 dark:hover:text-white">-</button>
                      <span>{quantity}</span>
                      <button onClick={() => updateQuantity(product.id, quantity + 1)} className="px-1 text-slate-500 hover:text-slate-900 dark:hover:text-white">+</button>
                    </div>
                    <span className="font-black text-xs text-slate-900 dark:text-white w-14 text-right">
                      {formatCurrency(product.price * quantity)}
                    </span>
                    <button onClick={() => removeFromCart(product.id)} className="text-slate-400 hover:text-rose-500">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Classroom Address Form */}
          <form id="checkout-form" onSubmit={handlePlaceOrder} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-brand-500" />
              <span>Classroom Delivery Details</span>
            </h3>

            {formError && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs font-bold">
                {formError}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-300">
                  Block Name <span className="text-rose-500">* (Required)</span>
                </label>
                <input
                  type="text"
                  required
                  value={deliveryAddress.blockName}
                  onChange={(e) => setDeliveryAddress({ ...deliveryAddress, blockName: e.target.value })}
                  placeholder="e.g. ISE Block, Tech Park, Science Block"
                  className="w-full mt-1 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-300">
                  Floor Number <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  value={deliveryAddress.floorNumber || ''}
                  onChange={(e) => setDeliveryAddress({ ...deliveryAddress, floorNumber: e.target.value })}
                  placeholder="e.g. 2, 3rd Floor"
                  className="w-full mt-1 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-300">
                  Classroom Number <span className="text-rose-500">* (Required)</span>
                </label>
                <input
                  type="text"
                  required
                  value={deliveryAddress.classroomNumber}
                  onChange={(e) => setDeliveryAddress({ ...deliveryAddress, classroomNumber: e.target.value })}
                  placeholder="e.g. ISE-204, Room 304"
                  className="w-full mt-1 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 font-bold"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-300">
                  Landmark <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  value={deliveryAddress.landmark || ''}
                  onChange={(e) => setDeliveryAddress({ ...deliveryAddress, landmark: e.target.value })}
                  placeholder="e.g. Near Seminar Hall, Opposite HOD Room"
                  className="w-full mt-1 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 dark:text-slate-300">
                Student Contact Mobile <span className="text-rose-500">*</span>
              </label>
              <input
                type="tel"
                required
                value={deliveryAddress.contactPhone}
                onChange={(e) => setDeliveryAddress({ ...deliveryAddress, contactPhone: e.target.value })}
                placeholder="+91 98765 43210"
                className="w-full mt-1 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500"
              />
            </div>

            {/* Special Instructions */}
            <div>
              <label className="text-xs font-bold text-slate-600 dark:text-slate-300">
                Special Delivery Instructions <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                value={deliveryAddress.deliveryInstructions || ''}
                onChange={(e) => setDeliveryAddress({ ...deliveryAddress, deliveryInstructions: e.target.value })}
                placeholder="e.g. Please hand over near front desk during break."
                className="w-full mt-1 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
              />
            </div>
          </form>

        </div>

        {/* Right Column: Payment & Total Summary */}
        <div className="space-y-6">
          
          {/* Payment Method Picker */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Banknote className="w-4 h-4 text-emerald-500" />
              <span>Direct Payment Option</span>
            </h3>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('UPI')}
                className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                  paymentMethod === 'UPI'
                    ? 'bg-emerald-500/10 border-emerald-500 text-slate-900 dark:text-white font-bold ring-2 ring-emerald-500/40'
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div>
                  <div className="text-xs font-bold flex items-center gap-1.5">
                    <span>Pay via Direct UPI (GPay / PhonePe / Paytm)</span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                    Scan partner QR code on delivery
                  </p>
                </div>
                {paymentMethod === 'UPI' && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('CASH')}
                className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                  paymentMethod === 'CASH'
                    ? 'bg-amber-500/10 border-amber-500 text-slate-900 dark:text-white font-bold ring-2 ring-amber-500/40'
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div>
                  <div className="text-xs font-bold">Cash on Classroom Delivery</div>
                  <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                    Pay exact cash directly to student partner
                  </p>
                </div>
                {paymentMethod === 'CASH' && <CheckCircle2 className="w-5 h-5 text-amber-500" />}
              </button>
            </div>

            {/* Tip Courier */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <label className="text-xs font-bold text-slate-500">Student Courier Tip</label>
              <div className="flex items-center gap-2 mt-1.5">
                {[0, 10, 20].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTip(t)}
                    className={`flex-1 py-1.5 rounded-xl text-xs font-bold border ${
                      tip === t
                        ? 'bg-brand-500 text-white border-brand-500'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {t === 0 ? 'No Tip' : `₹${t}`}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bill Summary */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Bill Summary</h3>

            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-bold text-slate-900 dark:text-white">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Break Delivery Fee</span>
                <span className="font-bold text-slate-900 dark:text-white">{formatCurrency(deliveryFee)}</span>
              </div>
              {tip > 0 && (
                <div className="flex justify-between text-brand-500">
                  <span>Student Partner Tip</span>
                  <span className="font-bold">+{formatCurrency(tip)}</span>
                </div>
              )}
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between text-base font-black text-slate-900 dark:text-white">
                <span>To Pay (Cash/UPI)</span>
                <span className="text-brand-500">{formatCurrency(grandTotal)}</span>
              </div>
            </div>

            <button
              type="submit"
              form="checkout-form"
              disabled={isSubmitting}
              className="w-full mt-4 py-3.5 rounded-2xl bg-brand-500 hover:bg-brand-600 active:scale-95 text-white font-black text-sm shadow-xl shadow-brand-500/25 transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span>Placing Order...</span>
              ) : (
                <>
                  <span>Place Classroom Order ({formatCurrency(grandTotal)})</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
