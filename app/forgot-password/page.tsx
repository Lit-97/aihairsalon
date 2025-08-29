"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";

export default function ForgotPasswordPage() {
  const { sendPasswordResetEmail } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Theme colors
  const gold = "#d4af37";
  const pink = "#f8d7df";

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      await sendPasswordResetEmail(email);
      setMessage("Password reset email sent! Please check your inbox.");
    } catch (err: any) {
      setError(err.message || "Failed to send reset email.");
    }
  };

  return (
    <main
      className="flex items-center justify-center min-h-screen px-4"
      style={{backgroundColor: "#EFE6DD",}}
    >
      <div className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-md text-center border border-pink-100">
        <h1
          className="text-3xl font-serif font-bold mb-6"
          style={{
            color: gold,
            textShadow: `0 0 6px rgba(212, 175, 55, 0.6)`,
          }}
        >
          Forgot Password
        </h1>

        <p className="mb-6 text-gray-700">
          Enter your email address and we'll send you a link to reset your password.
        </p>

        <form onSubmit={handleReset} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-200 text-gray-800"
            required
          />
          <button
            type="submit"
            className="w-full px-4 py-3 rounded-full font-semibold transition"
            style={{
              backgroundColor: gold,
              color: "#1a1a1a",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#b79520";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = gold;
            }}
          >
            Send Reset Email
          </button>
        </form>

        {message && (
          <>
            <p className="text-green-600 mt-4">{message}</p>
            <p className="text-sm text-gray-600 mt-2">
              If you don’t see the email in your inbox, please check your spam folder or add <code>no-reply@firebaseapp.com</code> to your contacts.
            </p>
          </>
        )}

        {error && <p className="text-red-500 mt-4">{error}</p>}

        <button
          onClick={() => router.push("/signin")}
          className="mt-6 text-sm font-semibold"
          style={{ color: gold, cursor: "pointer" }}
          aria-label="Back to sign in"
        >
          ← Back to Sign In
        </button>
      </div>
    </main>
  );
}
