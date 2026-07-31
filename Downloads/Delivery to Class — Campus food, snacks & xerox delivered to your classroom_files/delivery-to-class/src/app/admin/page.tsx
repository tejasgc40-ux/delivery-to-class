type DeliveryAddress = {
  building?: string;
  street?: string;
  city?: string;
  state?: string;
  pincode?: string;
};

type Order = {
  id: string;
  orderNumber: string;
  customerName: string;
  deliveryAddress: DeliveryAddress;
  totalAmount: number;
  status: string;
};

const sampleOrders: Order[] = [
  {
    id: "ord-001",
    orderNumber: "#1001",
    customerName: "Asha",
    deliveryAddress: { building: "Block A", street: "Main Road", city: "Bengaluru", state: "KA", pincode: "560001" },
    totalAmount: 180,
    status: "Preparing",
  },
  {
    id: "ord-002",
    orderNumber: "#1002",
    customerName: "Ravi",
    deliveryAddress: { building: "Hostel 2", street: "Campus Lane", city: "Bengaluru", state: "KA", pincode: "560002" },
    totalAmount: 320,
    status: "Delivered",
  },
];

function formatCurrency(amount: number) {
  return `₹${amount.toFixed(2)}`;
}

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-slate-50 p-6 text-slate-900">
      <div className="mx-auto max-w-5xl rounded-2xl bg-white p-8 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-500">Admin</p>
            <h1 className="text-3xl font-semibold">Orders</h1>
          </div>
          <div className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600">Live dashboard</div>
        </div>

        <div className="space-y-4">
          {sampleOrders.map((ord) => (
            <div key={ord.id} className="rounded-xl border border-slate-200 p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <span className="font-bold text-slate-900">{ord.orderNumber}</span>
                  <span className="text-slate-400"> — {ord.customerName} ({ord.deliveryAddress.building ?? "Campus"})</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-brand-500">{formatCurrency(ord.totalAmount)}</span>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm text-emerald-700">{ord.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
