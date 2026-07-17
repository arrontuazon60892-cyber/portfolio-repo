import { useEffect, useRef, useState } from "react";
import { Code2, Image as ImageIcon } from "lucide-react";

import { projects } from "../data/projects";
import { cn } from "../lib/utils";

export default function Gallery({ onOpenProject, onOpenImage, onOpenVideo, isModalOpen = false }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);
  const rootRef = useRef(null);
  const resumeTimerRef = useRef(null);
  const triggerRef = useRef(null);
  const wasModalOpen = useRef(false);

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
    else if (project.type === "video" || project.type === "external-video") onOpenVideo(project);
    else onOpenProject(project);
  };

  const endDrag = () => {
    window.clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = window.setTimeout(() => setIsDragging(false), 700);
  };

  return (
    <div className="project-showcase" ref={rootRef}>
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
              {projects.map((project) => (
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
        <span>{projects.length.toString().padStart(2, "0")} PROJECTS</span>
        <b>MEDIA.SYSTEM / ONLINE</b>
      </div>
    </div>
  );
}

function ProjectCard({ project, duplicate, onOpen }) {
  const TypeIcon = project.type === "image" ? ImageIcon : Code2;

  return (
    <button
      type="button"
      className="gallery-project-card"
      onClick={(event) => onOpen(project, event.currentTarget)}
      aria-label={duplicate ? undefined : `Open ${project.title}`}
      tabIndex={duplicate ? -1 : 0}
    >
      <div className="gallery-project-media">
        {(project.type === "video" || project.type === "external-video") ? (
          <div className="gallery-video-poster" aria-hidden="true" />
        ) : project.thumbnail ? (
          <img src={project.thumbnail} alt="" loading="lazy" decoding="async" />
        ) : (
          <div className="gallery-project-placeholder" aria-hidden="true"><TypeIcon size={42} /></div>
        )}
        <div className="gallery-project-overlay" />
        <span className="gallery-scanline" aria-hidden="true" />
        {project.type !== "video" && project.type !== "external-video" && <span className="gallery-type-icon" aria-hidden="true"><TypeIcon size={15} /></span>}
      </div>
    </button>
  );
}
