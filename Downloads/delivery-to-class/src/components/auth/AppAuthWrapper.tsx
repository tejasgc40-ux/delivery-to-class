'use client';

import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { WelcomeAuthScreen } from './WelcomeAuthScreen';
import { PermissionsModal } from './PermissionsModal';
import { RoleSwitcher } from '../common/RoleSwitcher';
import { Header } from '../common/Header';
import { Footer } from '../common/Footer';
import { BottomNav } from '../common/BottomNav';

export const AppAuthWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, onboardingStep } = useAuth();

  // If unauthenticated, enforce Welcome & Login screen
  if (!user) {
    return <WelcomeAuthScreen />;
  }

  return (
    <>
      <RoleSwitcher />
      <Header />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>
      <Footer />
      <BottomNav />

      {/* Permissions Modal when onboarding is active */}
      {onboardingStep === 'PERMISSIONS' && <PermissionsModal />}
    </>
  );
};
