"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define types
export type Service = { name: string };
export type Category = { name: string; services: Service[] };

export type ClientInfo = {
    fullName: string;
    phone: string;
    email: string;
    contactMethod: string;
    hairPreferences: string[];
    addOns: string[];
};

type BookingContextType = {
    categories: Category[];
    selectedCategory: Category | null;
    setSelectedCategory: (cat: Category | null) => void;
    selectedService: Service | null;
    setSelectedService: (svc: Service | null) => void;
    selectedDate: Date | null;
    setSelectedDate: (date: Date | null) => void;
    selectedTime: string | null;
    setSelectedTime: (time: string | null) => void;

    clientInfo: ClientInfo | null;
    setClientInfo: (info: ClientInfo | null) => void;

    resetBooking: () => void;
};

// Create context
const BookingContext = createContext<BookingContextType | undefined>(undefined);

// Provider component
export const BookingProvider = ({ children }: { children: ReactNode }) => {
    // Hardcoded categories and services
    const categories: Category[] = [
        { name: "Cuts", services: [{ name: "Women's Cut" }, { name: "Men's Cut" }] },
        { name: "Coloring", services: [{ name: "Full Color" }, { name: "Highlights" }] },
        { name: "Styling", services: [{ name: "Blowout" }, { name: "Updo" }] },
    ];

    // State for selections
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);

    // State for client info
    const [clientInfo, setClientInfo] = useState<ClientInfo | null>(null);

    // Reset all booking state
    const resetBooking = () => {
        setSelectedCategory(null);
        setSelectedService(null);
        setSelectedDate(null);
        setSelectedTime(null);
        setClientInfo(null);
        localStorage.removeItem("bookingState");
    };

    // Load state from localStorage on first render
    useEffect(() => {
        const saved = localStorage.getItem("bookingState");
        if (saved) {
            try {
                const parsed = JSON.parse(saved);

                setSelectedCategory(parsed.selectedCategory || null);
                setSelectedService(parsed.selectedService || null);
                setSelectedDate(parsed.selectedDate ? new Date(parsed.selectedDate) : null);
                setSelectedTime(parsed.selectedTime || null);
                setClientInfo(parsed.clientInfo || null);
            } catch (err) {
                console.error("Failed to parse bookingState:", err);
                localStorage.removeItem("bookingState");
            }
        }
    }, []);

    // Persist state changes to localStorage
    useEffect(() => {
        const state = {
            selectedCategory,
            selectedService,
            selectedDate,
            selectedTime,
            clientInfo,
        };
        localStorage.setItem("bookingState", JSON.stringify(state));
    }, [selectedCategory, selectedService, selectedDate, selectedTime, clientInfo]);

    return (
        <BookingContext.Provider
            value={{
                categories,
                selectedCategory,
                setSelectedCategory,
                selectedService,
                setSelectedService,
                selectedDate,
                setSelectedDate,
                selectedTime,
                setSelectedTime,
                clientInfo,
                setClientInfo,
                resetBooking,
            }}
        >
            {children}
        </BookingContext.Provider>
    );
};

export const useBooking = () => {
    const context = useContext(BookingContext);
    if (!context) throw new Error("useBooking must be used within BookingProvider");
    return context;
};
