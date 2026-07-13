"use client";

import { useState } from "react";
import { BadgeCheck, LockKeyhole, ScanLine } from "lucide-react";
import ImageModal from "./ImageModal";

export default function CertificateVault({ items }) {
  const [selected, setSelected] = useState(null);
  const move = (delta) => setSelected((current) => current === null ? 0 : (current + delta + items.length) % items.length);

  return (
    <section className="certificate-vault" aria-label="Holographic certificate vault">
      <div className="certificate-vault__status"><LockKeyhole size={15} /> ENCRYPTED CREDENTIAL ARCHIVE <b>{items.length} VERIFIED</b></div>
      <div className="certificate-stack">
        {items.map((item, index) => (
          <button type="button" className="certificate-card" key={item.id} onClick={() => setSelected(index)} style={{ "--certificate-offset": `${(index % 3) * 8}px`, "--certificate-tilt": `${((index % 3) - 1) * 2}deg` }}>
            <img src={item.src} alt={item.title} loading="lazy" decoding="async" />
            <span className="certificate-card__scan"><ScanLine size={14} /> VALIDATING</span>
            <span className="certificate-card__meta"><BadgeCheck size={15} /><b>{item.title}</b><small>VERIFIED CREDENTIAL</small></span>
          </button>
        ))}
      </div>
      <ImageModal key={selected ?? "certificate"} isOpen={selected !== null} onClose={() => setSelected(null)} onPrevious={() => move(-1)} onNext={() => move(1)} imageSrc={selected === null ? undefined : items[selected].src} imageAlt={selected === null ? "Certificate" : items[selected].title} />
    </section>
  );
}
