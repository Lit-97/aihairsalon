"use client";

import { ReactNode } from "react";
import { BookingProvider } from "./BookingContext";
import "../../styles/BookingsPage.css";

export default function BookingsLayout({ children }: { children: ReactNode }) {
    return <BookingProvider>{children}</BookingProvider>;
}
