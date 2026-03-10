import React from "react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";

// Import screenshots
import ss1 from "../assets/Screenshot 2026-03-10 172615.png";
import ss2 from "../assets/Screenshot 2026-03-10 172642.png";
import ss3 from "../assets/Screenshot 2026-03-10 172708.png";
import ss4 from "../assets/Screenshot 2026-03-10 172758.png";
import ss5 from "../assets/Screenshot 2026-03-10 172838.png";

const screenshots = [ss1, ss2, ss3, ss4, ss5];

export default function PrintFlowCarousel({ isDark }) {
    // Duplicate images for infinite loop effect
    const duplicatedScreenshots = [...screenshots, ...screenshots];

    return (
        <div className="w-full overflow-hidden py-12 relative">
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-slate-50 dark:from-[#020617] to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-slate-50 dark:from-[#020617] to-transparent z-10" />

            <motion.div
                className="flex gap-6 w-max"
                animate={{
                    x: ["0%", "-50%"]
                }}
                transition={{
                    duration: 30,
                    ease: "linear",
                    repeat: Infinity,
                }}
                whileHover={{ animationPlayState: "paused" }}
            >
                {duplicatedScreenshots.map((src, index) => (
                    <motion.div
                        key={index}
                        className={cn(
                            "flex-shrink-0 w-[280px] sm:w-[350px] aspect-video rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-lg transition-all duration-500",
                            "hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 z-0 hover:z-20 relative"
                        )}
                    >
                        <img
                            src={src}
                            alt={`PrintFlow Screenshot ${index + 1}`}
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
