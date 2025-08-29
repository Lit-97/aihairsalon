
// "use client";

// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
// import "../../styles/BookingsPage.css";

// type Service = { name: string };
// type Category = { name: string; services: Service[] };

// const categories: Category[] = [
//   {
//     name: "Cuts",
//     services: [
//       { name: "Women's Cut" },
//       { name: "Men's Cut" },
//       { name: "Kids' Cut (12 & under)" },
//       { name: "Trim" },
//     ],
//   },
//   {
//     name: "Styling",
//     services: [
//       { name: "Silk Press" },
//       { name: "Blowout" },
//       { name: "Loc Maintenance (Retwist)" },
//       { name: "Blow Dry & Style" },
//       { name: "Updo / Formal Styling" },
//       { name: "Protective Styling (Twists, Braids, etc.)" },
//       { name: "Custom Wig Install" },
//       { name: "Bridal Trial" },
//       { name: "Wedding Day Hair" },
//     ],
//   },
//   {
//     name: "Coloring",
//     services: [
//       { name: "Root Touch-Up" },
//       { name: "Full Color" },
//       { name: "Highlights / Lowlights" },
//       { name: "Balayage / Ombre" },
//       { name: "Gloss / Toner" },
//     ]
//   },
//   {
//     name: "Treatments",
//     services: [
//       { name: "Deep Conditioning" },
//       { name: "Scalp Treatment" },
//       { name: "Olaplex Repair Treatment" },
//       { name: "Deep Moisture or Protein Treatment" },
//       { name: "Hot Oil Treatment" },
//       { name: "Moisturizing & Hydration Treatment" },
//       { name: "Keratin Smoothing" },
//       { name: "Brazilian Blowout" },
//       { name: "Relaxer Touch-Up" },
//     ]
//   },
//   {
//     name: "Extensions & Add-Ons",
//     services: [
//       { name: "Sew-In Weave (Leave Out)" },
//       { name: "Sew-In Weave (Closure/Frontal)" },
//       { name: "Quick Weave" },
//       { name: "Tape-In Extensions" },
//       { name: "Microlink Extensions" },
//       { name: "Extension Removal" },
//     ]
//   },
//   {
//     name: "Kids' Services",
//     services: [
//       { name: "Kids' Silk Press" },
//       { name: "Kids' Natural Styles (Braids, Twists, etc.)" },
//       { name: "Kids' Blowout" },
//       { name: "Kids' Protective Styling (Braids, Twists, etc.)" },
//     ]
//   },
// ];

// const cardVariants = {
//   hidden: { opacity: 0, y: 25 },
//   visible: { opacity: 1, y: 0 },
//   hover: {
//     scale: 1.07,
//     boxShadow: "0 0 20px rgba(212, 175, 55, 0.4)",
//   },
// };

// const exampleTimes = ["10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM"];

// export default function BookingsPage() {
//   const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
//   const [selectedService, setSelectedService] = useState<Service | null>(null);
//   const [selectedDate, setSelectedDate] = useState<Date | null>(null);
//   const [selectedTime, setSelectedTime] = useState<string | null>(null);
//   const [hydrated, setHydrated] = useState(false);
//   const [showBookingForm, setShowBookingForm] = useState(false);
//   const [showReviewPage, setShowReviewPage] = useState(false);
//   const [showConformationPage, setShowConformationPage] = useState(false);

//   useEffect(() => {
//     const catName = localStorage.getItem("selectedCategory");
//     const svcName = localStorage.getItem("selectedService");
//     const dt = localStorage.getItem("selectedDate");
//     const tm = localStorage.getItem("selectedTime");
//     const showForm = localStorage.getItem("showBookingForm");

//     if (catName) {
//       const cat = categories.find((c) => c.name === catName);
//       if (cat) setSelectedCategory(cat);
//     }

//     if (svcName) setSelectedService({ name: svcName });
//     if (dt) setSelectedDate(new Date(dt));
//     if (tm) setSelectedTime(tm);

//     // Only show the booking form if all steps are selected
//     if (svcName && dt && tm && showForm === "true") {
//       setShowBookingForm(true);
//     } else {
//       setShowBookingForm(false); // Start at Category section
//     }

