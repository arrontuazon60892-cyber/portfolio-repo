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

  return (
    <div className={cn("media-grid-container", `media-grid--${variant}`)}>
      <div className={cn("media-grid", variant === "creative" && "graphic-design-grid")}>
        {items.map((item, index) => {
          return (
            <motion.button
              key={item.id}
              type="button"
              aria-label={`Open ${item.title}`}
              className={cn(
                "media-loop-card",
                item.type === "video" && "media-loop-card--video"
              )}
              onClick={(event) => open(index, event.currentTarget)}
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: Math.min(index, 5) * 0.04 }}
            >
              <div className="media-loop-card__media">
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
