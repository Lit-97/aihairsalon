"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useBooking } from "../BookingContext";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../../styles/BookingsPage.css";

export default function SchedulePage() {
    const router = useRouter();
    const {
        selectedCategory,
        selectedService,
        selectedDate,
        setSelectedDate,
        selectedTime,
        setSelectedTime,
    } = useBooking();

    const [exampleTimes] = useState<string[]>([
        "9:00 AM",
        "11:00 AM",
        "12:00 PM",
        "3:00 PM",
        "4:00 PM",
    ]);

    // Redirect back if no service selected
    useEffect(() => {
        if (!selectedCategory || !selectedService) {
            router.push("/bookings");
        }
    }, [selectedCategory, selectedService, router]);

    if (!selectedCategory || !selectedService) return null;

    const getSubtitleText = () => {
        if (selectedService && selectedDate && selectedTime) {
            return (
                <>
                    Almost done! Please provide your details for{" "}
                    <span className="gold-text">{selectedService.name}</span> on{" "}
                    <span className="gold-text">{selectedDate.toDateString()}</span> at{" "}
                    <span className="gold-text">{selectedTime}</span>.
                </>
            );
        }

        if (selectedService && !selectedDate) {
            return (
                <>
                    Select a date for <span className="gold-text">{selectedService.name}</span>.
                </>
            );
        }

        if (selectedDate) {
            return (
                <>
                    Select a time for <span className="gold-text">{selectedService.name}</span> on{" "}
                    <span className="gold-text">{selectedDate.toDateString()}</span>
                    {selectedTime && <span className="gold-text"> at {selectedTime}</span>}.
                </>
            );
        }

        return "";
    };

    return (
        <div className="booking-container">
            <div className="booking-sparkle" />
            <h1 className="booking-title shimmer-text">Book Your Appointment</h1>
            <p className="booking-subtitle">{getSubtitleText()}</p>

            {/* Calendar & Time Picker */}
            <div className="calendar-time-container flex flex-col sm:flex-row justify-center gap-0 mx-auto max-w-2xl rounded-xl overflow-hidden shadow-lg border">
                {/* Calendar */}
                <div className="calendar-wrapper bg-white p-4 flex-1">
                    <Calendar
                        onChange={(value) => {
                            if (value instanceof Date) {
                                setSelectedDate(value);
                                setSelectedTime(null);
                            }
                        }}
                        value={selectedDate || new Date()}
                        calendarType="iso8601"
                        locale="en-US"
                        className="rounded-lg"
                    />
                </div>

                {/* Divider */}
                <div className="divider w-full sm:w-px bg-gray-200"></div>

                {/* Time Selection */}
                <div className="time-selection bg-white p-4 flex-1 flex flex-col">
                    <h4 className="text-center font-semibold mb-2">Select a Time</h4>

                    {selectedDate?.getDay() === 0 ? (
                        <p className="text-center text-red-700 font-bold mt-4">CLOSED</p>
                    ) : exampleTimes.length > 0 ? (
                        <div className="flex flex-col gap-2 mt-2">
                            {exampleTimes.map((time) => (
                                <button
                                    key={time}
                                    onClick={() => setSelectedTime(time)}
                                    className={`time-slot px-3 py-1 rounded-lg text-center border transition-colors duration-200 ${selectedTime === time
                                            ? "selected bg-gold text-white border-gold"
                                            : "bg-gray-50 hover:bg-gray-100 border-gray-200"
                                        }`}
                                >
                                    {time}
                                </button>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center mt-2">No times available for this date.</p>
                    )}

                    {/* Next / Book Now Button */}
                    {selectedTime && selectedDate && (
                        <div className="flex justify-center mt-4">
                            <button
                                className="booking-button bg-gold text-white px-4 py-2 rounded-lg font-semibold hover:shadow-md transition"
                                onClick={() => router.push("/bookings/form")}
                            >
                                Next →
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
