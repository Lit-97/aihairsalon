"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useBooking } from "./BookingContext";
import "../../styles/BookingsPageWrapper.css";

// Category and Service types
type Service = { name: string };
type Category = { name: string; services: Service[] };

// Categories data
const categories: Category[] = [
    {
        name: "Cuts",
        services: [
            { name: "Women's Cut" },
            { name: "Men's Cut" },
            { name: "Kids' Cut (12 & under)" },
            { name: "Trim" },
        ],
    },
    {
        name: "Styling",
        services: [
            { name: "Silk Press" },
            { name: "Blowout" },
            { name: "Loc Maintenance (Retwist)" },
            { name: "Blow Dry & Style" },
            { name: "Updo / Formal Styling" },
            { name: "Protective Styling (Twists, Braids, etc.)" },
            { name: "Custom Wig Install" },
            { name: "Bridal Trial" },
            { name: "Wedding Day Hair" },
        ],
    },
    {
        name: "Coloring",
        services: [
            { name: "Root Touch-Up" },
            { name: "Full Color" },
            { name: "Highlights / Lowlights" },
            { name: "Balayage / Ombre" },
            { name: "Gloss / Toner" },
        ],
    },
    {
        name: "Treatments",
        services: [
            { name: "Deep Conditioning" },
            { name: "Scalp Treatment" },
            { name: "Olaplex Repair Treatment" },
            { name: "Deep Moisture or Protein Treatment" },
            { name: "Hot Oil Treatment" },
            { name: "Moisturizing & Hydration Treatment" },
            { name: "Keratin Smoothing" },
            { name: "Brazilian Blowout" },
            { name: "Relaxer Touch-Up" },
        ],
    },
    {
        name: "Extensions & Add-Ons",
        services: [
            { name: "Sew-In Weave (Leave Out)" },
            { name: "Sew-In Weave (Closure/Frontal)" },
            { name: "Quick Weave" },
            { name: "Tape-In Extensions" },
            { name: "Microlink Extensions" },
            { name: "Extension Removal" },
        ],
    },
    {
        name: "Kids' Services",
        services: [
            { name: "Kids' Silk Press" },
            { name: "Kids' Natural Styles (Braids, Twists, etc.)" },
            { name: "Kids' Blowout" },
            { name: "Kids' Protective Styling (Braids, Twists, etc.)" },
        ],
    },
];

// Mapping category names to image paths
const categoryImages: Record<string, string> = {
    "Cuts": "/haircut.jpg",
    "Styling": "/style.webp",
    "Coloring": "coloring.webp",
    "Treatments": "treatment.webp",
    "Extensions & Add-Ons": "/exten.webp",
    "Kids' Services": "/child.jpg",
};

// Animation variants
const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0 },
    hover: {
        scale: 1.07,
        boxShadow: "0 0 20px rgba(212, 175, 55, 0.4)",
    },
};

export default function BookingsPage() {
    const { setSelectedCategory } = useBooking();
    const router = useRouter();
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setHydrated(true);
        document.body.style.minHeight = `${window.innerHeight}px`;
    }, []);

    const handleCategoryClick = (category: Category) => {
        setSelectedCategory(category);
        router.push("/bookings/service-selection");
    };

    if (!hydrated)
        return <div className="booking-container">Loading booking options…</div>;

    return (
        <div className="BookingPageWrapper">
            <div className="booking-container">
                <h1 className="booking-title shimmer-text">
                    Book Your Appointment
                </h1>
                <p className="booking-subtitle">
                    Select a service category to get started.
                </p>

                <motion.div
                    className="services-container max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 px-6"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.15 } },
                    }}
                >
                    {categories.map((cat) => (
                        <motion.div
                            key={cat.name}
                            className="service-card category-card"
                            variants={cardVariants}
                            whileHover="hover"
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            role="button"
                            tabIndex={0}
                            aria-label={`Category: ${cat.name}`}
                            onClick={() => handleCategoryClick(cat)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") handleCategoryClick(cat);
                            }}
                        >
                            <div className="category-image">
                                <img
                                    src={categoryImages[cat.name] || "/images/categories/default.jpg"}
                                    alt={cat.name}
                                    className="service-icon-img"
                                />
                            </div>
                            <h3 className="service-name">{cat.name}</h3>
                            <p className="service-description">
                                {cat.services.length} services available
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
