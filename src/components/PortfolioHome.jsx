"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUp,
  Bot,
  Braces,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clapperboard,
  Cloud,
  Code2,
  Copy,
  Database,
  ExternalLink,
  Film,
  Image as ImageIcon,
  Menu,
  MessageSquare,
  Monitor,
  Orbit,
  Palette,
  Pause,
  PenTool,
  Play,
  Scissors,
  Server,
  Sparkles,
  Sun,
  Terminal,
  Video,
  X,
} from "lucide-react";
import { DiJava } from "react-icons/di";
import {
  SiClaude,
  SiCss,
  SiCursor,
  SiElevenlabs,
  SiFirebase,
  SiGit,
  SiGithub,
  SiGoogle,
  SiHtml5,
  SiJavascript,
  SiMeta,
  SiMysql,
  SiNextdotjs,
  SiPhp,
  SiPython,
  SiReact,
  SiSpringboot,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { certificateMedia } from "../data/mediaManifest";
import { useOnlineStatus } from "../hooks/useOnlineStatus";
import { FlipCard, ROTATION, useRotatingSlots } from "./RotatingDesigns";
import {
  academicProjects,
  capabilities,
  contactDetails,
  designFilters,
  developmentProjects,
  graphicDesigns,
  toolGroups,
  videos,
} from "../data/portfolioContent";

const ChatWidget = dynamic(() => import("./ChatWidget"), { ssr: false });

export const navItems = [
  ["Home", "home"],
  ["About", "about"],
  ["Gallery", "graphic-design"],
  ["Videos", "ai-videos"],
  ["Projects", "development"],
  ["Skills", "tools"],
  ["Certificates", "certificates"],
  ["Contact", "contact"],
];

export function scrollToSection(id) {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
    return;
  }
  window.location.assign(`/#${id}`);
}

function formatDuration(seconds) {
  if (!Number.isFinite(seconds)) return "—:—";
  const minutes = Math.floor(seconds / 60);
  const remainder = Math.floor(seconds % 60);
  return `${minutes}:${String(remainder).padStart(2, "0")}`;
}

export function Reveal({ children, className = "", delay = 0, ...props }) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      {...props}
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({ eyebrow, title, accent, description }) {
  return (
    <Reveal className="v2-section-heading">
      {eyebrow && <span className="v2-eyebrow">{eyebrow}</span>}
      <h2>{title}{accent ? ` ${accent}` : ""}</h2>
      {description && <p>{description}</p>}
    </Reveal>
  );
}

const workLinks = [
  ["Gallery", "graphic-design"],
  ["Videos", "ai-videos"],
  ["Projects", "development"],
  ["Certificates", "certificates"],
];

const categoryIcons = {
  Frontend: Monitor,
  Backend: Server,
  Database,
  "Creative Tools": Palette,
  "AI Tools": Sparkles,
  "Cloud / DevOps": Cloud,
};

