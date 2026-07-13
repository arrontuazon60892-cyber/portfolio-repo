"use client";

import { useRef, useState } from "react";
import MediaModal from "./MediaModal";

export default function VisualArchive({ items }) {
  const [selected, setSelected] = useState(null);
  const triggerRef = useRef(null);
  const move = (delta) => setSelected((current) => current === null ? 0 : (current + delta + items.length) % items.length);
  const close = () => {
    setSelected(null);
    window.setTimeout(() => triggerRef.current?.focus({ preventScroll: true }), 0);
  };

  return (
    <section className="visual-archive" aria-label="Futuristic visual archive">
      {items.map((item, index) => (
        <button type="button" className="archive-card" key={item.id} aria-label={`Open ${item.title}`} onClick={(event) => { triggerRef.current = event.currentTarget; setSelected(index); }}>
          <img src={item.src} alt="" loading="lazy" decoding="async" />
          <span className="archive-card__spotlight" />
          <span className="image-focus-frame" aria-hidden="true" />
        </button>
      ))}
      <MediaModal isOpen={selected !== null} item={selected === null ? null : items[selected]} onClose={close} onPrevious={() => move(-1)} onNext={() => move(1)} />
    </section>
  );
}
