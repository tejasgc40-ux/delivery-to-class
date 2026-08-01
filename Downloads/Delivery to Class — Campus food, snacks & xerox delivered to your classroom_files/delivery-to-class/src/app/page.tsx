import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-6 py-16">
      <div className="w-full max-w-4xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">Delivery to Class</p>
        <h1 className="mt-3 text-4xl font-semibold text-slate-900">Campus food, snacks, and xerox delivery made simple.</h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600">
          The app is now connected to your Firebase project and ready for sign-in, protected routes, and Firestore-backed orders.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/auth" className="rounded-full bg-emerald-600 px-5 py-3 text-sm font-medium text-white">
            Go to auth
          </Link>
          <Link href="/dashboard" className="rounded-full border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700">
            Open dashboard
          </Link>
          <Link href="/admin" className="rounded-full border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700">
            Open admin
          </Link>
        </div>
      </div>
    </main>
  );
}
