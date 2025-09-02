"use client";

import { useState } from "react";
import { useCart, CartItem } from "@/lib/CartContext";
import Image from "next/image";

export default function CartPage() {
    const { cart: cartItems, addToCart, removeFromCart } = useCart();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const gold = "#d4af37";

    const getTotal = (): number => {
        return cartItems.reduce(
            (total: number, item: CartItem) =>
                total + Number(item.price.replace("$", "")) * item.qty,
            0
        );
    };

    const handleIncrement = (item: CartItem) => {
        addToCart({ ...item, qty: 1 });
    };

    const handleDecrement = (item: CartItem) => {
        if (item.qty <= 1) {
            removeFromCart(item.id);
        } else {
            removeFromCart(item.id);
            addToCart({ ...item, qty: item.qty - 1 });
        }
    };

    return (
        <main className="min-h-screen bg-[#EFE6DD] py-16 px-4 flex justify-center">
            <div className="w-full max-w-4xl bg-white rounded-3xl shadow-lg p-6 border border-pink-100">
                <h1 className="text-3xl font-serif font-bold mb-6 text-center" style={{ color: gold }}>
                    Your Cart
                </h1>

                {cartItems.length === 0 ? (
                    <p className="text-center text-lg" style={{ color: "#1a1a1a" }}>
                        Your cart is empty.
                    </p>
                ) : (
                    <div className="space-y-4">
                        <div className="grid grid-cols-[80px_1fr_120px_120px] gap-4 font-semibold border-b border-gray-300 pb-2 mb-2 text-[#1a1a1a]">
                            <span>Product</span>
                            <span></span>
                            <span className="pl-8">Quantity</span>
                            <span className="pl-14">Price</span>
                        </div>

                        {cartItems.map((item: CartItem) => (
                            <div
                                key={item.id}
                                className="grid grid-cols-[80px_1fr_120px_120px] gap-4 items-center bg-[#fffaf3] p-3 rounded-lg shadow-sm"
                            >
                                {item.image && (
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        width={80}
                                        height={80}
                                        className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                                    />
                                )}
                                <div className="flex flex-col justify-center">
                                    <span className="font-semibold" style={{ color: "#1a1a1a" }}>
                                        {item.name}
                                    </span>
                                </div>

                                <div className="flex items-center space-x-2 pl-12">
                                    <button
                                        onClick={() => handleDecrement(item)}
                                        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300"
                                        style={{ color: "#1a1a1a" }}
                                    >
                                        -
                                    </button>
                                    <span className="font-semibold text-lg" style={{ color: "#1a1a1a" }}>
                                        {item.qty}
                                    </span>
                                    <button
                                        onClick={() => handleIncrement(item)}
                                        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300"
                                        style={{ color: "#1a1a1a" }}
                                    >
                                        +
                                    </button>
                                </div>

                                <div className="text-lg font-semibold pl-15" style={{ color: "#1a1a1a" }}>
                                    ${(Number(item.price.replace("$", "")) * item.qty).toFixed(2)}
                                </div>
                            </div>
                        ))}

                        <div className="flex justify-end mt-6 text-xl font-semibold" style={{ color: "#1a1a1a" }}>
                            Total: ${getTotal().toFixed(2)}
                        </div>

                        <div className="flex justify-end mt-4">
                            <button
                                className="px-6 py-3 bg-[#c9a14c] font-semibold rounded-full hover:bg-[#b79520] transition"
                                style={{ color: "#1a1a1a" }}
                                onClick={() => setIsModalOpen(true)}
                            >
                                Checkout
                            </button>
                        </div>
                    </div>
                )}

                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-50">
                        <div className="bg-white rounded-xl p-6 max-w-md w-full text-center shadow-lg">
                            <h2 className="text-2xl font-semibold mb-4" style={{ color: gold }}>
                                Checkout Unavailable
                            </h2>
                            <p className="mb-6 text-[#1a1a1a]">
                                We know you’re eager to purchase our{" "}
                                <span className="shimmer-text" style={{ fontWeight: "bold", display: "inline-block" }}>
                                    luxurious
                                </span>{" "}
                                products, but at this time checkout is not available. Please come back later.
                            </p>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-6 py-2 bg-[#c9a14c] font-semibold rounded-full hover:bg-[#b79520] transition"
                                style={{ color: "#1a1a1a" }}
                            >
                                Close
                            </button>

                            <style jsx>{`
                                .shimmer-text {
                                    background: linear-gradient(90deg, #f7e78fff, #dcbf6a, #f7e78fff);
                                    background-size: 200% auto;
                                    color: transparent;
                                    background-clip: text;
                                    -webkit-background-clip: text;
                                    animation: shimmerMove 3s linear infinite;
                                }
                                @keyframes shimmerMove {
                                    0% { background-position: 200% center; }
                                    100% { background-position: 0% center; }
                                }
                            `}</style>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
