import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function Modal({ isOpen, onClose, children }) {
    const dialogRef = useRef(null);
    const closeRef = useRef(null);
    const returnFocusRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            returnFocusRef.current = document.activeElement;
            document.body.style.overflow = "hidden";
            const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 0);
            const onKeyDown = (event) => {
                if (event.key === "Escape") onClose();
                if (event.key === "Tab" && dialogRef.current) {
                    const controls = [...dialogRef.current.querySelectorAll('button:not(:disabled),a[href]')];
                    if (!controls.length) return;
                    const first = controls[0];
                    const last = controls[controls.length - 1];
                    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
                    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
                }
            };
            window.addEventListener("keydown", onKeyDown);
            return () => {
                window.clearTimeout(focusTimer);
                window.removeEventListener("keydown", onKeyDown);
                document.body.style.overflow = "unset";
                returnFocusRef.current?.focus?.({ preventScroll: true });
            };
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen, onClose]);

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
                        ref={dialogRef}
                        role="dialog"
                        aria-modal="true"
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                        className="relative w-full max-w-4xl overflow-hidden rounded-[2rem] border border-cyan-400/14 bg-[linear-gradient(180deg,rgba(9,16,31,0.96),rgba(7,12,24,0.96))] text-white pointer-events-auto shadow-[0_30px_90px_rgba(0,0,0,0.42)] backdrop-blur-2xl"
                    >
                        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(77,201,255,0.8),transparent)]" />
                        <button
                            ref={closeRef}
                            onClick={onClose}
                            className="absolute top-4 right-4 z-10 p-2 rounded-full shadow-lg border hover:scale-110 transition-all duration-200 bg-slate-900/90 text-white border-cyan-400/16"
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
