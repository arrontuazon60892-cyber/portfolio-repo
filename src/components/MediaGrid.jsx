"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import MediaModal from "./MediaModal";
import { SafeImage, SafeVideoPreview } from "./MediaThumbnail";
import { cn } from "../lib/utils";

export default function MediaGrid({ items, variant = "creative" }) {
  const triggerRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const selected = selectedIndex === null ? null : items[selectedIndex];

  const open = (index, trigger) => {
    triggerRef.current = trigger;
    setSelectedIndex(index);
  };
  
  const close = () => {
    setSelectedIndex(null);
    window.setTimeout(() => triggerRef.current?.focus({ preventScroll: true }), 0);
  };
  
  const move = (delta) =>
    setSelectedIndex((current) =>
      current === null ? 0 : (current + delta + items.length) % items.length
    );

  const visibleItems = items.slice(0, 16);

  return (
    <div className={cn("media-grid-container", `media-grid--${variant}`)}>
      <div className="project-grid">
        {visibleItems.map((item, index) => {
          return (
            <motion.button
              key={item.id || item.src}
              type="button"
              aria-label={`Open ${item.title}`}
              className={cn(
                "project-card",
                item.type === "video" && "project-card--video"
              )}
              onClick={(event) => open(index, event.currentTarget)}
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.45, delay: Math.min(index, 7) * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="project-card__media">
                {item.type === "video" ? (
                  <SafeVideoPreview item={item} enabled={!selected} />
                ) : (
                  <SafeImage item={item} />
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
      <MediaModal
        isOpen={Boolean(selected)}
        item={selected}
        onClose={close}
        onPrevious={() => move(-1)}
        onNext={() => move(1)}
      />
    </div>
  );
}
