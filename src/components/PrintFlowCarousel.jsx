import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../lib/utils";

// Import screenshots
import pf1 from "../assets/printflow.png";
import pf2 from "../assets/printflow1.png";
import pf3 from "../assets/printflow2.png";
import pf4 from "../assets/printflow3.png";
import pf5 from "../assets/printflow4.png";

const screenshots = [pf1, pf2, pf3, pf4, pf5];

export default function PrintFlowCarousel({ isDark }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % screenshots.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
    };

    // Auto-loop
    useEffect(() => {
        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full group">
            <div className="overflow-hidden rounded-xl aspect-video bg-slate-100 dark:bg-slate-800">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={currentIndex}
                        src={screenshots[currentIndex]}
                        alt={`PrintFlow Screenshot ${currentIndex + 1}`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="w-full h-full object-contain"
                    />
                </AnimatePresence>
            </div>

            {/* Navigation Arrows */}
            {screenshots.length > 1 && (
                <>
                    <button
                        onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 dark:bg-black/20 backdrop-blur-md text-white border border-white/30 hover:bg-white/40 transition-all opacity-0 group-hover:opacity-100"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 dark:bg-black/20 backdrop-blur-md text-white border border-white/30 hover:bg-white/40 transition-all opacity-0 group-hover:opacity-100"
                    >
                        <ChevronRight size={24} />
                    </button>
                </>
            )}

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {screenshots.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
                        className={cn(
                            "w-2 h-2 rounded-full transition-all",
                            currentIndex === idx 
                                ? "bg-white w-6" 
                                : "bg-white/40 hover:bg-white/60"
                        )}
                    />
                ))}
            </div>
        </div>
    );
}
