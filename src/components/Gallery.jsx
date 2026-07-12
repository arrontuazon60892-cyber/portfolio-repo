import { useState } from "react";
import { Code2, ExternalLink, Image as ImageIcon, Play, Video } from "lucide-react";

import { projectFilters, projects } from "../data/projects";
import { cn } from "../lib/utils";

export default function Gallery({ onOpenProject, onOpenImage, onOpenVideo }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const visibleProjects = projects.filter(
    (project) => activeFilter === "all" || project.categorySlug === activeFilter
  );

  const openProject = (project) => {
    if (project.type === "image") onOpenImage(project);
    else if (project.type === "video") onOpenVideo(project);
    else onOpenProject(project);
  };

  return (
    <div className="mt-8">
      <div className="project-filters" aria-label="Filter projects by category">
        {projectFilters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            className={cn("project-filter", activeFilter === filter.id && "is-active")}
            onClick={() => setActiveFilter(filter.id)}
            aria-pressed={activeFilter === filter.id}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="project-gallery-grid" aria-live="polite">
        {visibleProjects.map((project) => {
          const TypeIcon =
            project.type === "video"
              ? Video
              : project.type === "image"
                ? ImageIcon
                : Code2;

          return (
            <button
              key={project.id}
              type="button"
              className="gallery-project-card"
              onClick={() => openProject(project)}
              aria-label={`Open ${project.title}`}
              data-cursor="hover"
            >
              <div className="gallery-project-media">
                {project.type === "video" ? (
                  <video
                    src={project.src}
                    poster={project.poster}
                    muted
                    playsInline
                    preload="metadata"
                    aria-label={`${project.title} video preview`}
                  />
                ) : project.thumbnail ? (
                  <img
                    src={project.thumbnail}
                    alt={`${project.title} preview`}
                    loading="lazy"
                  />
                ) : (
                  <div className="gallery-project-placeholder" aria-hidden="true">
                    <TypeIcon size={42} />
                  </div>
                )}
                <div className="gallery-project-overlay" />
                {project.type === "video" && (
                  <span className="gallery-play-icon" aria-hidden="true">
                    <Play size={22} fill="currentColor" />
                  </span>
                )}
                <span className="gallery-type-icon" aria-hidden="true">
                  <TypeIcon size={15} />
                </span>
              </div>

              <div className="gallery-project-copy">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="project-badge">{project.category}</span>
                    <h3>{project.title}</h3>
                  </div>
                  <ExternalLink size={16} className="mt-1 shrink-0 text-white/48" />
                </div>
                <p>{project.description}</p>
                <div className="mt-auto flex flex-wrap gap-2 pt-4">
                  {project.tools.map((tool) => (
                    <span key={tool} className="chip">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