const skillIcons = {
  html: { Icon: SiHtml5, color: "#E34F26" },
  css: { Icon: SiCss, color: "#1572B6" },
  javascript: { Icon: SiJavascript, color: "#F7DF1E" },
  typescript: { Icon: SiTypescript, color: "#3178C6" },
  react: { Icon: SiReact, color: "#61DAFB" },
  next: { Icon: SiNextdotjs, color: "#FFFFFF" },
  tailwind: { Icon: SiTailwindcss, color: "#06B6D4" },
  php: { Icon: SiPhp, color: "#777BB4" },
  java: { Icon: DiJava, color: "#E76F00" },
  spring: { Icon: SiSpringboot, color: "#6DB33F" },
  python: { Icon: SiPython, color: "#3776AB" },
  api: { Icon: Braces, color: "#EDEDED" },
  mysql: { Icon: SiMysql, color: "#4479A1" },
  supabase: { Icon: SiSupabase, color: "#3ECF8E" },
  firebase: { Icon: SiFirebase, color: "#FFCA28" },
  canva: { Icon: PenTool, color: "#00C4CC" },
  capcut: { Icon: Scissors, color: "#FFFFFF" },
  openai: { Icon: MessageSquare, color: "#FFFFFF" },
  runway: { Icon: Clapperboard, color: "#FFFFFF" },
  sora: { Icon: Film, color: "#FFFFFF" },
  dalle: { Icon: ImageIcon, color: "#FFFFFF" },
  google: { Icon: SiGoogle, color: "#4285F4" },
  pixverse: { Icon: ImageIcon, color: "#8B7CFF" },
  kling: { Icon: Video, color: "#EDEDED" },
  luma: { Icon: Sun, color: "#EDEDED" },
  elevenlabs: { Icon: SiElevenlabs, color: "#FFFFFF" },
  meta: { Icon: SiMeta, color: "#0081FB" },
  anthropic: { Icon: SiClaude, color: "#D97757" },
  codex: { Icon: Terminal, color: "#FFFFFF" },
  antigravity: { Icon: Orbit, color: "#EDEDED" },
  devin: { Icon: Bot, color: "#EDEDED" },
  cursor: { Icon: SiCursor, color: "#FFFFFF" },
  git: { Icon: SiGit, color: "#F05032" },
  github: { Icon: SiGithub, color: "#FFFFFF" },
  vercel: { Icon: SiVercel, color: "#FFFFFF" },
};

function onSpotlightMove(event) {
  const node = event.currentTarget;
  const rect = node.getBoundingClientRect();
  node.style.setProperty("--mouse-x", `${event.clientX - rect.left}px`);
  node.style.setProperty("--mouse-y", `${event.clientY - rect.top}px`);
}

function Typewriter({ text }) {
  const reducedMotion = useReducedMotion();
  const [count, setCount] = useState(reducedMotion ? text.length : 0);

  useEffect(() => {
    if (reducedMotion) return undefined;
    const timer = window.setInterval(() => {
      setCount((current) => (current >= text.length ? 0 : current + 1));
    }, 72);
    return () => window.clearInterval(timer);
  }, [reducedMotion, text]);

  return (
    <span className="v2-type">
      {text.slice(0, count)}
      <span className="v2-caret" aria-hidden="true" />
    </span>
  );
}

export function Sidebar({ activeSection }) {
  const [open, setOpen] = useState(false);
  const [workOpen, setWorkOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const workActive = workLinks.some(([, id]) => id === activeSection);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 8);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const navigate = (id) => {
    setOpen(false);
    setWorkOpen(false);
    scrollToSection(id);
  };

  return (
    <header className={`v2-topnav ${scrolled ? "is-scrolled" : ""}`}>
      <div className="v2-container v2-topnav__inner">
        <button className="v2-topnav__brand" type="button" onClick={() => navigate("home")}>
          Arron Tuazon
        </button>
        <nav className="v2-topnav__links" aria-label="Primary navigation">
          <button type="button" className={activeSection === "about" ? "is-active" : ""} onClick={() => navigate("about")}>About</button>
          <div className={`v2-dropdown ${workOpen ? "is-open" : ""}`} onMouseEnter={() => setWorkOpen(true)} onMouseLeave={() => setWorkOpen(false)}>
            <button
              type="button"
              className={workActive ? "is-active" : ""}
              aria-expanded={workOpen}
              aria-controls="work-menu"
              onClick={() => setWorkOpen((current) => !current)}
            >
              Work <ChevronDown size={14} />
            </button>
            <div id="work-menu" className="v2-dropdown__panel" role="menu">
              {workLinks.map(([label, id]) => (
                <button key={id} type="button" role="menuitem" className={activeSection === id ? "is-active" : ""} onClick={() => navigate(id)}>
                  {label}
                </button>
              ))}
            </div>
          </div>
          <button type="button" className={activeSection === "tools" ? "is-active" : ""} onClick={() => navigate("tools")}>Skills</button>
          <button type="button" className={activeSection === "contact" ? "is-active" : ""} onClick={() => navigate("contact")}>Contact</button>
        </nav>
        <div className="v2-topnav__actions">
          <a className="v2-gh" href={contactDetails.github} target="_blank" rel="noreferrer">GitHub</a>
          <a className="v2-button v2-button--quiet v2-button--small" href={`mailto:${contactDetails.email}`}>Email</a>
          <button className="v2-button v2-button--primary v2-button--small" type="button" onClick={() => navigate("graphic-design")}>View work</button>
          <button
            className="v2-menu"
            type="button"
            onClick={() => setOpen((current) => !current)}
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-navigation"
            className="v2-mobile-nav"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            {navItems.map(([label, id]) => (
              <button key={id} type="button" className={activeSection === id ? "is-active" : ""} onClick={() => navigate(id)}>
                {label}
              </button>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

export function Navbar(props) {
  return <Sidebar {...props} />;
}

const heroCopyVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } },
};

const heroLineVariants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.58, ease: [0.22, 1, 0.36, 1] } },
};

function HeroSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section id="home" className="v2-hero">
      <div className="v2-container v2-hero__grid">
        <motion.div className="v2-hero__copy" variants={heroCopyVariants} initial={reducedMotion ? false : "hidden"} animate="show">
          <motion.h1 variants={heroCopyVariants}>
            <motion.span className="v2-hero-line" variants={heroLineVariants}>Arron Tuazon</motion.span>
            <motion.span className="v2-hero-line v2-hero-line--fade" variants={heroLineVariants}>BSIT, Business Analytics</motion.span>
          </motion.h1>
          <motion.div className="v2-hero__actions" variants={heroLineVariants}>
            <button className="v2-button v2-button--primary" type="button" onClick={() => scrollToSection("graphic-design")}>
              View my work
            </button>
            <button className="v2-button v2-button--quiet" type="button" onClick={() => scrollToSection("contact")}>
              Contact
            </button>
          </motion.div>
        </motion.div>
        <motion.p className="v2-hero__description" variants={heroLineVariants} initial={reducedMotion ? false : "hidden"} animate="show">
          I combine technology and creativity to build <strong>modern digital experiences</strong>, cinematic AI-powered videos, and <strong>visually engaging graphic designs</strong>.
        </motion.p>
      </div>
    </section>
  );
}

function BentoSection() {
  const [copied, setCopied] = useState(false);
  const featuredDesign = graphicDesigns[0];
  const snippet = `${developmentProjects[0].title} · ${developmentProjects[0].tools.join(" · ")}`;
  const skillNames = toolGroups.flatMap((group) => group.tools.map(([name]) => name));

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactDetails.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = `mailto:${contactDetails.email}`;
    }
  };

  return (
    <section className="v2-section v2-bento-section" aria-label="Selected work">
      <div className="v2-container v2-bento">
        <article onMouseMove={onSpotlightMove} className="v2-spot v2-bento__wide">
          <div className="v2-spot__body">
            <h3><Code2 size={18} /> {capabilities[0].title}</h3>
            <p>{capabilities[0].description.split("practical systems")[0]}<strong>practical systems</strong>{capabilities[0].description.split("practical systems")[1]}</p>
          </div>
          <div className="v2-terminal" aria-hidden="true">
            <span>$ </span>
            <Typewriter text={snippet} />
          </div>
        </article>
        <article onMouseMove={onSpotlightMove} className="v2-spot">
          <div className="v2-spot__body">
            <h3><Palette size={18} /> {capabilities[1].title}</h3>
            <p>Clear, engaging <strong>promotional visuals</strong> and brand-ready creative work.</p>
          </div>
          <button type="button" className="v2-bento-art" onClick={() => scrollToSection("graphic-design")} aria-label={`View ${featuredDesign.title}`}>
            <Image src={featuredDesign.src} alt="" fill sizes="280px" />
          </button>
        </article>
        <article onMouseMove={onSpotlightMove} className="v2-spot">
          <div className="v2-spot__body">
            <h3><Video size={18} /> {capabilities[2].title}</h3>
            <p>Cinematic concepts shaped through <strong>AI-assisted visual storytelling</strong>.</p>
          </div>
          <button type="button" className="v2-frame" onClick={() => scrollToSection("ai-videos")} aria-label="View AI videos">
            <svg viewBox="0 0 160 90" aria-hidden="true">
              <rect x="8" y="10" width="144" height="70" rx="8" />
              <circle cx="80" cy="45" r="14" />
              <path d="M76 38l14 7-14 7z" />
            </svg>
          </button>
        </article>
        <article onMouseMove={onSpotlightMove} className="v2-spot v2-bento__wide">
          <div className="v2-spot__body">
            <h3><Sparkles size={18} /> Tools and technologies</h3>
            <p>The tools already used across my <strong>development and creative work</strong>.</p>
          </div>
          <div className="v2-marquee">
            <div className="v2-marquee__track">
              {[...skillNames, ...skillNames].map((name, index) => <span key={`${name}-${index}`}>{name}</span>)}
            </div>
          </div>
        </article>
        <article onMouseMove={onSpotlightMove} className="v2-spot">
          <div className="v2-spot__body">
            <h3><Copy size={18} /> Contact</h3>
            <p>Have a project in mind or just want to say hi? I’d love to hear from you.</p>
            <button className="v2-button v2-button--quiet v2-button--small" type="button" onClick={copyEmail}>
              {copied ? "Copied" : contactDetails.email}
            </button>
          </div>
        </article>
      </div>
    </section>
  );
}

