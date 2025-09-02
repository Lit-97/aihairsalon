"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function ContactPage() {
  const gold = "#dcbf6a";

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2, duration: 0.6 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;
    const newErrors = { name: "", email: "", message: "" };

    if (!name.trim()) {
      newErrors.name = "Please enter your full name";
      hasError = true;
    }
    if (!email.trim()) {
      newErrors.email = "Please enter your email address";
      hasError = true;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email";
      hasError = true;
    }
    if (!message.trim()) {
      newErrors.message = "Please enter a message";
      hasError = true;
    }

    setErrors(newErrors);

    if (!hasError) {
      setShowModal(true);
      setName("");
      setEmail("");
      setMessage("");
      setErrors({ name: "", email: "", message: "" });
    }
  };

  return (
    <main className="contact-page">
      <section className="contact-split">
        <motion.div
          className="contact-card"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h1 className="contact-title shimmer-text" variants={itemVariants}>
            Get in Touch
          </motion.h1>
          <motion.p className="contact-subtitle" variants={itemVariants}>
            We’d love to hear from you — whether to book an appointment or inquire about our services.
          </motion.p>

          <motion.form className="contact-form" onSubmit={handleSubmit}>
            <motion.div variants={itemVariants}>
              <input
                type="text"
                placeholder="Full Name"
                className={`contact-input ${errors.name ? "input-error" : ""}`}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && <p className="error-text">{errors.name}</p>}
            </motion.div>

            <motion.div variants={itemVariants}>
              <input
                type="email"
                placeholder="Email Address"
                className={`contact-input ${errors.email ? "input-error" : ""}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <p className="error-text">{errors.email}</p>}
            </motion.div>

            <motion.div variants={itemVariants}>
              <textarea
                placeholder="Your Message"
                className={`contact-textarea ${errors.message ? "input-error" : ""}`}
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              {errors.message && <p className="error-text">{errors.message}</p>}
            </motion.div>

            <motion.button
              type="submit"
              className="contact-button"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              Send Message
            </motion.button>
          </motion.form>
        </motion.div>

        <div className="contact-left">
          <Image
            src="/team.jpg"
            alt="Luxury hair salon"
            className="contact-hero-image"
            width={800}
            height={600}
            priority
          />
          <div className="contact-info">
            <h2 className="luxury-tagline">Luxury is in the details. Let us create your perfect look.</h2>
            <div className="info-grid">
              <div>
                <h2 className="info-title" style={{ color: gold }}>Visit Us</h2>
                <p>123 Luxe Avenue, Suite 100<br />Beverly Hills, CA 90210</p>
              </div>
              <div>
                <h2 className="info-title" style={{ color: gold }}>Call Us</h2>
                <p>+1 (555) 123-4567</p>
              </div>
              <div>
                <h2 className="info-title" style={{ color: gold }}>Email</h2>
                <p>hello@salonluxe.com</p>
              </div>
            </div>
            <button className="cta-button">Book Your Appointment</button>
          </div>
        </div>
      </section>

      {showModal && (
        <div className="modal-overlay">
          <motion.div
            className="modal-content"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h2>Thank you!</h2>
            <p>Your message has been sent. We will get back to you shortly.</p>
            <button className="close-button" onClick={() => setShowModal(false)}>
              Close
            </button>
          </motion.div>
        </div>
      )}

      <style>{`
        .contact-page {
          background-color: #f8f1e7;
          min-height: 100vh;
          font-family: 'Georgia', serif;
          color: #7b5e4a;
          padding: 4rem 2rem;
        }
        .contact-split {
          display: flex;
          flex-wrap: wrap;
          gap: 3rem;
          justify-content: center;
          align-items: stretch;
        }
        .contact-left {
          flex: 1;
          min-width: 300px;
          display: flex;
          flex-direction: column;
          gap: 2rem;
          text-align: center;
        }
        .contact-hero-image {
          width: 100%;
          border-radius: 2rem;
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
          object-fit: cover;
          max-height: 400px;
        }
        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .luxury-tagline {
          font-size: 1.5rem;
          margin-bottom: 1.5rem;
          color: #7b5e4a;
        }
        .info-grid {
          display: flex;
          justify-content: space-between;
          gap: 2rem;
          flex-wrap: wrap;
        }
        .info-title {
          font-size: 1.6rem;
          margin-bottom: 0.5rem;
        }
        .cta-button {
          margin-top: 2rem;
          background-color: ${gold};
          color: #1a1a1a;
          font-weight: 600;
          padding: 0.8rem 1.5rem;
          border-radius: 2rem;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 1.2rem;
          box-shadow: 0 6px 20px rgba(0,0,0,0.15);
        }
        .cta-button:hover {
          background-color: #c9a14c;
          transform: translateY(-2px);
        }
        .contact-card {
          flex: 1;
          min-width: 300px;
          background-color: #ffffff;
          padding: 3rem;
          border-radius: 2rem;
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
          border: 1px solid rgba(220,191,106,0.3);
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .contact-title {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          text-align: center;
          width: 100%;
          margin: 0 auto;
        }
        .contact-subtitle {
          font-size: 1.2rem;
          margin-bottom: 2rem;
        }
        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .contact-input,
        .contact-textarea {
          padding: 1rem;
          border-radius: 1rem;
          border: 1px solid ${gold};
          font-size: 1rem;
          font-family: sans-serif;
          outline: none;
          width: 100%;
        }
        .input-error {
          border-color: #e74c3c;
        }
        .error-text {
          color: #e74c3c;
          font-size: 0.9rem;
          margin-top: 0.25rem;
        }
        .contact-button {
          background-color: ${gold};
          color: #1a1a1a;
          font-weight: 600;
          padding: 1rem 2rem;
          border-radius: 2rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .contact-button:hover {
          background-color: #c9a14c;
        }
        .shimmer-text {
          background: linear-gradient(90deg, #ffffff, ${gold}, #ffffff);
          background-size: 200% auto;
          color: transparent;
          background-clip: text;
          -webkit-background-clip: text;
          animation: shimmerMove 6s linear infinite;
        }
        @keyframes shimmerMove {
          0% { background-position: 200% center; }
          100% { background-position: 0% center; }
        }
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 999;
        }
        .modal-content {
          background: #fff;
          padding: 3rem 2rem;
          border-radius: 2rem;
          text-align: center;
          max-width: 400px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        }
        .modal-content h2 {
          font-size: 2rem;
          margin-bottom: 1rem;
          color: ${gold};
        }
        .modal-content p {
          font-size: 1rem;
          margin-bottom: 2rem;
        }
        .close-button {
          background: ${gold};
          color: #1a1a1a;
          padding: 0.75rem 2rem;
          border-radius: 2rem;
          font-weight: 600;
          cursor: pointer;
          border: none;
        }
        .close-button:hover {
          background: #c9a14c;
        }
        @media (max-width: 900px) {
          .contact-split {
            flex-direction: column;
          }
          .info-grid {
            flex-direction: column;
            align-items: center;
          }
          .contact-left, .contact-card {
            min-width: 100%;
          }
        }
      `}</style>
    </main>
  );
}
