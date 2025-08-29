"use client";

import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import '@/styles/profile.css';
import Link from "next/link";
import Image from "next/image";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { getAuth, sendPasswordResetEmail, reauthenticateWithCredential, updateEmail, sendEmailVerification, EmailAuthProvider } from "firebase/auth";

const US_STATES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
];

export default function ProfilePage() {
  const { user, loading, updateProfileDisplayName } = useAuth();
  const router = useRouter();

  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState("");
  const [editingEmail, setEditingEmail] = useState(false);
  const [newEmail, setNewEmail] = useState(user?.email ?? "");
  const [editingAddress, setEditingAddress] = useState(false);
  const [savedAddress, setSavedAddress] = useState({
    street: "",
    apt: "",
    city: "",
    state: "",
    zip: "",
  });
  const [address, setAddress] = useState({
    street: "",
    apt: "",
    city: "",
    state: "",
    zip: "",
  });

  const [errors, setErrors] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
  });
  const [activeTab, setActiveTab] = useState<"appointments" | "orders" | "wishlist" | "personal" | "security" | "support">("appointments");

  const uid = user?.uid;
  const displayName = user?.displayName ?? null;
  const email = user?.email ?? null;
  const photoURL = user?.photoURL ?? null;
  const providerData = Array.isArray(user?.providerData) ? (user!.providerData as any[]) : [];

  const memberSince = user?.metadata?.creationTime ?? null;
  const lastLogin = user?.metadata?.lastSignInTime ?? null;

  const isGuest = !!user?.isAnonymous;
  const isGoogle = providerData.some((p) => p?.providerId === "google.com");
  const isEmail = providerData.some((p) => p?.providerId === "password");

  const [loadingData, setLoadingData] = useState(true);
  const [appointments, setAppointments] = useState<{ id: string; date?: string; serviceName?: string }[]>([]);
  const [orders, setOrders] = useState<{ id: string; status?: string; total?: number }[]>([]);
  const [wishlist, setWishlist] = useState<{ id: string; productName?: string; description?: string; imageUrl?: string }[]>([]);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/signin");
    }
  }, [loading, user, router]);

  useEffect(() => {
    setNewName(displayName ?? "");
    setNewEmail(email ?? "");
  }, [displayName, email]);

  useEffect(() => {
    if (!uid) return;
    let mounted = true;

    (async () => {
      try {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        if (!mounted) return;
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data && data.address && typeof data.address === "object") {
            const fetchedAddress = {
              street: (data.address.street ?? "") as string,
              apt: (data.address.apt ?? "") as string,
              city: (data.address.city ?? "") as string,
              state: (data.address.state ?? "") as string,
              zip: (data.address.zip ?? "") as string,
            };
            setSavedAddress(fetchedAddress);
            setAddress(fetchedAddress);
          }
        }
      } catch (e) {
        console.error("Failed to fetch address", e);
      }
    })();

    (async () => {
      setLoadingData(true);
      try {
        const fetchedAppointments: typeof appointments = [];
        const fetchedOrders: typeof orders = [];
        const fetchedWishlist: typeof wishlist = [];
        if (!mounted) return;
        setAppointments(fetchedAppointments);
        setOrders(fetchedOrders);
        setWishlist(fetchedWishlist);
      } catch (e) {
        console.error("Error loading user data", e);
      } finally {
        if (mounted) setLoadingData(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [uid]);

  if (loading) return <p>Loading...</p>;
  if (!user) return null;

  const handleNameUpdate = async () => {
    if (!newName.trim()) {
      alert("Name cannot be empty.");
      return;
    }
    try {
      await updateProfileDisplayName(newName.trim());
      setEditingName(false);
    } catch (err) {
      console.error("Error updating name:", err);
      alert("Failed to update name. Try again.");
    }
  };

  const handleChangeEmail = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return;

    try {
      // Step 1: Ask for current email and password to re-authenticate
      const currentEmail = prompt("Enter your current email:");
      if (!currentEmail) {
        alert("Email is required.");
        return;
      }

      const currentPassword = prompt("Enter your current password:");
      if (!currentPassword) {
        alert("Password is required.");
        return;
      }

      const credential = EmailAuthProvider.credential(currentEmail, currentPassword);
      await reauthenticateWithCredential(user, credential);

      // Step 2: Ask for the new email
      const newEmail = prompt("Enter your new email:");
      if (!newEmail) {
        alert("New email is required.");
        return;
      }

      // Step 3: Update the email
      await updateEmail(user, newEmail);

      // Step 4: Send verification to the new email
      await sendEmailVerification(user);

      // Step 5: Inform the user
      alert(
        "Your email has been updated! A verification email has been sent to your new email. " +
        "Please click the link in that email to verify it. Your account will now reflect the new email, but it will be marked as unverified until you complete verification."
      );
    } catch (error: any) {
      console.error("Error changing email:", error);
      if (error.code === "auth/wrong-password") {
        alert("Incorrect password. Please try again.");
      } else if (error.code === "auth/invalid-email") {
        alert("Invalid email format.");
      } else if (error.code === "auth/email-already-in-use") {
        alert("This email is already in use.");
      } else if (error.code === "auth/requires-recent-login") {
        alert("Please sign in again before changing your email.");
      } else {
        alert("Failed to update email. Try again.");
      }
    }
  };



  function validateAddressForm() {
    const newErrors = { street: "", city: "", state: "", zip: "" };
    let valid = true;
    if (!address.street.trim()) {
      newErrors.street = "Street address is required.";
      valid = false;
    }
    if (!address.city.trim()) {
      newErrors.city = "City is required.";
      valid = false;
    }
    if (!US_STATES.includes(address.state)) {
      newErrors.state = "Please select a valid state.";
      valid = false;
    }
    if (!/^\d{5}(-\d{4})?$/.test(address.zip)) {
      newErrors.zip = "Zip code must be 5 digits or 5+4 format.";
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  }

  function isAddressValid() {
    return (
      address.street.trim() !== "" &&
      address.city.trim() !== "" &&
      US_STATES.includes(address.state) &&
      /^\d{5}(-\d{4})?$/.test(address.zip)
    );
  }

  async function saveAddress() {
    if (!uid) return;
    if (!validateAddressForm()) return;
    try {
      await setDoc(doc(db, "users", uid), { address }, { merge: true });
      setSavedAddress(address);
      setEditingAddress(false);
    } catch (e) {
      console.error("Failed to save address", e);
      alert("Failed to save address. Try again.");
    }
  }

  function cancelEditingAddress() {
    setAddress(savedAddress);
    setEditingAddress(false);
  }

  const formattedAddressAvailable =
    address.street.trim() && address.city.trim() && address.state && address.zip;

  function formatDate(dateString: string | null) {
    if (!dateString) return "Unknown";
    const d = new Date(dateString);
    return d.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
  }

  const handleChangePassword = async () => {
    if (!email) {
      alert("No email found for this account.");
      return;
    }

    const auth = getAuth();
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent! Check your inbox.");
    } catch (error: any) {
      console.error("Error sending password reset email:", error);
      alert("Failed to send reset email. Try again.");
    }
  };

  return (
    <main className="profile-main">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>

      <section className="profile-section">
        <aside className="w-64 border-r border-gray-200 flex flex-col">
          <div className="flex flex-col items-center p-6 border-b border-gray-200">
            <Image
              src={photoURL && photoURL.trim() !== "" ? photoURL : "/default-profile.jpg"}
              alt="Profile picture"
              width={80}
              height={80}
              className="rounded-full border mb-4"
              unoptimized
            />
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-900">{displayName ?? "No name set"}</p>
              <p className="text-gray-800 font-medium mt-2">{email ?? "No email"}</p>
            </div>
          </div>

          <nav className="flex flex-col flex-grow">
            {[{ id: "appointments", label: "Appointments" },
            { id: "orders", label: "My Orders" },
            { id: "wishlist", label: "Wishlist" },
            { id: "personal", label: "Personal Information" },
            { id: "security", label: "Security" },
            { id: "support", label: "Support" }].map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as typeof activeTab)}
                className={`sidebar-button ${activeTab === id ? 'active' : ''}`}
              >
                {label}
              </button>
            ))}
          </nav>
        </aside>



        <div className="flex-1 p-8">
          {/* Appointments Tab */}
          {activeTab === "appointments" && (
            <section>
              <h2 className="text-xl font-semibold mb-4">Appointments</h2>

              {isGuest ? (
                <div className="text-center p-6 bg-gray-50 border rounded">
                  <p className="text-lg font-semibold text-gray-800">
                    You’re signed in as a guest.
                  </p>
                  <p className="mt-2 text-gray-600">
                    Create a free account to book and track your appointments anytime.
                  </p>
                  <Link
                    href="/signup"
                    className="guest-signup-btn mt-4 inline-block font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    Sign Up Now
                  </Link>
                </div>
              ) : loadingData ? (
                <p className="text-gray-900">Loading your appointments...</p>
              ) : appointments.length === 0 ? (
                <p className="text-gray-500">
                  You have no upcoming appointments.{" "}
                      <Link
                        href="/bookings"
                        className="book-now-link text-pink-600 font-semibold hover:underline"
                      >
                        Book Now
                      </Link>
                </p>
              ) : (
                <ul className="space-y-2">
                  {appointments.map((appt) => (
                    <li
                      key={appt.id}
                      className="p-4 bg-gray-50 border rounded"
                    >
                      <p className="font-medium">{appt.serviceName ?? "Service"}</p>
                      <p className="text-sm text-gray-600">{appt.date ?? "Date not set"}</p>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )}

          {/* Orders Tab */}
          {activeTab === "orders" && (
            <section>
              <h2 className="text-xl font-semibold mb-4">My Orders</h2>

              {isGuest ? (
                <div className="text-center p-6 bg-gray-50 border rounded">
                  <p className="text-lg font-semibold text-gray-800">
                    You’re signed in as a guest.
                  </p>
                  <p className="mt-2 text-gray-600">
                    Create a free account to keep track of your orders anytime.
                  </p>
                  <Link
                    href="/signup"
                    className="guest-signup-btn mt-4 inline-block font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    Sign Up Now
                  </Link>
                </div>
              ) : loadingData ? (
                <p className="text-gray-900">Loading your orders...</p>
              ) : orders.length === 0 ? (
                <p className="text-gray-500">
                  You have no orders yet.{" "}
                      <Link
                        href="/products"
                        className="shop-now-link text-pink-600 font-semibold hover:underline"
                      >
                        Shop Now
                      </Link>
                </p>
              ) : (
                <ul className="space-y-2">
                  {orders.map((order) => (
                    <li
                      key={order.id}
                      className="p-4 bg-gray-50 border rounded"
                    >
                      <p className="font-medium">Order #{order.id}</p>
                      <p className="text-sm text-gray-600">
                        Status: {order.status ?? "Unknown"}
                      </p>
                      <p className="text-sm text-gray-600">
                        Total: ${order.total?.toFixed(2) ?? "0.00"}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )}

          {/* Wishlist Tab */}
          {activeTab === "wishlist" && (
            <section>
              <h2 className="text-xl font-semibold mb-4">Wishlist</h2>

              {isGuest ? (
                <div className="text-center p-6 bg-gray-50 border rounded">
                  <p className="text-lg font-semibold text-gray-800">
                    You’re signed in as a guest.
                  </p>
                  <p className="mt-2 text-gray-600">
                    Create a free account to save and track your wishlist items anytime.
                  </p>
                  <Link
                    href="/signup"
                    className="guest-signup-btn mt-4 inline-block font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    Sign Up Now
                  </Link>
                </div>
              ) : loadingData ? (
                <p className="text-gray-900">Loading your wishlist...</p>
              ) : wishlist.length === 0 ? (
                <p className="text-gray-500">Your wishlist is empty.</p>
              ) : (
                <ul className="space-y-2">
                  {wishlist.map((item) => (
                    <li
                      key={item.id}
                      className="p-4 bg-gray-50 border rounded flex items-center space-x-4"
                    >
                      {item.imageUrl && (
                        <Image
                          src={item.imageUrl}
                          alt={item.productName ?? "Item"}
                          width={60}
                          height={60}
                          className="rounded"
                          unoptimized
                        />
                      )}
                      <div>
                        <p className="font-medium">{item.productName ?? "Unnamed item"}</p>
                        <p className="text-sm text-gray-600">{item.description ?? ""}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )}

          {/* Personal Information Tab */}
          {activeTab === "personal" && (
            <section>
              <h2 className="text-xl font-semibold mb-4 text-gray-900">Personal Information</h2>

              {isGuest ? (
                <div className="text-center p-6 bg-gray-50 border rounded">
                  <p className="text-lg font-semibold text-gray-800">
                    You’re signed in as a guest.
                  </p>
                  <p className="mt-2 text-gray-600">
                    Create a free account to save your information and enjoy a faster checkout.
                  </p>
                  <Link
                    href="/signup"
                    className="guest-signup-btn mt-4 inline-block font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    Sign Up Now
                  </Link>
                </div>
              ) : (
                <>
                  {/* Member Since & Last Login */}
                  <div className="mb-4 text-gray-900 space-y-1">
                    <p>
                      <span className="font-bold text-gray-800">Member Since:</span> {memberSince ? new Date(memberSince).toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }) : "N/A"}
                    </p>
                    <p>
                      <span className="font-bold text-gray-800">Last Login:</span> {lastLogin ? new Date(lastLogin).toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }) : "N/A"}
                    </p>
                  </div>

                  {/* Email */}
                  <div className="mb-6 text-gray-900">
                    <p>
                      <span className="font-bold text-gray-800">Email:</span> {email ?? "Not set"}
                    </p>
                  </div>

                  {/* Name */}
                  <div className="mb-6">
                    <label className="block font-bold mb-2 text-gray-800">Name</label>
                    {editingName ? (
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={newName}
                          onChange={(e) => setNewName(e.target.value)}
                          className="border px-3 py-2 rounded flex-1 text-gray-900"
                        />
                        <button onClick={handleNameUpdate} className="save-button">Save</button>
                        <button onClick={() => setEditingName(false)} className="cancel-button">Cancel</button>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-900">{displayName ?? "Not set"}</span>
                          <button onClick={() => setEditingName(true)} className="edit-button">Edit</button>
                      </div>
                    )}
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block font-bold mb-2 text-gray-800">Address</label>
                    {editingAddress ? (
                      <div className="space-y-2 text-gray-900">
                        <input
                          type="text"
                          placeholder="Street Address"
                          value={address.street}
                          onChange={(e) => setAddress({ ...address, street: e.target.value })}
                          className={`border px-3 py-2 rounded w-full ${errors.street ? "border-red-500" : ""}`}
                        />
                        {errors.street && <p className="text-red-500 text-sm">{errors.street}</p>}

                        <input
                          type="text"
                          placeholder="Apt / Suite"
                          value={address.apt}
                          onChange={(e) => setAddress({ ...address, apt: e.target.value })}
                          className="border px-3 py-2 rounded w-full"
                        />

                        <div className="flex space-x-2">
                          <div className="flex-1">
                            <input
                              type="text"
                              placeholder="City"
                              value={address.city}
                              onChange={(e) => setAddress({ ...address, city: e.target.value })}
                              className={`border px-3 py-2 rounded w-full ${errors.city ? "border-red-500" : ""}`}
                            />
                            {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
                          </div>
                          <div className="w-32">
                            <select
                              value={address.state}
                              onChange={(e) => setAddress({ ...address, state: e.target.value })}
                              className={`border px-3 py-2 rounded w-full ${errors.state ? "border-red-500" : ""}`}
                            >
                              <option value="">State</option>
                              {US_STATES.map((s) => (
                                <option key={s} value={s}>{s}</option>
                              ))}
                            </select>
                            {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
                          </div>
                          <div className="w-24">
                            <input
                              type="text"
                              placeholder="ZIP"
                              value={address.zip}
                              onChange={(e) => setAddress({ ...address, zip: e.target.value })}
                              className={`border px-3 py-2 rounded w-full ${errors.zip ? "border-red-500" : ""}`}
                            />
                            {errors.zip && <p className="text-red-500 text-sm">{errors.zip}</p>}
                          </div>
                        </div>

                        <div className="flex space-x-2 mt-2">
                            <button
                              onClick={saveAddress}
                              disabled={!isAddressValid()}
                              className="save-button"
                            >
                              Save
                            </button>
                            <button onClick={cancelEditingAddress} className="cancel-button">
                              Cancel
                            </button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-gray-900">
                        {formattedAddressAvailable ? (
                          <div className="mb-2">
                            <p>{address.street}{address.apt ? `, ${address.apt}` : ""}</p>
                            <p>{address.city}, {address.state} {address.zip}</p>
                          </div>
                        ) : (
                          <p>No address set.</p>
                        )}
                          <button onClick={() => setEditingAddress(true)} className="edit-button mt-1">Edit Address</button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </section>
          )}


          {/* Security Tab */}
          {activeTab === "security" && (
            <section>
              <h2 className="text-xl font-semibold mb-4 text-gray-900">Security</h2>

              {isGuest ? (
                <div className="text-center p-6 bg-gray-50 border rounded">
                  <p className="text-lg font-semibold text-gray-800">
                    You’re signed in as a guest.
                  </p>
                  <p className="mt-2 text-gray-600">
                    Create a free account to manage your security settings, change your password, and secure your information.
                  </p>
                  <Link
                    href="/signup"
                    className="guest-signup-btn mt-4 inline-block font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    Sign Up Now
                  </Link>
                </div>
              ) : (
                <div className="mb-4 text-gray-900 space-y-4">
                  {/* Email */}
                  <div>
                    <p>
                      <span className="font-bold text-gray-800">Email:</span> {email ?? "Not set"}
                    </p>
                  </div>

                  {/* Password */}
                  <div>
                    <p>
                      <span className="font-bold text-gray-800">Password:</span>{" "}
                      {isEmail ? "********" : "N/A"}
                    </p>
                  </div>

                  {/* Buttons for email/password users only */}
                    {isEmail && (
                      <div className="flex space-x-2 mt-2">
                        <button
                          onClick={handleChangePassword}
                          className="px-4 py-2 bg-[#f1d36e] text-white rounded hover:bg-[#dcbf6a] transition-colors"
                        >
                          Change Password
                        </button>

                        <button
                          onClick={handleChangeEmail}
                          className="px-4 py-2 border rounded border-[#8a5302ff] text-[#8a5302ff] hover:bg-[#f3f4f6] transition-colors"
                        >
                          Change Email
                        </button>
                      </div>
                    )}

                  {/* Modal for changing email */}
                  {editingEmail && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                      <div className="bg-white p-6 rounded shadow-md w-96">
                        <h3 className="text-lg font-semibold mb-4">Update Email</h3>
                        <input
                          type="email"
                          placeholder="New email"
                          value={newEmail}
                          onChange={(e) => setNewEmail(e.target.value)}
                          className="border rounded w-full px-3 py-2 mb-4"
                        />
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => setEditingEmail(false)}
                            className="px-4 py-2 border rounded border-gray-400 hover:bg-gray-100 transition-colors"
                          >
                            Cancel
                          </button>
                            <button
                              onClick={async () => {
                                const auth = getAuth();
                                const currentUser = auth.currentUser;

                                if (!currentUser) return alert("No user signed in.");

                                const currentPassword = prompt("Enter your current password to confirm:");
                                if (!currentPassword) return alert("Password is required.");

                                const credential = EmailAuthProvider.credential(currentUser.email!, currentPassword);

                                try {
                                  // Re-authenticate the user
                                  await reauthenticateWithCredential(currentUser, credential);

                                  // Ask for the new email
                                  const newEmailInput = prompt("Enter your new email:");
                                  if (!newEmailInput || !newEmailInput.trim()) return alert("Email cannot be empty.");

                                  // Update email
                                  await updateEmail(currentUser, newEmailInput.trim());

                                  // Send verification email
                                  await sendEmailVerification(currentUser);

                                  alert("Email updated! Check your new email to verify it.");
                                  setEditingEmail(false);
                                } catch (error: any) {
                                  console.error("Error updating email:", error);
                                  if (error.code === "auth/wrong-password") {
                                    alert("Incorrect password.");
                                  } else if (error.code === "auth/invalid-email") {
                                    alert("Invalid email format.");
                                  } else if (error.code === "auth/email-already-in-use") {
                                    alert("This email is already in use.");
                                  } else {
                                    alert("Failed to update email. Try again.");
                                  }
                                }
                              }}
                              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                            >
                              Save
                            </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </section>
          )}




          {/* Support Tab */}
          {activeTab === "support" && (
            <section>
              <h2 className="text-xl font-semibold mb-4 text-gray-900">Support</h2>

              <div className="mb-4 text-gray-900 space-y-4">
                <p>
                  Having trouble or need help? We’re here for you! Check out the options below to get assistance:
                </p>

                {/* Support Options */}
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    <strong>Help Center:</strong> Browse articles and FAQs to quickly find solutions to common questions.
                  </li>
                  <li>
                    <strong>Contact Support:</strong> Reach out directly to our support team via email at{" "}
                    <a
                      href="mailto:support@yourdomain.com"
                      className="!text-[#f1d36e] hover:!text-[#e6c96a] underline"
                    >
                      support@yourdomain.com
                    </a>
                    {" "}
                    for personalized help.
                  </li>
                  <li>
                    <strong>Live Chat:</strong> Chat with a support agent in real-time for urgent issues.
                  </li>
                  <li>
                    <strong>Report a Bug:</strong> Found a bug? Let us know so we can fix it promptly.
                  </li>
                </ul>

                <p className="mt-2">
                  We aim to respond to all inquiries within 24 hours. Your feedback helps us improve!
                </p>
              </div>
            </section>
          )}

        </div>
      </section>
    </main>
  );
}
