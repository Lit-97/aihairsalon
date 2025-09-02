"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useBooking } from "../BookingContext";
import "../../../styles/BookingsPage.css";

const servicePrices: Record<string, Record<string, string>> = {
    Cuts: { "Women's Cut": "$50+", "Men's Cut": "$35+", "Kids' Cut (12 & under)": "$25+", Trim: "$20+" },
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

export default function ReviewPage() {
    const router = useRouter();
    const { selectedCategory, selectedService, selectedDate, selectedTime, clientInfo } = useBooking();
    const [isClient, setIsClient] = useState(false);

    // Ensure code only runs on the client
    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!selectedCategory || !selectedService || !selectedDate || !selectedTime || !clientInfo) {
        if (isClient) router.push("/bookings");
        return null;
    }

    if (!isClient) return null;

    const totalPrice = servicePrices[selectedCategory.name][selectedService.name];

    return (
        <div className="booking-container">
            <div className="booking-sparkle" />
            <h1 className="booking-title shimmer-text">Book Your Appointment</h1>
            <p className="booking-subtitle">Please review your appointment details before confirming.</p>

            <div className="review-container mt-8 max-w-md mx-auto bg-gradient-to-br from-white via-gray-50 to-white p-8 rounded-2xl shadow-2xl border border-gray-200 space-y-6">
                <div className="review-section border-b border-gray-300 pb-4">
                    <h3 className="text-xl font-semibold text-gold mb-2">Service</h3>
                    <p className="mb-1"><span className="gold-text">{selectedService.name}</span></p>
                </div>

                <div className="review-section border-b border-gray-300 pb-4 pt-4">
                    <h3 className="text-xl font-semibold text-gold mb-2">Date & Time</h3>
                    <p>
                        <span className="gold-text">{selectedDate.toDateString()}</span> at{" "}
                        <span className="gold-text">{selectedTime}</span>
                    </p>
                </div>

                <div className="review-section border-b border-gray-300 pb-4 pt-4">
                    <h3 className="text-xl font-semibold text-gold mb-2">Your Information</h3>
                    <p className="text-gray-700">
                        <strong>Name:</strong> {clientInfo.fullName} <br />
                        <strong>Phone:</strong> {clientInfo.phone} <br />
                        <strong>Email:</strong> {clientInfo.email} <br />
                        <strong>Preferred Contact:</strong> {clientInfo.contactMethod} <br />
                    </p>
                </div>

                {clientInfo.hairPreferences?.length > 0 && (
                    <div className="review-section border-b border-gray-300 pb-4 pt-4">
                        <h3 className="text-xl font-semibold text-gold mb-2">Hair & Preferences</h3>
                        <ul className="list-disc pl-5 text-gray-700">
                            {clientInfo.hairPreferences.map((pref, idx) => (
                                <li key={idx}>{pref}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {clientInfo.addOns?.length > 0 && (
                    <div className="review-section pt-4">
                        <h3 className="text-xl font-semibold text-gold mb-2">Add-ons</h3>
                        <ul className="list-disc pl-5 text-gray-700">
                            {clientInfo.addOns.map((addon, idx) => (
                                <li key={idx}>{addon}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className="review-section pt-4 border-t border-gray-300">
                    <h3 className="text-xl font-semibold text-gold mb-2">Total Price</h3>
                    <p className="text-gray-800 font-bold text-lg">{totalPrice}</p>
                </div>

                <div className="flex justify-center mt-6">
                    <button
                        className="booking-button px-10 py-3 text-lg font-semibold hover:shadow-md transition"
                        onClick={() => {
                            alert("Appointment Confirmed!");
                            router.push("/");
                        }}
                    >
                        Confirm Booking
                    </button>
                </div>
            </div>
        </div>
    );
}
