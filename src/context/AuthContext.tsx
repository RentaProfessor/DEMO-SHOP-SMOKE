'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { authService, User } from '@/lib/mockBackend';

interface AuthState {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, userData: SignUpData) => Promise<{ error: string | null }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => void;
  updateProfile: (updates: Partial<User>) => Promise<{ error: string | null }>;
}

interface SignUpData {
  firstName: string;
  lastName: string;
  phone?: string;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing user on mount
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);



  const signUp = async (email: string, password: string, userData: SignUpData) => {
    const { user: newUser, error } = await authService.signUp(email, password, userData);
    
    if (error) {
      return { error };
    }

    setUser(newUser || null);
    return { error: null };
  };

  const signIn = async (email: string, password: string) => {
    const { user: signedInUser, error } = await authService.signIn(email, password);
    
    if (error) {
      return { error };
    }

    setUser(signedInUser || null);
    return { error: null };
  };

  const signOut = () => {
    authService.signOut();
    setUser(null);
  };

  const updateProfile = async (updates: Partial<User>) => {
    const { user: updatedUser, error } = await authService.updateProfile(updates);
    
    if (error) {
      return { error };
    }

    setUser(updatedUser || null);
    return { error: null };
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      signUp,
      signIn,
      signOut,
      updateProfile,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 