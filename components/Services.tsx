"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/Services.module.css";

const services = [
  { id: 1, name: "Haircut", description: "Stylish cuts for all hair types", icon: "/cut.jpg" },
  { id: 2, name: "Coloring", description: "Vibrant and lasting colors", icon: "/2.png" },
  { id: 3, name: "Styling", description: "Special occasion & everyday styles", icon: "/colormaybe.jpg" },
  { id: 4, name: "Treatment", description: "Hair care & scalp treatments", icon: "/longhairtx.jpg" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.25 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0 },
  hover: {
    scale: 1.07,
    boxShadow: "0 0 20px rgba(183, 149, 32, 0.4)",
    borderColor: "rgba(183, 149, 32, 0.7)",
  },
};

export default function Services() {
  return (
    <section className={styles.servicesSection} aria-label="Salon Luxe services offered">
      <div className={styles.servicesFadeTop}></div>

      <h2 className={styles.servicesTitle} style={{ padding: "1rem 0" }}>
        <motion.span
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          style={{
            background: "linear-gradient(90deg, #ffffff, #dcbf6a, #ffffff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            display: "inline-block",
          }}
        >
          Our Services
        </motion.span>
      </h2>

      <motion.div
        className={styles.servicesContainer}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {services.map(({ id, name, description, icon }) => (
          <motion.div
            key={id}
            variants={cardVariants}
            whileHover="hover"
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Link
              href={`/services`}
              className={styles.serviceCard}
              aria-label={`Service: ${name} - ${description}`}
            >
              <div className={styles.serviceIconWrapper}>
                <Image
                  src={icon}
                  alt={`${name} icon`}
                  fill
                  style={{ objectFit: "contain" }}
                  loading="lazy"
                />
              </div>

              <h3 className={styles.serviceName}>{name}</h3>
              <p className={styles.serviceDescription}>{description}</p>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      <div className={styles.servicesButtonContainer}>
        <Link href="/services" className={styles.servicesViewAllButton} aria-label="View all services">
          View All Services
        </Link>
      </div>
    </section>
  );
}
