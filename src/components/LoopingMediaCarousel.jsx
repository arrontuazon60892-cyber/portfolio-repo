"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import MediaModal from "./MediaModal";
import { SafeImage, SafeVideoPreview } from "./MediaThumbnail";
import { cn } from "../lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PREVIEW_ITEM_LIMIT = 8;

export default function LoopingMediaCarousel({
  items,
  direction = "right",
  variant = "creative",
  previewLimit = PREVIEW_ITEM_LIMIT,
}) {
  const rootRef = useRef(null);
  const viewportRef = useRef(null);
  const triggerRef = useRef(null);
  const animationFrameRef = useRef(null);
  const lastFrameRef = useRef(0);
  const autoplayStoppedRef = useRef(false);
  const previewItems = items.slice(0, previewLimit);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [visible, setVisible] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [visibleCount, setVisibleCount] = useState(1);
  const [scrollState, setScrollState] = useState({ left: false, right: false });
  const selected = selectedIndex === null ? null : previewItems[selectedIndex];
  const paused = hovered || focused || dragging || !visible || !tabVisible || Boolean(selected);

  const measure = useCallback(() => {
    const viewport = viewportRef.current;
    const track = viewport?.querySelector(".media-loop__track");
    const card = track?.firstElementChild;
    if (!viewport || !track || !card || previewItems.length === 0) return;

    const styles = window.getComputedStyle(track);
    const gap = Number.parseFloat(styles.columnGap || styles.gap) || 0;
    const step = card.getBoundingClientRect().width + gap;
    const count = Math.max(1, Math.floor((viewport.clientWidth + gap) / Math.max(step, 1)));
    const maxScroll = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
    setVisibleCount(Math.min(count, previewItems.length));
    setScrollState({
      left: viewport.scrollLeft > 2,
      right: viewport.scrollLeft < maxScroll - 2,
    });

    if (direction === "right" && viewport.scrollLeft > maxScroll) {
      viewport.scrollLeft = maxScroll;
    }
  }, [direction, previewItems.length]);

  const updateScrollState = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const maxScroll = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
    setScrollState({
      left: viewport.scrollLeft > 2,
      right: viewport.scrollLeft < maxScroll - 2,
    });
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const observer = typeof IntersectionObserver === "undefined"
      ? null
      : new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: "100px" });
    if (root) observer?.observe(root);

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotionChange = () => setReducedMotion(motionQuery.matches);
    const onVisibility = () => setTabVisible(!document.hidden);
    const resizeObserver = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(measure);

    onMotionChange();
    onVisibility();
    resizeObserver?.observe(rootRef.current);
    window.addEventListener("resize", measure);
    document.addEventListener("visibilitychange", onVisibility);
    motionQuery.addEventListener?.("change", onMotionChange);

    const frame = window.requestAnimationFrame(measure);
    const timer = window.setTimeout(measure, 120);
    return () => {
      observer?.disconnect();
      resizeObserver?.disconnect();
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
      window.removeEventListener("resize", measure);
      document.removeEventListener("visibilitychange", onVisibility);
      motionQuery.removeEventListener?.("change", onMotionChange);
    };
  }, [measure]);

  useEffect(() => {
    if (process.env.NODE_ENV === "development" && items.length > 0 && previewItems.length === 0) {
      console.warn("[portfolio media] category has files but no carousel preview items rendered", {
        itemCount: items.length,
        variant,
      });
    }
  }, [items, previewItems.length, variant]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || previewItems.length < 2 || reducedMotion) return undefined;

    const tick = (timestamp) => {
      if (!lastFrameRef.current) lastFrameRef.current = timestamp;
      const elapsed = Math.min(timestamp - lastFrameRef.current, 64);
      lastFrameRef.current = timestamp;
      const maxScroll = Math.max(0, viewport.scrollWidth - viewport.clientWidth);

      if (!paused && !autoplayStoppedRef.current && maxScroll > 2) {
        viewport.scrollLeft = Math.min(maxScroll, viewport.scrollLeft + (elapsed / 1000) * 26);
        if (viewport.scrollLeft >= maxScroll - 1) autoplayStoppedRef.current = true;
      }
      animationFrameRef.current = window.requestAnimationFrame(tick);
    };

    animationFrameRef.current = window.requestAnimationFrame(tick);
    return () => {
      if (animationFrameRef.current) window.cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
      lastFrameRef.current = 0;
    };
  }, [paused, previewItems.length, reducedMotion]);

  const open = (index, trigger) => {
    triggerRef.current = trigger;
    setSelectedIndex(index);
  };

  const close = () => {
    setSelectedIndex(null);
    window.setTimeout(() => triggerRef.current?.focus({ preventScroll: true }), 0);
  };

  const move = (delta) => {
    setSelectedIndex((current) => current === null ? 0 : (current + delta + previewItems.length) % previewItems.length);
  };

  const scroll = (delta) => {
    const viewport = viewportRef.current;
    const card = viewport?.querySelector(".media-loop-card");
    if (!viewport || !card) return;
    const track = viewport.querySelector(".media-loop__track");
    const styles = window.getComputedStyle(track);
    const gap = Number.parseFloat(styles.columnGap || styles.gap) || 0;
    const step = card.getBoundingClientRect().width + gap;
    const maxScroll = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
    const target = Math.min(maxScroll, Math.max(0, viewport.scrollLeft + delta * step * visibleCount));
    autoplayStoppedRef.current = false;
    viewport.scrollTo({ left: target, behavior: reducedMotion ? "auto" : "smooth" });
  };

  if (previewItems.length === 0) return null;

  return (
    <div ref={rootRef} className={cn("media-loop", `media-loop--${direction}`, `media-loop--${variant}`, paused && "is-paused")}>
      <button
        type="button"
        className="media-loop__control media-loop__control--previous"
        onClick={() => scroll(-1)}
        disabled={!scrollState.left}
        aria-label="Show previous projects"
        aria-disabled={!scrollState.left}
      >
        <ChevronLeft size={20} aria-hidden="true" />
      </button>
      <button
        type="button"
        className="media-loop__control media-loop__control--next"
        onClick={() => scroll(1)}
        disabled={!scrollState.right}
        aria-label="Show next projects"
        aria-disabled={!scrollState.right}
      >
        <ChevronRight size={20} aria-hidden="true" />
      </button>
      <div
        ref={viewportRef}
        className="media-loop__viewport"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocusCapture={() => setFocused(true)}
        onBlurCapture={(event) => !event.currentTarget.contains(event.relatedTarget) && setFocused(false)}
        onPointerDown={() => setDragging(true)}
        onPointerUp={() => window.setTimeout(() => setDragging(false), 500)}
        onPointerCancel={() => setDragging(false)}
        onScroll={updateScrollState}
      >
        <div className="media-loop__track">
          {previewItems.map((item, index) => (
            <button
              key={item.id}
              type="button"
              aria-label={`Open ${item.title}`}
              className={cn("media-loop-card", (item.type === "video" || item.type === "external-video") && "media-loop-card--video")}
              onClick={(event) => open(index, event.currentTarget)}
            >
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
      <div className="media-loop__status">
        <span>{paused ? "STREAM READY" : "HORIZONTAL GALLERY"}</span>
        <b>{items.length} ITEMS</b>
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
