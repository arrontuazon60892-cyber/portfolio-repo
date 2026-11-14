"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Menu,
  Play,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { certificateMedia } from "../data/mediaManifest";
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

export function Reveal({ children, className = "", delay = 0 }) {
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

export function SectionHeading({ eyebrow, title, accent, description }) {
  return (
    <Reveal className="v2-section-heading">
      {eyebrow && <span className="v2-eyebrow">{eyebrow}</span>}
      <h2>{title}{accent ? ` ${accent}` : ""}</h2>
      {description && <p>{description}</p>}
    </Reveal>
  );
}

function NavLinks({ activeSection, onNavigate, className, label }) {
  return (
    <nav className={className} aria-label={label}>
      {navItems.map(([itemLabel, id]) => (
        <button
          key={id}
          type="button"
          className={activeSection === id ? "is-active" : ""}
          aria-current={activeSection === id ? "true" : undefined}
          onClick={() => onNavigate(id)}
        >
          {itemLabel}
        </button>
      ))}
    </nav>
  );
}

export function Sidebar({ activeSection }) {
  const [open, setOpen] = useState(false);

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
    scrollToSection(id);
  };

  return (
    <>
      <aside className="v2-sidebar">
        <button className="v2-sidebar__brand" type="button" onClick={() => navigate("home")}>
          Arron Tuazon
        </button>
        <NavLinks activeSection={activeSection} onNavigate={navigate} className="v2-sidebar__nav" label="Primary navigation" />
        <div className="v2-sidebar__foot">
          <a href={`mailto:${contactDetails.email}`}>{contactDetails.email}</a>
        </div>
      </aside>
      <header className="v2-mobile-bar">
        <button className="v2-sidebar__brand" type="button" onClick={() => navigate("home")}>
          Arron Tuazon
        </button>
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
      </header>
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-navigation"
            className="v2-mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <NavLinks activeSection={activeSection} onNavigate={navigate} className="v2-mobile-nav__list" label="Mobile navigation" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
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
        <motion.div
          className="v2-portrait"
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45 }}
        >
          <Image
            src="/assets/profile-hover.jpg"
            alt="Portrait of Arron Tuazon"
            fill
            priority
            sizes="(max-width: 860px) 72vw, 280px"
          />
        </motion.div>
        <motion.div className="v2-hero__copy" variants={heroCopyVariants} initial={reducedMotion ? false : "hidden"} animate="show">
          <motion.p className="v2-eyebrow" variants={heroLineVariants}>Portfolio</motion.p>
          <motion.h1 variants={heroLineVariants}>Arron Tuazon</motion.h1>
          <motion.p className="v2-role" variants={heroLineVariants}>BSIT Major in Business Analytics</motion.p>
          <motion.p className="v2-hero__description" variants={heroLineVariants}>
            I combine technology and creativity to build modern digital experiences,
            cinematic AI-powered videos, and visually engaging graphic designs.
          </motion.p>
          <motion.div className="v2-hero__actions" variants={heroLineVariants}>
            <button className="v2-button v2-button--primary" type="button" onClick={() => scrollToSection("graphic-design")}>
              View my work
            </button>
            <button className="v2-button v2-button--quiet" type="button" onClick={() => scrollToSection("contact")}>
              Contact
            </button>
          </motion.div>
          <motion.div className="v2-hero-links" variants={heroLineVariants}>
            <a href={`mailto:${contactDetails.email}`}>Email</a>
            <a href={contactDetails.github} target="_blank" rel="noreferrer">GitHub</a>
            <a href={contactDetails.tiktok} target="_blank" rel="noreferrer">TikTok</a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export function GraphicDesignCard({ item, onOpen }) {
  return (
    <motion.article className="v2-design-card" layout initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }}>
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
            {filtered.map((item) => <GraphicDesignCard key={item.id} item={item} onOpen={onOpen} />)}
          </AnimatePresence>
        </motion.div>
        <div className="v2-section-action"><Link className="v2-button v2-button--outline" href="/graphic-design">View all graphic designs</Link></div>
      </div>
    </section>
  );
}

function TikTokVideoCard({ item }) {
  return (
    <article className="v2-video-card">
      <a
        className="v2-video-card__link"
        href={item.tiktokUrl || contactDetails.tiktok}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View ${item.title} on TikTok`}
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
          <span className="v2-tiktok-cta">View on TikTok</span>
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
      <button type="button" className="v2-video-card__preview" onClick={() => onOpen(item)} aria-label={`Play ${item.title}`}>
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
    <Reveal className="v2-project-card" delay={(index % 3) * 0.04}>
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
  return (
    <section id="tools" className="v2-section v2-tools-section">
      <div className="v2-container">
        <SectionHeading eyebrow="Skills" title="Tools and" accent="technologies" description="The tools already used across my development and creative work." />
        <div className="v2-tool-groups">
          {toolGroups.map((group) => (
            <Reveal className="v2-tool-group" key={group.title}>
              <h3>{group.title}</h3>
              <div>
                {group.tools.map(([name]) => (
                  <span className="v2-tool" key={name}>{name}</span>
                ))}
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
          <span className="v2-eyebrow">About</span>
          <h2>I build digital experiences that inform, inspire, and connect.</h2>
          <p>
            I’m Arron Tuazon, a BSIT student majoring in Business Analytics. I combine software development,
            AI video creation, and graphic design. I build functional systems, produce cinematic digital content,
            and create visuals that communicate ideas clearly.
          </p>
        </Reveal>
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
