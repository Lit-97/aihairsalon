"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import { FiShoppingCart } from "react-icons/fi";
import { useCart } from "@/lib/CartContext";

export default function Navbar() {
  const { user, signOutUser } = useAuth();
  const router = useRouter();
  const goldColor = "#c9a14c";

  const { cart } = useCart();

  const leftLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Bookings", href: "/bookings" },
  ];

  const rightLinks = [
    { name: "Products", href: "/products" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      className="w-full relative flex items-center p-4 backdrop-blur-sm"
      style={{ backgroundColor: "rgba(31,31,31,0.9)" }}
    >
      {/* Left: Cart Button */}
      <div className="flex items-center">
        <button
          onClick={() => router.push("/cart")}
          className="text-[#c9a14c] hover:text-white transition-colors duration-300 relative"
        >
          <FiShoppingCart size={28} />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#c9a14c] text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {cart.reduce((total, item) => total + item.qty, 0)}
            </span>
          )}
        </button>
      </div>

      {/* Center: Navigation + Logo */}
      <nav className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center space-x-8 text-sm font-medium">
        {/* Left links */}
        <div className="flex space-x-6">
          {leftLinks.map((link) => (
            <Link key={link.name} href={link.href}>
              <span
                className="relative group px-3 py-2 cursor-pointer transition-colors duration-300"
                style={{ color: goldColor }}
              >
                {link.name}
                <span className="absolute left-1/2 bottom-0 w-0 h-[2px] bg-[#c9a14c] rounded shadow-[0_0_6px_rgba(201,161,76,0.7)] transition-all duration-500 transform -translate-x-1/2 group-hover:w-full group-hover:shadow-[0_0_12px_rgba(201,161,76,0.9)]"></span>
              </span>
            </Link>
          ))}
        </div>

        {/* Logo */}
        <Link href="/" className="mx-4">
          <img
            src="/logorb.png"
            alt="Salon Luxe Logo"
            className="h-14 w-auto hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* Right links */}
        <div className="flex space-x-6">
          {rightLinks.map((link) => (
            <Link key={link.name} href={link.href}>
              <span
                className="relative group px-3 py-2 cursor-pointer transition-colors duration-300"
                style={{ color: goldColor }}
              >
                {link.name}
                <span className="absolute left-1/2 bottom-0 w-0 h-[2px] bg-[#c9a14c] rounded shadow-[0_0_6px_rgba(201,161,76,0.7)] transition-all duration-500 transform -translate-x-1/2 group-hover:w-full group-hover:shadow-[0_0_12px_rgba(201,161,76,0.9)]"></span>
              </span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Right: Sign In / Profile */}
      <div className="ml-auto flex items-center space-x-2">
        {user ? (
          <>
            <button
              onClick={() => router.push("/profile")}
              className="text-xs px-3 py-1.5 rounded border border-[#c9a14c] text-[#c9a14c] hover:bg-[#c9a14c] hover:text-[#1a1a1a] transition-all duration-300"
            >
              Profile
            </button>
            <button
              onClick={signOutUser}
              className="text-xs px-3 py-1.5 rounded border border-[#c9a14c] text-[#c9a14c] hover:bg-[#c9a14c] hover:text-[#1a1a1a] transition-all duration-300"
            >
              Sign Out
            </button>
          </>
        ) : (
          <button
            onClick={() => router.push("/signin")}
            className="text-xs px-3 py-1.5 rounded border border-[#c9a14c] text-[#c9a14c] hover:bg-[#c9a14c] hover:text-[#1a1a1a] transition-all duration-300"
          >
            Sign In
          </button>
        )}
      </div>
    </header>
  );
}
