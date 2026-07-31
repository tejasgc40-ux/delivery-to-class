'use client';

import React, { useState } from 'react';
import { useOrders } from '../../context/OrderContext';
import { useAuth } from '../../context/AuthContext';
import { formatCurrency } from '../../lib/utils';
import { College } from '../../types';
import {
  Shield,
  Store,
  Bike,
  CheckCircle2,
  Users,
  BarChart3,
  FileText,
  Plus,
  Trash2,
  Building2,
  Globe,
  Ban,
  UserCheck
} from 'lucide-react';

import { RoleGuard } from '../../components/common/RoleGuard';

export default function AdminPanelPage() {
  return (
    <RoleGuard allowedRoles={['ADMIN']}>
      <AdminPanelContent />
    </RoleGuard>
  );
}

function AdminPanelContent() {
  const { shops, partners, orders, approvePartner, approveShop } = useOrders();
  const { colleges, addCollege, removeCollege, selectedCollege, setSelectedCollege } = useAuth();

  const [activeTab, setActiveTab] = useState<'overview' | 'colleges' | 'partners' | 'shops' | 'users'>('overview');
  
  // Add College Form Modal State
  const [showAddCollegeModal, setShowAddCollegeModal] = useState(false);
  const [newCollegeName, setNewCollegeName] = useState('');
  const [newCollegeCode, setNewCollegeCode] = useState('');
  const [newCollegeLocation, setNewCollegeLocation] = useState('');
  const [newCollegeLat, setNewCollegeLat] = useState('12.9725');
  const [newCollegeLng, setNewCollegeLng] = useState('77.5950');
  const [newCollegeRadius, setNewCollegeRadius] = useState('3.5');

  // Blocked users list state
  const [blockedUserIds, setBlockedUserIds] = useState<string[]>([]);

  const totalGMV = orders.reduce((sum, o) => sum + o.totalAmount, 0);

  const handleCreateCollege = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCollegeName.trim() || !newCollegeCode.trim()) return;

    const created: College = {
      id: `college-${Date.now()}`,
      name: newCollegeName,
      code: newCollegeCode,
      locationName: newCollegeLocation || 'Campus Zone',
      lat: parseFloat(newCollegeLat) || 12.9725,
      lng: parseFloat(newCollegeLng) || 77.5950,
      radiusKm: parseFloat(newCollegeRadius) || 3.0,
      buildings: [
        {
          id: `b-${Date.now()}-1`,
          name: 'Main Academic Block',
          code: 'MB',
          lat: parseFloat(newCollegeLat),
          lng: parseFloat(newCollegeLng),
          floors: ['1st Floor', '2nd Floor', '3rd Floor']
        }
      ]
    };

    addCollege(created);
    setNewCollegeName('');
    setNewCollegeCode('');
    setNewCollegeLocation('');
    setShowAddCollegeModal(false);
  };

  const toggleBlockUser = (id: string) => {
    if (blockedUserIds.includes(id)) {
      setBlockedUserIds(blockedUserIds.filter((u) => u !== id));
    } else {
      setBlockedUserIds([...blockedUserIds, id]);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-3 py-0.5 rounded-full bg-white/20 text-xs font-bold">
              Global Super Admin Access
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 text-xs font-semibold">
              ● Active Platform Control
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">Global Campus Command Center</h1>
          <p className="text-xs sm:text-sm text-indigo-100">
            Single Super Admin portal controlling ALL {colleges.length} university campuses, campus shops, and courier verifications.
          </p>
        </div>
        <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
          <Shield className="w-8 h-8 text-indigo-200" />
        </div>
      </div>

      {/* Analytics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-center shadow-sm">
          <BarChart3 className="w-5 h-5 text-indigo-500 mx-auto mb-1" />
          <div className="text-xl font-black text-slate-900 dark:text-white">
            {formatCurrency(totalGMV)}
          </div>
          <div className="text-[11px] text-slate-400 font-medium">Cross-Campus GMV</div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-center shadow-sm">
          <Globe className="w-5 h-5 text-emerald-500 mx-auto mb-1" />
          <div className="text-xl font-black text-slate-900 dark:text-white">
            {colleges.length}
          </div>
          <div className="text-[11px] text-slate-400 font-medium">Campuses Managed</div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-center shadow-sm">
          <Bike className="w-5 h-5 text-brand-500 mx-auto mb-1" />
          <div className="text-xl font-black text-slate-900 dark:text-white">
            {partners.length}
          </div>
          <div className="text-[11px] text-slate-400 font-medium">Student Couriers</div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-center shadow-sm">
          <Store className="w-5 h-5 text-amber-500 mx-auto mb-1" />
          <div className="text-xl font-black text-slate-900 dark:text-white">
            {shops.length}
          </div>
          <div className="text-[11px] text-slate-400 font-medium">Approved Campus Shops</div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl font-bold text-xs transition-all ${
            activeTab === 'overview' ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
          }`}
        >
          System Overview & Logs
        </button>
        <button
          onClick={() => setActiveTab('colleges')}
          className={`px-4 py-2 rounded-xl font-bold text-xs transition-all ${
            activeTab === 'colleges' ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
          }`}
        >
          Colleges & Campuses ({colleges.length})
        </button>
        <button
          onClick={() => setActiveTab('partners')}
          className={`px-4 py-2 rounded-xl font-bold text-xs transition-all ${
            activeTab === 'partners' ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
          }`}
        >
          Partner Approvals ({partners.length})
        </button>
        <button
          onClick={() => setActiveTab('shops')}
          className={`px-4 py-2 rounded-xl font-bold text-xs transition-all ${
            activeTab === 'shops' ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
          }`}
        >
          Campus Shops ({shops.length})
        </button>
      </div>

      {/* TAB: Overview & Logs */}
      {activeTab === 'overview' && (
        <div className="space-y-4">
          <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center justify-between">
            <span>Recent System Orders Log across All Campuses</span>
            <span className="text-xs text-slate-400 font-normal">{orders.length} total orders recorded</span>
          </h3>
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-4 divide-y divide-slate-100 dark:divide-slate-800">
            {orders.map((ord) => (
              <div key={ord.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2">
                <div>
                  <span className="font-bold text-slate-900 dark:text-white">{ord.orderNumber}</span>
                  <span className="text-slate-400"> — {ord.customerName} ({ord.deliveryAddress.blockName}, Classroom {ord.deliveryAddress.classroomNumber})</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-brand-500">{formatCurrency(ord.totalAmount)}</span>
                  <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-semibold">{ord.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: Colleges & Campuses Management */}
      {activeTab === 'colleges' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">All Registered Colleges</h3>
              <p className="text-xs text-slate-400">Super Admin can provision new college campuses or adjust delivery radius bounds.</p>
            </div>
            <button
              onClick={() => setShowAddCollegeModal(true)}
              className="px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-indigo-600/20"
            >
              <Plus className="w-4 h-4" />
              <span>Add College</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {colleges.map((col) => (
              <div
                key={col.id}
                className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3 relative group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-black text-sm">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">{col.name}</h4>
                      <p className="text-xs text-slate-400">{col.locationName} • Code: <span className="font-mono text-indigo-400 font-bold">{col.code}</span></p>
                    </div>
                  </div>

                  {colleges.length > 1 && (
                    <button
                      onClick={() => removeCollege(col.id)}
                      className="text-slate-400 hover:text-rose-500 p-1.5 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                      title="Remove College"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 grid grid-cols-3 gap-2 text-center text-[11px]">
                  <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800">
                    <span className="text-slate-400 block">Radius</span>
                    <span className="font-bold text-slate-900 dark:text-white">{col.radiusKm} km</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800">
                    <span className="text-slate-400 block">Buildings</span>
                    <span className="font-bold text-slate-900 dark:text-white">{col.buildings.length} Blocks</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800">
                    <span className="text-slate-400 block">GPS Coords</span>
                    <span className="font-bold text-slate-900 dark:text-white">{col.lat.toFixed(2)}, {col.lng.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: Partners Approvals */}
      {activeTab === 'partners' && (
        <div className="space-y-4">
          <h3 className="font-bold text-base text-slate-900 dark:text-white">Student Delivery Partner Verification</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {partners.map((pt) => {
              const isBlocked = blockedUserIds.includes(pt.userId);
              return (
                <div key={pt.userId} className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="flex items-center gap-3">
                    <img src={pt.studentIdCardUrl} alt={pt.name} className="w-14 h-14 object-cover rounded-2xl border" />
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">{pt.name}</h4>
                      <p className="text-xs text-slate-400">{pt.department} • Roll: {pt.studentRollNo}</p>
                      <p className="text-xs text-emerald-500 font-bold">UPI: {pt.upiId}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs gap-2">
                    <span className={`font-bold ${isBlocked ? 'text-rose-500' : pt.isApproved ? 'text-emerald-500' : 'text-amber-500'}`}>
                      {isBlocked ? '⛔ Blocked User' : pt.isApproved ? '✓ Verified Active' : 'Pending Verification'}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleBlockUser(pt.userId)}
                        className={`px-2.5 py-1 rounded-xl text-xs font-bold border ${
                          isBlocked
                            ? 'border-emerald-500 text-emerald-500 hover:bg-emerald-50'
                            : 'border-rose-500 text-rose-500 hover:bg-rose-50'
                        }`}
                      >
                        {isBlocked ? 'Unblock' : 'Block User'}
                      </button>
                      {!pt.isApproved && !isBlocked && (
                        <button
                          onClick={() => approvePartner(pt.userId)}
                          className="px-3 py-1 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-md shadow-emerald-600/20"
                        >
                          Approve ID
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB: Shops Approvals */}
      {activeTab === 'shops' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {shops.map((s) => (
            <div key={s.id} className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">{s.name}</h4>
                <p className="text-xs text-slate-400">{s.category} • {s.campusBuilding}</p>
                <p className="text-xs text-amber-500 font-bold">Rating: ⭐ {s.rating}</p>
              </div>
              <span className={`px-2.5 py-1 rounded-xl text-xs font-bold ${s.isOpen ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-rose-100 text-rose-800'}`}>
                {s.isOpen ? 'Approved Active' : 'Offline'}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Modal: Add College */}
      {showAddCollegeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-lg font-black text-slate-900 dark:text-white">Add New College Campus</h3>
            <form onSubmit={handleCreateCollege} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">College / University Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Loyola College"
                  value={newCollegeName}
                  onChange={(e) => setNewCollegeName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Short Code</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. LYL-CHN"
                  value={newCollegeCode}
                  onChange={(e) => setNewCollegeCode(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">City / Location</label>
                <input
                  type="text"
                  placeholder="e.g. Nungambakkam, Chennai"
                  value={newCollegeLocation}
                  onChange={(e) => setNewCollegeLocation(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Latitude</label>
                  <input
                    type="text"
                    value={newCollegeLat}
                    onChange={(e) => setNewCollegeLat(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Longitude</label>
                  <input
                    type="text"
                    value={newCollegeLng}
                    onChange={(e) => setNewCollegeLng(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Radius Bounds (km)</label>
                <input
                  type="number"
                  step="0.5"
                  value={newCollegeRadius}
                  onChange={(e) => setNewCollegeRadius(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddCollegeModal(false)}
                  className="w-1/2 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md"
                >
                  Create College
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
