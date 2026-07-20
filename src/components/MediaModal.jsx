"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function ModalPreview({ item, source }) {
  const [failed, setFailed] = useState(false);
  const isVideo = item.type === "video" || item.type === "external-video";
  const fail = (reason) => {
    if (process.env.NODE_ENV === "development") {
      console.error("[portfolio media] modal asset failed", {
        filename: item.title,
        resolvedPath: source,
        category: item.category || item.folder,
        reason,
      });
    }
    setFailed(true);
  };

  if (failed || !source) return <div className="media-modal__placeholder"><span>Preview unavailable</span></div>;
  if (isVideo) {
    return <video src={source} poster={item.poster} controls playsInline preload="metadata" aria-label={`${item.title} video`} onError={(event) => fail(event.currentTarget.error?.message || "Video could not be loaded")} />;
  }
  return <img src={source} alt={item.title || "Selected portfolio work"} draggable="false" onError={() => fail("Image could not be decoded or loaded")} />;
}

export default function MediaModal({ isOpen, item, onClose, onPrevious, onNext }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const returnFocusRef = useRef(null);
  const touchStartRef = useRef(null);
  const actionsRef = useRef({ onClose, onPrevious, onNext });

  useEffect(() => {
    actionsRef.current = { onClose, onPrevious, onNext };
  }, [onClose, onPrevious, onNext]);

  useEffect(() => {
    if (!isOpen) return undefined;

    returnFocusRef.current = document.activeElement;
    const modalRoot = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 0);

    const onKeyDown = (event) => {
      if (event.key === "Escape") actionsRef.current.onClose();
      if (event.key === "ArrowLeft") actionsRef.current.onPrevious?.();
      if (event.key === "ArrowRight") actionsRef.current.onNext?.();

      if (event.key === "Tab" && dialogRef.current) {
        const controls = [...dialogRef.current.querySelectorAll('button:not(:disabled):not([tabindex="-1"]), a[href], video[controls]')];
        if (!controls.length) return;
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      const modalVideo = modalRoot?.querySelector("video[controls]");
      if (modalVideo) {
        modalVideo.pause();
        if (modalVideo.readyState) modalVideo.currentTime = 0;
        modalVideo.removeAttribute("src");
        modalVideo.load();
      }
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      returnFocusRef.current?.focus?.({ preventScroll: true });
    };
  }, [isOpen]);

  if (!item) return null;

  const source = item.cover || item.src || item.previewImage || item.thumbnail;
  const tools = item.tools || item.tags || [];

  const finishSwipe = (event) => {
    if (touchStartRef.current === null) return;
    const distance = event.changedTouches[0].clientX - touchStartRef.current;
    touchStartRef.current = null;
    if (Math.abs(distance) < 52) return;
    if (distance > 0) onPrevious?.();
    else onNext?.();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={dialogRef}
          className="media-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button className="media-modal__backdrop" type="button" tabIndex={-1} onClick={onClose} aria-label="Close preview" />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="media-modal-title"
            className="media-modal__dialog"
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 12 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            onTouchStart={(event) => { touchStartRef.current = event.touches[0].clientX; }}
            onTouchEnd={finishSwipe}
          >
            {onPrevious && (
              <button type="button" className="media-modal__nav media-modal__nav--previous" onClick={onPrevious} aria-label="Previous item">
                <ChevronLeft size={22} />
              </button>
            )}
            {onNext && (
              <button type="button" className="media-modal__nav media-modal__nav--next" onClick={onNext} aria-label="Next item">
                <ChevronRight size={22} />
              </button>
            )}

            <div className="media-modal__preview">
              <ModalPreview key={source} item={item} source={source} />
            </div>

            <aside className="media-modal__details">
              {(item.category || item.status) && <span>{item.category || item.status}</span>}
              <h2 id="media-modal-title">{item.title || "Portfolio preview"}</h2>
              {item.description && <p>{item.description}</p>}
              {(item.issuer || item.date) && (
                <p className="media-modal__credential">
                  {[item.issuer, item.date].filter(Boolean).join(" · ")}
                </p>
              )}
              {tools.length > 0 && (
                <div className="media-modal__tools" aria-label="Tools and technologies">
                  {tools.map((tool) => <small key={tool}>{tool}</small>)}
                </div>
              )}
            </aside>
          </motion.div>
          <button ref={closeRef} type="button" className="media-modal__close" onClick={onClose} aria-label="Close preview">
            <X size={24} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
