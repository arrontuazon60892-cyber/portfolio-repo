"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const INTRO_KEY = "at_portfolio_intro_seen";

export default function IntroScreen({ onComplete }) {
  const [phase, setPhase] = useState("name");

  useEffect(() => {
    const portfolioTimer = setTimeout(() => setPhase("portfolio"), 850);
    const exitTimer = setTimeout(() => setPhase("exit"), 2050);
    return () => {
      clearTimeout(portfolioTimer);
      clearTimeout(exitTimer);
    };
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
          <div className="intro-center">
            <AnimatePresence mode="wait">
              <motion.h1
                key={phase === "portfolio" ? "portfolio" : "name"}
                className="intro-name"
                initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
                transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
              >
                {phase === "portfolio" ? "Portfolio" : "Arron Tuazon"}
              </motion.h1>
            </AnimatePresence>
            <motion.div
              className="intro-progress"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.28 }}
            >
              <motion.div
                className="intro-progress__fill"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.65, delay: 0.22, ease: [0.4, 0, 0.2, 1] }}
              />
            </motion.div>
            <motion.p
              className="intro-status"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.44 }}
            >
              Loading selected work
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
