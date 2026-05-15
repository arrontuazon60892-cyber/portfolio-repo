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
      animate={{
        scale: isDark ? [1, 1.03, 1] : [1, 1.025, 1],
      }}
      transition={transition}
      className="relative isolate shrink-0"
    >
      <motion.div
        animate={{
          background: isDark
            ? "radial-gradient(circle at 44% 34%, rgba(59, 130, 246, 0.14), transparent 36%), radial-gradient(circle at 52% 52%, rgba(15, 23, 42, 0.98), rgba(2, 6, 23, 0.92) 68%, rgba(0, 0, 0, 1) 100%)"
            : "radial-gradient(circle at 35% 30%, rgba(255, 255, 255, 0.96), rgba(243, 244, 246, 0.9) 58%, rgba(229, 231, 235, 0.7) 100%)",
          boxShadow: isDark
            ? "0 28px 65px rgba(2, 6, 23, 0.48)"
            : "0 24px 60px rgba(15, 23, 42, 0.12)",
        }}
        transition={transition}
        className="absolute inset-[-16px] rounded-[2rem] sm:inset-[-20px]"
      >
        <motion.div
          animate={{
            opacity: isDark ? 1 : 0.35,
            scale: isDark ? 1 : 0.92,
          }}
          transition={transition}
          className="absolute inset-0 rounded-[2rem]"
          style={{
            background:
              "radial-gradient(circle at 50% 48%, transparent 0%, transparent 30%, rgba(2, 6, 23, 0.18) 70%, rgba(2, 6, 23, 0.42) 100%)",
          }}
        />
      </motion.div>

      <div className="relative h-40 w-40 overflow-hidden rounded-[1.75rem] sm:h-48 sm:w-48">
        <motion.div
          animate={{
            opacity: isDark ? 0 : 1,
            filter: isDark ? "blur(10px)" : "blur(0px)",
          }}
          transition={transition}
          className="absolute inset-0"
        >
          <img
            src={profileLight}
            alt="Arron Tuazon portrait in light theme"
            className="h-full w-full object-cover"
            draggable="false"
          />
        </motion.div>

        <motion.div
          animate={{
            opacity: isDark ? 1 : 0,
            filter: isDark ? "blur(0px)" : "blur(10px)",
          }}
          transition={transition}
          className="absolute inset-0"
        >
          <img
            src={profileDark}
            alt="Arron Tuazon portrait in dark theme"
            className={cn(
              "h-full w-full object-cover",
              isDark ? "brightness-[1.04] contrast-[1.03]" : "brightness-100"
            )}
            draggable="false"
          />
        </motion.div>

        <motion.div
          aria-hidden="true"
          animate={{
            opacity: isDark ? 1 : 0,
          }}
          transition={transition}
          className="pointer-events-none absolute inset-0 rounded-[1.75rem]"
          style={{
            background:
              "radial-gradient(circle at 48% 35%, transparent 0%, transparent 38%, rgba(6, 10, 18, 0.05) 56%, rgba(6, 10, 18, 0.22) 100%)",
          }}
        />
      </div>
    </motion.div>
  );
}
