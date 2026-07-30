'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Shop, OrderItem, DeliveryAddress, PaymentMethod } from '../types';
import { INITIAL_SHOPS } from '../lib/mockData';

interface CartContextType {
  items: OrderItem[];
  shop: Shop | null;
  deliveryAddress: DeliveryAddress;
  deliverySlot: string;
  paymentMethod: PaymentMethod;
  tip: number;
  deliveryFee: number;
  subtotal: number;
  grandTotal: number;
  addToCart: (product: Product, shop: Shop) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  setDeliveryAddress: React.Dispatch<React.SetStateAction<DeliveryAddress>>;
  setDeliverySlot: (slot: string) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  setTip: (amount: number) => void;
}

const DEFAULT_ADDRESS: DeliveryAddress = {
  blockName: 'ISE Block',
  floorNumber: '2',
  classroomNumber: 'ISE-204',
  landmark: 'Near Seminar Hall',
  deliveryInstructions: 'Leave with class representative at front desk during break.',
  contactPhone: '+91 98765 12345'
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<OrderItem[]>([]);
  const [shop, setShop] = useState<Shop | null>(null);
  const [deliveryAddress, setDeliveryAddress] = useState<DeliveryAddress>(DEFAULT_ADDRESS);
  const [deliverySlot, setDeliverySlot] = useState<string>('10:15 AM Morning Break');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('UPI');
  const [tip, setTip] = useState<number>(10);
  const deliveryFee = items.length > 0 ? 15 : 0;

  const addToCart = (product: Product, productShop: Shop) => {
    // Check if adding from different shop
    if (shop && shop.id !== productShop.id && items.length > 0) {
      const confirmReset = window.confirm(
        `Your cart contains items from "${shop.name}". Would you like to clear cart and add items from "${productShop.name}" instead?`
      );
      if (!confirmReset) return;
      setItems([{ product, quantity: 1, unitPrice: product.price }]);
      setShop(productShop);
      return;
    }

    setShop(productShop);
    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += 1;
        return updated;
      }
      return [...prevItems, { product, quantity: 1, unitPrice: product.price }];
    });
  };

  const removeFromCart = (productId: string) => {
    setItems((prevItems) => {
      const updated = prevItems.filter((item) => item.product.id !== productId);
      if (updated.length === 0) setShop(null);
      return updated;
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setShop(null);
  };

  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const grandTotal = subtotal > 0 ? subtotal + deliveryFee + tip : 0;

  return (
    <CartContext.Provider
      value={{
        items,
        shop,
        deliveryAddress,
        deliverySlot,
        paymentMethod,
        tip,
        deliveryFee,
        subtotal,
        grandTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        setDeliveryAddress,
        setDeliverySlot,
        setPaymentMethod,
        setTip
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
