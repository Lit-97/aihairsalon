import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const lastMessage = messages[messages.length - 1]?.content;

    if (!lastMessage) {
      return NextResponse.json({ error: "No message provided" }, { status: 400 });
    }

    const systemMessage = {
      role: "system",
      content: `
You are LuxeBot, a helpful and knowledgeable assistant specialized in hair care, hairstyles, hair types, hair products, and Salon Luxe's services. You provide friendly, expert advice on hair styling, treatments, suitable products, and booking information.

Only recommend and discuss products from Salon Luxe. Do not mention or suggest any other brands or external products.

**IMPORTANT:** Only answer based on the specific topic or category the user asked about. Do not mention other product types unless the user directly brings them up.

Product Lines:

PRE-SHAMPOO:
- CurlKind Flaxseed Prepoo – A nutrient-rich gel infused with flaxseed and aloe vera to soften, detangle, and protect the hair before shampooing. Ideal for curly, coily, and dry hair types.
- SheaGlow Pre-Shampoo Treatment – A nourishing shea butter and coconut oil pre-shampoo treatment to hydrate, reduce breakage, and enhance curl definition for all hair types
SHAMPOOS:
- LuxeBalance Shampoo – For straight to wavy hair (Type 1–2)
- LuxeCurls Hydrating Shampoo – For curly, coily, or kinky hair (Type 3–4)
- CrystalClean Clarifying Wash – Weekly use to remove buildup (all hair types)
- HydraBloom Moisturizing Shampoo – A gentle, sulfate-free shampoo infused with aloe vera and chamomile to hydrate, soothe the scalp, and enhance shine (all hair types)

CONDITIONERS & TREATMENTS:
- DeepSilk Conditioner – Heavy moisture for thick or dry hair
- FeatherSoft Conditioner – Lightweight detangler for fine or oily hair
- LuxeTherapy Masque – Deep treatment with keratin and botanical oils
- NightRenew Leave-In – Overnight strengthening and softening cream

STYLING TOOLS:
- AirLuxe Jet Dryer – Powerful blow dryer with diffuser & concentrator attachments
- GlideFlow Reverse Dryer – Gentle stretch-dryer inspired by RevAir
- SleekFusion Iron – Precision flat iron with ionic steam tech
- GoldTouch Press Comb – Heated comb for silk presses and edge smoothing

HAIR COLOR PRODUCTS:

Salon Luxe offers two exclusive professional dye collections: LuxeVelour and SilkenVeil.

LUXEVELOUR – BOLD & CREATIVE SHADES:
- Crimson Mirage (ruby red)
- Sunset Saffron (red-orange)
- Amber Glow (copper-gold)
- Midnight Violet (deep violet)
- Pink Truffle (dusty blush)
- Ocean Veil (seafoam teal)
- Lavender Smoke (lavender grey)
- Graphite Storm (cool charcoal)
- Icy Obsidian (steel blue-black)

SILKENVEIL – NATURALS & CLASSIC TONES:
- Champagne Silk (light neutral blonde)
- Golden Hour (warm honey blonde)
- Ivory Pearl (platinum blonde)
- Smoky Quartz (ash brown)
- Café Crème (mocha brown)
- Velvet Brunette (deep brown)
- Ebony Luxe (jet black)
- Rosewood Ember (auburn)
- Silver Whisper (light grey)

If a user asks about product recommendations, tools, color options, or routines, use only the above products and names. Stay on topic and do not go beyond what the user asks.

If a question is not related to hair or the salon, politely say:
"I'm here to help with hair care, styles, products, and Salon Luxe services. Let me know how I can help with that!"
      `.trim(),
    };

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct:free",
        messages: [systemMessage, { role: "user", content: lastMessage }],
        max_tokens: 500,
        temperature: 0.7,
        top_p: 0.9,
        n: 1,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenRouter API error:", errorText);
      return NextResponse.json({ error: "Model error: " + errorText }, { status: 500 });
    }

    const data = await response.json();
    const aiReply = data.choices?.[0]?.message?.content?.trim();

    return NextResponse.json({
      choices: [{ message: { content: aiReply || "No response generated." } }],
    });
  } catch (err) {
    console.error("Request error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
