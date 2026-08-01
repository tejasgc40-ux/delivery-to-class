'use client';

import React, { createContext, useCallback, useContext, useState } from 'react';
import { CheckCircle2, XCircle, Info, X } from 'lucide-react';

type ToastVariant = 'success' | 'error' | 'info';

interface ToastItem {
  id: number;
  message: string;
  variant: ToastVariant;
}

interface ToastContextType {
  showToast: (message: string, variant?: ToastVariant) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

const VARIANT_STYLES: Record<ToastVariant, string> = {
  success: 'bg-emerald-600 text-white',
  error: 'bg-rose-600 text-white',
  info: 'bg-slate-900 dark:bg-slate-700 text-white',
};

const VARIANT_ICON: Record<ToastVariant, React.ElementType> = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
};

let idCounter = 0;

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((message: string, variant: ToastVariant = 'success') => {
    const id = ++idCounter;
    setToasts((prev) => [...prev, { id, message, variant }]);
    setTimeout(() => dismiss(id), 3200);
  }, [dismiss]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 w-[calc(100%-2rem)] max-w-sm pointer-events-none"
      >
        {toasts.map((t) => {
          const Icon = VARIANT_ICON[t.variant];
          return (
            <div
              key={t.id}
              role="status"
              className={`pointer-events-auto flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-lg text-xs font-semibold transition-all duration-200 animate-toast-in ${VARIANT_STYLES[t.variant]}`}
            >
              <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span className="flex-1">{t.message}</span>
              <button
                onClick={() => dismiss(t.id)}
                aria-label="Dismiss notification"
                className="opacity-70 hover:opacity-100 transition-opacity"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return ctx;
};
