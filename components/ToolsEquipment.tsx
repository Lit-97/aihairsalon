"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const tools = [
  {
    name: "AirLuxe Jet Dryer",
    description:
      "Powerful blow dryer with diffuser & concentrator attachments",
  },
  {
    name: "GlideFlow Reverse Dryer",
    description: "Gentle stretch-dryer inspired by RevAir",
  },
  {
    name: "SleekFusion Iron",
    description: "Precision flat iron with ionic steam tech",
  },
  {
    name: "GoldTouch Press Comb",
    description: "Heated comb for silk presses and edge smoothing",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  hover: {
    scale: 1.05,
    boxShadow: "0 0 20px rgba(183, 149, 32, 0.4)",
    borderBottomColor: "#b79520",
  },
};

export default function ToolsEquipment() {
  return (
    <section aria-label="Tools and Equipment" className="w-full">
      <div
        className="w-full"
        style={{
          backgroundColor: "#EFE6DD",
          padding: "5rem 1.5rem",
          position: "relative",
        }}
      >
        <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-lg flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 p-6">
            <img
              src="/revnew.png"
              alt="Luxury Hair Dryer"
              className="rounded-3xl shadow-xl w-full object-cover"
              loading="lazy"
            />
          </div>

          <div className="md:w-1/2 p-6 w-full text-gray-700">
            <h2 className="tools-title text-4xl font-serif font-extrabold mb-8">
              <motion.span
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  background: "linear-gradient(90deg, #ffffff, #dcbf6a, #ffffff)",
                  backgroundSize: "200% 200%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  display: "inline-block",
                }}
              >
                Tools & Equipment
              </motion.span>
            </h2>

            <motion.ul
              className="space-y-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {tools.map(({ name, description }) => (
                <motion.li
                  key={name}
                  className="border-b border-transparent pb-4 cursor-pointer rounded-xl"
                  style={{ borderBottomColor: "transparent" }}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  aria-label={`${name}: ${description}`}
                >
                  <Link
                    href="/products"
                    style={{ display: "block", textDecoration: "none" }}
                  >
                    <h3
                      className="text-2xl font-serif font-semibold mb-1"
                      style={{ color: "#dcbf6a" }}
                    >
                      {name}
                    </h3>
                    <p
                      className="font-sans leading-relaxed"
                      style={{ color: "#6b6b6b" }}
                    >
                      {description}
                    </p>
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>
    </section>
  );
}
