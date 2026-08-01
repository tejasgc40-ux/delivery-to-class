"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  type User as FirebaseUser,
} from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db, ensureFirebaseCollections } from "@/lib/firebase";

type UserRole = "student" | "partner" | "admin";

interface AppUserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  role: UserRole;
}

interface AuthContextValue {
  user: AppUserProfile | null;
  loading: boolean;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  role: UserRole | null;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function mapFirebaseUser(user: FirebaseUser | null): AppUserProfile | null {
  if (!user) return null;
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    role: "student",
  };
}

async function syncUserProfile(user: FirebaseUser | null) {
  if (!user) return null;

  const profileRef = doc(db, "users", user.uid);
  const snapshot = await getDoc(profileRef);
  const baseProfile = {
    uid: user.uid,
    email: user.email ?? "",
    displayName: user.displayName ?? "Student",
    photoURL: user.photoURL ?? "",
    role: "student" as UserRole,
    updatedAt: serverTimestamp(),
  };

  if (!snapshot.exists()) {
    await setDoc(profileRef, {
      ...baseProfile,
      createdAt: serverTimestamp(),
    });
    return baseProfile;
  }

  const data = snapshot.data() as Partial<AppUserProfile> & { role?: UserRole };
  const role = data.role ?? "student";
  await setDoc(profileRef, { ...baseProfile, role }, { merge: true });
  return { ...baseProfile, role };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AppUserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const initializeAuth = async () => {
      await ensureFirebaseCollections();
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        if (cancelled) return;
        if (!firebaseUser) {
          setUser(null);
          setLoading(false);
          return;
        }
        const profile = await syncUserProfile(firebaseUser);
        if (!cancelled) {
          setUser(profile ? { ...profile, role: profile.role ?? "student" } : mapFirebaseUser(firebaseUser));
          setLoading(false);
        }
      });

      return unsubscribe;
    };

    initializeAuth().then((unsubscribe) => {
      if (cancelled) {
        unsubscribe?.();
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const signUp = async (email: string, password: string) => {
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    await syncUserProfile(credential.user);
  };

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const logout = async () => {
    await firebaseSignOut(auth);
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      signUp,
      signIn,
      signInWithGoogle,
      logout,
      role: user?.role ?? null,
      isAdmin: user?.role === "admin",
    }),
    [loading, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
