'use client';

import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { UserProfile, UserRole, College } from '../types';
import { INITIAL_COLLEGES } from '../lib/mockData';
import { calculateDistanceKm } from '../lib/utils';

interface AuthContextType {
  user: UserProfile | null;
  role: UserRole;
  isLoggedIn: boolean;
  colleges: College[];
  selectedCollege: College;
  userLocation: { lat: number; lng: number } | null;
  locationPermission: boolean | null;
  notificationPermission: NotificationPermission | 'default';
  onboardingStep: 'WELCOME' | 'CHOOSE_ROLE' | 'LOGIN' | 'PERMISSIONS' | 'COMPLETED';
  setOnboardingStep: (step: 'WELCOME' | 'CHOOSE_ROLE' | 'LOGIN' | 'PERMISSIONS' | 'COMPLETED') => void;
  switchRole: (newRole: UserRole) => void;
  loginWithEmail: (email: string, role: UserRole) => void;
  loginWithRole: (role: UserRole, name?: string, email?: string) => void;
  logout: () => void;
  updateProfile: (data: Partial<UserProfile>) => void;
  setSelectedCollege: (college: College) => void;
  addCollege: (college: College) => void;
  removeCollege: (id: string) => void;
  requestLocationPermission: () => Promise<{ lat: number; lng: number } | null>;
  requestNotificationPermission: () => Promise<NotificationPermission>;
  detectNearestCampus: (lat: number, lng: number) => College;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const DEFAULT_DEMO_USERS: Record<UserRole, UserProfile> = {
  CUSTOMER: {
    id: 'user-demo-student',
    name: 'Alex Johnson (Student)',
    email: 'alex.student@campus.edu',
    role: 'CUSTOMER',
    phone: '+91 98765 12345',
    collegeId: 'college-srm',
    collegeName: 'SRM Institute of Science & Technology',
    campusBuilding: 'Tech Park (Engineering Block)',
    classroom: 'Room 304',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    createdAt: '2026-07-30T10:00:00.000Z'
  },
  SHOP_OWNER: {
    id: 'owner-1',
    name: 'Chief Chef (Canteen Owner)',
    email: 'canteen.owner@campus.edu',
    role: 'SHOP_OWNER',
    phone: '+91 98765 43210',
    collegeId: 'college-srm',
    collegeName: 'SRM Institute of Science & Technology',
    campusBuilding: 'Tech Park Courtyard',
    isApproved: true,
    avatarUrl: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=200&q=80',
    createdAt: '2026-07-30T10:00:00.000Z'
  },
  DELIVERY_PARTNER: {
    id: 'partner-1',
    name: 'Rahul Sharma (Student Partner)',
    email: 'rahul.partner@campus.edu',
    role: 'DELIVERY_PARTNER',
    phone: '+91 98765 99999',
    collegeId: 'college-srm',
    collegeName: 'SRM Institute of Science & Technology',
    campusBuilding: 'Library Plaza',
    isApproved: true,
    avatarUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80',
    createdAt: '2026-07-30T10:00:00.000Z'
  },
  ADMIN: {
    id: 'admin-super-1',
    name: 'Super Admin Officer',
    email: 'admin.global@deliverytoclass.com',
    role: 'ADMIN',
    phone: '+91 90000 00000',
    collegeId: 'college-srm',
    collegeName: 'Global Super Admin (All Campuses)',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    createdAt: '2026-07-30T10:00:00.000Z'
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [colleges, setColleges] = useState<College[]>(INITIAL_COLLEGES);
  const [selectedCollege, setSelectedCollege] = useState<College>(INITIAL_COLLEGES[0]);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationPermission, setLocationPermission] = useState<boolean | null>(null);
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission | 'default'>('default');
  const [onboardingStep, setOnboardingStep] = useState<'WELCOME' | 'CHOOSE_ROLE' | 'LOGIN' | 'PERMISSIONS' | 'COMPLETED'>('WELCOME');

  const role: UserRole = user?.role || 'CUSTOMER';

  const detectNearestCampus = useCallback((lat: number, lng: number): College => {
    let nearest = INITIAL_COLLEGES[0];
    let minDistance = Infinity;

    INITIAL_COLLEGES.forEach((col) => {
      const dist = calculateDistanceKm(lat, lng, col.lat, col.lng);
      if (dist < minDistance) {
        minDistance = dist;
        nearest = col;
      }
    });

    setSelectedCollege(nearest);
    return nearest;
  }, []);

  const requestLocationPermission = useCallback(async (): Promise<{ lat: number; lng: number } | null> => {
    return new Promise((resolve) => {
      if (typeof window === 'undefined' || !navigator.geolocation) {
        setLocationPermission(false);
        resolve(null);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          setUserLocation(coords);
          setLocationPermission(true);
          detectNearestCampus(coords.lat, coords.lng);
          resolve(coords);
        },
        () => {
          // Fallback location (SRM Campus coords)
          const fallback = { lat: 12.9725, lng: 77.5950 };
          setUserLocation(fallback);
          setLocationPermission(true);
          detectNearestCampus(fallback.lat, fallback.lng);
          resolve(fallback);
        },
        { timeout: 8000 }
      );
    });
  }, [detectNearestCampus]);

  const requestNotificationPermission = useCallback(async (): Promise<NotificationPermission> => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      try {
        const res = await Notification.requestPermission();
        setNotificationPermission(res);
        return res;
      } catch {
        setNotificationPermission('denied');
        return 'denied';
      }
    }
    return 'default';
  }, []);

  const loginWithRole = useCallback((userRole: UserRole, customName?: string, customEmail?: string) => {
    const template = DEFAULT_DEMO_USERS[userRole];
    const newUser: UserProfile = {
      ...template,
      id: `user-${Date.now()}`,
      name: customName || template.name,
      email: customEmail || template.email,
      role: userRole,
      createdAt: new Date().toISOString()
    };
    setUser(newUser);
    setOnboardingStep('PERMISSIONS');
  }, []);

  const switchRole = useCallback((newRole: UserRole) => {
    const template = DEFAULT_DEMO_USERS[newRole];
    setUser(template);
  }, []);

  const loginWithEmail = useCallback((email: string, userRole: UserRole) => {
    loginWithRole(userRole, email.split('@')[0], email);
  }, [loginWithRole]);

  const logout = useCallback(() => {
    setUser(null);
    setOnboardingStep('WELCOME');
  }, []);

  const updateProfile = useCallback((data: Partial<UserProfile>) => {
    setUser((prev) => (prev ? { ...prev, ...data } : null));
  }, []);

  const addCollege = useCallback((college: College) => {
    setColleges((prev) => [...prev, college]);
  }, []);

  const removeCollege = useCallback((id: string) => {
    setColleges((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const contextValue = useMemo(() => ({
    user,
    role,
    isLoggedIn: !!user,
    colleges,
    selectedCollege,
    userLocation,
    locationPermission,
    notificationPermission,
    onboardingStep,
    setOnboardingStep,
    switchRole,
    loginWithEmail,
    loginWithRole,
    logout,
    updateProfile,
    setSelectedCollege,
    addCollege,
    removeCollege,
    requestLocationPermission,
    requestNotificationPermission,
    detectNearestCampus
  }), [
    user,
    role,
    colleges,
    selectedCollege,
    userLocation,
    locationPermission,
    notificationPermission,
    onboardingStep,
    switchRole,
    loginWithEmail,
    loginWithRole,
    logout,
    updateProfile,
    addCollege,
    removeCollege,
    requestLocationPermission,
    requestNotificationPermission,
    detectNearestCampus
  ]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
