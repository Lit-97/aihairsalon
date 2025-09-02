"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import "@/styles/ProductsPage.css";
import { useCart } from "@/lib/CartContext";
import { CartItem } from "@/lib/CartContext";

interface Shade {
  name: string;
  hex?: string;
  description?: string;
}

interface Product {
  name: string;
  description: string;
  price?: string;
  image?: string;
  shades?: Shade[];
  tallImage?: boolean;
}

const products: Record<string, Product[]> = {
  "Pre-Shampoo": [
    {
      name: "CurlKind Flaxseed Prepoo",
      description:
        "A nutrient-rich gel infused with flaxseed and aloe vera to soften, detangle, and protect the hair before shampooing. Ideal for curly, coily, and dry hair types.",
      price: "$25",
      image: "/prepoo.png",
    },
    {
      name: "SheaGlow Pre-Shampoo Treatment",
      description:
        "A nourishing shea butter and coconut oil pre-shampoo treatment to hydrate, reduce breakage, and enhance curl definition for all hair types, especially dry or curly hair.",
      price: "$27",
      image: "/prepoo.png",
    },
  ],
  Shampoos: [
    {
      name: "CrystalClean Clarifying Wash",
      description:
        "Weekly use to remove buildup (all hair types). Gently purifies the scalp and hair, leaving strands refreshed, soft, and lightweight.",
      price: "$27",
      image: "/clarityno.png",
      tallImage: true,
    },
    {
      name: "LuxeBalance Shampoo",
      description:
        "For straight to wavy hair (Type 1–2). Gently cleanses while maintaining natural shine and smoothness, leaving hair soft, manageable, and full of body.",
      price: "$28",
      image: "/luxebalance.png",
      tallImage: true,
    },
    {
      name: "LuxeCurls Hydrating Shampoo",
      description:
        "For curly, coily, or kinky hair (Type 3–4). Nourishes and defines curls while reducing frizz, leaving hair soft, hydrated, and full of natural bounce.",
      price: "$28",
      image: "/hydrating.png",
      tallImage: true,
    },
    {
      name: "HydraBloom Moisturizing Shampoo",
      description:
        "A gentle, sulfate-free shampoo infused with aloe vera and chamomile to hydrate, soothe the scalp, and enhance shine for all hair types. Perfect for daily use or dry hair.",
      price: "$29",
      image: "/hydrating.png",
      tallImage: true,
    },
  ],
  "Conditioners & Treatments": [
    {
      name: "DeepSilk Conditioner",
      description:
        "Heavy moisture for thick or dry hair. Infused with natural oils to deeply hydrate, detangle, and restore softness without weighing hair down.",
      price: "$32",
      image: "/conditon.png",
      tallImage: true,
    },
    {
      name: "FeatherSoft Conditioner",
      description:
        "Lightweight detangler for fine or oily hair. Smooths strands, reduces frizz, and adds gentle shine for manageable, soft-to-touch hair.",
      price: "$28",
      image: "/conditionerfeather.png",
      tallImage: true,
    },
    {
      name: "LuxeTherapy Masque",
      description:
        "Deep treatment with keratin and botanical oils. Repairs damage, strengthens hair structure, and replenishes essential moisture for healthy, vibrant hair.",
      price: "$40",
      image: "/repairmask.png",
      tallImage: true,
    },
    {
      name: "NightRenew Leave-In",
      description:
        "Overnight strengthening and softening cream. Works while you sleep to nourish, reduce breakage, and leave hair silky and revitalized by morning.",
      price: "$35",
      image: "/night.png",
      tallImage: true,
    },
  ],
  "Styling Tools": [
    {
      name: "AirLuxe Jet Dryer",
      description:
        "Powerful blow dryer with diffuser & concentrator attachments. Dries hair quickly while reducing frizz and maintaining shine for salon-quality results.",
      price: "$120",
      image: "/airluxe.png",
    },
    {
      name: "GlideFlow Reverse Dryer",
      description:
        "Gentle stretch-dryer inspired by RevAir. Smooths and elongates hair without heat damage, ideal for natural curls and textured hair.",
      price: "$150",
      image: "/revnew.png",
    },
    {
      name: "SleekFusion Iron",
      description:
        "Precision flat iron with ionic steam tech. Delivers smooth, shiny, and frizz-free hair while protecting from heat damage.",
      price: "$180",
      image: "/flatiron.png",
    },
    {
      name: "GoldTouch Press Comb",
      description:
        "Heated comb for silk presses and edge smoothing. Creates sleek styles with ease while enhancing natural shine and texture.",
      price: "$80",
      image: "/comb.png",
    },
  ],
  "Luxe Color Collections": [
    {
      name: "LuxeVelour Collection",
      description:
        "Our signature LuxeVelour Collection features a range of richly pigmented, salon-quality colors designed for bold statements and lasting vibrancy.",
      price: "$35",
      image: "/vibrantchart.png",
      shades: [
        { name: "Crimson Mirage", hex: "#8B0000" },
        { name: "Sunset Saffron", hex: "#B22222" },
        { name: "Amber Glow", hex: "#DC143C" },
        { name: "Midnight Violet", hex: "#7B68EE" },
        { name: "Pink Truffle", hex: "#FF6347" },
        { name: "Ocean Veil", hex: "#48D1CC" },
        { name: "Lavender Smoke", hex: "#C8A2C8" },
        { name: "Graphite Storm", hex: "#2F4F4F" },
        { name: "Icy Obsidian", hex: "#4682B4" },
      ],
    },
    {
      name: "SilkenVeil Collection",
      description:
        "The SilkenVeil Collection offers timeless naturals and classic tones, crafted for effortless elegance.",
      price: "$35",
      image: "/naturalchart.png",
      shades: [
        { name: "Champagne Silk", hex: "#FAE6D4" },
        { name: "Golden Hour", hex: "#FFD700" },
        { name: "Ivory Pearl", hex: "#F0E68C" },
        { name: "Smoky Quartz", hex: "#6B4226" },
        { name: "Café Crème", hex: "#A67B5B" },
        { name: "Velvet Brunette", hex: "#4B3621" },
        { name: "Ebony Luxe", hex: "#0C0C0C" },
        { name: "Rosewood Ember", hex: "#800000" },
        { name: "Silver Whisper", hex: "#C0C0C0" },
      ],
    },
  ],
};

