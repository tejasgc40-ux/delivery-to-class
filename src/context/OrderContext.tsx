'use client';

import React, { createContext, useContext, useState } from 'react';
import { Order, OrderStatus, Shop, Product, PartnerProfile, Review } from '../types';
import { INITIAL_ORDERS, INITIAL_SHOPS, INITIAL_PRODUCTS, INITIAL_PARTNERS, INITIAL_REVIEWS } from '../lib/mockData';

interface OrderContextType {
  orders: Order[];
  shops: Shop[];
  products: Product[];
  partners: PartnerProfile[];
  reviews: Review[];
  placeOrder: (newOrder: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt' | 'status'>) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus, extraData?: Partial<Order>) => void;
  acceptDelivery: (orderId: string, partner: PartnerProfile) => void;
  markPaymentReceived: (orderId: string) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (productId: string, updates: Partial<Product>) => void;
  deleteProduct: (productId: string) => void;
  toggleShopOpen: (shopId: string) => void;
  approvePartner: (userId: string) => void;
  approveShop: (shopId: string) => void;
  addReview: (review: Omit<Review, 'id' | 'createdAt'>) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [shops, setShops] = useState<Shop[]>(INITIAL_SHOPS);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [partners, setPartners] = useState<PartnerProfile[]>(INITIAL_PARTNERS);
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);

  const placeOrder = (newOrderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt' | 'status'>): Order => {
    const id = `ord-${Date.now()}`;
    const orderNumber = `D2C-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date().toISOString();

    const createdOrder: Order = {
      ...newOrderData,
      id,
      orderNumber,
      status: 'PLACED',
      createdAt: now,
      updatedAt: now
    };

    setOrders((prev) => [createdOrder, ...prev]);
    return createdOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus, extraData?: Partial<Order>) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          return {
            ...ord,
            ...extraData,
            status,
            updatedAt: new Date().toISOString()
          };
        }
        return ord;
      })
    );
  };

  const acceptDelivery = (orderId: string, partner: PartnerProfile) => {
    updateOrderStatus(orderId, 'ACCEPTED_BY_PARTNER', {
      partnerId: partner.userId,
      partnerName: partner.name,
      partnerPhone: '+91 98765 43210',
      upiId: partner.upiId
    });
  };

  const markPaymentReceived = (orderId: string) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          return {
            ...ord,
            paymentStatus: 'PAID_TO_PARTNER',
            status: 'DELIVERED',
            updatedAt: new Date().toISOString()
          };
        }
        return ord;
      })
    );
  };

  const addProduct = (newProduct: Omit<Product, 'id'>) => {
    const p: Product = {
      ...newProduct,
      id: `p-${Date.now()}`
    };
    setProducts((prev) => [p, ...prev]);
  };

  const updateProduct = (productId: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, ...updates } : p))
    );
  };

  const deleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const toggleShopOpen = (shopId: string) => {
    setShops((prev) =>
      prev.map((s) => (s.id === shopId ? { ...s, isOpen: !s.isOpen } : s))
    );
  };

  const approvePartner = (userId: string) => {
    setPartners((prev) =>
      prev.map((pt) => (pt.userId === userId ? { ...pt, isApproved: true } : pt))
    );
  };

  const approveShop = (shopId: string) => {
    setShops((prev) =>
      prev.map((s) => (s.id === shopId ? { ...s, isOpen: true } : s))
    );
  };

  const addReview = (newReview: Omit<Review, 'id' | 'createdAt'>) => {
    const rev: Review = {
      ...newReview,
      id: `rev-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setReviews((prev) => [rev, ...prev]);
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        shops,
        products,
        partners,
        reviews,
        placeOrder,
        updateOrderStatus,
        acceptDelivery,
        markPaymentReceived,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleShopOpen,
        approvePartner,
        approveShop,
        addReview
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};
