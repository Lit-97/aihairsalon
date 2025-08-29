import { ReactNode } from "react";
import { AuthProvider } from "@/lib/AuthContext";
import { CartProvider } from "@/lib/CartContext"; // <-- import the CartProvider
import ChatWidget from "@/components/ChatWidget";
import Navbar from "@/components/Navbar";
import FooterCTA from "@/components/FooterCTA";
import "./globals.css";

export const metadata = {
  title: "Salon Luxe",
  description:
    "Welcome to Salon Luxe – Redefining hair styling with elegance and modern touch.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-gradient-to-b from-[#f3e9e9] via-[#c08081] to-[#b76e79] font-sans text-[#333333]">
        <AuthProvider>
          <CartProvider> {/* Wrap everything inside CartProvider */}
            <Navbar />
            <main className="flex-grow">{children}</main>
            <FooterCTA />
            <ChatWidget />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
