"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

type Message = {
  role: "user" | "assistant";
  content: string;
};

function LoadingDots() {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            width: 6,
            height: 6,
            borderRadius: "50%",
            backgroundColor: "white",
            animation: `bounce 1.4s infinite ease-in-out`,
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}
      <style>
        {`
          @keyframes bounce {
            0%, 80%, 100% {
              transform: translateY(0);
              opacity: 0.3;
            }
            40% {
              transform: translateY(-6px);
              opacity: 1;
            }
          }
        `}
      </style>
    </span>
  );
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check localStorage if user has closed chat before
    const hasClosed = localStorage.getItem("chatbot-closed");
    const hasOpenedOnce = localStorage.getItem("chatbot-opened-once");

    if (!hasClosed && !hasOpenedOnce) {
      // Show chat on first visit with 1s delay
      const timer = setTimeout(() => {
        setIsOpen(true);
        setMessages([
          {
            role: "assistant",
            content: "👋 Hello, my name is LuxeBot. How can I assist you today?",
          },
        ]);
        localStorage.setItem("chatbot-opened-once", "true");
      }, 1000);

      return () => clearTimeout(timer);
    } else if (!hasClosed) {
      // If not closed but opened once already, do nothing (stay closed)
    }
  }, []);

  // When user closes chat, store this choice in localStorage
  function closeChat() {
    setIsOpen(false);
    localStorage.setItem("chatbot-closed", "true");
  }

  // When user opens chat via button, clear the closed flag (so it can be reopened)
  function toggleChat() {
    if (isOpen) {
      closeChat();
    } else {
      setIsOpen(true);
      localStorage.removeItem("chatbot-closed");
      // If first time opening without messages, show greeting
      if (messages.length === 0) {
        setMessages([
          {
            role: "assistant",
            content: "👋 Hello, my name is LuxeBot. How can I assist you today?",
          },
        ]);
      }
    }
  }

  async function sendMessage() {
    if (!input.trim()) return;

    const newMessages: Message[] = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await response.json();

      if (data?.choices?.[0]?.message) {
        setMessages([...newMessages, data.choices[0].message]);
      } else {
        setMessages([
          ...newMessages,
          {
            role: "assistant",
            content: "Hmm, I didn't get a response from the AI. Try again in a moment!",
          },
        ]);
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: "Something went wrong. Please try again later.",
        },
      ]);
    }

    setLoading(false);
  }

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={toggleChat}
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          width: 60,
          height: 60,
          borderRadius: "50%",
          backgroundColor: "#1f1f1f", // dark button for contrast
          border: "none",
          cursor: "pointer",
          boxShadow: "0 4px 12px rgba(212, 175, 55,0.6)",
          zIndex: 9999,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 0,
        }}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        <Image
          src="/chatbot.png"
          alt="AI Chatbot"
          width={50}
          height={50}
          style={{ objectFit: "contain" }}
        />
      </button>

      {/* Chat Popup */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: 100,
            right: 24,
            width: 340,
            height: 450,
            backgroundColor: "#f4efe8", // cream background overall
            color: "#1f1f1f",
            borderRadius: 12,
            boxShadow: "0 8px 30px rgba(0,0,0,0.6)",
            display: "flex",
            flexDirection: "column",
            zIndex: 9999,
            overflow: "hidden",
            border: "1px solid #BE954DFF", // header color as subtle border
          }}
        >
          {/* Header */}
          <div
            style={{
              backgroundColor: "#B3752E",
              color: "#F6B93B",
              padding: "12px 16px",
              fontSize: 18,
              fontWeight: "bold",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              textShadow: "0 0 4px rgba(212,175,55,0.8)", // subtle glow
            }}
          >
            LuxeBot
            <button
              onClick={closeChat}
              style={{
                background: "transparent",
                border: "none",
                color: "#1f1f1f",
                fontSize: 20,
                cursor: "pointer",
              }}
              disabled={loading}
              aria-label="Close chat"
            >
              ×
            </button>
          </div>

          {/* Chat Messages */}
          <div
            style={{
              flexGrow: 1,
              overflowY: "auto",
              padding: "12px",
              backgroundColor: "#f4efe8", // matches overall cream
            }}
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: msg.role === "user" ? "#E6D4B8" : "#EFE6DD",
                  alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                  padding: 10,
                  borderRadius: 8,
                  marginBottom: 10,
                  color: msg.role === "user" ? "#1f1f1f" : "#1f1f1f",
                  maxWidth: "80%",
                  whiteSpace: "pre-wrap",
                  boxShadow:
                    msg.role === "assistant"
                      ? "0 0 6px rgba(190,149,77,0.4)"
                      : "none",
                }}
              >
                {msg.content}
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div
            style={{
              display: "flex",
              padding: "10px",
              borderTop: "1px solid #C79C6D",
              backgroundColor: "#f4efe8", // matches chat bg
            }}
          >
            <input
              type="text"
              placeholder="Type your question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              disabled={loading}
              style={{
                flex: 1,
                padding: "8px",
                borderRadius: 6,
                border: "1px solid #A35F1B",
                backgroundColor: "#f4efe8",
                color: "#1f1f1f",
                marginRight: 8,
              }}
              aria-label="Chat input"
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              style={{
                backgroundColor: "#C0812F",
                color: "#F6B93B",
                border: "none",
                padding: "8px 16px",
                borderRadius: 6,
                fontWeight: "bold",
                cursor: "pointer",
                boxShadow: "0 2px 6px rgba(212,161,55,0.4)",
              }}
              aria-label="Send message"
            >
              {loading ? <LoadingDots /> : "Send"}
            </button>
          </div>
        </div>
      )}


    </>
  );
}
