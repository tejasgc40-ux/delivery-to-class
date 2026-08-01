import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-slate-50 p-6">
        <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Dashboard</p>
          <h1 className="mt-2 text-3xl font-semibold">Campus delivery dashboard</h1>
          <p className="mt-3 text-slate-600">This route is protected by Firebase auth and ready for Firestore-backed data.</p>
        </div>
      </main>
    </ProtectedRoute>
  );
}
