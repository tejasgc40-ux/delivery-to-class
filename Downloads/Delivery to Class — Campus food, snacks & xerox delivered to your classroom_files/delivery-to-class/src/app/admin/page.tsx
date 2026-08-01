"use client";

import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { db } from "@/lib/firebase";

type OrderRecord = {
  id: string;
  customerName: string;
  status: string;
  totalAmount: number;
  createdAt?: unknown;
};

export default function AdminPage() {
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [customerName, setCustomerName] = useState("");
  const [status, setStatus] = useState("Preparing");
  const [totalAmount, setTotalAmount] = useState("150");

  useEffect(() => {
    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setOrders(snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as Omit<OrderRecord, "id">) })));
    });
    return () => unsubscribe();
  }, []);

  const handleCreateOrder = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await addDoc(collection(db, "orders"), {
      customerName,
      status,
      totalAmount: Number(totalAmount),
      createdAt: serverTimestamp(),
    });
    setCustomerName("");
    setStatus("Preparing");
    setTotalAmount("150");
  };

  return (
    <ProtectedRoute requiredRole="admin">
      <main className="min-h-screen bg-slate-50 p-6 text-slate-900">
        <div className="mx-auto max-w-5xl rounded-2xl bg-white p-8 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">Admin</p>
              <h1 className="text-3xl font-semibold">Orders</h1>
            </div>
            <div className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600">Live Firestore data</div>
          </div>

          <form onSubmit={handleCreateOrder} className="mb-6 grid gap-3 rounded-2xl border border-slate-200 p-4 md:grid-cols-3">
            <input value={customerName} onChange={(event) => setCustomerName(event.target.value)} placeholder="Customer name" className="rounded-xl border border-slate-300 px-3 py-2" required />
            <input value={status} onChange={(event) => setStatus(event.target.value)} placeholder="Status" className="rounded-xl border border-slate-300 px-3 py-2" required />
            <input value={totalAmount} onChange={(event) => setTotalAmount(event.target.value)} type="number" placeholder="Amount" className="rounded-xl border border-slate-300 px-3 py-2" required />
            <button type="submit" className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-medium text-white md:col-span-3">Create order</button>
          </form>

          <div className="space-y-3">
            {orders.map((order) => (
              <div key={order.id} className="rounded-xl border border-slate-200 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{order.customerName}</p>
                    <p className="text-sm text-slate-500">{order.status}</p>
                  </div>
                  <p className="font-semibold">₹{Number(order.totalAmount).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}
