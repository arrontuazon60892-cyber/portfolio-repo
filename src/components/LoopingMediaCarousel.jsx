"use client";

import { useEffect, useRef, useState } from "react";
import MediaModal from "./MediaModal";
import { SafeImage, SafeVideoPreview } from "./MediaThumbnail";
import { cn } from "../lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function LoopingMediaCarousel({ items, direction = "left", variant = "creative" }) {
  const rootRef = useRef(null);
  const viewportRef = useRef(null);
  const triggerRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [visible, setVisible] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);
  const [scrollState, setScrollState] = useState({ left: false, right: false });
  const selected = selectedIndex === null ? null : items[selectedIndex];
  const paused = hovered || focused || dragging || !visible || !tabVisible || Boolean(selected);

  const updateScrollState = () => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const maxScroll = viewport.scrollWidth - viewport.clientWidth;
    setScrollState({
      left: viewport.scrollLeft > 2,
      right: viewport.scrollLeft < maxScroll - 2,
    });
  };

  useEffect(() => {
    const root = rootRef.current;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: "100px" });
    if (root) observer.observe(root);
    const onVisibility = () => setTabVisible(!document.hidden);
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    updateScrollState();
    window.addEventListener("resize", updateScrollState);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  useEffect(() => {
    updateScrollState();
  }, [items]);

  const open = (index, trigger) => { triggerRef.current = trigger; setSelectedIndex(index); };
  const close = () => { setSelectedIndex(null); window.setTimeout(() => triggerRef.current?.focus({ preventScroll: true }), 0); };
  const move = (delta) => setSelectedIndex((current) => current === null ? 0 : (current + delta + items.length) % items.length);
  const scroll = (delta) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    viewport.scrollBy({ left: delta * Math.max(viewport.clientWidth * 0.82, 280), behavior: "smooth" });
  };

  return (
    <div ref={rootRef} className={cn("media-loop", `media-loop--${direction}`, `media-loop--${variant}`, paused && "is-paused")}>
      {scrollState.left && (
        <button type="button" className="media-loop__control media-loop__control--previous" onClick={() => scroll(-1)} aria-label="Previous items">
          <ChevronLeft size={20} />
        </button>
      )}
      {scrollState.right && (
        <button type="button" className="media-loop__control media-loop__control--next" onClick={() => scroll(1)} aria-label="Next items">
          <ChevronRight size={20} />
        </button>
      )}
      <div
        ref={viewportRef}
        className="media-loop__viewport"
        onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
        onFocusCapture={() => setFocused(true)} onBlurCapture={(event) => !event.currentTarget.contains(event.relatedTarget) && setFocused(false)}
        onPointerDown={() => setDragging(true)} onPointerUp={() => window.setTimeout(() => setDragging(false), 500)} onPointerCancel={() => setDragging(false)}
        onScroll={updateScrollState}
      >
        <div className="media-loop__track">
          {items.map((item, index) => (
            <button key={item.id} type="button" aria-label={`Open ${item.title}`} className={cn("media-loop-card", (item.type === "video" || item.type === "external-video") && "media-loop-card--video")} onClick={(event) => open(index, event.currentTarget)}>
              <div className="media-loop-card__media">
                {(item.type === "video" || item.type === "external-video") ? (
                  <SafeVideoPreview item={item} enabled={!selected && visible && tabVisible} />
                ) : (
                  <SafeImage item={item} loading={variant === "creative" ? "eager" : "lazy"} />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
      <div className="media-loop__status"><span>{paused ? "STREAM READY" : "HORIZONTAL GALLERY"}</span><b>{items.length} ITEMS</b></div>
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
