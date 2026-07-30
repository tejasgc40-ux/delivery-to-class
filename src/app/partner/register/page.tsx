'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext';
import { Bike, Upload, CheckCircle2, ShieldCheck, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function PartnerRegisterPage() {
  const router = useRouter();
  const { switchRole } = useAuth();

  const [formData, setFormData] = useState({
    name: 'Rahul Sharma',
    email: 'rahul.sharma@campus.edu',
    studentRollNo: '21CS104',
    department: 'Computer Science - 3rd Year',
    upiId: 'rahul.student@okicici',
    vehicleType: 'WALKING',
    phone: '+91 91234 56789'
  });

  const [idCardPreview, setIdCardPreview] = useState<string>(
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
  );
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      switchRole('DELIVERY_PARTNER');
      router.push('/partner');
    }, 1200);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-20">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back</span>
      </button>

      <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
            <Bike className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            Register as Student Delivery Partner
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Earn money between classes by delivering food & xerox to nearby classrooms.
          </p>
        </div>

        {isSubmitted ? (
          <div className="p-8 text-center bg-emerald-50 dark:bg-emerald-950/60 rounded-3xl border border-emerald-200 dark:border-emerald-800 space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Registration Approved!</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Your Student ID has been verified. Redirecting to your Partner Console...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-300">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full mt-1 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-300">College Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full mt-1 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-300">Student Roll Number</label>
                <input
                  type="text"
                  required
                  value={formData.studentRollNo}
                  onChange={(e) => setFormData({ ...formData, studentRollNo: e.target.value })}
                  className="w-full mt-1 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-300">Department & Year</label>
                <input
                  type="text"
                  required
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full mt-1 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-300">Personal UPI ID (For Direct Payments)</label>
                <input
                  type="text"
                  required
                  value={formData.upiId}
                  onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
                  placeholder="name@okicici"
                  className="w-full mt-1 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-300">Delivery Mode</label>
                <select
                  value={formData.vehicleType}
                  onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value as any })}
                  className="w-full mt-1 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
                >
                  <option value="WALKING">🚶 Walking (Building to Building)</option>
                  <option value="BICYCLE">🚲 Bicycle</option>
                  <option value="SCOOTER">🛵 Electric Scooter</option>
                </select>
              </div>
            </div>

            {/* Student ID Photo Upload */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600 dark:text-slate-300">
                Upload Student ID Card Photo
              </label>
              <div className="p-4 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl text-center space-y-2">
                {idCardPreview ? (
                  <div className="flex flex-col items-center gap-2">
                    <img src={idCardPreview} alt="Student ID Card" className="w-32 h-20 object-cover rounded-xl border" />
                    <span className="text-[11px] font-bold text-emerald-500">✓ Student ID Photo Loaded</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-1 text-slate-400 text-xs">
                    <Upload className="w-6 h-6" />
                    <span>Click to upload Student ID image</span>
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-lg transition-all"
            >
              Submit Partner Registration
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
