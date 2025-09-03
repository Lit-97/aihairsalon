"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const MotionImage = motion(Image);

export default function AboutPage() {
  const gold = "#dcbf6a";

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2, duration: 0.6 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const section3Images = [
    { src: "/care.jpeg", title: "Luxury Care" },
    { src: "/goldtreat.jpg", title: "Golden Treatment" },
    { src: "/look.webp", title: "Elegant Results" },
  ];

  return (
    <main>
      {/* HERO SECTION */}
      <section className="hero-section">
        <video
          className="hero-video"
          src="/newabout.mp4"
          autoPlay
          loop
          muted
          playsInline
          controls
        />
        <div className="hero-overlay" />
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="hero-title shimmer-text"
        >
          Redefining Luxury Hair with Elegance
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="hero-subtitle"
        >
          Where innovation meets timeless beauty.
        </motion.p>
      </section>

      {/* SECTION 1 – Intro */}
      <section className="split-section bg-d9b68f">
        <motion.div
          className="split-text"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 className="about-subtitle shimmer-text" variants={itemVariants}>
            Our Mission
          </motion.h2>
          <motion.p className="about-paragraph" variants={itemVariants}>
            At Salon Luxe, every strand is treated with artistry and precision. We believe true beauty lies in timeless elegance, and our mission is to create styles that radiate confidence, sophistication, and grace.
          </motion.p>
        </motion.div>
        <MotionImage
          src="/salon.jpg"
          alt="Luxury salon interior"
          className="split-image"
          width={1200}
          height={800}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        />
      </section>

      {/* SECTION 2 – Our Values */}
      <section className="split-section bg-f8f1e7 reverse">
        <MotionImage
          src="/value.jpg"
          alt="Luxury detail"
          className="split-image"
          width={1200}
          height={800}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        />
        <motion.div
          className="split-text"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 className="about-subtitle shimmer-text" variants={itemVariants}>
            Our Values
          </motion.h2>
          <motion.ul className="about-values" variants={itemVariants}>
            <li>
              <span className="highlight">Excellence</span> — Every cut, color, and style performed with precision and artistry.
            </li>
            <li>
              <span className="highlight">Sustainability</span> — Eco-conscious products and practices for beauty with responsibility.
            </li>
            <li>
              <span className="highlight">Luxury</span> — A meticulously curated experience that delights the senses.
            </li>
          </motion.ul>
        </motion.div>
      </section>

      {/* SECTION 3 – The Luxury Promise */}
      <section className="promise-section bg-d9b68f">
        <h2 className="about-subtitle shimmer-text">The Luxury Promise</h2>
        <div className="promise-grid">
          {section3Images.map((img, index) => (
            <motion.div
              key={index}
              className="promise-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Image
                src={img.src}
                alt={img.title}
                className="promise-image"
                width={350}
                height={300}
              />
              <h3 className="promise-title">{img.title}</h3>
            </motion.div>
          ))}
        </div>
        <p className="about-paragraph promise-paragraph">
          From indulgent treatments to radiant results, our promise is that every guest leaves transformed.
        </p>
      </section>

      {/* SECTION 4 – Closing Story */}
      <section className="closing-section bg-f8f1e7">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="closing-title"
        >
          Our Story Continues With You
        </motion.h2>
        <p className="about-paragraph">
          Salon Luxe isn’t just about beauty — it’s about confidence, empowerment, and artistry.
        </p>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <Link href="/products">
            <motion.button
              className="about-button"
              whileHover={{ scale: 1.05 }}
            >
              Explore Our Collections
            </motion.button>
          </Link>
        </motion.div>
      </section>

      <style>{`
        .hero-section {
  position: relative;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
  overflow: hidden;
}
        .hero-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}
.hero-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.4);
  z-index: 1;
}
        .hero-title {
          font-size: 3rem;
          font-family: serif;
          z-index: 2;
        }
        .hero-subtitle {
          font-size: 1.3rem;
          margin-top: 1rem;
          z-index: 2;
        }
        .split-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 3rem;
          padding: 6rem 2rem;
        }
        .reverse { direction: rtl; }
        .reverse .split-text { direction: ltr; }
        .split-text { max-width: 600px; }
        .split-image {
          width: 100%;
          border-radius: 1rem;
          box-shadow: 0 8px 20px rgba(0,0,0,0.2);
        }
        .about-subtitle {
          font-size: 2rem;
          font-family: serif;
          margin-bottom: 1.5rem;
        }
        .about-values li {
          font-size: 1.2rem;
          margin: 0.5rem 0;
          color: #7b5e4a;
        }
        .promise-section {
  text-align: center;
  padding: 6rem 2rem;
}

.promise-grid {
  display: flex;
  justify-content: center;
  gap: 3rem;
  flex-wrap: wrap;
  margin: 2rem 0;
}

.promise-card {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.promise-image {
  width: 350px;
  height: 300px;
  object-fit: cover;
  border-radius: 1rem;
  box-shadow: 0 6px 15px rgba(0,0,0,0.2);
  transition: transform 0.5s ease;
}

.promise-image:hover {
  transform: translateY(-10px);
}

.promise-title {
  margin-top: 1rem;
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  background: linear-gradient(90deg, #ffffff, #f5f5f5, #eaeaea);
  background-size: 200% auto;
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
  animation: shimmerMove 6s linear infinite;
}

.promise-paragraph {
  max-width: 800px;
  margin: 0 auto;
  font-size: 1.2rem;
  color: #7b5e4a;
  line-height: 1.8;
}
        .closing-section {
          text-align: center;
          padding: 6rem 2rem;
        }
        .closing-title {
          font-family: 'Cursive', serif;
          font-size: 2.5rem;
          color: ${gold};
          margin-bottom: 2rem;
        }
        .about-paragraph {
          font-size: 1.2rem;
          color: #7b5e4a;
          line-height: 1.8;
          max-width: 800px;
          margin: 0 auto;
        }
        .about-button {
          margin-top: 2rem;
          background-color: ${gold};
          color: #1a1a1a;
          font-weight: 600;
          padding: 0.8rem 2rem;
          border-radius: 2rem;
          box-shadow: 0 4px 10px rgba(0,0,0,0.15);
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .about-button:hover {
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
        .bg-d9b68f { background-color: #d9b68f; }
        .bg-f8f1e7 { background-color: #f8f1e7; }
      `}</style>
    </main>
  );
}