//     setHydrated(true);
//   }, []);


//   useEffect(() => {
//     if (!hydrated) return;

//     if (selectedCategory) localStorage.setItem("selectedCategory", selectedCategory.name);
//     else localStorage.removeItem("selectedCategory");

//     if (selectedService) localStorage.setItem("selectedService", selectedService.name);
//     else localStorage.removeItem("selectedService");

//     if (selectedDate) localStorage.setItem("selectedDate", selectedDate.toISOString());
//     else localStorage.removeItem("selectedDate");

//     if (selectedTime) localStorage.setItem("selectedTime", selectedTime);
//     else localStorage.removeItem("selectedTime");

//     localStorage.setItem("showBookingForm", String(showBookingForm));
//     localStorage.setItem("showReviewPage", String(showReviewPage));
//   }, [selectedCategory, selectedService, selectedDate, selectedTime, showBookingForm, showReviewPage, hydrated]);

//   const handleCategoryClick = (category: Category) => {
//     setSelectedCategory(category);
//     setSelectedService(null);
//     setSelectedDate(null);
//     setSelectedTime(null);
//     setShowBookingForm(false);
//   };

//   const handleServiceClick = (service: Service) => {
//     setSelectedService(service);
//     setSelectedDate(null);
//     setSelectedTime(null);
//     setShowBookingForm(false);
//   };

//   const handleBack = () => {
//     if (showReviewPage) {
//       setShowReviewPage(false);
//       setShowBookingForm(true);
//     } else if (showBookingForm) {
//       setShowBookingForm(false);
//       localStorage.setItem("showBookingForm", "false");
//     } else if (selectedTime) {
//       setSelectedTime(null);
//     } else if (selectedDate) {
//       setSelectedDate(null);
//     } else if (selectedService) {
//       setSelectedService(null);
//     } else if (selectedCategory) {
//       setSelectedCategory(null);
//     }
//   };

  

//   const getSubtitleText = () => {
//     // Show booking form subtitle when everything is selected
//     if (showBookingForm && selectedService && selectedDate && selectedTime) {
//       return (
//         <>
//           Almost done! Please provide your details for the{" "}
//           <span className="gold-text">{selectedService.name}</span> on{" "}
//           <span className="gold-text">{selectedDate.toDateString()}</span> at{" "}
//           <span className="gold-text">{selectedTime}</span>.
//         </>
//       );
//     }

//     // Show service selection subtitle
//     if (selectedCategory && !selectedService) {
//       return (
//         <>
//           Select a service for your{" "}
//           <span className="gold-text">{selectedCategory.name}</span>.
//         </>
//       );
//     }

//     // Show date selection subtitle
//     if (selectedService && !selectedDate) {
//       return (
//         <>
//           Select a date for{" "}
//           <span className="gold-text">{selectedService.name}</span>.
//         </>
//       );
//     }

//     // Show time selection subtitle
//     if (selectedDate) {
//       return (
//         <>
//           Select a time for{" "}
//           <span className="gold-text">{selectedService!.name}</span> on{" "}
//           <span className="gold-text">{selectedDate.toDateString()}</span>
//           {selectedTime && <><span className="gold-text"> at {selectedTime}</span></>}
//           .
//         </>
//       );
//     }
//     return "";
//   };


//   if (!hydrated) return <div className="booking-container">Loading booking options…</div>;

//   return (
//     <div className="booking-container">
//       <div className="booking-sparkle" />
//       <h1 className="booking-title shimmer-text">Book Your Appointment</h1>
//       <p className="booking-subtitle">{getSubtitleText()}</p>

//       {(selectedCategory || selectedService || selectedDate || selectedTime || showBookingForm || showReviewPage) && (
//         <button className="back-button" onClick={handleBack}>← Back</button>
//       )}

