'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useOrders } from '../../../context/OrderContext';
import { useCart } from '../../../context/CartContext';
import { ProductCard } from '../../../components/shop/ProductCard';
import { Star, MapPin, Clock, ArrowLeft, Phone, ShoppingBag, Plus, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function ShopDetailPage() {
  const params = useParams();
  const router = useRouter();
  const shopId = params.id as string;
  const { shops, products, reviews, addReview } = useOrders();
  const { items, subtotal } = useCart();

  const shop = shops.find((s) => s.id === shopId);
  const shopProducts = products.filter((p) => p.shopId === shopId);
  const shopReviews = reviews.filter((r) => r.shopId === shopId);

  const [selectedProductCategory, setSelectedProductCategory] = useState<string>('All');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');

  if (!shop) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">Shop Not Found</h2>
        <Link href="/" className="mt-4 inline-block text-xs font-bold text-brand-500 underline">
          Return to Home
        </Link>
      </div>
    );
  }

  // Categories present in this shop's items
  const productCategories = ['All', ...Array.from(new Set(shopProducts.map((p) => p.category)))];

  const filteredProducts = shopProducts.filter(
    (p) => selectedProductCategory === 'All' || p.category === selectedProductCategory
  );

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    addReview({
      shopId: shop.id,
      customerId: 'user-demo',
      customerName: 'Alex Johnson',
      rating: newRating,
      comment: newComment
    });
    setNewComment('');
    setShowReviewModal(false);
  };

  const totalCartItems = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="space-y-6 pb-20">
      
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Campus Shops</span>
      </button>

      {/* Shop Hero Card */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg">
        <div className="h-48 sm:h-64 w-full relative">
          <img src={shop.imageUrl} alt={shop.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          
          <div className="absolute bottom-4 left-4 right-4 text-white space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-xl bg-brand-500 text-white text-[10px] font-bold uppercase">
                {shop.category}
              </span>
              <span className="px-2.5 py-1 rounded-xl bg-emerald-500 text-white text-[10px] font-bold">
                {shop.isOpen ? 'Open Now' : 'Closed'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black">{shop.name}</h1>
            
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-300">
              <div className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{shop.rating}</span>
                <span className="text-slate-400">({shop.totalReviews} reviews)</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-brand-400" />
                <span>{shop.address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Break Delivery Slots */}
        <div className="p-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div>
            <span className="font-bold text-slate-700 dark:text-slate-300">Break Delivery Timings:</span>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {shop.deliveryBreakSlots.map((slot) => (
                <span key={slot} className="px-2.5 py-0.5 rounded-lg bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 text-[11px] font-bold">
                  {slot}
                </span>
              ))}
            </div>
          </div>

          <a
            href={`tel:${shop.phone}`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold"
          >
            <Phone className="w-3.5 h-3.5 text-brand-500" />
            <span>{shop.phone}</span>
          </a>
        </div>
      </div>

      {/* Menu Categories Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800 scrollbar-none">
        {productCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedProductCategory(cat)}
            className={`px-4 py-2 rounded-xl font-bold text-xs whitespace-nowrap transition-all ${
              selectedProductCategory === cat
                ? 'bg-brand-500 text-white shadow-md'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Catalog */}
      <div className="space-y-4">
        <h3 className="font-bold text-lg text-slate-900 dark:text-white">
          Shop Menu & Catalog ({filteredProducts.length})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} shop={shop} />
          ))}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="pt-8 border-t border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
            <span>Student Reviews ({shopReviews.length})</span>
          </h3>
          <button
            onClick={() => setShowReviewModal(true)}
            className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold text-xs text-brand-500"
          >
            + Write Review
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {shopReviews.map((rev) => (
            <div key={rev.id} className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900 dark:text-white">{rev.customerName}</span>
                <span className="text-slate-400">{rev.createdAt}</span>
              </div>
              <div className="flex items-center text-amber-400 text-xs">
                {'★'.repeat(rev.rating)}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                "{rev.comment}"
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Checkout Footer Bar if Cart has items */}
      {totalCartCount > 0 && (
        <div className="fixed bottom-16 md:bottom-4 left-4 right-4 max-w-xl mx-auto z-40 bg-brand-500 text-white p-3.5 rounded-2xl shadow-2xl flex items-center justify-between animate-bounce">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center font-black">
              {totalCartCount}
            </div>
            <div>
              <p className="text-xs font-bold">Items from {shop.name}</p>
              <p className="text-sm font-black">Subtotal: ₹{subtotal}</p>
            </div>
          </div>
          <Link
            href="/cart"
            className="px-5 py-2.5 rounded-xl bg-white text-slate-950 font-black text-xs hover:bg-slate-100 shadow-md"
          >
            View Cart & Checkout
          </Link>
        </div>
      )}

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-slate-950/80 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 max-w-md w-full border border-slate-200 dark:border-slate-700 space-y-4">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">Write Review for {shop.name}</h3>
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-500">Rating (1 to 5 Stars)</label>
                <select
                  value={newRating}
                  onChange={(e) => setNewRating(Number(e.target.value))}
                  className="w-full mt-1 p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
                >
                  <option value={5}>⭐⭐⭐⭐⭐ 5 Stars - Excellent</option>
                  <option value={4}>⭐⭐⭐⭐ 4 Stars - Very Good</option>
                  <option value={3}>⭐⭐⭐ 3 Stars - Average</option>
                  <option value={2}>⭐⭐ 2 Stars - Below Average</option>
                  <option value={1}>⭐ 1 Star - Poor</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500">Your Experience Comment</label>
                <textarea
                  required
                  rows={3}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="How was the food quality, speed & packaging?"
                  className="w-full mt-1 p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="w-1/2 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl bg-brand-500 text-xs font-bold text-white hover:bg-brand-600"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
