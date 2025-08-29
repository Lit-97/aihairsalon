"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Calendar from "react-calendar";
import Link from "next/link";
import "react-calendar/dist/Calendar.css";

export default function BookingCalendar() {
  const [date, setDate] = useState<Date | null>(new Date());
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Dynamically import CustomCalendar.css on the client only
    import("../styles/CustomCalendar.css").then(() => setLoaded(true));
  }, []);

  if (!loaded) return null; // wait for CSS to load

  return (
    <section
      className="flex flex-col items-center justify-center px-6 py-12"
      style={{ backgroundColor: "#EFE6DD" }}
      aria-label="Booking calendar section"
    >
      <h2
        className="text-3xl font-bold mb-5"
        style={{ padding: "1rem 0", fontFamily: "Playfair Display, serif" }}
      >
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
          Book an Appointment
        </motion.span>
      </h2>

      <p
        className="mb-8 text-center max-w-xl text-lg leading-relaxed"
        style={{ color: "#6b6b6b", fontFamily: "Montserrat, sans-serif" }}
      >
        Select a date below to schedule your personalized hair styling experience with Salon Luxe.
      </p>

      <div
        className="rounded-2xl shadow-xl p-6 bg-white transition-transform hover:scale-[1.02] focus-within:scale-[1.02] duration-300 border border-transparent"
      >
        <Calendar
          onChange={(value) => setDate(value as Date)}
          value={date}
          className="rounded-lg focus:outline-none"
          tileClassName="hover:bg-yellow-100 focus:bg-yellow-200"
          calendarType="iso8601"
          locale="en-US"
          minDate={new Date()}
        />
      </div>

      {date && (
        <div className="mt-8 flex flex-col items-center">
          <p
            className="text-lg select-none mb-4"
            aria-live="polite"
            style={{ color: "#6b6b6b", fontFamily: "Montserrat, sans-serif" }}
          >
            You selected:{" "}
            <span className="font-semibold" style={{ color: "#dcbf6a" }}>
              {date.toDateString()}
            </span>
          </p>

          <p
            className="mb-4 text-center text-lg"
            style={{ color: "#6b6b6b", fontFamily: "Montserrat, sans-serif" }}
          >
            Ready to book your appointment? Click below to continue.
          </p>

          <Link
            href={`/bookings?date=${date.toISOString()}`}
            className="booking-book-now-button"
            aria-label="Book Now"
          >
            Book Now
          </Link>
        </div>
      )}
    </section>
  );
}
