"use client";

import { useEffect, useRef, useState } from "react";

function reportMediaError(item, reason) {
  if (process.env.NODE_ENV !== "development") return;
  console.error("[portfolio media] asset failed", {
    filename: item.title,
    sourcePath: item.sourcePath,
    resolvedPath: item.src,
    category: item.category || item.folder,
    reason,
  });
}

function FailedPreview() {
  return <div className="media-asset-failed" role="img" aria-label="Media preview unavailable"><span>Preview unavailable</span></div>;
}

export function SafeImage({ item, loading = "lazy" }) {
  const imageRef = useRef(null);
  const raw = item.cover || item.src;
  const source = raw && typeof raw === "object" ? raw.src || raw.default : raw;
  const [failedSource, setFailedSource] = useState(null);
  const failed = failedSource === source;

  useEffect(() => {
    const image = imageRef.current;
    if (!image || !source) return;

    // A cached image can finish before React attaches its onLoad handler.
    if (image.complete) {
      let cancelled = false;
      queueMicrotask(() => {
        if (!cancelled) {
          setFailedSource(image.naturalWidth > 0 ? null : source);
        }
      });
      return () => {
        cancelled = true;
      };
    }
  }, [source]);

  if (!source || typeof source !== "string") return <FailedPreview />;
  if (failed) return <FailedPreview />;

  return (
    <>
      <img
        key={source}
        ref={imageRef}
        src={source}
        className="is-loaded"
        alt={`${item.title} preview`}
        loading={loading}
        decoding="async"
        draggable="false"
        onLoad={() => setFailedSource(null)}
        onError={() => {
          reportMediaError(item, "Image could not be decoded or loaded");
          setFailedSource(source);
        }}
      />
    </>
  );
}

export function SafeVideoPreview({ item, enabled = true }) {
  const rootRef = useRef(null);
  const videoRef = useRef(null);
  const [hasFrame, setHasFrame] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [failed, setFailed] = useState(false);
  const raw = item.src;
  const source = raw && typeof raw === "object" ? raw.src || raw.default : raw;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      setPreviewVisible(entry.isIntersecting);
      if (!entry.isIntersecting) videoRef.current?.pause();
    }, { threshold: 0.01 });
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !enabled || !previewVisible || failed) {
      video?.pause();
      return undefined;
    }
    video.muted = true;
    video.defaultMuted = true;
    video.play().catch(() => {});
    return () => video.pause();
  }, [enabled, failed, previewVisible]);

  if (!source || typeof source !== "string" || failed) return <FailedPreview />;
  return (
    <div ref={rootRef} className="media-loop-card__video">
      {item.poster && !hasFrame && <img src={item.poster} alt="" loading="lazy" decoding="async" draggable="false" />}
      <video
        ref={videoRef}
        className={hasFrame ? "is-ready" : undefined}
        src={source}
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
