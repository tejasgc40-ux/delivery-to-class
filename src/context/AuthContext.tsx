'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole } from '../types';

interface AuthContextType {
  user: UserProfile | null;
  role: UserRole;
  isLoggedIn: boolean;
  switchRole: (newRole: UserRole) => void;
  loginWithEmail: (email: string, role: UserRole) => void;
  logout: () => void;
  updateProfile: (data: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEFAULT_DEMO_USER: UserProfile = {
  id: 'user-demo-student',
  name: 'Alex Johnson (Student)',
  email: 'alex.student@campus.edu',
  role: 'CUSTOMER',
  phone: '+91 98765 12345',
  campusBuilding: 'Tech Park (Engineering Block)',
  classroom: 'Room 304',
  avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
  createdAt: new Date().toISOString()
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(DEFAULT_DEMO_USER);

  // Sync role helper
  const role = user?.role || 'CUSTOMER';

  const switchRole = (newRole: UserRole) => {
    if (!user) {
      setUser({
        ...DEFAULT_DEMO_USER,
        role: newRole,
        name: `Demo ${newRole.replace('_', ' ')}`
      });
      return;
    }
    
    let updatedName = user.name;
    if (newRole === 'CUSTOMER') updatedName = 'Alex Johnson (Student)';
    if (newRole === 'SHOP_OWNER') updatedName = 'Chief Chef (Canteen Owner)';
    if (newRole === 'DELIVERY_PARTNER') updatedName = 'Rahul Sharma (Student Partner)';
    if (newRole === 'ADMIN') updatedName = 'Campus Admin Officer';

    setUser({
      ...user,
      role: newRole,
      name: updatedName
    });
  };

  const loginWithEmail = (email: string, userRole: UserRole) => {
    setUser({
      id: `user-${Date.now()}`,
      name: email.split('@')[0],
      email,
      role: userRole,
      phone: '+91 99999 88888',
      createdAt: new Date().toISOString()
    });
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    if (user) {
      setUser({ ...user, ...data });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isLoggedIn: !!user,
        switchRole,
        loginWithEmail,
        logout,
        updateProfile
      }}
    >
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
