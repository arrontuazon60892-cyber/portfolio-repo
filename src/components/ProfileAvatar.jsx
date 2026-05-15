import React, { useEffect } from "react";
import { motion } from "framer-motion";
import profileLight from "../assets/profile.jpg";
import profileDark from "../assets/profile-hover.jpg";
import { cn } from "../lib/utils";

const transition = {
  duration: 0.68,
  ease: [0.4, 0, 0.2, 1],
};

export default function ProfileAvatar({ isDark }) {
  useEffect(() => {
    [profileLight, profileDark].forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  return (
    <motion.div
      key={isDark ? "dark-avatar" : "light-avatar"}
      initial={false}
      animate={{
        scale: isDark ? [1, 1.022, 1] : [1, 1.018, 1],
      }}
      transition={transition}
      className="relative isolate shrink-0"
    >
      <motion.div
        animate={{
          opacity: isDark ? 1 : 0.82,
          scale: isDark ? 1 : 0.96,
        }}
        transition={transition}
        className="pointer-events-none absolute inset-[-18px] -z-10 rounded-[2rem] sm:inset-[-24px]"
        style={{
          background: isDark
            ? "radial-gradient(circle at 50% 40%, rgba(37, 99, 235, 0.18), transparent 34%), radial-gradient(circle at 50% 55%, rgba(15, 23, 42, 0.82), rgba(2, 6, 23, 0.22) 62%, transparent 100%)"
            : "radial-gradient(circle at 48% 42%, rgba(255, 255, 255, 0.96), rgba(243, 244, 246, 0.72) 55%, rgba(255, 255, 255, 0) 100%)",
          filter: "blur(14px)",
        }}
      />

      <div className="relative h-40 w-40 overflow-hidden rounded-[1.65rem] sm:h-48 sm:w-48">
        <div
          className={cn(
            "absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]",
            isDark ? "opacity-0 blur-sm scale-[1.015]" : "opacity-100 blur-0 scale-100"
          )}
        >
          <img
            src={profileLight}
            alt="Arron Tuazon portrait in light theme"
            className="h-full w-full object-cover"
            draggable="false"
          />
        </div>

        <div
          className={cn(
            "absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]",
            isDark ? "opacity-100 blur-0 scale-100" : "opacity-0 blur-sm scale-[1.015]"
          )}
        >
          <img
            src={profileDark}
            alt="Arron Tuazon portrait in dark theme"
            className={cn(
              "h-full w-full object-cover transition-[filter] duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]",
              isDark ? "brightness-[1.03] contrast-[1.04]" : "brightness-100"
            )}
            draggable="false"
          />
        </div>

        <motion.div
          aria-hidden="true"
          animate={{
            opacity: isDark ? 1 : 0,
          }}
          transition={transition}
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 38%, transparent 0%, transparent 42%, rgba(6, 10, 18, 0.04) 62%, rgba(6, 10, 18, 0.2) 100%)",
          }}
        />
      </div>
    </motion.div>
  );
}
