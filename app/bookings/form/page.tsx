"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useBooking, ClientInfo } from "../BookingContext";
import "../../../styles/BookingsPage.css";

export default function BookingFormPage() {
    const router = useRouter();
    const {
        selectedCategory,
        selectedService,
        selectedDate,
        selectedTime,
        setClientInfo,
    } = useBooking();

    // ✅ All hooks declared at the top level
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [contactMethod, setContactMethod] = useState("");
    const [hairPrefs, setHairPrefs] = useState<string[]>([]);
    const [addOns, setAddOns] = useState<string[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!selectedCategory || !selectedService || !selectedDate || !selectedTime) {
            router.push("/bookings");
        }
    }, [selectedCategory, selectedService, selectedDate, selectedTime, router]);

    // Conditional render after hooks
    if (!selectedCategory || !selectedService || !selectedDate || !selectedTime) {
        return null;
    }

    const toggleHairPref = (pref: string) => {
        setHairPrefs((prev) =>
            prev.includes(pref) ? prev.filter((p) => p !== pref) : [...prev, pref]
        );
    };

    const toggleAddOn = (addon: string) => {
        setAddOns((prev) =>
            prev.includes(addon) ? prev.filter((a) => a !== addon) : [...prev, addon]
        );
    };

    const isFormValid = () => {
        return (
            fullName.trim() &&
            phone.trim() &&
            email.trim() &&
            contactMethod &&
            hairPrefs.length > 0
        );
    };

    const handleReviewClick = () => {
        if (!isFormValid()) {
            setError(
                "Please fill out all required fields and select at least one Hair Type / Condition."
            );
            return;
        }

        setError("");

        const clientInfo: ClientInfo = {
            fullName,
            phone,
            email,
            contactMethod,
            hairPreferences: hairPrefs,
            addOns,
        };
        setClientInfo(clientInfo);

        router.push("/bookings/review");
    };

    const getSubtitleText = () => (
        <>
            Almost done! Please provide your details for{" "}
            <span className="gold-text">{selectedService.name}</span> on{" "}
            <span className="gold-text">{selectedDate.toDateString()}</span> at{" "}
            <span className="gold-text">{selectedTime}</span>.
        </>
    );

    return (
        <div className="booking-container">
            <div className="booking-sparkle" />
            <h1 className="booking-title shimmer-text">Book Your Appointment</h1>
            <p className="booking-subtitle">{getSubtitleText()}</p>

            <div className="booking-form mt-8 max-w-lg mx-auto bg-gradient-to-br from-white via-gray-50 to-white p-8 rounded-2xl shadow-2xl border border-gray-200">
                <h2 className="text-2xl font-serif font-bold mb-6 text-gray-800 text-center">
                    Your Information
                </h2>

                <form className="space-y-5">
                    {/* Client Information */}
                    <div className="space-y-3">
                        <label className="block text-gray-700 font-medium">
                            Full Name:
                            <input
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="input-field mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:ring-2 focus:ring-gold focus:border-gold transition"
                                required
                            />
                        </label>

                        <label className="block text-gray-700 font-medium">
                            Phone Number:
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (/^[0-9+\-\s()]*$/.test(value)) {
                                        setPhone(value);
                                    }
                                }}
                                pattern="[0-9+\-\s()]{7,}"
                                placeholder="e.g., 123-456-7890"
                                className="input-field mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:ring-2 focus:ring-gold focus:border-gold transition"
                                required
                            />
                        </label>

                        <label className="block text-gray-700 font-medium">
                            Email Address:
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="input-field mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:ring-2 focus:ring-gold focus:border-gold transition"
                                required
                            />
                        </label>

                        <label className="block text-gray-700 font-medium">
                            Preferred Contact Method:
                            <select
                                value={contactMethod}
                                onChange={(e) => setContactMethod(e.target.value)}
                                className="input-field mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:ring-2 focus:ring-gold focus:border-gold transition"
                            >
                                <option value="">Select</option>
                                <option value="phone">Phone Call</option>
                                <option value="text">Text Message</option>
                                <option value="email">Email</option>
                            </select>
                        </label>
                    </div>

                    {/* Add-ons */}
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-gray-800">Add-ons (optional)</h3>
                        <div className="flex flex-col gap-2 text-gray-700">
                            {["Scalp Massage", "Deep Conditioning", "Hot Oil Treatment"].map(
                                (addon) => (
                                    <label key={addon} className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            className="h-4 w-4 accent-gold"
                                            checked={addOns.includes(addon)}
                                            onChange={() => toggleAddOn(addon)}
                                        />
                                        {addon}
                                    </label>
                                )
                            )}
                        </div>
                    </div>

                    {/* Hair Preferences */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold text-gray-800">Hair & Preferences</h3>
                        <p className="font-semibold text-gray-700">Hair Type / Condition:</p>
                        <div className="flex flex-col gap-2 text-gray-700">
                            {["Curly", "Straight", "Color-treated"].map((pref) => (
                                <label key={pref} className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        className="h-4 w-4 accent-gold"
                                        checked={hairPrefs.includes(pref)}
                                        onChange={() => toggleHairPref(pref)}
                                    />
                                    {pref}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Review Button */}
                    <button
                        type="button"
                        className="review-button bg-gold text-white px-4 py-2 rounded-lg font-semibold hover:shadow-md transition"
                        onClick={handleReviewClick}
                    >
                        Review
                    </button>

                    {/* Error Pop-up */}
                    {error && (
                        <p className="text-red-500 mt-3 text-center font-semibold">{error}</p>
                    )}
                </form>
            </div>
        </div>
    );
}
