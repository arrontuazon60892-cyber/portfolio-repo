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
    <div className="pointer-events-none fixed bottom-6 right-6 z-[110]">
      <AnimatePresence>
        {isOpen && (
          <motion.section
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto mb-4 w-[min(92vw,24rem)] overflow-hidden rounded-md border border-neutral-200 bg-white text-neutral-900 shadow-none"
          >
            <div
              className="relative overflow-hidden border-b border-neutral-200 px-5 py-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 bg-neutral-50 text-neutral-900">
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
                  className="rounded-full p-2 transition-colors hover:bg-neutral-100"
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
                      "max-w-[85%] rounded-[1.25rem] px-4 py-3 text-sm leading-relaxed shadow-sm",
                      message.role === "user"
                        ? "bg-neutral-900 text-white"
                        : "border border-neutral-200 bg-neutral-50 text-neutral-900"
                    )}
                  >
                    {message.text}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div
                    className="max-w-[85%] rounded-[1.25rem] border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm leading-relaxed text-neutral-900 shadow-sm"
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
                    className="rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium transition-all hover:border-neutral-400"
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
                className="flex items-center gap-2 rounded-xl border border-neutral-200 bg-white p-2 transition-all focus-within:border-neutral-400"
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
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-900 text-white"
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
        className="pointer-events-auto flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-5 py-3 text-sm font-medium text-neutral-900"
      >
        <MessageSquare size={18} />
        {isOpen ? "Close chat" : "Chat with Arron"}
      </button>
    </div>,
    document.body
  );
}
