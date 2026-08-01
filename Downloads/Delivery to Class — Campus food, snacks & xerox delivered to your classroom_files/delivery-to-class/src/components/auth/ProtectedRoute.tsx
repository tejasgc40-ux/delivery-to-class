"use client";

import type { ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";

type UserRole = "student" | "partner" | "admin";

export default function ProtectedRoute({ children, requiredRole }: { children: ReactNode; requiredRole?: UserRole }) {
  const { user, loading, role } = useAuth();

  if (loading) return <p className="p-6 text-sm text-slate-500">Checking session…</p>;
  if (!user) return <p className="p-6 text-sm text-slate-500">Please sign in to access this area.</p>;
  if (requiredRole && role !== requiredRole) {
    return <p className="p-6 text-sm text-slate-500">You do not have access to this area.</p>;
  }

  return <>{children}</>;
}
