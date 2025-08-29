"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden"
    >
      {/* Background Image */}
      <motion.div
        initial={{ scale: 1, opacity: 0 }}
        animate={{ scale: 1.05, opacity: 1 }}
        transition={{ duration: 3, ease: "easeOut" }}
        className="absolute inset-0"
        style={{
          backgroundImage:
            "url('https://media.gettyimages.com/id/1423513079/photo/luxury-hairdressing-and-beauty-salon-interior-with-chairs-mirrors-and-spotlights.jpg?b=1&s=2048x2048&w=0&k=20&c=OIiL0ebcq1U28Rnf6OtrNfvAdvAl3QqURiPMpVF-F7w=')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.35)" }}
      ></div>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 max-w-4xl text-6xl md:text-8xl font-serif font-extrabold leading-tight drop-shadow-md"
        style={{
          color: "#f8f1e7",
          textShadow:
            "0 0 12px rgba(248, 241, 231, 0.7), 0 0 25px rgba(201, 161, 76, 0.7)",
        }}
      >
        <span className="inline-flex space-x-4">
          <span>Experience</span>
          <motion.span
            className="inline-block"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              background: "linear-gradient(90deg, #f8f1e7, #c9a14c, #f8f1e7)",
              backgroundSize: "300% 200%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Elegance
          </motion.span>
        </span>
        <br />
        <div>at</div>
        <div>Salon Luxe</div>
      </motion.h1>

      {/* Subheading */}
      <Link href="/bookings">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="hero-view-all-button relative z-10 mt-12 px-12 py-4 rounded-full font-semibold tracking-wide shadow-[0_6px_20px_rgba(201,161,76,0.8)] overflow-hidden transition-all duration-500"
          style={{
            background: "linear-gradient(90deg, #ffffff, #dcbf6a, #ffffff)",
            backgroundSize: "200% 200%",
            color: "#8a5302ff",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#d9a55c";
            e.currentTarget.style.backgroundPosition = "100% 0";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#8a5302ff";
            e.currentTarget.style.backgroundPosition = "0% 0";
          }}
        >
          Book Your Experience
        </motion.button>
      </Link>
    </section>
  );
}
