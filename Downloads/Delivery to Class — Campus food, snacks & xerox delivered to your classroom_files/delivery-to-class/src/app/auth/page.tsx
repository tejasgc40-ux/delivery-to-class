"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AuthPanel from "@/components/auth/AuthPanel";
import { useAuth } from "@/context/AuthContext";

export default function AuthPage() {
  const { user, loading, role } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace(role === "admin" ? "/admin" : "/dashboard");
    }
  }, [loading, role, router, user]);

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">Firebase Auth</p>
        <h1 className="mt-2 text-3xl font-semibold">Welcome to Delivery to Class</h1>
        <p className="mt-3 text-slate-600">Use email/password or Google to sign in and access your campus delivery workspace.</p>
        <div className="mt-8">
          <AuthPanel />
        </div>
      </div>
    </main>
  );
}
