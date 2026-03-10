import { motion } from "framer-motion";
import { cn } from "../lib/utils";

const animations = {
    fadeIn: {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
    },
    slideUp: {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
    },
    slideDown: {
        initial: { opacity: 0, y: -30 },
        whileInView: { opacity: 1, y: 0 },
    },
    slideLeft: {
        initial: { opacity: 0, x: 30 },
        whileInView: { opacity: 1, x: 0 },
    },
    slideRight: {
        initial: { opacity: 0, x: -30 },
        whileInView: { opacity: 1, x: 0 },
    },
    zoomIn: {
        initial: { opacity: 0, scale: 0.9 },
        whileInView: { opacity: 1, scale: 1 },
    },
    softScale: {
        initial: { opacity: 0, scale: 0.95 },
        whileInView: { opacity: 1, scale: 1 },
    },
};

export default function AnimatedSection({
    children,
    className,
    animation = "slideUp",
    delay = 0,
    duration = 0.6,
    once = true,
}) {
    const selectedAnimation = animations[animation] || animations.slideUp;

    return (
        <motion.div
            initial={selectedAnimation.initial}
            whileInView={selectedAnimation.whileInView}
            viewport={{ once }}
            transition={{
                duration,
                delay,
                ease: [0.21, 0.47, 0.32, 0.98], // Custom easing for premium feel
            }}
            className={cn("w-full", className)}
        >
            {children}
        </motion.div>
    );
}
