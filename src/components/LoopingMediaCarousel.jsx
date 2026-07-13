"use client";

import { useEffect, useRef, useState } from "react";
import { Image as ImageIcon, Play, Radio, Video } from "lucide-react";
import ImageModal from "./ImageModal";
import VideoModal from "./VideoModal";
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
                  <button key={`${cycle}-${item.id}`} type="button" tabIndex={cycle ? -1 : 0} className="media-loop-card" onClick={(event) => open(index, event.currentTarget)}>
                    <div className="media-loop-card__media">
                      {item.type === "video" ? <div className="media-loop-card__video">{item.poster && <img src={item.poster} alt="" loading="lazy" decoding="async" />}<span><Video size={38} /><Play size={18} fill="currentColor" /></span></div> : <img src={image} alt="" loading="lazy" decoding="async" />}
                      <span className="media-loop-card__scan" />
                    </div>
                    <div className="media-loop-card__body">
                      <span><Radio size={11} /> {item.status || item.category}</span>
                      <h2>{item.title}</h2>
                      {item.description && <p>{item.description}</p>}
                      {item.tools && <div>{item.tools.map((tool) => <small key={tool}>{tool}</small>)}</div>}
                      <b>{item.type === "video" ? <Video size={13} /> : <ImageIcon size={13} />} OPEN MEDIA</b>
                    </div>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <div className="media-loop__status"><span>{paused ? "STREAM PAUSED" : `${direction.toUpperCase()} STREAM ACTIVE`}</span><b>{items.length} ITEMS</b></div>
      {selected?.type === "video" ? (
        <VideoModal isOpen onClose={close} videoSrc={selected.src} poster={selected.poster} title={selected.title} />
      ) : (
        <ImageModal key={selected?.id || "media-modal"} isOpen={Boolean(selected)} onClose={close} onPrevious={() => move(-1)} onNext={() => move(1)} imageSrc={selected?.cover || selected?.src} imageAlt={selected?.title} />
      )}
    </div>
  );
}
