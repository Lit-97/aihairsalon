"use client";

import { useState } from "react";
import { signInWithGoogle, signOutUser } from "../lib/firebaseAuth";

export default function GoogleSignInButton() {
  const [user, setUser] = useState<any>(null);

  const handleSignIn = async () => {
    try {
      const { user } = await signInWithGoogle();
      setUser(user);
    } catch (error) {
      console.error("Sign-in failed:", error);
    }
  };

  const handleSignOut = async () => {
    await signOutUser();
    setUser(null);
  };

  return (
    <div className="flex flex-col items-center mt-4">
      {user ? (
        <div>
          <p className="mb-2">Welcome, {user.displayName}</p>
          <button
            onClick={handleSignOut}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <button
          onClick={handleSignIn}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Sign in with Google
        </button>
      )}
    </div>
  );
}
