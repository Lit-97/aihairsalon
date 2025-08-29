"use client";

import Hero from "@/components/Hero";
import Services from "@/components/Services";
import BookingCalendar from "@/components/BookingCalendar";
import FeaturedProducts from "@/components/FeaturedProducts";
import ToolsEquipment from "@/components/ToolsEquipment";
import LuxeColorCollections from "@/components/LuxeColorCollections";

export default function HomePage() {
  return (
    <main className="flex flex-col">
      {/* Page Sections */}
      <Hero />
      <Services />
      <FeaturedProducts />
      <ToolsEquipment />
      <LuxeColorCollections />
      <BookingCalendar />
    </main>
  );
}