export default function ProductsPage() {
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);
  const [bannerMessage, setBannerMessage] = useState<string | null>(null);
  const { addToCart, incrementItem, decrementItem, cart } = useCart();
  const green = "#28a745";

  const getItemQty = (id: string) => {
    const item = cart.find((i: CartItem) => i.id === id);
    return item ? item.qty : 0;
  };

  const handleAddToCart = (product: Product, shade?: Shade) => {
    const itemId = shade ? `${product.name} - ${shade.name}` : product.name;
    addToCart({ id: itemId, name: itemId, price: product.price || "$0", qty: 1, image: product.image });
    setBannerMessage(`${itemId} added to cart!`);
  };

  const handleIncrement = (product: Product, shade?: Shade) => {
    const itemId = shade ? `${product.name} - ${shade.name}` : product.name;
    incrementItem(itemId);
    setBannerMessage(`${itemId} added to Cart!`);
  };

  const handleDecrement = (product: Product, shade?: Shade) => {
    const itemId = shade ? `${product.name} - ${shade.name}` : product.name;
    decrementItem(itemId);
    setBannerMessage(`${itemId} removed from Cart!`);
  };

  useEffect(() => {
    if (bannerMessage) {
      const timer = setTimeout(() => setBannerMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [bannerMessage]);

  return (
    <>
      {bannerMessage && (
        <div
          role="alert"
          className="fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded shadow-lg z-50"
          style={{ backgroundColor: green, color: "white", minWidth: "300px", textAlign: "center" }}
        >
          {bannerMessage}
        </div>
      )}

      <main className="products-page min-h-screen bg-[#EFE6DD] py-16">
        <h1 className="text-center text-5xl font-serif font-bold mb-12">
          <motion.span
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            style={{
              background: "linear-gradient(90deg, #ffffff, #dcbf6a, #ffffff)",
              backgroundSize: "200% 200%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              display: "inline-block",
            }}
          >
            Our Products
          </motion.span>
        </h1>

        <div className="max-w-6xl mx-auto px-6 space-y-12">
          {Object.entries(products).map(([category, items]) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="product-category"
            >
              <h2 className="text-2xl font-semibold mb-6 border-b border-[#dcbf6a] pb-2">{category}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8">
                {items.map((item, index) => {
                  const qty = getItemQty(item.name);
                  const isLuxeColor = category === "Luxe Color Collections";

                  return (
                    <motion.div
                      key={index}
                      className="product-card-wrapper"
                      style={{ position: "relative" }}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.4 }}
                    >
                      <div className={`product-card ${item.tallImage ? "tall-card" : ""}`}>
                        <Image
                          src={item.image || "/placeholder.png"}
                          alt={item.name}
                          width={400}
                          height={400}
                          className={`product-image ${item.tallImage ? "tall-image" : ""}`}
                        />
                        <div className="product-info">
                          <span className="product-price">{item.price}</span>
                          <h3 className="product-name">{item.name}</h3>
                          <p className="product-description">{item.description}</p>

                          {isLuxeColor ? (
                            <div className="button-container">
                              <button
                                className="add-to-cart-button"
                                onClick={() =>
                                  setExpandedProduct(expandedProduct === item.name ? null : item.name)
                                }
                              >
                                {expandedProduct === item.name ? "Hide Shades" : "Choose a Shade"}
                              </button>
                            </div>
                          ) : qty === 0 ? (
                            <div className="button-container">
                              <button className="add-to-cart-button" onClick={() => handleAddToCart(item)}>
                                Add to Cart
                              </button>
                            </div>
                          ) : (
                            <div className="quantity-selector-wrapper">
                              <div className="quantity-selector">
                                <button onClick={() => handleDecrement(item)}>-</button>
                                <span>{qty}</span>
                                <button onClick={() => handleIncrement(item)}>+</button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Shade dropdown */}
                      {isLuxeColor && expandedProduct === item.name && (
                        <div
                          className="shade-dropdown floating"
                          style={{
                            position: "absolute",
                            top: "calc(100% + 8px)",
                            left: "50%",
                            transform: "translateX(-50%)",
                            zIndex: 999,
                          }}
                        >
                          {item.shades!.map((shade, sIndex) => {
                            const shadeQty = getItemQty(`${item.name} - ${shade.name}`);
                            return (
                              <div key={sIndex} className="shade-item">
                                <div className="shade-circle" style={{ backgroundColor: shade.hex || "#ccc" }} />
                                <span>{shade.name}</span>

                                {shadeQty > 0 ? (
                                  <div className="quantity-selector-wrapper">
                                    <div className="quantity-selector">
                                      <button onClick={() => handleDecrement(item, shade)}>-</button>
                                      <span>{shadeQty}</span>
                                      <button onClick={() => handleIncrement(item, shade)}>+</button>
                                    </div>
                                  </div>
                                ) : (
                                  <button
                                    className="add-to-cart-button small-btn"
                                    onClick={() => handleAddToCart(item, shade)}
                                  >
                                    Add to Cart
                                  </button>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </>
  );
}
