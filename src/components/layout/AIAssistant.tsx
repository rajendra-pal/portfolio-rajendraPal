"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
import { Copy, Check, X, RotateCcw, Send, Sparkles } from "lucide-react";

interface Message {
  id: number;
  type: "user" | "assistant" | "system";
  text: string;
  timestamp: string;
}

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Position {
  x: number;
  y: number;
}

const TERMINAL_W = 480;
const TERMINAL_H = 600;

function getTimestamp() {
  return new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

function getDefaultPosition(): Position {
  if (typeof window === "undefined") return { x: 0, y: 80 };
  const x = window.innerWidth - TERMINAL_W - 20;
  const y = 80;
  return { x: Math.max(16, x), y };
}

const WELCOME_MESSAGE: Message = {
  id: 0,
  type: "system",
  text: "Welcome! Ask anything about Rajendra Pal — his skills, projects, education, or experience. Type below or tap a quick prompt.",
  timestamp: getTimestamp(),
};

const SUGGESTIONS = [
  { label: "⚡ Skills", query: "What are Rajendra's core skills and tech stack?" },
  { label: "🚀 Projects", query: "What are Rajendra's top featured projects?" },
  { label: "💼 Experience", query: "Can you tell me about his work experience?" },
  { label: "📫 Contact", query: "How can I contact or connect with Rajendra?" },
];

export function AIAssistant({ isOpen, onClose }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dots, setDots] = useState(".");
  const [copiedId, setCopiedId] = useState<number | null>(null);

  // Responsive device classification
  const [deviceType, setDeviceType] = useState<"mobile" | "tablet" | "desktop">("desktop");

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setDeviceType("mobile");
      } else if (w < 1024) {
        setDeviceType("tablet");
      } else {
        setDeviceType("desktop");
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = deviceType === "mobile";
  const isTablet = deviceType === "tablet";

  // Copy helper
  const copyMessage = useCallback((id: number, text: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setCopiedId(id);
        setTimeout(() => setCopiedId((curr) => (curr === id ? null : curr)), 2000);
      }).catch(() => {
        // Fallback
        const textarea = document.createElement("textarea");
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        setCopiedId(id);
        setTimeout(() => setCopiedId((curr) => (curr === id ? null : curr)), 2000);
      });
    }
  }, []);

  // Drag state (desktop only)
  const [position, setPosition] = useState<Position>({ x: 0, y: 80 });
  const isDragging = useRef(false);
  const dragStart = useRef<{ mouseX: number; mouseY: number; posX: number; posY: number }>({
    mouseX: 0,
    mouseY: 0,
    posX: 0,
    posY: 0,
  });

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const msgIdRef = useRef(1);

  // Set default position when first opened on desktop
  useEffect(() => {
    if (isOpen && !isMobile && !isTablet) {
      setPosition(getDefaultPosition());
    }
  }, [isOpen, isMobile, isTablet]);

  // Focus input on desktop/tablet, but avoid auto-focusing on mobile to prevent virtual keyboard popup
  useEffect(() => {
    if (!isOpen) return;
    if (isMobile) return; // Do not auto-open keyboard on phones

    const focusTimer = setTimeout(() => {
      inputRef.current?.focus();
    }, 200);
    return () => clearTimeout(focusTimer);
  }, [isOpen, isMobile]);

  // Focused state for custom cursor glow
  const [isFocused, setIsFocused] = useState(false);
  // Blinking cursor visibility
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const t = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(t);
  }, []);

  // Animate loading dots
  useEffect(() => {
    if (!isLoading) return;
    const interval = setInterval(() => {
      setDots((d) => (d.length >= 3 ? "." : d + "."));
    }, 400);
    return () => clearInterval(interval);
  }, [isLoading]);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // ── Desktop Drag handlers ──────────────────────────────────────────
  const onTitleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isMobile || isTablet) return; // No mouse dragging on mobile/tablet
      if (e.button !== 0) return;
      e.preventDefault();
      isDragging.current = true;
      dragStart.current = {
        mouseX: e.clientX,
        mouseY: e.clientY,
        posX: position.x,
        posY: position.y,
      };
    },
    [position, isMobile, isTablet]
  );

  useEffect(() => {
    if (isMobile || isTablet) return;

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const dx = e.clientX - dragStart.current.mouseX;
      const dy = e.clientY - dragStart.current.mouseY;
      const newX = dragStart.current.posX + dx;
      const newY = dragStart.current.posY + dy;

      const maxX = window.innerWidth - TERMINAL_W;
      const maxY = window.innerHeight - TERMINAL_H;
      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY)),
      });
    };

    const onMouseUp = () => {
      isDragging.current = false;
      inputRef.current?.focus();
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [isMobile, isTablet]);

  // ── Send message ───────────────────────────────────────────────────
  const executeQuestion = useCallback(async (questionText: string) => {
    const question = questionText.trim();
    if (!question || isLoading) return;

    const userMsg: Message = {
      id: msgIdRef.current++,
      type: "user",
      text: question,
      timestamp: getTimestamp(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/ai-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = (await res.json()) as { answer?: string; error?: string };

      const aiMsg: Message = {
        id: msgIdRef.current++,
        type: "assistant",
        text: data.answer ?? data.error ?? "Something went wrong.",
        timestamp: getTimestamp(),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      const errMsg: Message = {
        id: msgIdRef.current++,
        type: "assistant",
        text: "Network error. Please try again.",
        timestamp: getTimestamp(),
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  const sendMessage = useCallback(() => {
    executeQuestion(input);
  }, [executeQuestion, input]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  const handleResetChat = useCallback(() => {
    setMessages([
      {
        id: msgIdRef.current++,
        type: "system",
        text: "Conversation cleared. Feel free to ask any other questions about Rajendra!",
        timestamp: getTimestamp(),
      },
    ]);
  }, []);

  // Desktop click focus: only refocus when clicked on non-interactive desktop space
  const handleTerminalClick = useCallback((e: React.MouseEvent) => {
    if (isMobile) return; // Do not steal click focus on mobile

    const selection = window.getSelection();
    if (selection && selection.toString().trim().length > 0) return;

    const target = e.target as HTMLElement;
    if (target.closest("button") || target.closest("input") || target.closest(".msg-bubble")) {
      return;
    }

    inputRef.current?.focus();
  }, [isMobile]);

  // Framer motion animation variants based on screen size
  const modalVariants = isMobile
    ? {
        initial: { opacity: 0, y: "100%" },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: "100%" },
        transition: { type: "spring", stiffness: 320, damping: 30 },
      }
    : isTablet
    ? {
        initial: { opacity: 0, scale: 0.94, y: 20 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.94, y: 20 },
        transition: { type: "spring", stiffness: 300, damping: 28 },
      }
    : {
        initial: { opacity: 0, scale: 0.93, y: -12 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.93, y: -12 },
        transition: { type: "spring", stiffness: 300, damping: 28 },
      };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop — closes terminal when clicking outside */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 60,
              background: isMobile ? "rgba(0, 0, 0, 0.65)" : isTablet ? "rgba(0, 0, 0, 0.45)" : "transparent",
              backdropFilter: isMobile || isTablet ? "blur(4px)" : "none",
              WebkitBackdropFilter: isMobile || isTablet ? "blur(4px)" : "none",
            }}
            onClick={onClose}
          />

          <motion.div
            key="ai-terminal"
            {...modalVariants}
            style={
              isMobile
                ? {
                    position: "fixed",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    width: "100%",
                    height: "88dvh",
                    maxHeight: "88dvh",
                    zIndex: 70,
                    display: "flex",
                    flexDirection: "column",
                    borderTopLeftRadius: "22px",
                    borderTopRightRadius: "22px",
                    overflow: "hidden",
                    background: "linear-gradient(175deg, #181a1f 0%, #0d0e12 100%)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderBottom: "none",
                    boxShadow: "0 -20px 60px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.06)",
                    userSelect: "text",
                  }
                : isTablet
                ? {
                    position: "fixed",
                    right: 20,
                    bottom: 24,
                    width: "min(520px, calc(100vw - 40px))",
                    height: "min(650px, calc(100dvh - 120px))",
                    zIndex: 70,
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: "18px",
                    overflow: "hidden",
                    background: "linear-gradient(170deg, #1a1b1e 0%, #111215 100%)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    boxShadow: "0 32px 80px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.06)",
                    userSelect: "text",
                  }
                : {
                    position: "fixed",
                    left: position.x,
                    top: position.y,
                    width: TERMINAL_W,
                    height: TERMINAL_H,
                    zIndex: 70,
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: "14px",
                    overflow: "hidden",
                    background: "linear-gradient(170deg, #1a1b1e 0%, #111215 100%)",
                    border: "1px solid rgba(255,255,255,0.10)",
                    boxShadow:
                      "0 32px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.08)",
                    userSelect: "text",
                  }
            }
            onClick={handleTerminalClick}
          >
            {/* ── Mobile Pull Indicator ── */}
            {isMobile && (
              <div 
                className="w-full flex justify-center pt-2.5 pb-1 cursor-grab active:cursor-grabbing shrink-0"
                onClick={onClose}
              >
                <div className="w-12 h-1.5 rounded-full bg-white/20 active:bg-white/40 transition-colors" />
              </div>
            )}

            {/* ── Title Bar ── */}
            <div
              onMouseDown={onTitleMouseDown}
              style={{
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: isMobile ? "8px 14px 10px" : "10px 14px",
                background: "linear-gradient(180deg, #282a2f 0%, #202125 100%)",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                cursor: !isMobile && !isTablet ? "grab" : "default",
                userSelect: "none",
              }}
            >
              {/* Left: Traffic lights (desktop/tablet) or Mobile Brand */}
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {!isMobile ? (
                  <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    {/* Red — close */}
                    <button
                      type="button"
                      onMouseDown={(e) => e.stopPropagation()}
                      onClick={(e) => {
                        e.stopPropagation();
                        onClose();
                      }}
                      aria-label="Close AI assistant"
                      className="group"
                      style={{
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #ff6159, #e0453e)",
                        border: "none",
                        cursor: "pointer",
                        position: "relative",
                        flexShrink: 0,
                      }}
                    >
                      <span
                        className="absolute inset-0 flex items-center justify-center rounded-full opacity-0 transition-opacity group-hover:opacity-100"
                        style={{ fontSize: "7px", color: "rgba(0,0,0,0.65)" }}
                      >
                        ✕
                      </span>
                    </button>
                    {/* Yellow */}
                    <div
                      style={{
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #ffbd2e, #e0a11a)",
                        flexShrink: 0,
                      }}
                    />
                    {/* Green */}
                    <div
                      style={{
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #28c840, #1aaa2e)",
                        flexShrink: 0,
                      }}
                    />
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: "#28c840",
                        boxShadow: "0 0 8px rgba(40,200,64,0.7)",
                        display: "inline-block",
                      }}
                    />
                    <span className="font-mono text-xs font-semibold tracking-wider text-white/90">
                      AI ASSISTANT
                    </span>
                  </div>
                )}
              </div>

              {/* Center: Title / Subtitle */}
              {!isMobile && (
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #3b82f6, #60a5fa)",
                      boxShadow: "0 0 6px rgba(59,130,246,0.8)",
                      flexShrink: 0,
                      display: "inline-block",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "monospace",
                      fontSize: 11,
                      color: "rgba(255,255,255,0.6)",
                      letterSpacing: "0.08em",
                      whiteSpace: "nowrap",
                    }}
                  >
                    rajendra-ai — portfolio-assistant
                  </span>
                </div>
              )}

              {/* Right: Actions (Clear button & Mobile close button) */}
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <button
                  type="button"
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleResetChat();
                  }}
                  title="Clear chat"
                  aria-label="Clear chat conversation"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: isMobile ? 32 : 26,
                    height: isMobile ? 32 : 26,
                    borderRadius: 6,
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "rgba(255,255,255,0.6)",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                  className="hover:text-white hover:bg-white/10 active:scale-95"
                >
                  <RotateCcw style={{ width: isMobile ? 14 : 12, height: isMobile ? 14 : 12 }} />
                </button>

                {/* Prominent close button for mobile & tablet touch targets */}
                {(isMobile || isTablet) && (
                  <button
                    type="button"
                    onMouseDown={(e) => e.stopPropagation()}
                    onClick={(e) => {
                      e.stopPropagation();
                      onClose();
                    }}
                    aria-label="Close AI assistant"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: isMobile ? 34 : 30,
                      height: isMobile ? 34 : 30,
                      borderRadius: 8,
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      color: "rgba(255,255,255,0.85)",
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                    }}
                    className="hover:text-white hover:bg-white/15 active:scale-95"
                  >
                    <X style={{ width: isMobile ? 18 : 16, height: isMobile ? 18 : 16 }} />
                  </button>
                )}

                {/* Desktop drag hint dots */}
                {!isMobile && !isTablet && (
                  <div style={{ display: "flex", gap: 2, opacity: 0.25, marginLeft: 6 }}>
                    {[0, 1, 2].map((r) =>
                      [0, 1, 2].map((c) => (
                        <span
                          key={`${r}-${c}`}
                          style={{
                            display: "block",
                            width: 2,
                            height: 2,
                            borderRadius: "50%",
                            background: "white",
                            margin: 1,
                          }}
                        />
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* ── Terminal body ── */}
            <div
              style={{
                flex: 1,
                minHeight: 0,
                overflowY: "auto",
                padding: isMobile ? "12px 14px" : "14px 16px",
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(59,130,246,0.3) transparent",
                userSelect: "text",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {/* Shell prompt header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 6,
                  marginBottom: 12,
                }}
              >
                <span style={{ fontFamily: "monospace", fontSize: isMobile ? 12 : 13, color: "#28c840" }}>
                  rajendra@portfolio
                </span>
                <span style={{ fontFamily: "monospace", fontSize: isMobile ? 12 : 13, color: "rgba(255,255,255,0.35)" }}>
                  ~
                </span>
                <span style={{ fontFamily: "monospace", fontSize: isMobile ? 12 : 13, color: "#3b82f6" }}>
                  %
                </span>
                <span style={{ fontFamily: "monospace", fontSize: isMobile ? 12 : 13, color: "rgba(255,255,255,0.7)" }}>
                  ask-ai --interactive
                </span>
              </div>

              {/* Messages */}
              <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? 12 : 10 }}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {msg.type === "system" && (
                      <div
                        style={{
                          borderRadius: 8,
                          padding: isMobile ? "9px 12px" : "8px 12px",
                          background: "rgba(59,130,246,0.08)",
                          border: "1px solid rgba(59,130,246,0.18)",
                          userSelect: "text",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                          <span style={{ fontFamily: "monospace", fontSize: 11, color: "#3b82f6" }}>▶ system</span>
                          <span style={{ fontFamily: "monospace", fontSize: 10, color: "rgba(255,255,255,0.3)" }}>
                            {msg.timestamp}
                          </span>
                        </div>
                        <p
                          style={{
                            fontFamily: "monospace",
                            fontSize: isMobile ? 13 : 12.5,
                            color: "rgba(255,255,255,0.75)",
                            lineHeight: 1.6,
                            margin: 0,
                            userSelect: "text",
                            cursor: "text",
                          }}
                        >
                          {msg.text}
                        </p>
                      </div>
                    )}

                    {msg.type === "user" && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 8,
                          userSelect: "text",
                          padding: isMobile ? "2px 0" : 0,
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "monospace",
                            fontSize: isMobile ? 14 : 13,
                            color: "#28c840",
                            paddingTop: 1,
                            flexShrink: 0,
                            userSelect: "none",
                          }}
                        >
                          ❯
                        </span>
                        <span
                          style={{
                            fontFamily: "monospace",
                            fontSize: isMobile ? 13.5 : 12.5,
                            color: "rgba(255,255,255,0.95)",
                            lineHeight: 1.55,
                            userSelect: "text",
                            cursor: "text",
                            wordBreak: "break-word",
                          }}
                        >
                          {msg.text}
                        </span>
                      </div>
                    )}

                    {msg.type === "assistant" && (
                      <div
                        className="msg-bubble group"
                        style={{
                          borderRadius: 10,
                          padding: isMobile ? "10px 13px" : "8px 12px",
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(255,255,255,0.07)",
                          userSelect: "text",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: 6,
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <span
                              style={{
                                display: "inline-block",
                                width: 6,
                                height: 6,
                                borderRadius: "50%",
                                background: "#3b82f6",
                                flexShrink: 0,
                              }}
                            />
                            <span style={{ fontFamily: "monospace", fontSize: 11, color: "#60a5fa" }}>
                              ai-assistant
                            </span>
                            <span style={{ fontFamily: "monospace", fontSize: 10, color: "rgba(255,255,255,0.3)" }}>
                              {msg.timestamp}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              copyMessage(msg.id, msg.text);
                            }}
                            aria-label="Copy response"
                            title="Copy response to clipboard"
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 4,
                              padding: isMobile ? "4px 9px" : "3px 8px",
                              borderRadius: 5,
                              background:
                                copiedId === msg.id ? "rgba(74,222,128,0.15)" : "rgba(255,255,255,0.06)",
                              border:
                                copiedId === msg.id
                                  ? "1px solid rgba(74,222,128,0.35)"
                                  : "1px solid rgba(255,255,255,0.1)",
                              color: copiedId === msg.id ? "#4ade80" : "rgba(255,255,255,0.7)",
                              fontFamily: "monospace",
                              fontSize: isMobile ? 11 : 10,
                              cursor: "pointer",
                              transition: "all 0.15s ease",
                            }}
                          >
                            {copiedId === msg.id ? (
                              <>
                                <Check style={{ width: 12, height: 12 }} />
                                <span>Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy style={{ width: 12, height: 12 }} />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                        <p
                          style={{
                            fontFamily: "monospace",
                            fontSize: isMobile ? 13.5 : 12.5,
                            color: "rgba(255,255,255,0.86)",
                            lineHeight: 1.7,
                            whiteSpace: "pre-wrap",
                            wordBreak: "break-word",
                            margin: 0,
                            userSelect: "text",
                            cursor: "text",
                          }}
                        >
                          {msg.text}
                        </p>
                      </div>
                    )}
                  </motion.div>
                ))}

                {/* Loading state */}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                      borderRadius: 8,
                      padding: "8px 12px",
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                      <span
                        style={{
                          display: "inline-block",
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: "#3b82f6",
                          boxShadow: "0 0 6px rgba(59,130,246,0.9)",
                          animation: "pulse 0.9s ease-in-out infinite",
                          flexShrink: 0,
                        }}
                      />
                      <span style={{ fontFamily: "monospace", fontSize: 11, color: "#60a5fa" }}>ai-assistant</span>
                    </div>
                    <span style={{ fontFamily: "monospace", fontSize: 13, color: "rgba(255,255,255,0.45)" }}>
                      thinking{dots}
                    </span>
                  </motion.div>
                )}

                <div ref={bottomRef} />
              </div>
            </div>

            {/* ── Quick Suggestions Bar ── */}
            <div
              style={{
                flexShrink: 0,
                padding: "8px 14px",
                background: "rgba(0,0,0,0.22)",
                borderTop: "1px solid rgba(255,255,255,0.05)",
                display: "flex",
                alignItems: "center",
                gap: 6,
                overflowX: "auto",
                WebkitOverflowScrolling: "touch",
                scrollbarWidth: "none",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  color: "#60a5fa",
                  fontFamily: "monospace",
                  fontSize: 10,
                  flexShrink: 0,
                  opacity: 0.8,
                  marginRight: 2,
                }}
              >
                <Sparkles style={{ width: 12, height: 12 }} />
                <span className="hidden sm:inline">Suggestions:</span>
              </div>
              {SUGGESTIONS.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  disabled={isLoading}
                  onClick={() => executeQuestion(item.query)}
                  style={{
                    flexShrink: 0,
                    fontFamily: "monospace",
                    fontSize: isMobile ? 12 : 11,
                    padding: isMobile ? "5px 11px" : "4px 9px",
                    borderRadius: 9999,
                    background: "rgba(59,130,246,0.08)",
                    border: "1px solid rgba(59,130,246,0.25)",
                    color: "rgba(147,197,253,0.95)",
                    cursor: isLoading ? "not-allowed" : "pointer",
                    transition: "all 0.15s ease",
                    whiteSpace: "nowrap",
                  }}
                  className="hover:bg-blue-500/20 hover:border-blue-500/50 active:scale-95 disabled:opacity-50"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* ── Input bar ── */}
            <div
              style={{
                flexShrink: 0,
                padding: isMobile ? "10px 14px max(14px, env(safe-area-inset-bottom))" : "10px 14px 12px",
                background: "rgba(0,0,0,0.36)",
                borderTop: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  borderRadius: 12,
                  padding: isMobile ? "7px 12px" : "8px 12px",
                  background: "rgba(255,255,255,0.04)",
                  border: isFocused
                    ? "1px solid rgba(74,222,128,0.55)"
                    : "1px solid rgba(255,255,255,0.09)",
                  boxShadow: isFocused
                    ? "0 0 0 3px rgba(74,222,128,0.10), 0 0 14px rgba(74,222,128,0.12)"
                    : "none",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                }}
                onClick={() => inputRef.current?.focus()}
              >
                <span
                  style={{
                    fontFamily: "monospace",
                    fontSize: 14,
                    color: "#4ade80",
                    userSelect: "none",
                    flexShrink: 0,
                  }}
                >
                  ❯
                </span>

                {/* Custom blinking block cursor (desktop/tablet when empty & focused) */}
                {!isMobile && isFocused && !input && !isLoading && (
                  <span
                    style={{
                      fontFamily: "monospace",
                      fontSize: 15,
                      fontWeight: 700,
                      color: cursorVisible ? "#4ade80" : "transparent",
                      textShadow: cursorVisible ? "0 0 8px rgba(74,222,128,0.9)" : "none",
                      userSelect: "none",
                      lineHeight: 1,
                      transition: "color 0.05s",
                      flexShrink: 0,
                      marginLeft: -6,
                    }}
                    aria-hidden
                  >
                    █
                  </span>
                )}

                <input
                  ref={inputRef}
                  id="ai-assistant-input"
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder={
                    isMobile
                      ? "Ask about Rajendra..."
                      : isFocused
                      ? ""
                      : "Ask anything about Rajendra..."
                  }
                  disabled={isLoading}
                  aria-label="Ask AI assistant about Rajendra"
                  autoComplete="off"
                  style={{
                    flex: 1,
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    fontFamily: "monospace",
                    // Crucial: 16px on mobile prevents iOS Safari from automatically zooming into the page!
                    fontSize: isMobile ? "16px" : "13.5px",
                    fontWeight: 500,
                    color: "rgba(255,255,255,0.94)",
                    caretColor: "#4ade80",
                    minWidth: 0,
                  }}
                />

                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={sendMessage}
                  disabled={isLoading || !input.trim()}
                  aria-label="Send message"
                  style={{
                    flexShrink: 0,
                    width: isMobile ? 38 : 30,
                    height: isMobile ? 38 : 30,
                    borderRadius: 8,
                    border: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: input.trim() && !isLoading ? "pointer" : "not-allowed",
                    background:
                      input.trim() && !isLoading
                        ? "linear-gradient(135deg, #3b82f6, #2563eb)"
                        : "rgba(255,255,255,0.07)",
                    boxShadow: input.trim() && !isLoading ? "0 0 12px rgba(59,130,246,0.45)" : "none",
                    transition: "all 0.2s ease",
                  }}
                  className="active:scale-95"
                >
                  <Send
                    style={{
                      width: isMobile ? 16 : 13,
                      height: isMobile ? 16 : 13,
                      color: input.trim() && !isLoading ? "white" : "rgba(255,255,255,0.3)",
                      marginLeft: 1,
                    }}
                  />
                </button>
              </div>

              <p
                style={{
                  marginTop: 6,
                  textAlign: "center",
                  fontFamily: "monospace",
                  fontSize: 10,
                  color: "rgba(255,255,255,0.35)",
                }}
              >
                {isMobile
                  ? "Tap suggestion or enter question · Powered by Groq AI"
                  : isTablet
                  ? "Enter to send · Tap suggestion chips · Powered by Groq AI"
                  : "Drag title bar to move · Enter to send · Powered by Groq AI"}
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
