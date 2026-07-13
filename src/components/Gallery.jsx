import { useEffect, useRef, useState } from "react";
import { Code2, ExternalLink, Image as ImageIcon, Play, Video } from "lucide-react";

import { projectFilters, projects } from "../data/projects";
import { cn } from "../lib/utils";

export default function Gallery({ onOpenProject, onOpenImage, onOpenVideo, isModalOpen = false }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);
  const rootRef = useRef(null);
  const resumeTimerRef = useRef(null);
  const triggerRef = useRef(null);
  const wasModalOpen = useRef(false);

  const visibleProjects = projects.filter(
    (project) => activeFilter === "all" || project.categorySlug === activeFilter
  );
  const paused = !isVisible || !tabVisible || isHovering || hasFocus || isDragging || isModalOpen;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { rootMargin: "120px", threshold: 0.05 });
    observer.observe(root);
    const onVisibility = () => setTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.clearTimeout(resumeTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (wasModalOpen.current && !isModalOpen) triggerRef.current?.focus({ preventScroll: true });
    wasModalOpen.current = isModalOpen;
  }, [isModalOpen]);

  const openProject = (project, trigger) => {
    triggerRef.current = trigger;
    if (project.type === "image") onOpenImage(project);
    else if (project.type === "video") onOpenVideo(project);
    else onOpenProject(project);
  };

  const endDrag = () => {
    window.clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = window.setTimeout(() => setIsDragging(false), 700);
  };

  return (
    <div className="project-showcase" ref={rootRef}>
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

      <div
        className={cn("project-carousel", paused && "is-paused")}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onFocusCapture={() => setHasFocus(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setHasFocus(false);
        }}
        onPointerDown={() => setIsDragging(true)}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        aria-label="Looping project showcase"
      >
        <div className="project-carousel__track">
          {[0, 1].map((cycle) => (
            <div className="project-carousel__set" key={cycle} aria-hidden={cycle === 1 ? "true" : undefined}>
              {visibleProjects.map((project) => (
                <ProjectCard
                  key={`${cycle}-${project.id}`}
                  project={project}
                  duplicate={cycle === 1}
                  onOpen={openProject}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="project-carousel__readout" aria-hidden="true">
        <span>{paused ? "MOTION PAUSED" : "AUTO LOOP ACTIVE"}</span>
        <span>{visibleProjects.length.toString().padStart(2, "0")} PROJECTS</span>
        <b>MEDIA.SYSTEM / ONLINE</b>
      </div>
    </div>
  );
}

function ProjectCard({ project, duplicate, onOpen }) {
  const TypeIcon = project.type === "video" ? Video : project.type === "image" ? ImageIcon : Code2;

  return (
    <button
      type="button"
      className="gallery-project-card"
      onClick={(event) => onOpen(project, event.currentTarget)}
      aria-label={duplicate ? undefined : `Open ${project.title}`}
      tabIndex={duplicate ? -1 : 0}
    >
      <div className="gallery-project-media">
        {project.type === "video" ? (
          <div className="gallery-video-poster" aria-hidden="true"><Video size={44} /><span>VIDEO / READY</span></div>
        ) : project.thumbnail ? (
          <img src={project.thumbnail} alt="" loading="lazy" decoding="async" />
        ) : (
          <div className="gallery-project-placeholder" aria-hidden="true"><TypeIcon size={42} /></div>
        )}
        <div className="gallery-project-overlay" />
        <span className="gallery-scanline" aria-hidden="true" />
        {project.type === "video" && <span className="gallery-play-icon" aria-hidden="true"><Play size={22} fill="currentColor" /></span>}
        <span className="gallery-type-icon" aria-hidden="true"><TypeIcon size={15} /></span>
      </div>
      <div className="gallery-project-copy">
        <div className="gallery-project-heading">
          <span className="project-badge">{project.category}</span>
          <span className="project-online"><i /> READY</span>
        </div>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="gallery-project-footer">
          <div>{project.tools.slice(0, 3).map((tool) => <span key={tool} className="chip">{tool}</span>)}</div>
          <span className="gallery-open-action">Open project <ExternalLink size={14} /></span>
        </div>
      </div>
    </button>
  );
}
