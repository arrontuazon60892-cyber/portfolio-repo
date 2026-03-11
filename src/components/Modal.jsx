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
                            "relative w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden pointer-events-auto",
                            isDark ? "bg-slate-900 text-white" : "bg-white text-black"
                        )}
                    >
                        <button
                            onClick={onClose}
                            className={cn(
                                "absolute top-4 right-4 z-10 p-2 rounded-full shadow-lg border hover:scale-110 transition-all duration-200",
                                isDark 
                                    ? "bg-slate-800/90 text-white border-slate-700" 
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
