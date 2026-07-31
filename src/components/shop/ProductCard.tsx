'use client';

import React from 'react';
import { Product, Shop } from '../../types';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../lib/utils';
import { Plus, Minus, Clock, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  shop: Shop;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, shop }) => {
  const { items, addToCart, updateQuantity } = useCart();

  const cartItem = items.find((i) => i.product.id === product.id);
  const quantity = cartItem?.quantity || 0;

  return (
    <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-4 border border-slate-200 dark:border-slate-700/70 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row gap-4 items-center justify-between">
      
      {/* Product Image & Badges */}
      <div className="relative w-full sm:w-28 h-28 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-900 shrink-0">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {!product.isAvailable && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center text-white font-bold text-xs">
            Sold Out
          </div>
        )}
      </div>

      {/* Info Column */}
      <div className="flex-1 space-y-1 w-full text-left">
        <div className="flex items-center justify-between gap-2">
          <h4 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1">
            {product.name}
          </h4>
          <span className="font-black text-sm text-brand-500 shrink-0">
            {formatCurrency(product.price)}
          </span>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        <div className="flex items-center gap-3 pt-2 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-amber-500" />
            <span>~{product.preparationTimeMinutes} min prep</span>
          </div>
          <span>•</span>
          <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
            {product.category}
          </span>
        </div>
      </div>

      {/* Add / Quantity Counter Control */}
      <div className="shrink-0 w-full sm:w-auto">
        {!product.isAvailable ? (
          <button
            disabled
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-400 font-bold text-xs cursor-not-allowed"
          >
            Unavailable
          </button>
        ) : quantity === 0 ? (
          <button
            onClick={() => addToCart(product, shop)}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 active:scale-95 text-white font-bold text-xs shadow-md shadow-brand-500/20 transition-all flex items-center justify-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add To Cart</span>
          </button>
        ) : (
          <div className="flex items-center justify-center gap-3 bg-brand-500 text-white rounded-xl px-3 py-1.5 shadow-md">
            <button
              onClick={() => updateQuantity(product.id, quantity - 1)}
              className="p-1 hover:bg-brand-600 rounded-lg transition-colors"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="font-bold text-xs min-w-[20px] text-center">
              {quantity}
            </span>
            <button
              onClick={() => updateQuantity(product.id, quantity + 1)}
              className="p-1 hover:bg-brand-600 rounded-lg transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

    </div>
  );
};
