"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useBooking } from "../BookingContext";
import "../../../styles/BookingsPage.css";

// Map of prices for each category and service
const servicePrices: Record<string, Record<string, string>> = {
    Cuts: {
        "Women's Cut": "$50+",
        "Men's Cut": "$35+",
        "Kids' Cut (12 & under)": "$25+",
        Trim: "$20+",
    },
    Styling: {
        "Silk Press": "$70+",
        Blowout: "$50+",
        "Loc Maintenance (Retwist)": "$100+",
        "Blow Dry & Style": "$40+",
        "Updo / Formal Styling": "$75+",
        "Protective Styling (Twists, Braids, etc.)": "$120+",
        "Custom Wig Install": "$150+",
        "Bridal Trial": "$100+",
        "Wedding Day Hair": "$150+",
    },
    Coloring: {
        "Root Touch-Up": "$65+",
        "Full Color": "$95+",
        "Highlights / Lowlights": "$120+",
        "Balayage / Ombre": "$150+",
        "Gloss / Toner": "$45+",
    },
    Treatments: {
        "Deep Conditioning": "$30",
        "Scalp Treatment": "$35",
        "Olaplex Repair Treatment": "$55+",
        "Deep Moisture or Protein Treatment": "$55+",
        "Hot Oil Treatment": "$45+",
        "Moisturizing & Hydration Treatment": "$50+",
        "Keratin Smoothing": "$200+",
        "Brazilian Blowout": "$250+",
        "Relaxer Touch-Up": "$90+",
    },
    "Extensions & Add-Ons": {
        "Sew-In Weave (Leave Out)": "$200+",
        "Sew-In Weave (Closure/Frontal)": "$250+",
        "Quick Weave": "$150+",
        "Tape-In Extensions": "$300+",
        "Microlink Extensions": "$400+",
        "Extension Removal": "$50+",
    },
    "Kids' Services": {
        "Kids' Silk Press": "$55+",
        "Kids' Natural Styles (Braids, Twists, etc.)": "$75+",
        "Kids' Blowout": "$40+",
        "Kids' Protective Styling (Braids, Twists, etc.)": "$85+",
    },
};

export default function ServiceSelectionPage() {
    const router = useRouter();
    const {
        selectedCategory,
        selectedService,
        setSelectedService,
    } = useBooking();

    // Redirect if no category
    useEffect(() => {
        if (!selectedCategory) {
            router.push("/bookings");
        }
    }, [selectedCategory, router]);

    useEffect(() => {
        if (selectedService) {
            setSelectedService(null);
        }
    }, []);

    if (!selectedCategory) return null;

    const handleServiceClick = (service: { name: string }) => {
        setSelectedService(service);
        router.push("/bookings/schedule");
    };

    return (
        <div className="booking-container">
            <div className="booking-sparkle" />
            <h1 className="booking-title shimmer-text">Book Your Appointment</h1>
            <p className="booking-subtitle">
                Select a service for your{" "}
                <span className="gold-text">{selectedCategory.name}</span>.
            </p>

            <div className="service-list">
                {selectedCategory.services.map((service) => (
                    <div
                        key={service.name}
                        className="service-item"
                        onClick={() => handleServiceClick(service)}
                    >
                        <span>{service.name}</span>
                        <span className="service-price">
                            {servicePrices[selectedCategory.name][service.name]}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
