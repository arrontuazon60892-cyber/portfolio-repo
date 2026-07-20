"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useMemo, useState } from "react";
import { designFilters } from "../data/portfolioContent";
import { GraphicDesignCard, MediaModal, ProjectCard, VideoCard } from "./PortfolioHome";

export default function PortfolioCollectionPage({ kind, items }) {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const visibleItems = useMemo(() => {
    if (kind !== "design" || filter === "All") return items;
    return items.filter((item) => item.category === filter);
  }, [filter, items, kind]);

  const move = useCallback((delta) => {
    setSelected((current) => {
      if (!current || !visibleItems.length) return current;
      const index = visibleItems.findIndex((item) => item.id === current.id);
      return visibleItems[(index + delta + visibleItems.length) % visibleItems.length];
    });
  }, [visibleItems]);

  return (
    <>
      {kind === "design" && (
        <div className="v2-filters v2-route-filters" role="group" aria-label="Filter graphic designs">
          {designFilters.map((item) => (
            <button key={item} type="button" className={filter === item ? "is-active" : ""} onClick={() => setFilter(item)} aria-pressed={filter === item}>
              {item}
            </button>
          ))}
        </div>
      )}

      {kind === "design" || kind === "images" ? (
        <motion.div className="v2-design-grid v2-full-grid" layout>
          <AnimatePresence mode="popLayout">
            {visibleItems.map((item) => <GraphicDesignCard key={item.id} item={item} onOpen={setSelected} />)}
          </AnimatePresence>
        </motion.div>
      ) : null}

      {kind === "video" ? (
        <div className="v2-video-grid v2-video-grid--full">
          {visibleItems.map((item) => <VideoCard key={item.id} item={item} onOpen={setSelected} />)}
        </div>
      ) : null}

      {kind === "projects" ? (
        <div className="v2-project-grid v2-project-grid--full">
          {visibleItems.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}
        </div>
      ) : null}

      <MediaModal
        item={selected}
        onClose={() => setSelected(null)}
        onPrevious={kind === "video" ? null : () => move(-1)}
        onNext={kind === "video" ? null : () => move(1)}
      />
    </>
  );
}
