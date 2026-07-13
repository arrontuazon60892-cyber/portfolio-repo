"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Video } from "lucide-react";
import MediaModal from "./MediaModal";
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
                const image = item.cover || item.src;
                return (
                  <button key={`${cycle}-${item.id}`} type="button" tabIndex={cycle ? -1 : 0} aria-label={cycle ? undefined : `Open ${item.title}`} className="media-loop-card" onClick={(event) => open(index, event.currentTarget)}>
                    <div className="media-loop-card__media">
                      {item.type === "video" ? (
                        <VideoPreview item={item} enabled={!selected && visible && tabVisible} />
                      ) : (
                        <img src={image} alt="" loading="lazy" decoding="async" />
                      )}
                      <span className="media-loop-card__scan" />
                    </div>
                  </button>
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

function VideoPreview({ item, enabled }) {
  const rootRef = useRef(null);
  const videoRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(Boolean(item.poster));
  const [hasFrame, setHasFrame] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setShouldLoad(true);
      else {
        videoRef.current?.pause();
        if (videoRef.current?.readyState) videoRef.current.currentTime = 0;
      }
    }, { rootMargin: "160px", threshold: 0.01 });
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    const supportsHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!video || !enabled || !hovering || !supportsHover) {
      video?.pause();
      if (video?.readyState && !hovering) video.currentTime = 0;
      return undefined;
    }

    video.play().catch(() => {});
    return () => video.pause();
  }, [enabled, hovering, shouldLoad]);

  return (
    <div
      ref={rootRef}
      className="media-loop-card__video"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {item.poster && <img src={item.poster} alt="" loading="lazy" decoding="async" />}
      <video
        ref={videoRef}
        className={hasFrame ? "is-ready" : undefined}
        src={shouldLoad ? item.src : undefined}
        poster={item.poster}
        preload="metadata"
        muted
        loop
        playsInline
        tabIndex={-1}
        aria-hidden="true"
        onLoadedData={() => setHasFrame(true)}
      />
      <span aria-hidden="true"><Video size={38} /><Play size={18} fill="currentColor" /></span>
    </div>
  );
}
