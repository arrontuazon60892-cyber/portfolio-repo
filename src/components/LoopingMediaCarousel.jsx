"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import MediaModal from "./MediaModal";
import { SafeImage, SafeVideoPreview } from "./MediaThumbnail";
import { cn } from "../lib/utils";

export default function LoopingMediaCarousel({ items, direction = "left", variant = "creative" }) {
  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [visible, setVisible] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);
  const selected = selectedIndex === null ? null : items[selectedIndex];
  const paused = hovered || focused || dragging || !visible || !tabVisible || Boolean(selected);

  useEffect(() => {
    const root = rootRef.current;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: "100px" });
    if (root) observer.observe(root);
    const onVisibility = () => setTabVisible(!document.hidden);
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", onVisibility); };
  }, []);

  const open = (index, trigger) => { triggerRef.current = trigger; setSelectedIndex(index); };
  const close = () => { setSelectedIndex(null); window.setTimeout(() => triggerRef.current?.focus({ preventScroll: true }), 0); };
  const move = (delta) => setSelectedIndex((current) => current === null ? 0 : (current + delta + items.length) % items.length);

  return (
    <div ref={rootRef} className={cn("media-loop", `media-loop--${direction}`, `media-loop--${variant}`, paused && "is-paused")}>
      <div
        className="media-loop__viewport"
        onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
        onFocusCapture={() => setFocused(true)} onBlurCapture={(event) => !event.currentTarget.contains(event.relatedTarget) && setFocused(false)}
        onPointerDown={() => setDragging(true)} onPointerUp={() => window.setTimeout(() => setDragging(false), 500)} onPointerCancel={() => setDragging(false)}
      >
        <div className="media-loop__track">
          {[0, 1].map((cycle) => (
            <div className="media-loop__set" key={cycle} aria-hidden={cycle ? "true" : undefined}>
              {items.map((item, index) => {
                return (
                  <motion.button key={`${cycle}-${item.id}`} type="button" tabIndex={cycle ? -1 : 0} aria-label={cycle ? undefined : `Open ${item.title}`} className={cn("media-loop-card", (item.type === "video" || item.type === "external-video") && "media-loop-card--video")} onClick={(event) => open(index, event.currentTarget)} initial={cycle ? false : { opacity: 0, y: 18, scale: 0.98 }} whileInView={cycle ? undefined : { opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.45, delay: Math.min(index, 5) * 0.04 }}>
                    <div className="media-loop-card__media">
                      {(item.type === "video" || item.type === "external-video") ? (
                        <SafeVideoPreview item={item} enabled={!selected && visible && tabVisible} />
                      ) : (
                        <SafeImage item={item} />
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <div className="media-loop__status"><span>{paused ? "STREAM PAUSED" : `${direction.toUpperCase()} STREAM ACTIVE`}</span><b>{items.length} ITEMS</b></div>
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
