"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInAnonymously as firebaseSignInAnonymously,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail as firebaseSendPasswordResetEmail,
  sendEmailVerification,
  onAuthStateChanged,
  signOut,
  User,
  updateProfile,
} from "firebase/auth";
import { auth } from "./firebase";

interface AuthError extends Error {
  code?: string;
}

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInAnonymously: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (
    email: string,
    password: string,
    profile?: { firstName: string; lastName: string }
  ) => Promise<void>;
  signOutUser: () => Promise<void>;
  sendPasswordResetEmail: (email: string) => Promise<void>;
  updateProfileDisplayName: (displayName: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const signInAnonymously = async () => {
    await firebaseSignInAnonymously(auth);
  };

  const signInWithEmail = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    if (!userCredential.user.emailVerified) {
      await signOut(auth);
      const error: AuthError = new Error("Please verify your email before signing in.");
      error.code = "auth/email-not-verified";
      throw error;
    }
  };

  const signUpWithEmail = async (
    email: string,
    password: string,
    profile?: { firstName: string; lastName: string }
  ) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    if (userCredential.user) {
      await sendEmailVerification(userCredential.user);

      if (profile) {
        const displayName = `${profile.firstName} ${profile.lastName}`;
        await updateProfile(userCredential.user, { displayName });
      }

      await signOut(auth);
    }
  };

  const signOutUser = async () => {
    await signOut(auth);
    setUser(null);
  };

  const sendPasswordResetEmail = async (email: string) => {
    await firebaseSendPasswordResetEmail(auth, email);
  };

  const updateProfileDisplayName = async (displayName: string) => {
    if (!auth.currentUser) throw new Error("No user is signed in");
    await updateProfile(auth.currentUser, { displayName });
    setUser(auth.currentUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signInWithGoogle,
        signInAnonymously,
        signInWithEmail,
        signUpWithEmail,
        signOutUser,
        sendPasswordResetEmail,
        updateProfileDisplayName,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