export function GraphicDesignCard({ item, onOpen }) {
  return (
    <motion.article onMouseMove={onSpotlightMove} className="v2-design-card v2-spot" layout initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }}>
      <button type="button" className="v2-design-card__image" onClick={() => onOpen(item)} aria-label={`Open ${item.title} design preview`}>
        <Image src={item.src} alt={item.title} fill loading="lazy" sizes="(max-width: 720px) 50vw, (max-width: 1080px) 50vw, 33vw" />
        <span><ExternalLink size={18} /></span>
      </button>
      <div className="v2-design-card__meta">
        <div><h3>{item.title}</h3><p>{item.categoryLabel || item.category}</p></div>
        <button type="button" onClick={() => onOpen(item)} aria-label={`Expand ${item.title}`}><ArrowRight size={17} /></button>
      </div>
    </motion.article>
  );
}

function GraphicDesignSection({ onOpen }) {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const [filter, setFilter] = useState("All");
  const [userPaused, setUserPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);
  const pool = useMemo(
    () => (filter === "All" ? graphicDesigns : graphicDesigns.filter((item) => item.category === filter)),
    [filter],
  );
  const canRotate = !reducedMotion && pool.length > ROTATION.slotCount;
  const { slots, pauseSlot, resumeSlot } = useRotatingSlots(pool, ROTATION.slotCount, {
    enabled: canRotate && !userPaused && inView && !tabHidden,
  });

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.15 });
    observer.observe(node);
    const onVisibility = () => setTabHidden(document.visibilityState === "hidden");
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <section id="graphic-design" className="v2-section v2-design-section" ref={sectionRef}>
      <div className="v2-container">
        <SectionHeading eyebrow="Featured Work" title="Featured" accent="Graphic Design" description="A selection of my best graphic designs and brand creatives." />
        <div className="v2-filters" role="group" aria-label="Filter graphic designs">
          {designFilters.map((item) => (
            <button key={item} type="button" className={filter === item ? "is-active" : ""} onClick={() => setFilter(item)} aria-pressed={filter === item}>
              {item}
            </button>
          ))}
          {canRotate && (
            <button
              type="button"
              className="v2-rotation-toggle"
              aria-pressed={userPaused}
              onClick={() => setUserPaused((value) => !value)}
            >
              {userPaused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
              {userPaused ? "Play" : "Pause"}
            </button>
          )}
        </div>
        <div className="v2-design-grid">
          {slots.map((item, index) => (
            <FlipCard
              key={`${filter}-${index}`}
              item={item}
              index={index}
              onOpen={onOpen}
              onMouseMove={onSpotlightMove}
              onPause={() => pauseSlot(index)}
              onResume={() => resumeSlot(index)}
            />
          ))}
        </div>
        <div className="v2-section-action"><Link className="v2-button v2-button--outline" href="/graphic-design">View all graphic designs</Link></div>
      </div>
    </section>
  );
}

