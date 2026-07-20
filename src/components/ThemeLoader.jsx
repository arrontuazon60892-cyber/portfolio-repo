"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export default function ThemeLoader() {
  const [visible, setVisible] = useState(true);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), reducedMotion ? 180 : 820);
    return () => window.clearTimeout(timer);
  }, [reducedMotion]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="v2-loader"
          aria-hidden="true"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, visibility: "hidden" }}
          transition={{ duration: reducedMotion ? 0.08 : 0.38, ease: "easeOut" }}
        >
          <div className="v2-loader__glow" />
          <motion.div
            className="v2-loader__mark"
            initial={reducedMotion ? false : { opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <span>&lt;</span> AT <span>/&gt;</span>
          </motion.div>
          <div className="v2-loader__track"><span /></div>
          <p>Creative technology · visual storytelling</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
