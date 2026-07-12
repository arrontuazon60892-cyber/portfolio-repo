import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "../lib/utils";

export default function Modal({ isOpen, onClose, children, isDark }) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
                >
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                        className={cn(
                            "relative w-full max-w-4xl overflow-hidden rounded-[2rem] border pointer-events-auto shadow-[0_30px_90px_rgba(0,0,0,0.42)] backdrop-blur-2xl",
                            isDark
                                ? "border-cyan-400/14 bg-[linear-gradient(180deg,rgba(9,16,31,0.96),rgba(7,12,24,0.96))] text-white"
                                : "border-slate-200 bg-white text-black"
                        )}
                    >
                        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(77,201,255,0.8),transparent)]" />
                        <button
                            onClick={onClose}
                            className={cn(
                                "absolute top-4 right-4 z-10 p-2 rounded-full shadow-lg border hover:scale-110 transition-all duration-200",
                                isDark 
                                    ? "bg-slate-900/90 text-white border-cyan-400/16" 
                                    : "bg-white/90 text-slate-900 border-slate-200"
                            )}
                            aria-label="Close modal"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <div className="p-2 sm:p-4">
                            {children}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
