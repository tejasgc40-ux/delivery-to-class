"use client";

import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function AuthPanel() {
  const { user, loading, signIn, signUp, signInWithGoogle, logout, role } = useAuth();
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    setError(null);
    try {
      if (mode === "signup") {
        await signUp(email, password, name || "Student");
      } else {
        await signIn(email, password);
      }
      router.replace(role === "admin" ? "/admin" : "/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setPending(false);
    }
  };

  if (loading) return <p className="text-sm text-slate-500">Loading your session…</p>;

  if (user) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Signed in</p>
        <h2 className="mt-2 text-2xl font-semibold">{user.displayName ?? user.email}</h2>
        <p className="mt-2 text-sm text-slate-600">{user.email}</p>
        <button
          type="button"
          onClick={() => logout().catch(() => undefined)}
          className="mt-6 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex gap-2">
        <button type="button" onClick={() => setMode("login")} className={`rounded-full px-3 py-2 text-sm ${mode === "login" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700"}`}>
          Login
        </button>
        <button type="button" onClick={() => setMode("signup")} className={`rounded-full px-3 py-2 text-sm ${mode === "signup" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700"}`}>
          Sign up
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-3">
        {mode === "signup" && (
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className="w-full rounded-xl border border-slate-300 px-3 py-2" required />
        )}
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full rounded-xl border border-slate-300 px-3 py-2" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full rounded-xl border border-slate-300 px-3 py-2" required />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button type="submit" className="w-full rounded-full bg-emerald-600 px-4 py-2 text-sm font-medium text-white" disabled={pending}>
          {pending ? "Please wait…" : mode === "signup" ? "Create account" : "Login"}
        </button>
      </form>
      <button type="button" onClick={() => signInWithGoogle().then(() => router.replace(role === "admin" ? "/admin" : "/dashboard")).catch(() => undefined)} className="mt-4 w-full rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700">
        Continue with Google
      </button>
    </div>
  );
}
