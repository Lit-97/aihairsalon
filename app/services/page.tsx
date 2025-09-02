"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import "@/styles/ServicesPage.css";

const services = {
    Cuts: [
        { name: "Women's Cut", price: "$50+" },
        { name: "Men's Cut", price: "$35+" },
        { name: "Kids' Cut (12 & under)", price: "$25+" },
        { name: "Trim", price: "$20+" },
    ],
    Styling: [
        { name: "Silk Press", price: "$70+" },
        { name: "Blowout", price: "$50+" },
        { name: "Loc Maintenance (Retwist)", price: "$100+" },
        { name: "Blow Dry & Style", price: "$40+" },
        { name: "Updo / Formal Styling", price: "$75+" },
        { name: "Protective Styling (Twists, Braids, etc.)", price: "$120+" },
        { name: "Custom Wig Install", price: "$150+" },
        { name: "Bridal Trial", price: "$100+" },
        { name: "Wedding Day Hair", price: "$150+" },
    ],
    Coloring: [
        { name: "Root Touch-Up", price: "$65+" },
        { name: "Full Color", price: "$95+" },
        { name: "Highlights / Lowlights", price: "$120+" },
        { name: "Balayage / Ombre", price: "$150+" },
        { name: "Gloss / Toner", price: "$45+" },
    ],
    Treatments: [
        { name: "Deep Conditioning", price: "$30" },
        { name: "Scalp Treatment", price: "$35" },
        { name: "Olaplex Repair Treatment", price: "$55+" },
        { name: "Deep Moisture or Protein Treatment", price: "$55+" },
        { name: "Hot Oil Treatment", price: "$45+" },
        { name: "Moisturizing & Hydration Treatment", price: "$50+" },
        { name: "Keratin Smoothing", price: "$200+" },
        { name: "Brazilian Blowout", price: "$250+" },
        { name: "Relaxer Touch-Up", price: "$90+" },
    ],
    "Extensions & Add-Ons": [
        { name: "Sew-In Weave (Leave Out)", price: "$200+" },
        { name: "Sew-In Weave (Closure/Frontal)", price: "$250+" },
        { name: "Quick Weave", price: "$150+" },
        { name: "Tape-In Extensions", price: "$300+" },
        { name: "Microlink Extensions", price: "$400+" },
        { name: "Extension Removal", price: "$50+" },
    ],
    "Kids' Services": [
        { name: "Kids' Silk Press", price: "$55+" },
        { name: "Kids' Natural Styles (Braids, Twists, etc.)", price: "$75+" },
        { name: "Kids' Blowout", price: "$40+" },
        { name: "Kids' Protective Styling (Braids, Twists, etc.)", price: "$85+" },
    ],
};

export default function ServicesPage() {
    return (
        <main className="services-page min-h-screen bg-[#EFE6DD] py-16">
            <h1 className="text-center text-5xl font-serif font-bold mb-12">
                <motion.span
                    animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    style={{
                        background: "linear-gradient(90deg, #ffffff, #dcbf6a, #ffffff)",
                        backgroundSize: "200% 200%",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        display: "inline-block",
                    }}
                >
                    Our Services
                </motion.span>
            </h1>

            <div className="max-w-4xl mx-auto px-6 space-y-12">
                {Object.entries(services).map(([category, items]) => (
                    <motion.div
                        key={category}
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="service-category"
                    >
                        <h2 className="text-2xl font-semibold mb-6 border-b border-[#dcbf6a] pb-2">
                            {category}
                        </h2>
                        <ul className="space-y-4">
                            {items.map((item, index) => (
                                <motion.li
                                    key={index}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05, duration: 0.4 }}
                                    className="flex justify-between items-center border-b border-gray-300 pb-2"
                                >
                                    <Link
                                        href={`/bookings?service=${encodeURIComponent(item.name)}`}
                                        style={{ color: 'inherit', textDecoration: 'none' }}
                                        className="text-lg text-gray-800"
                                    >
                                        {item.name}
                                    </Link>
                                    <span className="text-lg font-medium text-[#b79520]">{item.price}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </div>
        </main>
    );
}
