"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUp,
  Braces,
  Check,
  ChevronLeft,
  ChevronRight,
  Code2,
  Download,
  ExternalLink,
  Github,
  Mail,
  Menu,
  MessageSquare,
  Palette,
  Play,
  Send,
  Sparkles,
  Video,
  X,
} from "lucide-react";
import { FaJava } from "react-icons/fa";
import {
  SiAnthropic,
  SiCss,
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
  SiTiktok,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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

const navItems = [
  ["Home", "home"],
  ["Graphic Design", "graphic-design"],
  ["AI Videos", "ai-videos"],
  ["Development", "development"],
  ["About", "about"],
  ["Contact", "contact"],
];

const iconMap = {
  html: SiHtml5,
  css: SiCss,
  javascript: SiJavascript,
  typescript: SiTypescript,
  react: SiReact,
  next: SiNextdotjs,
  tailwind: SiTailwindcss,
  php: SiPhp,
  java: FaJava,
  spring: SiSpringboot,
  python: SiPython,
  api: Braces,
  mysql: SiMysql,
  supabase: SiSupabase,
  firebase: SiFirebase,
  canva: () => <span className="v2-glyph">CA</span>,
  google: SiGoogle,
  openai: () => <span className="v2-glyph">AI</span>,
  anthropic: SiAnthropic,
  meta: SiMeta,
  git: SiGit,
  github: SiGithub,
  vercel: SiVercel,
  capcut: () => <span className="v2-glyph">CC</span>,
  runway: () => <span className="v2-glyph">R</span>,
  codex: () => <Code2 aria-hidden="true" />,
};

const capabilityIcons = {
  code: Code2,
  palette: Palette,
  video: Video,
  sparkles: Sparkles,
};

function scrollToSection(id) {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.getElementById(id)?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
}

function formatDuration(seconds) {
  if (!Number.isFinite(seconds)) return "—:—";
  const minutes = Math.floor(seconds / 60);
  const remainder = Math.floor(seconds % 60);
  return `${minutes}:${String(remainder).padStart(2, "0")}`;
}

function Reveal({ children, className = "", delay = 0 }) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
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

function SectionHeading({ eyebrow, title, accent, description }) {
  return (
    <Reveal className="v2-section-heading">
      <span className="v2-eyebrow"><Sparkles size={13} /> {eyebrow}</span>
      <h2>{title} {accent && <span>{accent}</span>}</h2>
      {description && <p>{description}</p>}
    </Reveal>
  );
}

function Navbar({ activeSection }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const navigate = (id) => {
    setOpen(false);
    scrollToSection(id);
  };

  return (
    <header className={`v2-nav ${scrolled ? "is-scrolled" : ""}`}>
      <div className="v2-container v2-nav__inner">
        <button className="v2-brand" type="button" onClick={() => navigate("home")} aria-label="Go to home">
          <span>&lt;</span> AT <span>/&gt;</span>
        </button>
        <nav className="v2-nav__links" aria-label="Primary navigation">
          {navItems.map(([label, id]) => (
            <button
              key={id}
              type="button"
              className={activeSection === id ? "is-active" : ""}
              aria-current={activeSection === id ? "page" : undefined}
              onClick={() => navigate(id)}
            >
              {label}
            </button>
          ))}
        </nav>
        <div className="v2-nav__actions">
          {contactDetails.resume ? (
            <a className="v2-button v2-button--quiet v2-button--small" href={contactDetails.resume} download>
              Resume <Download size={15} />
            </a>
          ) : (
            <span className="v2-button v2-button--quiet v2-button--small is-disabled" aria-disabled="true" title="Resume file not available">
              Resume <Download size={15} />
            </span>
          )}
          <button className="v2-button v2-button--primary v2-button--small v2-nav__contact" type="button" onClick={() => navigate("contact")}>
            Contact <MessageSquare size={15} />
          </button>
          <button
            className="v2-menu"
            type="button"
            onClick={() => setOpen((current) => !current)}
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
          >
            {open ? <X /> : <Menu />}
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
              <button key={id} type="button" onClick={() => navigate(id)} className={activeSection === id ? "is-active" : ""}>
                {label}
              </button>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function HeroSection() {
  const heroTools = [
    ["Next.js", SiNextdotjs],
    ["React", SiReact],
    ["Tailwind CSS", SiTailwindcss],
    ["Canva", () => <span className="v2-glyph">CA</span>],
    ["ChatGPT", () => <span className="v2-glyph">AI</span>],
    ["GitHub", SiGithub],
  ];

  return (
    <section id="home" className="v2-hero">
      <div className="v2-orb v2-orb--one" aria-hidden="true" />
      <div className="v2-orb v2-orb--two" aria-hidden="true" />
      <div className="v2-container v2-hero__grid">
        <motion.div
          className="v2-hero__copy"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="v2-hello">Hi, I’m <span>Arron Tuazon</span></p>
          <h1>IT Specialist<br />AI Video Creator<br /><span>&amp; Graphic Designer</span></h1>
          <p className="v2-hero__description">
            I combine technology and creativity to build modern digital experiences,
            cinematic AI-powered videos, and visually engaging graphic designs.
          </p>
          <div className="v2-hero__actions">
            <button className="v2-button v2-button--primary" type="button" onClick={() => scrollToSection("graphic-design")}>
              View My Work <ArrowRight size={18} />
            </button>
            <button className="v2-button v2-button--quiet" type="button" onClick={() => scrollToSection("contact")}>
              Contact Me <MessageSquare size={18} />
            </button>
          </div>
          <div className="v2-hero-tools">
            <p>Tools I Use</p>
            <div>
              {heroTools.map(([name, Icon]) => (
                <span key={name} title={name} aria-label={name}><Icon aria-hidden="true" /></span>
              ))}
            </div>
          </div>
        </motion.div>
        <motion.div
          className="v2-hero-art"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          aria-label="Collage of selected graphic design work"
        >
          <div className="v2-hero-art__grid" aria-hidden="true" />
          <div className="v2-hero-art__label"><Sparkles size={14} /> Creative archive / selected work</div>
          <div className="v2-art-card v2-art-card--main">
            <Image src="/assets/GRAPHIC_DESIGN_V2/404 REALITY NOT FOUND.png" alt="404 Reality Not Found design" fill priority sizes="(max-width: 800px) 65vw, 28vw" />
          </div>
          <div className="v2-art-card v2-art-card--top">
            <Image src="/assets/GRAPHIC_DESIGN_V2/perfume.png" alt="Floral Mist perfume design" fill priority sizes="(max-width: 800px) 34vw, 15vw" />
          </div>
          <div className="v2-art-card v2-art-card--bottom">
            <Image src="/assets/GRAPHIC_DESIGN_V2/graphic_design (3).png" alt="Crunch Burger design" fill priority sizes="(max-width: 800px) 34vw, 15vw" />
          </div>
          <span className="v2-art-glow" aria-hidden="true" />
        </motion.div>
      </div>
    </section>
  );
}

function GraphicDesignSection({ onOpen }) {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? graphicDesigns.slice(0, 6) : graphicDesigns.filter((item) => item.category === filter);

  return (
    <section id="graphic-design" className="v2-section v2-design-section">
      <div className="v2-container">
        <SectionHeading eyebrow="Featured Work" title="Featured" accent="Graphic Design" description="A selection of my best graphic designs and brand creatives." />
        <div className="v2-filters" role="group" aria-label="Filter graphic designs">
          {designFilters.map((item) => (
            <button key={item} type="button" className={filter === item ? "is-active" : ""} onClick={() => setFilter(item)} aria-pressed={filter === item}>
              {item}
            </button>
          ))}
        </div>
        <motion.div className="v2-design-grid" layout>
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <motion.article key={item.id} className="v2-design-card" layout initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }}>
                <button type="button" className="v2-design-card__image" onClick={() => onOpen(item)} aria-label={`Open ${item.title} design preview`}>
                  <Image src={item.src} alt={item.title} fill loading="lazy" sizes="(max-width: 720px) 100vw, (max-width: 1080px) 50vw, 33vw" />
                  <span><ExternalLink size={18} /></span>
                </button>
                <div className="v2-design-card__meta">
                  <div><h3>{item.title}</h3><p>{item.categoryLabel}</p></div>
                  <button type="button" onClick={() => onOpen(item)} aria-label={`Expand ${item.title}`}><ArrowRight size={17} /></button>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
        <div className="v2-section-action"><Link className="v2-button v2-button--outline" href="/graphic-design"><Palette size={17} /> View All Graphic Designs <ArrowRight size={17} /></Link></div>
      </div>
    </section>
  );
}

function VideoCard({ item, onOpen }) {
  const [duration, setDuration] = useState(null);
  const videoRef = useRef(null);
  return (
    <article className="v2-video-card">
      <button type="button" className="v2-video-card__preview" onClick={() => onOpen(item)} aria-label={`Play ${item.title}`}>
        <video
          ref={videoRef}
          src={item.src}
          preload="metadata"
          muted
          playsInline
          tabIndex={-1}
          aria-hidden="true"
          onLoadedMetadata={(event) => {
            setDuration(event.currentTarget.duration);
            if (event.currentTarget.duration > 0.15) event.currentTarget.currentTime = 0.1;
          }}
        />
        <span className="v2-play"><Play size={22} fill="currentColor" /></span>
        <span className="v2-duration">{formatDuration(duration)}</span>
      </button>
      <div className="v2-video-card__copy">
        <span>{item.category}</span>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </div>
    </article>
  );
}

function VideoSection({ onOpen }) {
  return (
    <section id="ai-videos" className="v2-section v2-video-section">
      <div className="v2-container v2-video-frame">
        <SectionHeading eyebrow="Motion & Story" title="AI Video" accent="Showcase" description="Cinematic AI-generated videos and creative storytelling." />
        <div className="v2-video-grid">
          {videos.map((item) => <VideoCard key={item.id} item={item} onOpen={onOpen} />)}
        </div>
        <div className="v2-section-action"><Link className="v2-button v2-button--outline" href="/ai-video"><Video size={17} /> View All AI Videos <ArrowRight size={17} /></Link></div>
      </div>
    </section>
  );
}

function ProjectActions({ project }) {
  return (
    <div className="v2-project-card__actions">
      {project.liveUrl ? (
        <a href={project.liveUrl} target="_blank" rel="noreferrer">Live Demo <ExternalLink size={14} /></a>
      ) : (
        <span aria-disabled="true">Live Demo <ExternalLink size={14} /></span>
      )}
      {project.sourceUrl ? (
        <a href={project.sourceUrl} target="_blank" rel="noreferrer">GitHub <Github size={14} /></a>
      ) : (
        <span aria-disabled="true">GitHub <Github size={14} /></span>
      )}
    </div>
  );
}

function DevelopmentSection() {
  return (
    <section id="development" className="v2-section v2-development-section">
      <div className="v2-container">
        <SectionHeading eyebrow="Builds 04" title="Development" accent="Projects" description="Selected web, mobile, and academic systems built around practical workflows." />
        <div className="v2-project-grid">
          {developmentProjects.map((project, index) => (
            <Reveal className="v2-project-card" key={project.id} delay={(index % 3) * 0.04}>
              <div className="v2-project-card__visual">
                <span className="v2-project-index">{String(index + 1).padStart(2, "0")}</span>
                {project.previewImage || project.thumbnail ? (
                  <Image src={project.previewImage || project.thumbnail} alt={`${project.title} interface`} fill loading="lazy" sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 20vw" />
                ) : (
                  <div className="v2-portfolio-preview" role="img" aria-label="Portfolio website interface preview">
                    <span>&lt; AT /&gt;</span><strong>Creative<br />Technologist</strong><i />
                  </div>
                )}
              </div>
              <div className="v2-project-card__copy">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="v2-badges">{project.tools.map((tool) => <span key={tool}>{tool}</span>)}</div>
                <ProjectActions project={project} />
              </div>
            </Reveal>
          ))}
        </div>
        <div className="v2-section-action"><Link className="v2-button v2-button--quiet" href="/projects">View All Projects <ArrowRight size={17} /></Link></div>
      </div>
    </section>
  );
}

function ToolsSection() {
  return (
    <section id="tools" className="v2-section v2-tools-section">
      <div className="v2-container">
        <SectionHeading eyebrow="Capabilities" title="Tools &" accent="Technologies" description="The tools already used across my development and creative work." />
        <div className="v2-tool-groups">
          {toolGroups.map((group) => (
            <Reveal className="v2-tool-group" key={group.title}>
              <h3>{group.title}</h3>
              <div>
                {group.tools.map(([name, icon]) => {
                  const Icon = iconMap[icon];
                  return <span className={`v2-tool v2-tool--${icon}`} key={name}><Icon aria-hidden="true" /><small>{name}</small></span>;
                })}
              </div>
            </Reveal>
          ))}
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
          <span className="v2-eyebrow">About Me</span>
          <h2>I build digital experiences that <span>inform, inspire, and connect.</span></h2>
          <p>
            I’m an IT specialist focused on combining software development, AI video creation,
            and graphic design. I build functional systems, produce cinematic digital content,
            and create visuals that communicate ideas clearly.
          </p>
        </Reveal>
        <div className="v2-capabilities">
          {capabilities.map((item, index) => {
            const Icon = capabilityIcons[item.icon];
            return (
              <Reveal className="v2-capability" key={item.title} delay={index * 0.04}>
                <Icon aria-hidden="true" />
                <div><h3>{item.title}</h3><p>{item.description}</p></div>
              </Reveal>
            );
          })}
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

function ContactSection() {
  const [sent, setSent] = useState(false);
  const handleMessage = () => {
    window.location.href = `mailto:${contactDetails.email}?subject=${encodeURIComponent("Portfolio inquiry")}`;
    setSent(true);
    window.setTimeout(() => setSent(false), 1800);
  };

  return (
    <section id="contact" className="v2-section v2-contact-section">
      <div className="v2-container v2-contact-card">
        <div className="v2-contact-card__copy">
          <span className="v2-eyebrow">Let’s Work Together</span>
          <h2>Let’s build something <span>amazing together.</span></h2>
          <p>Have a project in mind or just want to say hi? I’d love to hear from you.</p>
          <div className="v2-contact-actions">
            <button className="v2-button v2-button--primary" type="button" onClick={handleMessage}>
              {sent ? <Check size={17} /> : <Send size={17} />} {sent ? "Email Ready" : "Send Me a Message"}
            </button>
            {contactDetails.resume ? (
              <a className="v2-button v2-button--quiet" href={contactDetails.resume} download><Download size={17} /> Download Resume</a>
            ) : (
              <span className="v2-button v2-button--quiet is-disabled" aria-disabled="true" title="Resume file not available"><Download size={17} /> Download Resume</span>
            )}
          </div>
        </div>
        <div className="v2-contact-details">
          <div className="v2-contact-line"><Mail aria-hidden="true" /><div><small>Email</small><a href={`mailto:${contactDetails.email}`}>{contactDetails.email}</a></div></div>
          <div className="v2-socials">
            <p>Let’s connect</p>
            <a href={contactDetails.github} target="_blank" rel="noreferrer" aria-label="GitHub"><SiGithub /></a>
            <a href={contactDetails.tiktok} target="_blank" rel="noreferrer" aria-label="TikTok"><SiTiktok /></a>
          </div>
          <div className="v2-availability"><span aria-hidden="true" /><div><strong>Available for opportunities</strong><small>Open to freelance and full-time roles</small></div></div>
        </div>
      </div>
    </section>
  );
}

function MediaModal({ item, onClose, onPrevious, onNext }) {
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

function Footer() {
  return (
    <footer className="v2-footer">
      <div className="v2-container v2-footer__inner">
        <span className="v2-brand"><span>&lt;</span> AT <span>/&gt;</span></span>
        <p>© {new Date().getFullYear()} Arron Tuazon. All rights reserved.</p>
        <nav aria-label="Footer navigation">
          <button type="button" onClick={() => scrollToSection("home")}>Home</button>
          <button type="button" onClick={() => scrollToSection("about")}>About</button>
          <button type="button" onClick={() => scrollToSection("development")}>Projects</button>
          <button type="button" onClick={() => scrollToSection("contact")}>Contact</button>
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
      <Navbar activeSection={activeSection} />
      <main>
        <HeroSection />
        <GraphicDesignSection onOpen={openDesign} />
        <VideoSection onOpen={openVideo} />
        <DevelopmentSection />
        <ToolsSection />
        <AboutSection />
        <AcademicSection />
        <ContactSection />
      </main>
      <Footer />
      <ChatWidget />
      <MediaModal item={modalItem} onClose={() => setModalItem(null)} onPrevious={previous} onNext={next} />
    </div>
  );
}
