import React from 'react';
import Link from 'next/link';
import { ShoppingBag, Heart, ShieldCheck, Zap, Bike } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-24 md:pb-12 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-amber-500 flex items-center justify-center text-white">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <span className="font-black text-lg text-white">
                Delivery <span className="text-brand-500">To Class</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Campus hyperlocal delivery connecting students, nearby canteens, shops & student couriers for break-time classroom deliveries.
            </p>
            <div className="flex items-center gap-2 text-xs text-brand-400 bg-slate-800/60 p-2.5 rounded-xl border border-slate-800">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>0% Platform Commission. Pay Partner directly via Cash or UPI!</span>
            </div>
          </div>

          {/* Col 2: Campus Break Schedule */}
          <div>
            <h4 className="font-bold text-white text-sm mb-3 flex items-center gap-2">
              <Zap className="w-4 h-4 text-brand-500" />
              <span>Campus Delivery Breaks</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex justify-between border-b border-slate-800 pb-1">
                <span>Morning Tea Break</span>
                <span className="font-semibold text-slate-200">10:15 AM - 10:30 AM</span>
              </li>
              <li className="flex justify-between border-b border-slate-800 pb-1">
                <span>Lunch Break Slot</span>
                <span className="font-semibold text-slate-200">1:00 PM - 1:45 PM</span>
              </li>
              <li className="flex justify-between border-b border-slate-800 pb-1">
                <span>Evening Snack Break</span>
                <span className="font-semibold text-slate-200">3:30 PM - 3:45 PM</span>
              </li>
              <li className="flex justify-between pb-1">
                <span>Post-Class Slot</span>
                <span className="font-semibold text-slate-200">5:00 PM - 6:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Categories & Quick Links */}
          <div>
            <h4 className="font-bold text-white text-sm mb-3">Popular Categories</h4>
            <ul className="grid grid-cols-2 gap-2 text-xs text-slate-400">
              <li><Link href="/" className="hover:text-brand-400">Restaurants & Food</Link></li>
              <li><Link href="/" className="hover:text-brand-400">Campus Cafe & Tea</Link></li>
              <li><Link href="/" className="hover:text-brand-400">Xerox & Printouts</Link></li>
              <li><Link href="/" className="hover:text-brand-400">Stationery & Manuals</Link></li>
              <li><Link href="/" className="hover:text-brand-400">Fresh Juices</Link></li>
              <li><Link href="/" className="hover:text-brand-400">Bakery & Puffs</Link></li>
            </ul>
          </div>

          {/* Col 4: Become a Partner */}
          <div className="bg-gradient-to-br from-brand-950/60 to-slate-800 p-4 rounded-2xl border border-brand-500/20 space-y-3">
            <div className="flex items-center gap-2 text-brand-400 font-bold text-xs">
              <Bike className="w-4 h-4" />
              <span>Earn Money Between Classes</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Are you a college student with free breaks? Deliver snacks & xerox to nearby classrooms and earn ₹200-₹500 daily!
            </p>
            <Link
              href="/partner/register"
              className="inline-block w-full text-center bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs py-2 px-3 rounded-xl shadow-md transition-all"
            >
              Register as Student Partner
            </Link>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-800 text-center md:flex md:justify-between items-center text-xs text-slate-500">
          <p>© 2026 Delivery To Class. Built for SRM & College Campuses.</p>
          <div className="flex justify-center items-center gap-1 mt-2 md:mt-0">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>for Students</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
