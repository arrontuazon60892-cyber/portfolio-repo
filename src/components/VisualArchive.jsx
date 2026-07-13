"use client";

import { useState } from "react";
import { Aperture, ScanLine } from "lucide-react";
import ImageModal from "./ImageModal";

export default function VisualArchive({ items }) {
  const [selected, setSelected] = useState(null);
  const move = (delta) => setSelected((current) => current === null ? 0 : (current + delta + items.length) % items.length);

  return (
    <section className="visual-archive" aria-label="Futuristic visual archive">
      {items.map((item, index) => (
        <button type="button" className="archive-card" key={item.id} onClick={() => setSelected(index)}>
          <img src={item.src} alt={item.title} loading="lazy" decoding="async" />
          <span className="archive-card__spotlight" />
          <span className="archive-card__meta"><Aperture size={14} /><b>{item.title}</b><small>{item.category}</small></span>
          <i><ScanLine size={13} /> ARCHIVE {String(index + 1).padStart(2, "0")}</i>
        </button>
      ))}
      <ImageModal key={selected ?? "archive"} isOpen={selected !== null} onClose={() => setSelected(null)} onPrevious={() => move(-1)} onNext={() => move(1)} imageSrc={selected === null ? undefined : items[selected].src} imageAlt={selected === null ? "Gallery image" : items[selected].title} />
    </section>
  );
}
