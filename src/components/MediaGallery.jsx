"use client";

import { useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import LoopingMediaCarousel from "./LoopingMediaCarousel";
import MediaGrid from "./MediaGrid";

export default function MediaGallery({
  items,
  direction = "right",
  variant = "creative",
  title,
  expanded: controlledExpanded,
  onExpandedChange,
  showToggle = false,
}) {
  const [internalExpanded, setInternalExpanded] = useState(false);
  const isControlled = typeof controlledExpanded === "boolean";
  const expanded = isControlled ? controlledExpanded : internalExpanded;
  const setExpanded = (next) => {
    if (!isControlled) setInternalExpanded(next);
    onExpandedChange?.(next);
  };

  return (
    <div className="media-gallery">
      {showToggle && (
        <div className="media-gallery__toolbar">
          <span>{title || "Project gallery"}</span>
          <button
            type="button"
            className="media-category__see-all"
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
            aria-label={expanded ? `Show less ${title || "projects"}` : `See all ${title || "projects"}`}
          >
            {expanded ? "Show Less" : "See All"}
            {expanded ? <ArrowUpRight size={15} aria-hidden="true" /> : <ArrowRight size={15} aria-hidden="true" />}
          </button>
        </div>
      )}
      {expanded ? (
        <MediaGrid items={items} variant={variant} />
      ) : (
        <LoopingMediaCarousel items={items} direction={direction} variant={variant} />
      )}
    </div>
  );
}
