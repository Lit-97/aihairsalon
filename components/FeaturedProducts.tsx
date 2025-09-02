"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image"; // <-- import Image
import styles from "@/styles/Products.module.css";

const categories = [
  {
    id: 1,
    name: "Shampoos",
    image: "/shampoo2.png",
    description: "Cleansing & nourishing shampoos",
  },
  {
    id: 2,
    name: "Conditioners",
    image: "/concrop2.png",
    description: "Hydrating & repairing conditioners",
  },
  {
    id: 3,
    name: "Treatments",
    image: "/newtx.png",
    description: "Luxury hair treatments & serums",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0 },
  hover: {
    scale: 1.05,
    boxShadow: "0 0 18px 4px rgba(212, 175, 55, 0.5)",
    borderColor: "#d4af37",
  },
};

export default function Products() {
  return (
    <section className={styles.productsSection} aria-label="Luxury salon product categories">
      <div className={styles.productsSparkle} />

      <h2 className={`${styles.productsTitle} shimmer-text`}>
        Hair Care Essentials
      </h2>

      <motion.div
        className={styles.productsGrid}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {categories.map(({ id, name, image, description }) => (
          <motion.div
            key={id}
            variants={cardVariants}
            whileHover="hover"
          >
            <Link
              href={`/products`}
              aria-label={`Category: ${name} - ${description}`}
              className={styles.productCardLink}
            >
              <div className={styles.productCard}>
                <div className={styles.productImageContainer}>
                  <Image
                    src={image}
                    alt={`${name} category`}
                    className={styles.productImage}
                    fill
                    style={{ objectFit: "contain" }}
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                </div>
                <div className={styles.productInfo}>
                  <h3 className={styles.productName}>{name}</h3>
                  <p className={styles.productDescription}>{description}</p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      <style>{`
        .shimmer-text {
          background: linear-gradient(90deg, #ffffff, #dcbf6a, #ffffff);
          background-size: 200% auto;
          color: transparent;
          background-clip: text;
          -webkit-background-clip: text;
          animation: shimmerMove 3s linear infinite;
          text-shadow: 0 0 6px rgba(212, 175, 55, 0.5);
        }
        @keyframes shimmerMove {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </section>
  );
}
