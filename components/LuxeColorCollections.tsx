"use client";

import { motion, easeOut } from "framer-motion";
import Link from "next/link";

const collections = [
  {
    id: "luxevelour",
    name: "LuxeVelour",
    tagline: "BOLD & CREATIVE SHADES",
    colors: [
      { hex: "#8B0000", name: "Crimson Mirage" },
      { hex: "#B22222", name: "Sunset Saffron" },
      { hex: "#DC143C", name: "Amber Glow" },
      { hex: "#FF6347", name: "Pink Truffle" },
      { hex: "#7B68EE", name: "Midnight Violet" },
      { hex: "#48D1CC", name: "Ocean Veil" },
      { hex: "#C8A2C8", name: "Lavender Smoke" },
      { hex: "#2F4F4F", name: "Graphite Storm" },
      { hex: "#4682B4", name: "Icy Obsidian" },
      { hex: "#FF69B4", name: "Pink Truffle" },
    ],
  },
  {
    id: "silkenveil",
    name: "SilkenVeil",
    tagline: "NATURALS & CLASSIC TONES",
    colors: [
      { hex: "#FAE6D4", name: "Champagne Silk" },
      { hex: "#FFD700", name: "Golden Hour" },
      { hex: "#F0E68C", name: "Ivory Pearl" },
      { hex: "#6B4226", name: "Smoky Quartz" },
      { hex: "#A67B5B", name: "Café Crème" },
      { hex: "#4B3621", name: "Velvet Brunette" },
      { hex: "#0C0C0C", name: "Ebony Luxe" },
      { hex: "#800000", name: "Rosewood Ember" },
      { hex: "#C0C0C0", name: "Silver Whisper" },
      { hex: "#D2B48C", name: "Tan Whisper" },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.2, duration: 0.6, ease: easeOut },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.85 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

export default function LuxeColorCollections() {
  return (
    <section
      className="py-20 px-6"
      style={{ backgroundColor: "#d9b68f" }}
      aria-label="Luxe Color Collections"
    >
      <h2
        className="text-4xl font-serif font-extrabold mb-14 tracking-wide text-center shimmer-text"
      >
        Luxe Color Collections
      </h2>

      <motion.div
        className="max-w-6xl mx-auto space-y-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {collections.map(({ id, name, tagline, colors }) => (
          <motion.div
            key={id}
            className="bg-white rounded-3xl p-10 shadow-md border border-transparent transition duration-300"
            variants={itemVariants}
          >
            <h3
              className="text-3xl font-serif font-semibold mb-1"
              style={{
                color: "#dcbf6a",
                textShadow: "none",
              }}
            >
              {name}
            </h3>
            <p
              className="mb-8 font-serif tracking-widest italic text-sm select-none max-w-xl"
              style={{ color: "#a67b5b" }}
            >
              {tagline}
            </p>

            <motion.div
              className="grid grid-cols-5 gap-8 max-w-4xl mx-auto"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {colors.map(({ hex, name: colorName }) => (
                <motion.div
                  key={`${colorName}-${hex}`}
                  className="flex flex-col items-center cursor-pointer rounded-3xl"
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.1,
                    boxShadow: "0 0 18px 6px rgba(212, 175, 55, 0.6)",
                    borderRadius: "1.5rem",
                    transition: { duration: 0.3 },
                  }}
                >
                  <Link
                    href="/products"
                    aria-label={`${colorName} color swatch`}
                    style={{ display: "flex", flexDirection: "column", alignItems: "center", textDecoration: "none" }}
                  >
                    <div
                      className="w-24 h-24 rounded-full shimmer transition-shadow duration-300"
                      style={{ backgroundColor: hex }}
                    />
                    <p
                      className="font-semibold text-center text-lg select-none tracking-wider italic mt-3"
                      style={{ color: "#dcbf6a" }}
                    >
                      {colorName}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      <style>{`
        /* Title shimmer effect */
        .shimmer-text {
          background:linear-gradient(90deg, #ffffff, #dcbf6a, #ffffff);
          background-size: 200% auto;
          color: transparent;
          background-clip: text;
          -webkit-background-clip: text;
          animation: shimmerMove 3s linear infinite;
        }
        @keyframes shimmerMove {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }

        /* Swatch shimmer */
        .shimmer {
          position: relative;
          overflow: hidden;
          border-radius: 9999px;
        }
        .shimmer::before {
          content: "";
          position: absolute;
          top: 0;
          left: -150%;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            120deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.3) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          animation: shimmer 2.5s infinite;
          pointer-events: none;
          border-radius: 9999px;
        }
        @keyframes shimmer {
          0% { left: -150%; }
          100% { left: 150%; }
        }
      `}</style>
    </section>
  );
}
