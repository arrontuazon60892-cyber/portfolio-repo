"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const INTRO_KEY = "at_portfolio_intro_seen";

export default function IntroScreen({ onComplete }) {
  const [phase, setPhase] = useState("enter"); // enter | hold | exit

  useEffect(() => {
    // Hold for ~1.8s then exit
    const holdTimer = setTimeout(() => setPhase("exit"), 1800);
    return () => clearTimeout(holdTimer);
  }, []);

  const handleExitComplete = () => {
    sessionStorage.setItem(INTRO_KEY, "1");
    onComplete?.();
  };

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {phase !== "exit" && (
        <motion.div
          key="intro"
          className="intro-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04, filter: "blur(12px)" }}
          transition={{
            enter: { duration: 0.35 },
            exit: { duration: 0.65, ease: [0.4, 0, 0.2, 1] },
          }}
          aria-hidden="true"
        >
          {/* Background grid */}
          <div className="intro-grid" />

          {/* Glowing orb */}
          <div className="intro-orb intro-orb--1" />
          <div className="intro-orb intro-orb--2" />

          {/* Center content */}
          <div className="intro-center">
            {/* Monogram */}
            <motion.div
              className="intro-monogram"
              initial={{ opacity: 0, scale: 0.78, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              AT
            </motion.div>

            {/* Name */}
            <motion.h1
              className="intro-name"
              initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              Arron Tuazon
            </motion.h1>

            {/* Tagline */}
            <motion.p
              className="intro-tagline"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.32, ease: "easeOut" }}
            >
              AI-Powered Full Stack Developer
            </motion.p>

            {/* Progress bar */}
            <motion.div
              className="intro-progress"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
            >
              <motion.div
                className="intro-progress__fill"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
              />
            </motion.div>

            {/* Status text */}
            <motion.p
              className="intro-status"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              Initializing Creative Systems
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Call this to check if the intro should be skipped */
export function shouldShowIntro() {
  if (typeof window === "undefined") return false;
  return !sessionStorage.getItem(INTRO_KEY);
}