//       {/* Category Selection */}
//       {!selectedCategory && (
//         <motion.div
//           className="services-container max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 px-6"
//           initial="hidden"
//           animate="visible"
//           variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
//         >
//           {categories.map((cat) => (
//             <motion.div
//               key={cat.name}
//               className="service-card category-card"
//               variants={cardVariants}
//               whileHover="hover"
//               transition={{ type: "spring", stiffness: 300, damping: 20 }}
//               role="button"
//               tabIndex={0}
//               aria-label={`Category: ${cat.name}`}
//               onClick={() => handleCategoryClick(cat)}
//               onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleCategoryClick(cat); }}
//             >
//               <div className="category-image">
//                 <img src={`/images/categories/${cat.name}.jpg`} alt={cat.name} className="service-icon-img" />
//               </div>
//               <h3 className="service-name">{cat.name}</h3>
//               <p className="service-description">{cat.services.length} services available</p>
//             </motion.div>
//           ))}
//         </motion.div>
//       )}

//       {/* Service Selection */}
//       {selectedCategory && !selectedService && (
//         <div className="service-list">
//           {selectedCategory.services.map((service) => (
//             <div key={service.name} className="service-item" onClick={() => handleServiceClick(service)}>
//               {service.name}
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Calendar & Time Picker */}
//       {selectedService && !showBookingForm && !showReviewPage && (
//         <div className="calendar-time-container flex flex-col sm:flex-row justify-center gap-0 mx-auto max-w-2xl rounded-xl overflow-hidden shadow-lg border">
//           {/* Calendar */}
//           <div className="calendar-wrapper bg-white p-4 flex-1">
//             <Calendar
//               onChange={(value) => {
//                 if (value instanceof Date) {
//                   setSelectedDate(value);
//                   setSelectedTime(null);
//                 }
//               }}
//               value={selectedDate}
//               calendarType="iso8601"
//               locale="en-US"
//               className="rounded-lg"
//             />
//           </div>

//           {/* Divider */}
//           <div className="divider w-full sm:w-px bg-gray-200"></div>

//           {/* Times */}
//           <div className="time-selection bg-white p-4 flex-1 flex flex-col">
//             <h4 className="text-center font-semibold mb-2">Select a Time</h4>

//             {selectedDate?.getDay() === 0 ? (
//               <p className="text-center text-red-700 font-bold mt-4">CLOSED</p>
//             ) : exampleTimes.length > 0 ? (
//               <div className="flex flex-col gap-2 mt-2">
//                 {exampleTimes.map((time) => (
//                   <button
//                     key={time}
//                     onClick={() => setSelectedTime(time)}
//                     className={`time-slot px-3 py-1 rounded-lg text-center border transition-colors duration-200
//             ${selectedTime === time
//                         ? "selected bg-gold text-white border-gold"
//                         : "bg-gray-50 hover:bg-gray-100 border-gray-200"
//                       }`}
//                   >
//                     {time}
//                   </button>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-gray-500 text-center mt-2">No times available for this date.</p>
//             )}

//             {/* Book Now Button */}
//             {selectedTime && selectedDate && !showBookingForm && (
//               <div className="flex justify-center mt-4">
//                 <button
//                   onClick={() => setShowBookingForm(true)}
//                   className="booking-button bg-gold text-white px-4 py-2 rounded-lg font-semibold hover:shadow-md transition"
//                 >
//                   Book Now
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Booking Form */}
//       {showBookingForm && !showReviewPage && (
//         <div className="booking-form mt-8 max-w-lg mx-auto bg-gradient-to-br from-white via-gray-50 to-white p-8 rounded-2xl shadow-2xl border border-gray-200">
//           <h2 className="text-2xl font-serif font-bold mb-6 text-gray-800 text-center">
//             Your Information
//           </h2>
//           <form className="space-y-5">

//             {/* Client Information */}
//             <div className="space-y-3">
//               <label className="block text-gray-700 font-medium">
//                 Full Name:
//                 <input type="text" className="input-field mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:ring-2 focus:ring-gold focus:border-gold transition" required />
//               </label>
//               <label className="block text-gray-700 font-medium">
//                 Phone Number:
//                 <input type="tel" className="input-field mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:ring-2 focus:ring-gold focus:border-gold transition" required />
//               </label>
//               <label className="block text-gray-700 font-medium">
//                 Email Address:
//                 <input type="email" className="input-field mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:ring-2 focus:ring-gold focus:border-gold transition" />
//               </label>
//               <label className="block text-gray-700 font-medium">
//                 Preferred Contact Method:
//                 <select className="input-field mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:ring-2 focus:ring-gold focus:border-gold transition">
//                   <option value="phone">Phone Call</option>
//                   <option value="text">Text Message</option>
//                   <option value="email">Email</option>
//                 </select>
//               </label>
//             </div>

