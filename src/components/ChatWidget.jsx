import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { MessageSquare, Send, Sparkles, X } from "lucide-react";
import { cn } from "../lib/utils";
import { getInitialMessages, getQuickReplies } from "../lib/arronChat";

export default function ChatWidget() {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(getInitialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const sendMessage = async (text) => {
    const trimmed = text.trim();

    if (!trimmed || isLoading) {
      return;
    }

    const userMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      text: trimmed,
    };

    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");

    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: nextMessages.map(({ role, text: messageText }) => ({
            role,
            text: messageText,
          })),
        }),
      });

      const data = await response.json();

      const replyMessage = {
        id: `assistant-${Date.now() + 1}`,
        role: "assistant",
        text:
          data?.text ||
          data?.error ||
          "Something went wrong while contacting the AI.",
      };

      setMessages((current) => [...current, replyMessage]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          id: `assistant-${Date.now() + 1}`,
          role: "assistant",
          text:
            "I couldn't reach the AI service right now. Check the server setup, then try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isMounted) {
    return null;
  }

  return createPortal(
    <div className="pointer-events-none fixed bottom-6 right-6 z-[2147483647]">
      <AnimatePresence>
        {isOpen && (
          <motion.section
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto mb-4 w-[min(92vw,24rem)] overflow-hidden rounded-[1.75rem] border border-cyan-400/14 bg-[#08111f]/92 text-white shadow-[0_30px_90px_rgba(0,0,0,0.42)] backdrop-blur-xl"
          >
            <div
              className="relative overflow-hidden px-5 py-4 bg-[radial-gradient(circle_at_top_left,_rgba(77,201,255,0.18),_transparent_45%),radial-gradient(circle_at_top_right,_rgba(123,97,255,0.14),_transparent_42%),linear-gradient(135deg,_rgba(255,255,255,0.05),_rgba(255,255,255,0))]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-[linear-gradient(135deg,rgba(123,97,255,0.8),rgba(77,201,255,0.92))] text-white shadow-[0_0_24px_rgba(77,201,255,0.24)]">
                      <Sparkles size={16} />
                    </span>
                    <div>
                      <p className="text-sm font-bold">Ask the Assistant</p>
                      <p className="text-xs opacity-70">Real AI answers, plus Arron context when needed</p>
                    </div>
                  </div>
                  <p className="max-w-[17rem] text-xs leading-relaxed opacity-80">
                    Ask about coding, school topics, problem solving, or anything about Arron and this portfolio.
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-full p-2 transition-colors hover:bg-white/10"
                  aria-label="Close chat"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            <div ref={scrollRef} className="max-h-[24rem] space-y-4 overflow-y-auto px-4 py-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex",
                    message.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm",
                      message.role === "user"
                        ? "bg-[linear-gradient(135deg,rgba(104,114,255,0.96),rgba(77,201,255,0.92))] text-white"
                        : "bg-white/6 text-white"
                    )}
                  >
                    {message.text}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div
                    className="max-w-[85%] rounded-2xl bg-white/8 px-4 py-3 text-sm leading-relaxed text-white shadow-sm"
                  >
                    Thinking...
                  </div>
                </div>
              )}
            </div>

            <div className="px-4 pb-3">
              <div className="mb-3 flex flex-wrap gap-2">
                {getQuickReplies().map((reply) => (
                  <button
                    key={reply}
                    onClick={() => {
                      void sendMessage(reply);
                    }}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium transition-colors hover:border-cyan-400/24 hover:bg-white/9"
                  >
                    {reply}
                  </button>
                ))}
              </div>

              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  void sendMessage(input);
                }}
                className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-2"
              >
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask anything..."
                  disabled={isLoading}
                  className="flex-1 bg-transparent px-2 text-sm outline-none placeholder:opacity-50"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[linear-gradient(135deg,rgba(104,114,255,0.96),rgba(77,201,255,0.92))] text-white transition-transform hover:scale-105"
                  aria-label="Send message"
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen((current) => !current)}
        className="pointer-events-auto flex items-center gap-2 rounded-2xl border border-cyan-400/18 bg-[linear-gradient(135deg,rgba(10,18,34,0.94),rgba(13,24,46,0.94))] px-6 py-3 text-sm font-bold text-white shadow-[0_24px_60px_rgba(0,0,0,0.36)] transition-transform hover:scale-105"
      >
        <MessageSquare size={18} />
        {isOpen ? "Close chat" : "Chat with Arron"}
      </button>
    </div>,
    document.body
  );
}
