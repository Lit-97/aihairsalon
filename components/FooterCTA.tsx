"use client";

import Link from "next/link";

export default function FooterCTA() {
  const linkStyle = {
    color: "#c9a14c",
    transition: "color 0.2s",
  };

  const hoverColor = "#dcbf6a";

  // Split into top and bottom rows
  const topLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Bookings", href: "/bookings" },
  ];

  const bottomLinks = [
    { name: "Products", href: "/products" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const socialLinks = [
    {
      href: "https://facebook.com",
      label: "Facebook",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M22 12a10 10 0 10-11.5 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.1 3-3.1.9 0 1.8.2 1.8.2v2h-1c-1 0-1.3.6-1.3 1.3V12h2.2l-.3 3h-1.9v7A10 10 0 0022 12z" />
        </svg>
      ),
    },
    {
      href: "https://instagram.com",
      label: "Instagram",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37a4 4 0 11-4.73-4.73 4 4 0 014.73 4.73z" />
          <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
        </svg>
      ),
    },
    {
      href: "https://twitter.com",
      label: "Twitter",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M23 3a10.9 10.9 0 01-3.14.86 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
        </svg>
      ),
    },
  ];

  return (
    <footer
      className="py-10 px-6"
      style={{ backgroundColor: "#1f1f1f", color: "#dcbf6a" }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 items-start">
        {/* Left Column - Salon Info */}
        <div className="space-y-1">
          <h3 className="font-bold text-lg" style={{ color: "#dcbf6a" }}>
            Salon Luxe
          </h3>
          <p style={{ color: "#c9a14c" }}>1234 Luxe Avenue</p>
          <p style={{ color: "#c9a14c" }}>Beverly Hills, CA 90210</p>
          <p style={{ color: "#c9a14c" }}>Phone: (555) 123-4567</p>
        </div>

        {/* Center Column - Hours + Nav Links */}
        <div className="text-center">
          <h3 className="font-bold text-lg mb-2" style={{ color: "#dcbf6a" }}>
            Hours
          </h3>
          <p style={{ color: "#c9a14c" }}>Mon - Fri: 9am - 7pm</p>
          <p style={{ color: "#c9a14c" }}>Sat: 10am - 5pm</p>
          <p className="mb-4" style={{ color: "#c9a14c" }}>
            Sun: Closed
          </p>

          {/* Top Row Links */}
          <div className="flex flex-wrap justify-center gap-6 mb-2">
            {topLinks.map((link) => (
              <Link key={link.name} href={link.href}>
                <span
                  className="cursor-pointer transition-colors"
                  style={linkStyle}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = hoverColor)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = linkStyle.color)
                  }
                >
                  {link.name}
                </span>
              </Link>
            ))}
          </div>

          {/* Bottom Row Links */}
          <div className="flex flex-wrap justify-center gap-6">
            {bottomLinks.map((link) => (
              <Link key={link.name} href={link.href}>
                <span
                  className="cursor-pointer transition-colors"
                  style={linkStyle}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = hoverColor)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = linkStyle.color)
                  }
                >
                  {link.name}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Right Column - Social Media Icons */}
        <div className="flex justify-center sm:justify-end space-x-8 mt-6 sm:mt-10">
          {socialLinks.map(({ href, label, icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors"
              style={linkStyle}
              onMouseEnter={(e) => (e.currentTarget.style.color = hoverColor)}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = linkStyle.color)
              }
            >
              {icon}
            </a>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-8 text-center text-sm" style={{ color: "#8c8c8c" }}>
        © {new Date().getFullYear()} Salon Luxe. All rights reserved.
      </div>
    </footer>
  );
}
