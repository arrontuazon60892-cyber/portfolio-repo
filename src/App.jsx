"use client";

import React, { Suspense, lazy, useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  Check,
  Copy,
  ExternalLink,
  Menu,
  Send,
  X,
} from "lucide-react";
import ProfileAvatar from "./components/ProfileAvatar";
import LoopingMediaCarousel from "./components/LoopingMediaCarousel";
import GraphicDesignGrid from "./components/GraphicDesignGrid";
import SocialLinks from "./components/SocialLinks";
import TechnologyStack from "./components/TechnologyStack";
import { mediaCategories } from "./data/mediaManifest";
import { projects } from "./data/projects";
import { ROBOT_FALLBACK_URL, ROBOT_MODEL_URL } from "./config/robot";
import { cn } from "./lib/utils";

const ChatWidget = lazy(() => import("./components/ChatWidget"));
const RobotStage = dynamic(() => import("./components/RobotStage"), {
  ssr: false,
  loading: () => (
    <div className="robot-visual-fallback">
      <img src={ROBOT_FALLBACK_URL} alt="Monochrome humanoid robot concept" />
    </div>
  ),
});
const IntroScreen = dynamic(() => import("./components/IntroScreen"), { ssr: false });

const navItems = [
  { label: "About", id: "about" },
  { label: "Projects", id: "projects" },
  { label: "Skills", id: "skills" },
  { label: "Work", id: "work" },
  { label: "Contact", id: "contact" },
];

const techLabels = ["React", "Next.js", "TypeScript", "Tailwind CSS"];
const loadingAssets = [
  { type: "image", src: "/assets/profile-hover.jpg" },
  { type: "image", src: ROBOT_FALLBACK_URL },
  ...projects.flatMap((project) => [project.previewImage, project.thumbnail]).filter(Boolean).map((src) => ({ type: "image", src })),
];
const mediaFolderLabel = (category) => category.id === "certificates" ? "certificate" : category.folder.replaceAll("_", " ");

const stats = [
  { value: "04", label: "Development builds" },
  { value: "06", label: "Creative archives" },
  { value: "06", label: "Certificates" },
  { value: "2027", label: "Graduation track" },
];

const heroContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.16 } },
};

const revealUp = {
  hidden: { opacity: 0, y: 22, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] },
  },
};

