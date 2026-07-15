"use client";

import { useEffect, useRef, useState } from "react";
import MediaModal from "./MediaModal";
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
      <div className="media-grid">
        {items.map((item, index) => {
          const image = item.cover || item.src;
          return (
            <button
              key={item.id}
              type="button"
              aria-label={`Open ${item.title}`}
              className={cn(
                "media-loop-card",
                item.type === "video" && "media-loop-card--video"
              )}
              onClick={(event) => open(index, event.currentTarget)}
            >
              <div className="media-loop-card__media">
                {item.type === "video" ? (
                  <VideoPreview item={item} enabled={!selected} />
                ) : (
                  <img src={image} alt="" loading="lazy" decoding="async" />
                )}
                {item.type !== "video" && <span className="media-loop-card__scan" />}
              </div>
            </button>
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

function VideoPreview({ item, enabled }) {
  const rootRef = useRef(null);
  const videoRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(Boolean(item.poster));
  const [hasFrame, setHasFrame] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setPreviewVisible(entry.isIntersecting);
        if (entry.isIntersecting) {
          setShouldLoad(true);
        } else {
          videoRef.current?.pause();
        }
      },
      { threshold: 0.01 }
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !enabled || !previewVisible || !shouldLoad) {
      video?.pause();
      return undefined;
    }

    video.muted = true;
    video.defaultMuted = true;
    video.play().catch(() => {});
    return () => video.pause();
  }, [enabled, previewVisible, shouldLoad]);

  return (
    <div ref={rootRef} className="media-loop-card__video">
      {item.poster && <img src={item.poster} alt="" loading="lazy" decoding="async" />}
      <video
        ref={videoRef}
        className={hasFrame ? "is-ready" : undefined}
        src={shouldLoad ? item.src : undefined}
        poster={item.poster}
        preload="metadata"
        autoPlay
        muted
        loop
        playsInline
        tabIndex={-1}
        aria-hidden="true"
        onLoadedData={(event) => {
          setHasFrame(true);
          event.currentTarget.muted = true;
          event.currentTarget.defaultMuted = true;
          if (enabled && previewVisible && !document.hidden) {
            event.currentTarget.play().catch(() => {});
          } else {
            event.currentTarget.pause();
          }
        }}
      />
    </div>
  );
}
