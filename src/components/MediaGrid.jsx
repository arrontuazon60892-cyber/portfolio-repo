"use client";

import { useState } from "react";
import MediaModal from "./MediaModal";
import { SafeImage, SafeVideoPreview } from "./MediaThumbnail";

export default function MediaGrid({ items, variant = "creative" }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const selected = selectedIndex === null ? null : items[selectedIndex];

  const open = (index) => setSelectedIndex(index);

  const close = () => setSelectedIndex(null);

  const move = (delta) =>
    setSelectedIndex((current) =>
      current === null ? 0 : (current + delta + items.length) % items.length
    );

  const visibleItems = items.slice(0, 16);

  return (
    <div className={`media-grid-section media-grid-section--${variant}`}>
      <div className="media-grid">
        {visibleItems.map((item, index) => (
          <button
            type="button"
            className="media-card"
            key={item.id || item.src || index}
            aria-label={`Open ${item.title || `item ${index + 1}`}`}
            onClick={() => open(index)}
          >
            {item.type === "video" ? (
              <SafeVideoPreview item={item} enabled={!selected} />
            ) : (
              <SafeImage item={item} />
            )}
          </button>
        ))}
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
