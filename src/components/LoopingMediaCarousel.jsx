"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import MediaModal from "./MediaModal";
import { SafeImage, SafeVideoPreview } from "./MediaThumbnail";
import { cn } from "../lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PREVIEW_ITEM_LIMIT = 8;

export default function LoopingMediaCarousel({ items, direction = "left", variant = "creative", previewLimit = PREVIEW_ITEM_LIMIT }) {
  const rootRef = useRef(null);
  const viewportRef = useRef(null);
  const triggerRef = useRef(null);
  const previewItems = items.slice(0, previewLimit);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [visible, setVisible] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);
  const [scrollState, setScrollState] = useState({ left: false, right: false });
  const [loopEnabled, setLoopEnabled] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const animationFrameRef = useRef(null);
  const lastFrameRef = useRef(0);
  const baseOffsetRef = useRef(0);
  const correctingScrollRef = useRef(false);
  const selected = selectedIndex === null ? null : previewItems[selectedIndex % Math.max(previewItems.length, 1)];
  const paused = hovered || focused || dragging || !visible || !tabVisible || Boolean(selected);

  const updateScrollState = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const maxScroll = viewport.scrollWidth - viewport.clientWidth;
    if (maxScroll <= 2) {
      setScrollState({ left: false, right: false });
      return;
    }
    setScrollState({
      left: viewport.scrollLeft > 2,
      right: viewport.scrollLeft < maxScroll - 2,
    });
  }, []);

  const normalizeLoopPosition = useCallback(() => {
    const viewport = viewportRef.current;
    const baseOffset = baseOffsetRef.current;
    if (!viewport || !loopEnabled || baseOffset <= 0 || correctingScrollRef.current) return;

    const lowerBound = baseOffset * 0.5;
    const upperBound = baseOffset * 1.5;
    if (viewport.scrollLeft < lowerBound || viewport.scrollLeft > upperBound) {
      correctingScrollRef.current = true;
      viewport.scrollLeft = baseOffset + ((viewport.scrollLeft - baseOffset) % baseOffset + baseOffset) % baseOffset;
      correctingScrollRef.current = false;
    }
  }, [loopEnabled]);

  const measure = useCallback(() => {
    const viewport = viewportRef.current;
    const track = viewport?.querySelector(".media-loop__track");
    if (!viewport || !track || previewItems.length < 2) {
      baseOffsetRef.current = 0;
      setLoopEnabled(false);
      updateScrollState();
      return;
    }

    const firstMiddleCard = track.children[previewItems.length];
    const firstAfterCard = track.children[previewItems.length + 1];
    const firstAfterSet = track.children[previewItems.length * 2];
    if (!firstMiddleCard || !firstAfterCard || !firstAfterSet) {
      const originalSetWidth = track.scrollWidth;
      const canLoop = originalSetWidth > viewport.clientWidth + 2;
      baseOffsetRef.current = Math.max(originalSetWidth, 0);
      setLoopEnabled(canLoop);
      updateScrollState();
      return;
    }
    const gap = firstAfterCard.offsetLeft - firstMiddleCard.offsetLeft - firstMiddleCard.offsetWidth;
    const setWidth = firstAfterSet.offsetLeft - firstMiddleCard.offsetLeft;
    const canLoop = setWidth > viewport.clientWidth + Math.max(gap, 0);
    baseOffsetRef.current = Math.max(setWidth, 0);
    setLoopEnabled(canLoop);
    if (canLoop && viewport.scrollLeft < setWidth * 0.5) {
      correctingScrollRef.current = true;
      viewport.scrollLeft = setWidth;
      correctingScrollRef.current = false;
    }
    updateScrollState();
  }, [previewItems.length, updateScrollState]);

  useEffect(() => {
    const root = rootRef.current;
    const observer = typeof IntersectionObserver === "undefined" ? null : new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: "100px" });
    if (root) observer?.observe(root);
    const onVisibility = () => setTabVisible(!document.hidden);
    onVisibility();
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotionChange = () => setReducedMotion(motionQuery.matches);
    onMotionChange();
    motionQuery.addEventListener?.("change", onMotionChange);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("resize", measure);
    const resizeObserver = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(measure);
    if (root) resizeObserver?.observe(root);
    measure();
    return () => {
      observer?.disconnect();
      resizeObserver?.disconnect();
      motionQuery.removeEventListener?.("change", onMotionChange);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => measure());
    const timer = window.setTimeout(measure, 120);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, [loopEnabled, measure]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || !loopEnabled || reducedMotion) return undefined;

    const tick = (timestamp) => {
      if (!lastFrameRef.current) lastFrameRef.current = timestamp;
      const elapsed = Math.min(timestamp - lastFrameRef.current, 64);
      lastFrameRef.current = timestamp;
      if (!paused && baseOffsetRef.current > 0) {
        viewport.scrollLeft += (elapsed / 1000) * 26 * (direction === "right" ? -1 : 1);
        normalizeLoopPosition();
      }
      animationFrameRef.current = window.requestAnimationFrame(tick);
    };
    animationFrameRef.current = window.requestAnimationFrame(tick);
    return () => {
      if (animationFrameRef.current) window.cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
      lastFrameRef.current = 0;
    };
  }, [direction, loopEnabled, normalizeLoopPosition, paused, reducedMotion]);

  useEffect(() => {
    updateScrollState();
    if (process.env.NODE_ENV === "development" && items.length > 0 && previewItems.length === 0) {
      console.warn("[portfolio media] category has files but no carousel preview items rendered", {
        itemCount: items.length,
        variant,
      });
    }
  }, [items, previewItems.length, variant]);

  const open = (index, trigger) => { triggerRef.current = trigger; setSelectedIndex(index); };
  const close = () => { setSelectedIndex(null); window.setTimeout(() => triggerRef.current?.focus({ preventScroll: true }), 0); };
  const move = (delta) => setSelectedIndex((current) => current === null ? 0 : (current + delta + previewItems.length) % previewItems.length);
  const scroll = (delta) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    if (loopEnabled && baseOffsetRef.current > 0) {
      viewport.scrollBy({ left: delta * Math.max(viewport.clientWidth * 0.72, 280), behavior: "smooth" });
      window.setTimeout(normalizeLoopPosition, 420);
    } else {
      viewport.scrollBy({ left: delta * Math.max(viewport.clientWidth * 0.82, 280), behavior: "smooth" });
    }
  };

  const renderedItems = loopEnabled
    ? [...previewItems, ...previewItems, ...previewItems]
    : previewItems;

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
        onScroll={() => {
          normalizeLoopPosition();
          updateScrollState();
        }}
      >
        <div className="media-loop__track">
          {renderedItems.map((item, index) => {
            const originalIndex = index % Math.max(previewItems.length, 1);
            const clone = loopEnabled && (index < previewItems.length || index >= previewItems.length * 2);
            return <button key={`${item.id}-${index}`} type="button" aria-label={`Open ${item.title}`} className={cn("media-loop-card", clone && "media-loop-card--clone", (item.type === "video" || item.type === "external-video") && "media-loop-card--video")} onClick={(event) => open(originalIndex, event.currentTarget)}>
              <div className="media-loop-card__media">
                {(item.type === "video" || item.type === "external-video") ? (
                  <SafeVideoPreview item={item} enabled={!selected && visible && tabVisible} />
                ) : (
                  <SafeImage item={item} loading={variant === "creative" ? "eager" : "lazy"} />
                )}
              </div>
            </button>
          })}
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
