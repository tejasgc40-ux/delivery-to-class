'use client';

import React, { useState } from 'react';
import { useOrders } from '../../context/OrderContext';
import { formatCurrency, getStatusBadge } from '../../lib/utils';
import { Product } from '../../types';
import { Store, Plus, Clock, CheckCircle2, XCircle, DollarSign, Package, ToggleLeft, ToggleRight, Edit3, Trash2 } from 'lucide-react';

export default function ShopOwnerPage() {
  const { shops, products, orders, updateOrderStatus, toggleShopOpen, addProduct, updateProduct, deleteProduct } = useOrders();

  const myShop = shops[0]; // Active canteen shop
  const myProducts = products.filter((p) => p.shopId === myShop.id);
  const myOrders = orders.filter((o) => o.shopId === myShop.id);

  const [activeTab, setActiveTab] = useState<'orders' | 'products' | 'analytics'>('orders');
  const [showAddModal, setShowAddModal] = useState(false);

  // New product form state
  const [newProd, setNewProd] = useState({
    name: '',
    description: '',
    price: 60,
    category: 'Food',
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
    preparationTimeMinutes: 10
  });

  const totalSalesToday = myOrders
    .filter((o) => o.status !== 'CANCELLED')
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    addProduct({
      ...newProd,
      shopId: myShop.id,
      isAvailable: true
    });
    setNewProd({
      name: '',
      description: '',
      price: 60,
      category: 'Food',
      imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
      preparationTimeMinutes: 10
    });
    setShowAddModal(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-brand-600 via-amber-600 to-slate-900 rounded-3xl p-6 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-bold">
              Shop Owner Console
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-brand-400 text-slate-950 text-[10px] font-black uppercase">
              {myShop.category}
            </span>
          </div>
          <h1 className="text-2xl font-black">{myShop.name}</h1>
          <p className="text-xs text-brand-100">{myShop.address}</p>
        </div>

        {/* Shop Open Toggle */}
        <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20 flex items-center gap-3">
          <div className="text-left text-xs">
            <p className="font-bold">Store Accepting Orders</p>
            <p className="text-[11px] text-brand-200">
              {myShop.isOpen ? '● Open for Break Deliveries' : '○ Closed'}
            </p>
          </div>
          <button
            onClick={() => toggleShopOpen(myShop.id)}
            className={`w-12 h-6 rounded-full p-1 transition-colors relative ${
              myShop.isOpen ? 'bg-brand-400' : 'bg-slate-600'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-slate-950 transition-transform ${
                myShop.isOpen ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-center">
          <DollarSign className="w-5 h-5 text-brand-500 mx-auto mb-1" />
          <div className="text-xl font-black text-slate-900 dark:text-white">
            {formatCurrency(totalSalesToday)}
          </div>
          <div className="text-[11px] text-slate-400 font-medium">Sales Revenue Today</div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-center">
          <Clock className="w-5 h-5 text-amber-500 mx-auto mb-1" />
          <div className="text-xl font-black text-slate-900 dark:text-white">
            {myOrders.filter((o) => o.status === 'PLACED' || o.status === 'PREPARING').length}
          </div>
          <div className="text-[11px] text-slate-400 font-medium">Active Kitchen Orders</div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-center">
          <Package className="w-5 h-5 text-sky-500 mx-auto mb-1" />
          <div className="text-xl font-black text-slate-900 dark:text-white">
            {myProducts.length}
          </div>
          <div className="text-[11px] text-slate-400 font-medium">Menu Catalog Products</div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-center">
          <CheckCircle2 className="w-5 h-5 text-emerald-500 mx-auto mb-1" />
          <div className="text-xl font-black text-slate-900 dark:text-white">
            {myOrders.filter((o) => o.status === 'DELIVERED').length}
          </div>
          <div className="text-[11px] text-slate-400 font-medium">Completed Break Orders</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl font-bold text-xs transition-all ${
              activeTab === 'orders'
                ? 'bg-brand-500 text-white shadow-md'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            Incoming Kitchen Orders ({myOrders.length})
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-xl font-bold text-xs transition-all ${
              activeTab === 'products'
                ? 'bg-brand-500 text-white shadow-md'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            Inventory & Catalog ({myProducts.length})
          </button>
        </div>

        {activeTab === 'products' && (
          <button
            onClick={() => setShowAddModal(true)}
            className="px-3.5 py-2 rounded-xl bg-brand-500 text-white font-bold text-xs flex items-center gap-1 shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Add Item</span>
          </button>
        )}
      </div>

      {/* Tab: Orders */}
      {activeTab === 'orders' ? (
        <div className="space-y-4">
          {myOrders.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
              <p className="text-xs text-slate-400">No incoming orders for your shop yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {myOrders.map((ord) => {
                const badge = getStatusBadge(ord.status);
                return (
                  <div
                    key={ord.id}
                    className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
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
                          Customer: {ord.customerName} • Slot: {ord.deliverySlot}
                        </p>
                      </div>

                      <div className="font-black text-sm text-brand-500">
                        {formatCurrency(ord.totalAmount)} ({ord.paymentMethod})
                      </div>
                    </div>

                    {/* Items List */}
                    <div className="text-xs space-y-1">
                      <p className="font-bold text-slate-400">Ordered Items:</p>
                      {ord.items.map((it) => (
                        <div key={it.product.id} className="flex justify-between text-slate-700 dark:text-slate-300">
                          <span>{it.quantity}x {it.product.name}</span>
                          <span>{formatCurrency(it.unitPrice * it.quantity)}</span>
                        </div>
                      ))}
                    </div>

                    {/* Shop Action Workflow Buttons */}
                    <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                      {ord.status === 'PLACED' && (
                        <>
                          <button
                            onClick={() => updateOrderStatus(ord.id, 'ACCEPTED_BY_SHOP')}
                            className="px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs"
                          >
                            Accept Order
                          </button>
                          <button
                            onClick={() => updateOrderStatus(ord.id, 'CANCELLED')}
                            className="px-4 py-2 rounded-xl bg-rose-500 text-white font-bold text-xs"
                          >
                            Reject
                          </button>
                        </>
                      )}

                      {ord.status === 'ACCEPTED_BY_SHOP' && (
                        <button
                          onClick={() => updateOrderStatus(ord.id, 'PREPARING')}
                          className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs"
                        >
                          Start Preparing Food/Items
                        </button>
                      )}

                      {ord.status === 'PREPARING' && (
                        <button
                          onClick={() => updateOrderStatus(ord.id, 'READY_FOR_PICKUP')}
                          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
                        >
                          Mark Ready For Student Partner Pickup
                        </button>
                      )}

                      {ord.status === 'READY_FOR_PICKUP' && (
                        <span className="text-xs font-bold text-emerald-500">
                          ✓ Ready & Broadcasted to Nearby Student Couriers!
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        /* Tab: Products Catalog */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {myProducts.map((p) => (
            <div
              key={p.id}
              className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <img src={p.imageUrl} alt={p.name} className="w-14 h-14 rounded-xl object-cover" />
                <div>
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white">{p.name}</h4>
                  <p className="text-[11px] text-brand-500 font-black">{formatCurrency(p.price)}</p>
                  <span className={`text-[10px] font-bold ${p.isAvailable ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {p.isAvailable ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateProduct(p.id, { isAvailable: !p.isAvailable })}
                  className={`px-3 py-1.5 rounded-xl font-bold text-xs ${
                    p.isAvailable ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300' : 'bg-emerald-600 text-white'
                  }`}
                >
                  {p.isAvailable ? 'Mark Sold Out' : 'Restock'}
                </button>
                <button
                  onClick={() => deleteProduct(p.id)}
                  className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/80 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 max-w-md w-full border border-slate-200 dark:border-slate-700 space-y-4">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">Add New Product / Xerox Service</h3>
            <form onSubmit={handleCreateProduct} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-500">Item Name</label>
                <input
                  type="text"
                  required
                  value={newProd.name}
                  onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                  placeholder="e.g. Samosa Pav or Color Printout"
                  className="w-full mt-1 p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500">Price (INR)</label>
                <input
                  type="number"
                  required
                  value={newProd.price}
                  onChange={(e) => setNewProd({ ...newProd, price: Number(e.target.value) })}
                  className="w-full mt-1 p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500">Category</label>
                <input
                  type="text"
                  required
                  value={newProd.category}
                  onChange={(e) => setNewProd({ ...newProd, category: e.target.value })}
                  placeholder="Food / Beverages / Xerox / Stationery"
                  className="w-full mt-1 p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500">Description</label>
                <input
                  type="text"
                  value={newProd.description}
                  onChange={(e) => setNewProd({ ...newProd, description: e.target.value })}
                  placeholder="Short description..."
                  className="w-full mt-1 p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex items-center gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="w-1/2 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl bg-brand-500 text-xs font-bold text-white hover:bg-brand-600"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
