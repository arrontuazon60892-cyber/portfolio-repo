import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageSquare, Send, Sparkles, X } from "lucide-react";
import { cn } from "../lib/utils";
import {
  getArronReply,
  getInitialMessages,
  getQuickReplies,
} from "../lib/arronChat";

export default function ChatWidget({ isDark }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(getInitialMessages);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const sendMessage = (text) => {
    const trimmed = text.trim();

    if (!trimmed) {
      return;
    }

    const userMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      text: trimmed,
    };

    const replyMessage = {
      id: `assistant-${Date.now() + 1}`,
      role: "assistant",
      text: getArronReply(trimmed),
    };

    setMessages((current) => [...current, userMessage, replyMessage]);
    setInput("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.section
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "mb-4 w-[min(92vw,24rem)] overflow-hidden rounded-[1.75rem] border shadow-2xl backdrop-blur-xl",
              isDark
                ? "border-white/10 bg-[#0c0c0c]/95 text-white"
                : "border-black/10 bg-white/95 text-black"
            )}
          >
            <div
              className={cn(
                "relative overflow-hidden px-5 py-4",
                isDark
                  ? "bg-[radial-gradient(circle_at_top_left,_rgba(250,204,21,0.2),_transparent_45%),linear-gradient(135deg,_rgba(255,255,255,0.05),_rgba(255,255,255,0))]"
                  : "bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.18),_transparent_42%),linear-gradient(135deg,_rgba(0,0,0,0.04),_rgba(0,0,0,0))]"
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-black text-white dark:bg-white dark:text-black">
                      <Sparkles size={16} />
                    </span>
                    <div>
                      <p className="text-sm font-bold">Chat with Arron</p>
                      <p className="text-xs opacity-70">Friendly, chill, medyo witty</p>
                    </div>
                  </div>
                  <p className="max-w-[17rem] text-xs leading-relaxed opacity-80">
                    Ask about his projects, school life, hobbies, or the random stuff that makes him Arron.
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "rounded-full p-2 transition-colors",
                    isDark ? "hover:bg-white/10" : "hover:bg-black/5"
                  )}
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
                        ? "bg-blue-600 text-white"
                        : isDark
                          ? "bg-white/8 text-white"
                          : "bg-black/[0.04] text-black"
                    )}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="px-4 pb-3">
              <div className="mb-3 flex flex-wrap gap-2">
                {getQuickReplies().map((reply) => (
                  <button
                    key={reply}
                    onClick={() => sendMessage(reply)}
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                      isDark
                        ? "border-white/10 bg-white/5 hover:bg-white/10"
                        : "border-black/10 bg-black/[0.03] hover:bg-black/[0.06]"
                    )}
                  >
                    {reply}
                  </button>
                ))}
              </div>

              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  sendMessage(input);
                }}
                className={cn(
                  "flex items-center gap-2 rounded-2xl border p-2",
                  isDark ? "border-white/10 bg-white/5" : "border-black/10 bg-black/[0.02]"
                )}
              >
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask about Arron..."
                  className="flex-1 bg-transparent px-2 text-sm outline-none placeholder:opacity-50"
                />
                <button
                  type="submit"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white transition-transform hover:scale-105"
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
        className="flex items-center gap-2 rounded-2xl bg-black px-6 py-3 text-sm font-bold text-white shadow-xl transition-transform hover:scale-105 dark:bg-white dark:text-black"
      >
        <MessageSquare size={18} />
        {isOpen ? "Close chat" : "Chat with Arron"}
      </button>
    </div>
  );
}
