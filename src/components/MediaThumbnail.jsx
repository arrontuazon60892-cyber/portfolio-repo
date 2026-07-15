"use client";

import { useEffect, useRef, useState } from "react";

function reportMediaError(item, reason) {
  if (process.env.NODE_ENV !== "development") return;
  console.error("[portfolio media] asset failed", {
    filename: item.title,
    resolvedPath: item.src,
    category: item.category || item.folder,
    reason,
  });
}

function FailedPreview() {
  return <div className="media-asset-failed" role="img" aria-label="Media preview unavailable"><span>Preview unavailable</span></div>;
}

export function SafeImage({ item }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <FailedPreview />;
  return (
    <img
      src={item.cover || item.src}
      alt=""
      loading="lazy"
      decoding="async"
      onError={() => {
        reportMediaError(item, "Image could not be decoded or loaded");
        setFailed(true);
      }}
    />
  );
}

export function SafeVideoPreview({ item, enabled }) {
  const rootRef = useRef(null);
  const videoRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(Boolean(item.poster));
  const [hasFrame, setHasFrame] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      setPreviewVisible(entry.isIntersecting);
      if (entry.isIntersecting) setShouldLoad(true);
      else videoRef.current?.pause();
    }, { threshold: 0.01 });
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !enabled || !previewVisible || !shouldLoad || failed) {
      video?.pause();
      return undefined;
    }
    video.muted = true;
    video.defaultMuted = true;
    video.play().catch(() => {});
    return () => video.pause();
  }, [enabled, failed, previewVisible, shouldLoad]);

  if (failed) return <FailedPreview />;
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
        onError={(event) => {
          const reason = event.currentTarget.error?.message || `Video error code ${event.currentTarget.error?.code || "unknown"}`;
          reportMediaError(item, reason);
          setFailed(true);
        }}
        onLoadedData={(event) => {
          setHasFrame(true);
          event.currentTarget.muted = true;
          event.currentTarget.defaultMuted = true;
          if (enabled && previewVisible && !document.hidden) event.currentTarget.play().catch(() => {});
          else event.currentTarget.pause();
        }}
      />
    </div>
  );
}