//             {/* Service Add-ons */}
//             <div className="space-y-2">
//               <h3 className="text-lg font-semibold text-gray-800">Add-ons (optional)</h3>
//               <div className="flex flex-col gap-2 text-gray-700">
//                 <label className="flex items-center gap-2">
//                   <input type="checkbox" className="h-4 w-4 accent-gold" />
//                   Scalp Massage
//                 </label>
//                 <label className="flex items-center gap-2">
//                   <input type="checkbox" className="h-4 w-4 accent-gold" />
//                   Deep Conditioning
//                 </label>
//                 <label className="flex items-center gap-2">
//                   <input type="checkbox" className="h-4 w-4 accent-gold" />
//                   Hot Oil Treatment
//                 </label>
//               </div>
//             </div>

//             {/* Hair & Preferences */}
//             <div className="space-y-3">
//               <h3 className="text-lg font-semibold text-gray-800">Hair & Preferences</h3>

//               <p className="font-semibold text-gray-700">Hair Type / Condition:</p>
//               <div className="flex flex-col gap-2 text-gray-700">
//                 <label className="flex items-center gap-2">
//                   <input type="checkbox" className="h-4 w-4 accent-gold" />
//                   Curly
//                 </label>
//                 <label className="flex items-center gap-2">
//                   <input type="checkbox" className="h-4 w-4 accent-gold" />
//                   Straight
//                 </label>
//                 <label className="flex items-center gap-2">
//                   <input type="checkbox" className="h-4 w-4 accent-gold" />
//                   Color-treated
//                 </label>
//               </div>

//               <p className="font-semibold text-gray-700">Allergies / Sensitivities:</p>
//               <div className="flex flex-col gap-2 text-gray-700">
//                 <label className="flex items-center gap-2">
//                   <input type="checkbox" className="h-4 w-4 accent-gold" />
//                   Chemical Sensitivity
//                 </label>
//                 <label className="flex items-center gap-2">
//                   <input type="checkbox" className="h-4 w-4 accent-gold" />
//                   Fragrance Allergy
//                 </label>
//                 <label className="flex items-center gap-2">
//                   <input type="checkbox" className="h-4 w-4 accent-gold" />
//                   Other
//                 </label>
//               </div>

//               <label className="block text-gray-700 font-medium">
//                 Special Requests:
//                 <textarea
//                   className="input-field mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:ring-2 focus:ring-gold focus:border-gold transition"
//                   rows={3}
//                   placeholder="E.g., Bring my own extensions, wedding updo, etc."
//                 />
//               </label>
//             </div>

//             <button
//               type="button"
//               className="review-button"
//               onClick={() => {
//                 setShowBookingForm(false);
//                 setShowReviewPage(true);
//               }}
//             >
//               Review
//             </button>
//           </form>
//         </div>
//       )}

//       {/* Review Page */}
//       {showReviewPage && (
//         <div className="review-container mt-8 max-w-lg mx-auto bg-white p-8 rounded-2xl shadow-2xl border border-gray-200">
//           <h2 className="review-title shimmer-text text-2xl font-serif font-bold mb-6 text-center text-gray-800">
//             Review Your Appointment
//           </h2>

//           <p><strong>Category:</strong> {selectedCategory?.name}</p>
//           <p><strong>Service:</strong> {selectedService?.name}</p>
//           <p><strong>Date:</strong> {selectedDate?.toDateString()}</p>
//           <p><strong>Time:</strong> {selectedTime}</p>

//           <div className="flex justify-center gap-4 mt-6">
//             <button
//               className="review-button"
//               onClick={() => alert("Proceeding to confirmation/payment")}
//             >
//               Confirm Appointment
//             </button>
//             <button
//               className="back-button"
//               onClick={() => {
//                 setShowReviewPage(false);
//                 setShowBookingForm(true);
//               }}
//             >
//               ← Edit
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }