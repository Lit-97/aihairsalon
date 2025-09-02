"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import { FirebaseError } from "firebase/app";

const GoogleIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 533.5 544.3"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
  >
    <path fill="#4285F4" d="M533.5 278.4c0-18.5-1.5-37-4.7-54.7H272v103.7h146.9c-6.3 34-25.4 62.9-54.1 82v68h87.2c51-47 80.5-116.3 80.5-199z" />
    <path fill="#34A853" d="M272 544.3c73.7 0 135.6-24.3 180.7-65.7l-87.2-68c-24.2 16.2-55.3 25.6-93.5 25.6-71.8 0-132.7-48.5-154.6-113.5H27.3v71.1c45.2 89.7 138.3 150.5 244.7 150.5z" />
    <path fill="#FBBC05" d="M117.4 321.7c-10.4-30.4-10.4-63.1 0-93.5v-71.1H27.3c-38.6 77-38.6 169.7 0 246.7l90.1-71.1z" />
    <path fill="#EA4335" d="M272 107.7c39.6 0 75.3 13.6 103.3 40.4l77.4-77.4C399.5 24.5 337.6 0 272 0 165.6 0 72.5 60.8 27.3 150.5l90.1 71.1c22-65 82.9-113.9 154.6-113.9z" />
  </svg>
);

export default function SignUpPage() {
  const { signUpWithEmail, signInWithGoogle, signInAnonymously, user, loading } = useAuth();
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      const isVerified = user.emailVerified;
      const isAnonymous = user.isAnonymous;

      if (!isAnonymous && isVerified) {
        router.push("/");
      }
    }
  }, [user, router]);

  const gold = "#d4af37";

  // ✅ Line 52: handleSignUp
  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      await signUpWithEmail(email, password, { firstName, lastName });
      router.push("/signin?verifyEmail=true");
    } catch (err: unknown) {
      const error = err as FirebaseError | Error;
      setError(error.message ?? "Failed to sign up. Try again.");
    }
  };

  if (loading) {
    return (
      <main className="flex items-center justify-center min-h-screen px-4" style={{ backgroundColor: "#f7e3e2" }}>
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main className="flex items-center justify-center min-h-screen px-4 bg-[#EFE6DD]">
      <div className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-md text-center border border-pink-100">
        <h1 className="text-3xl font-serif font-bold mb-6" style={{ color: gold, textShadow: "0 0 6px rgba(212, 175, 55, 0.6)" }}>
          Create an Account
        </h1>

        {/* ✅ Line 83: Google Sign Up */}
        <button
          onClick={async () => {
            setError("");
            try {
              await signInWithGoogle();
              router.push("/");
            } catch (err: unknown) {
              const error = err as Error;
              setError(error.message ?? "Failed to sign in with Google.");
            }
          }}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 mb-4 rounded-full font-medium transition"
          style={{ border: `1px solid ${gold}`, color: gold, backgroundColor: "#fff" }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = gold; e.currentTarget.style.color = "#1a1a1a"; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#fff"; e.currentTarget.style.color = gold; }}
        >
          <GoogleIcon />
          Sign up with Google
        </button>

        {/* ✅ Line 113: Continue as Guest */}
        <button
          onClick={async () => {
            setError("");
            try {
              await signInAnonymously();
              router.push("/");
            } catch (err: unknown) {
              const error = err as Error;
              setError(error.message ?? "Failed to sign in as guest.");
            }
          }}
          className="w-full px-4 py-2 mb-4 rounded-full font-medium transition"
          style={{ border: `1px solid ${gold}`, color: gold, backgroundColor: "transparent" }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = gold; e.currentTarget.style.color = "#1a1a1a"; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = gold; }}
        >
          Continue as Guest
        </button>

        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-2 text-gray-400">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Email Sign Up Form */}
        <form onSubmit={handleSignUp} className="space-y-4 text-left">
          <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-gray-800" required />
          <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-gray-800" required />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-gray-800" required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-gray-800" required />

          <button type="submit" className="w-full px-4 py-3 rounded-full font-semibold transition" style={{ backgroundColor: gold, color: "#1a1a1a" }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#b79520")} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = gold)}>
            Sign up with Email
          </button>
          {error && <p className="text-red-500 mt-3 text-center">{error}</p>}
        </form>

        <p className="mt-6 text-sm text-gray-800">
          Already have an account? <a href="/signin" style={{ color: gold }} className="hover:underline">Sign in</a>
        </p>

        <button onClick={() => router.push("/")} className="mt-4 text-sm font-semibold" style={{ color: gold, cursor: "pointer" }} aria-label="Back to home">
          ← Back to Home
        </button>
      </div>
    </main>
  );
}