function splitLetters(word) {
  return word.split("").map((letter, index) => (
    <motion.span
      key={`${letter}-${index}`}
      variants={revealUp}
      className="letter-reveal"
    >
      {letter}
    </motion.span>
  ));
}

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [emailCopied, setEmailCopied] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [contactFields, setContactFields] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [contactSent, setContactSent] = useState(false);

  const sectionTheme = useMemo(() => {
    if (["about", "skills", "contact"].includes(activeSection)) return "light";
    return "dark";
  }, [activeSection]);

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;
    mediaCategories.forEach((category) => {
      const label = `${category.title}: ${category.items.length} file${category.items.length === 1 ? "" : "s"}`;
      if (!category.items.length) {
        console.warn(`${label}. No files matched folder: src/assets/${category.folder}`);
        return;
      }
      console.groupCollapsed(label);
      category.items.forEach((item) => console.log(item.title, item.src));
      console.groupEnd();
    });
  }, []);

  useEffect(() => {
    const loadChat = () => setShowChat(true);
    const idleId = window.requestIdleCallback?.(loadChat, { timeout: 2600 });
    const timeoutId =
      idleId === undefined ? window.setTimeout(loadChat, 2200) : undefined;
    return () => {
      if (idleId !== undefined) window.cancelIdleCallback?.(idleId);
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    const ids = ["home", ...navItems.map((item) => item.id)];
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-28% 0px -56%", threshold: [0.08, 0.25, 0.5] }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    setMobileNavOpen(false);
    setActiveSection(id);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById(id)?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("arrontuazon9@gmail.com");
      setEmailCopied(true);
      window.setTimeout(() => setEmailCopied(false), 1600);
    } catch {
      setEmailCopied(false);
    }
  };

  const handleContactSubmit = (event) => {
    event.preventDefault();
    const subject = contactFields.name
      ? `Portfolio inquiry from ${contactFields.name}`
      : "Portfolio inquiry";
    const body = [
      contactFields.message,
      "",
      `From: ${contactFields.name || "Visitor"}`,
      `Reply email: ${contactFields.email || "Not provided"}`,
    ].join("\n");
    window.location.href = `mailto:arrontuazon9@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setContactSent(true);
    setContactFields({ name: "", email: "", message: "" });
    window.setTimeout(() => setContactSent(false), 2400);
  };

  return (
    <div className="portfolio-shell">
      <AnimatePresence>
        {showIntro && <IntroScreen assets={loadingAssets} modelUrl={ROBOT_MODEL_URL} onComplete={() => setShowIntro(false)} />}
      </AnimatePresence>

      <header className={cn("site-header", `site-header--${sectionTheme}`)}>
        <button
          type="button"
          className="brand-mark"
          onClick={() => scrollToSection("home")}
          aria-label="Scroll to hero"
        >
          &lt; AT /&gt;
        </button>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={cn("nav-button", activeSection === item.id && "is-active")}
              onClick={() => scrollToSection(item.id)}
              aria-current={activeSection === item.id ? "page" : undefined}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="nav-actions">
          <button type="button" className="nav-pill" onClick={() => scrollToSection("contact")}>
            Available
          </button>
          <a className="nav-pill" href="#contact" onClick={(event) => {
            event.preventDefault();
            scrollToSection("contact");
          }}>
            Resume <ExternalLink size={12} />
          </a>
          <button
            type="button"
            className="mobile-menu-button"
            onClick={() => setMobileNavOpen((current) => !current)}
            aria-label={mobileNavOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileNavOpen}
          >
            {mobileNavOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileNavOpen && (
          <motion.nav
            className="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            aria-label="Mobile navigation"
          >
            {navItems.map((item) => (
              <button key={item.id} type="button" onClick={() => scrollToSection(item.id)}>
                {item.label}
              </button>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>

      <main>
        <section id="home" className="hero-section section-dark">
          <span className="corner corner--tl" aria-hidden="true" />
          <span className="corner corner--br" aria-hidden="true" />
          <motion.div
            className="hero-copyblock"
            variants={heroContainer}
            initial={false}
            animate="show"
          >
            <motion.p className="availability-label" variants={revealUp}>
              <span /> Available for new projects
            </motion.p>
            <motion.p className="hero-greeting" variants={revealUp}>
              Hi there, I'm
            </motion.p>
            <h1 className="hero-name" aria-label="Arron Tuazon">
              <span className="hero-name__first">{splitLetters("Arron")}</span>
              <motion.span className="hero-name__last" variants={revealUp}>
                Tuazon
              </motion.span>
            </h1>
            <motion.p className="role-label" variants={revealUp}>
              Full-Stack Developer &amp; AI Creative Specialist
            </motion.p>
            <motion.p className="hero-description" variants={revealUp}>
              I build responsive web applications and create visual content through
              modern development tools, graphic design, video editing, and AI-assisted
              creative workflows.
            </motion.p>
            <motion.div className="hero-actions" variants={revealUp}>
              <button type="button" className="button button--light" onClick={() => scrollToSection("projects")}>
                View My Work <ArrowRight size={16} />
              </button>
              <button type="button" className="button button--ghost-dark" onClick={() => scrollToSection("contact")}>
                Get in Touch
              </button>
            </motion.div>
            <motion.div className="tech-labels" variants={revealUp} aria-label="Core technologies">
              {techLabels.map((label) => (
                <span key={label}>{label}</span>
              ))}
            </motion.div>
          </motion.div>
          <motion.div
            className="hero-robot-wrap"
            initial={false}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <Suspense fallback={<div className="robot-visual-fallback"><img src={ROBOT_FALLBACK_URL} alt="Monochrome humanoid robot concept" /></div>}>
              <RobotStage />
            </Suspense>
          </motion.div>
          <button type="button" className="scroll-indicator" onClick={() => scrollToSection("about")} aria-label="Scroll to about">
            <ArrowDown size={18} />
          </button>
        </section>

        <EditorialSection id="about" theme="light" eyebrow="About" title="A developer with a visual production edge.">
          <div className="about-layout">
            <div className="about-copy">
              <p>
                I'm Arron Tuazon, a full-stack developer focused on responsive
                interfaces, practical backend systems, and clean user experiences.
              </p>
              <p>
                My development background covers React, Next.js, Java, PHP, REST APIs,
                MySQL, and Supabase. Alongside code, I create graphic design, short-form
                edits, commercial videos, and AI-assisted visual content.
              </p>
            </div>
            <ProfileAvatar />
            <div className="stats-strip">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </EditorialSection>

        <EditorialSection id="projects" theme="dark" eyebrow="Projects" title="Selected development work.">
          <div className="project-list">
            {projects.map((project, index) => (
              <motion.article
                key={project.id}
                className="project-row"
                initial={{ opacity: 0, y: 22, scale: 0.985 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.55, delay: index * 0.05 }}
              >
                <div className="project-preview">
                  {project.previewImage || project.thumbnail ? (
                    <img
                      src={project.previewImage || project.thumbnail}
                      alt={`${project.title} preview`}
                      loading="lazy"
                      decoding="async"
                      draggable="false"
                    />
                  ) : (
                    <div className="project-preview__placeholder">{project.title}</div>
                  )}
                </div>
                <div className="project-content">
                  <span className="project-number">{String(index + 1).padStart(2, "0")}</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-tags">
                    {(project.tools || project.tags || []).map((tool) => (
                      <span key={tool}>{tool}</span>
                    ))}
                  </div>
                  <button type="button" className="text-link" onClick={() => scrollToSection("work")}>
                    View Project <ArrowRight size={15} />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </EditorialSection>

        <EditorialSection id="skills" theme="light" eyebrow="Skills" title="Tools for building and producing.">
          <TechnologyStack />
        </EditorialSection>

        <EditorialSection id="work" theme="dark" eyebrow="Creative Work" title="Design, video, certificates, and archive." animated={false}>
          <div className="work-directory">
            {mediaCategories.map((category) => (
              <a key={category.id} href={`#${category.id}`}>
                <span>{category.title}</span>
                <strong>{String(category.items.length).padStart(2, "0")}</strong>
              </a>
            ))}
          </div>
          <div className="work-categories">
            {mediaCategories.map((category) => (
              <section key={category.id} id={category.id} className="media-category">
                <div className="media-category__heading">
                  <span>{mediaFolderLabel(category)} / {String(category.items.length).padStart(2, "0")} files</span>
                  <h3>{category.title}</h3>
                </div>
                {category.items.length === 0 ? (
                  <p className="media-category__empty">No supported media files are currently available in this folder.</p>
                ) : category.id === "graphic-design" ? (
                  <GraphicDesignGrid items={category.items} />
                ) : (
                  <LoopingMediaCarousel
                    items={category.items}
                    direction={category.direction}
                    variant={category.variant}
                  />
                )}
              </section>
            ))}
          </div>
        </EditorialSection>

        <EditorialSection id="contact" theme="light" eyebrow="Contact" title="Let's build something clear and useful.">
          <div className="contact-layout">
            <div className="contact-info">
              <p>
                Open to development projects, portfolio collaborations, design work,
                AI-assisted creative production, and practical web systems.
              </p>
              <a href="mailto:arrontuazon9@gmail.com">arrontuazon9@gmail.com</a>
              <button type="button" className="button button--dark" onClick={copyEmail}>
                {emailCopied ? <Check size={16} /> : <Copy size={16} />}
                {emailCopied ? "Copied" : "Copy Email"}
              </button>
              <SocialLinks />
            </div>
            <form className="contact-form" onSubmit={handleContactSubmit}>
              <label>
                <span>Name</span>
                <input
                  value={contactFields.name}
                  onChange={(event) => setContactFields((current) => ({ ...current, name: event.target.value }))}
                  autoComplete="name"
                />
              </label>
              <label>
                <span>Email</span>
                <input
                  type="email"
                  value={contactFields.email}
                  onChange={(event) => setContactFields((current) => ({ ...current, email: event.target.value }))}
                  autoComplete="email"
                />
              </label>
              <label className="contact-form__message">
                <span>Message</span>
                <textarea
                  rows={5}
                  value={contactFields.message}
                  onChange={(event) => setContactFields((current) => ({ ...current, message: event.target.value }))}
                />
              </label>
              <button type="submit" className="button button--dark">
                Send Inquiry <Send size={16} />
              </button>
              {contactSent && <p className="form-note">Email handoff prepared.</p>}
            </form>
          </div>
        </EditorialSection>
      </main>

      <footer className="site-footer">
        <span>Arron Tuazon</span>
        <button type="button" onClick={() => scrollToSection("home")}>Back to top</button>
      </footer>

      {showChat && (
        <Suspense fallback={null}>
          <ChatWidget />
        </Suspense>
      )}
    </div>
  );
}

function EditorialSection({ id, theme, eyebrow, title, children, animated = true }) {
  return (
    <motion.section
      id={id}
      className={cn("editorial-section", `section-${theme}`)}
      initial={animated ? { opacity: 0, y: 18 } : false}
      animate={animated ? undefined : { opacity: 1, y: 0 }}
      whileInView={animated ? { opacity: 1, y: 0 } : undefined}
      viewport={animated ? { once: true, amount: 0.15 } : undefined}
      transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="section-inner">
        <div className="section-heading">
          <span>{eyebrow}</span>
          <h2>{title}</h2>
        </div>
        {children}
      </div>
    </motion.section>
  );
}