function TikTokVideoCard({ item }) {
  const online = useOnlineStatus();
  return (
    <article className="v2-video-card">
      <a
        className="v2-video-card__link"
        href={item.tiktokUrl || contactDetails.tiktok}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View ${item.title} on TikTok`}
        aria-disabled={!online}
        onClick={(event) => {
          if (!online) event.preventDefault();
        }}
      >
        <div className="v2-video-card__preview">
          <Image
            src={item.src}
            alt={`${item.title} thumbnail`}
            fill
            loading="lazy"
            sizes="(max-width: 760px) 70vw, (max-width: 1240px) 33vw, 17vw"
            className={item.imageFit === "contain" ? "v2-video-card__thumbnail--contain" : undefined}
          />
          {online ? <span className="v2-tiktok-cta">View on TikTok</span> : <span className="v2-offline-note">Available when you're online</span>}
        </div>
        <div className="v2-video-card__copy">
          <span>{item.category}</span>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </div>
      </a>
    </article>
  );
}

function PlayableVideoCard({ item, onOpen }) {
  const online = useOnlineStatus();
  const [duration, setDuration] = useState(null);
  const [visible, setVisible] = useState(false);
  const rootRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || typeof IntersectionObserver === "undefined") {
      const timer = window.setTimeout(() => setVisible(true), 0);
      return () => window.clearTimeout(timer);
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { rootMargin: "180px" });
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return (
    <article ref={rootRef} className="v2-video-card">
      <button
        type="button"
        className="v2-video-card__preview"
        onClick={() => {
          if (online) onOpen(item);
        }}
        disabled={!online}
        aria-disabled={!online}
        aria-label={online ? `Play ${item.title}` : `${item.title} is available when you're online`}
      >
        {online ? (
          <video
            ref={videoRef}
            src={visible ? item.src : undefined}
            preload={visible ? "metadata" : "none"}
            muted
            playsInline
            tabIndex={-1}
            aria-hidden="true"
            onLoadedMetadata={(event) => {
              setDuration(event.currentTarget.duration);
              if (event.currentTarget.duration > 0.15) event.currentTarget.currentTime = 0.1;
            }}
          />
        ) : (
          <span className="v2-video-placeholder" aria-hidden="true" />
        )}
        {online && <span className="v2-play"><Play size={22} fill="currentColor" /></span>}
        {online && <span className="v2-duration">{formatDuration(duration)}</span>}
        {!online && <span className="v2-offline-note">Available when you're online</span>}
      </button>
      <div className="v2-video-card__copy">
        <span>{item.category}</span>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </div>
    </article>
  );
}

export function VideoCard({ item, onOpen }) {
  if (item.mediaType === "image" && item.platform === "tiktok") {
    return <TikTokVideoCard item={item} />;
  }

  return <PlayableVideoCard item={item} onOpen={onOpen} />;
}

export function TikTokPrompt() {
  return (
    <p className="v2-tiktok-prompt">
      <a href={contactDetails.tiktok} target="_blank" rel="noopener noreferrer">
        Want to see more? Explore my other AI-generated videos on TikTok.
      </a>
    </p>
  );
}

function VideoSection({ onOpen }) {
  return (
    <section id="ai-videos" className="v2-section v2-video-section">
      <div className="v2-container v2-video-frame">
        <SectionHeading eyebrow="Motion & Story" title="AI Videos &" accent="Short Commercials" description="Cinematic AI-generated stories, character films, and short-form commercial content." />
        <div className="v2-video-grid">
          {videos.map((item) => <VideoCard key={item.id} item={item} onOpen={onOpen} />)}
        </div>
        <TikTokPrompt />
        <div className="v2-section-action"><Link className="v2-button v2-button--outline" href="/ai-videos">View all videos</Link></div>
      </div>
    </section>
  );
}

export function ProjectCard({ project, index }) {
  return (
    <Reveal className="v2-project-card v2-spot" delay={(index % 3) * 0.04} onMouseMove={onSpotlightMove}>
      <div className="v2-project-card__visual">
        <span className="v2-project-index">{String(index + 1).padStart(2, "0")}</span>
        <Image src={project.previewImage || project.thumbnail} alt={`${project.title} interface`} fill loading="lazy" sizes="(max-width: 720px) 50vw, (max-width: 1100px) 50vw, 25vw" />
      </div>
      <div className="v2-project-card__copy">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="v2-badges">{project.tools.map((tool) => <span key={tool}>{tool}</span>)}</div>
      </div>
    </Reveal>
  );
}

function DevelopmentSection() {
  return (
    <section id="development" className="v2-section v2-development-section">
      <div className="v2-container">
        <SectionHeading eyebrow="Builds 04" title="Development" accent="Projects" description="Selected web, mobile, and academic systems built around practical workflows." />
        <div className="v2-project-grid">
          {developmentProjects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}
        </div>
        <div className="v2-section-action"><Link className="v2-button v2-button--quiet" href="/projects">View all projects</Link></div>
      </div>
    </section>
  );
}

function ToolsSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section id="tools" className="v2-section v2-tools-section">
      <div className="v2-container">
        <SectionHeading eyebrow="Skills" title="Tools and" accent="technologies" description="The tools already used across my development and creative work." />
        <div className="v2-tool-groups">
          {toolGroups.map((group, groupIndex) => {
            const CategoryIcon = categoryIcons[group.title] || Sparkles;
            return (
              <motion.article
                className="v2-tool-group v2-spot"
                key={group.title}
                onMouseMove={onSpotlightMove}
                initial={reducedMotion ? false : { opacity: 0, y: 16 }}
                whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: groupIndex * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <h3><CategoryIcon size={16} aria-hidden="true" /> {group.title}</h3>
                <div>
                  {group.tools.map(([name, key], pillIndex) => {
                    const spec = skillIcons[key] || { Icon: Code2, color: "#EDEDED" };
                    const SkillIcon = spec.Icon;
                    return (
                      <motion.span
                        className="v2-tool"
                        key={name}
                        style={{ "--brand": spec.color }}
                        initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                        whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.35, delay: 0.12 + pillIndex * 0.04, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <SkillIcon aria-hidden="true" />
                        {name}
                      </motion.span>
                    );
                  })}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="v2-section v2-about-section">
      <div className="v2-container v2-about__grid">
        <Reveal className="v2-about__copy">
          <span className="v2-eyebrow">About</span>
          <h2>I build digital experiences that inform, inspire, and connect.</h2>
          <p>
            I’m Arron Tuazon, a BSIT student majoring in <strong>Business Analytics</strong>. I combine <strong>software development</strong>,
            AI video creation, and graphic design. I build functional systems, produce cinematic digital content,
            and create visuals that communicate ideas clearly.
          </p>
        </Reveal>
        <div className="v2-portrait">
          <Image src="/assets/profile-hover.jpg" alt="Portrait of Arron Tuazon" fill sizes="(max-width: 860px) 72vw, 320px" />
        </div>
        <div className="v2-capabilities">
          {capabilities.map((item, index) => (
            <Reveal className="v2-capability" key={item.title} delay={index * 0.04}>
              <div><h3>{item.title}</h3><p>{item.description}</p></div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function AcademicSection() {
  return (
    <section id="academic-projects" className="v2-section v2-academic-section">
      <div className="v2-container">
        <div className="v2-academic__heading">
          <div><span className="v2-eyebrow">Academic Work</span><h2>Academic Projects</h2><p>Selected systems and applications developed as part of my academic work.</p></div>
          <Link href="/school-projects">View all academic media <ArrowRight size={16} /></Link>
        </div>
        <div className="v2-academic-grid">
          {academicProjects.map((project) => (
            <article className="v2-academic-card" key={project.id}>
              <div className="v2-academic-card__image"><Image src={project.image} alt={`${project.title} screenshot`} fill loading="lazy" sizes="(max-width: 760px) 28vw, 12vw" /></div>
              <div><h3>{project.title}</h3><p>{project.description}</p><div className="v2-badges">{project.stack.map((tool) => <span key={tool}>{tool}</span>)}</div></div>
              <Link href={project.detailsUrl} aria-label={`View ${project.title} details`}><ExternalLink size={16} /></Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CertificatesSection({ onOpen }) {
  return (
    <section id="certificates" className="v2-section v2-certificates-section">
      <div className="v2-container">
        <SectionHeading eyebrow="Learning" title="Certificates" description="Completed courses and workshops already included in this portfolio." />
        <div className="v2-design-grid">
          {certificateMedia.map((item) => <GraphicDesignCard key={item.id} item={item} onOpen={onOpen} />)}
        </div>
        <div className="v2-section-action"><Link className="v2-button v2-button--outline" href="/certificates">View all certificates</Link></div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="v2-section v2-contact-section">
      <div className="v2-container v2-contact-card">
        <div className="v2-contact-card__copy">
          <span className="v2-eyebrow">Contact</span>
          <h2>Let’s build something together.</h2>
          <p>Have a project in mind or just want to say hi? I’d love to hear from you.</p>
          <div className="v2-contact-actions">
            <a className="v2-button v2-button--primary" href={`mailto:${contactDetails.email}?subject=${encodeURIComponent("Portfolio inquiry")}`}>
              Email me
            </a>
          </div>
        </div>
        <div className="v2-contact-details">
          <div className="v2-contact-line">
            <div>
              <small>Email</small>
              <a href={`mailto:${contactDetails.email}`}>{contactDetails.email}</a>
            </div>
          </div>
          <div className="v2-socials">
            <p>Links</p>
            <a href={contactDetails.github} target="_blank" rel="noreferrer">GitHub</a>
            <a href={contactDetails.tiktok} target="_blank" rel="noreferrer">TikTok</a>
          </div>
          <div className="v2-availability"><div><strong>BSIT, Business Analytics</strong><small>Open to collaborations and project work</small></div></div>
        </div>
      </div>
    </section>
  );
}

export function MediaModal({ item, onClose, onPrevious, onNext }) {
  const closeRef = useRef(null);
  const dialogRef = useRef(null);
  const returnFocusRef = useRef(null);

  useEffect(() => {
    if (!item) return undefined;
    returnFocusRef.current = document.activeElement;
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(() => closeRef.current?.focus(), 0);
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onPrevious?.();
      if (event.key === "ArrowRight") onNext?.();
      if (event.key === "Tab" && dialogRef.current) {
        const controls = [...dialogRef.current.querySelectorAll("button:not(:disabled), a[href], video[controls]")];
        if (!controls.length) return;
        const first = controls[0];
        const last = controls.at(-1);
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      const video = dialog?.querySelector("video");
      video?.pause();
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      returnFocusRef.current?.focus?.({ preventScroll: true });
    };
  }, [item, onClose, onNext, onPrevious]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div className="v2-modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <button type="button" className="v2-modal__backdrop" onClick={onClose} aria-label="Close preview" tabIndex={-1} />
          <motion.div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="v2-modal-title" className={`v2-modal__dialog ${item.src?.endsWith(".mp4") ? "is-video" : ""}`} initial={{ opacity: 0, y: 18, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: 0.98 }}>
            <button ref={closeRef} className="v2-modal__close" type="button" onClick={onClose} aria-label="Close preview"><X /></button>
            {onPrevious && <button type="button" className="v2-modal__nav v2-modal__nav--left" onClick={onPrevious} aria-label="Previous design"><ChevronLeft /></button>}
            {onNext && <button type="button" className="v2-modal__nav v2-modal__nav--right" onClick={onNext} aria-label="Next design"><ChevronRight /></button>}
            <div className="v2-modal__media">
              {item.src.endsWith(".mp4") ? (
                <video key={item.src} src={item.src} controls autoPlay playsInline preload="metadata" aria-label={`${item.title} video`} />
              ) : (
                <Image src={item.src} alt={item.title} fill sizes="90vw" priority />
              )}
            </div>
            <div className="v2-modal__caption"><span>{item.categoryLabel || item.category}</span><h2 id="v2-modal-title">{item.title}</h2>{item.description && <p>{item.description}</p>}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Footer() {
  return (
    <footer className="v2-footer">
      <div className="v2-container v2-footer__inner">
        <span className="v2-brand">Arron Tuazon</span>
        <p>© {new Date().getFullYear()} Arron Tuazon. All rights reserved.</p>
        <nav aria-label="Footer navigation">
          {navItems.map(([label, id]) => (
            <button key={id} type="button" onClick={() => scrollToSection(id)}>{label}</button>
          ))}
        </nav>
        <button className="v2-back-top" type="button" onClick={() => scrollToSection("home")} aria-label="Back to top"><ArrowUp /></button>
      </div>
    </footer>
  );
}

export default function PortfolioHome() {
  const [activeSection, setActiveSection] = useState("home");
  const [modalItem, setModalItem] = useState(null);
  const [modalCollection, setModalCollection] = useState(null);

  useEffect(() => {
    const sections = navItems.map(([, id]) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target.id) setActiveSection(visible.target.id);
    }, { rootMargin: "-30% 0px -58%", threshold: [0.05, 0.2, 0.45] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const openDesign = useCallback((item) => { setModalCollection(graphicDesigns); setModalItem(item); }, []);
  const openCertificate = useCallback((item) => { setModalCollection(certificateMedia); setModalItem(item); }, []);
  const openVideo = useCallback((item) => { setModalCollection(null); setModalItem(item); }, []);
  const moveModal = useCallback((direction) => {
    if (!modalCollection || !modalItem) return;
    const index = modalCollection.findIndex((item) => item.id === modalItem.id);
    setModalItem(modalCollection[(index + direction + modalCollection.length) % modalCollection.length]);
  }, [modalCollection, modalItem]);
  const previous = useMemo(() => modalCollection ? () => moveModal(-1) : null, [modalCollection, moveModal]);
  const next = useMemo(() => modalCollection ? () => moveModal(1) : null, [modalCollection, moveModal]);

  return (
    <div className="v2-site">
      <Sidebar activeSection={activeSection} />
      <div className="v2-main">
        <main>
          <HeroSection />
          <BentoSection />
          <AboutSection />
          <GraphicDesignSection onOpen={openDesign} />
          <VideoSection onOpen={openVideo} />
          <DevelopmentSection />
          <AcademicSection />
          <ToolsSection />
          <CertificatesSection onOpen={openCertificate} />
          <ContactSection />
        </main>
        <Footer />
      </div>
      <ChatWidget />
      <MediaModal item={modalItem} onClose={() => setModalItem(null)} onPrevious={previous} onNext={next} />
    </div>
  );
}
