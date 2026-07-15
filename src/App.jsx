"use client";

import React, {
  Suspense,
  lazy,
  useEffect,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Bot,
  BrainCircuit,
  Briefcase,
  Check,
  Code2,
  Copy,
  Database,
  GraduationCap,
  Images,
  Mail,
  MapPin,
  Menu,
  MonitorSmartphone,
  Orbit,
  Palette,
  Rocket,
  ScanLine,
  Scissors,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
  Workflow,
  Wrench,
  X,
} from "lucide-react";
import {
  SiClaudecode,
  SiCursor,
  SiGit,
  SiGithub,
  SiGoogle,
  SiMetaai,
  SiMysql,
  SiNextdotjs,
  SiOpenjdk,
  SiPhp,
  SiPython,
  SiReact,
  SiSpringboot,
  SiSupabase,
  SiTailwindcss,
  SiTiktok,
  SiTypescript,
  SiVercel,
  SiVite,
} from "react-icons/si";
import SocialLinks from "./components/SocialLinks";
import MediaGrid from "./components/MediaGrid";
import LoopingMediaCarousel from "./components/LoopingMediaCarousel";
import ProfileAvatar from "./components/ProfileAvatar";
import HeroVisual from "./components/HeroVisual";
import NeuralSystemsMap from "./components/NeuralSystemsMap";
import ExploreWork from "./components/ExploreWork";
import { mediaCategories } from "./data/mediaManifest";
import { cn } from "./lib/utils";

const ChatWidget = lazy(() => import("./components/ChatWidget"));

const navItems = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Projects", id: "school-projects" },
  { label: "Skills", id: "skills" },
  { label: "Work", id: "explore" },
  { label: "Contact", id: "contact" },
];

const roleChips = [
  "Data Analyst",
  "Web Developer",
  "Video Editing",
  "Graphic Designer",
];

const stats = [
  { value: "4", label: "School systems shipped" },
  { value: "6", label: "Recent certifications earned" },
  { value: "12", label: "Core technologies preserved" },
  { value: "2027", label: "Graduation track in motion" },
];

const systemMetrics = [
  { label: "Frontend systems", value: 96 },
  { label: "Backend systems", value: 92 },
  { label: "Creative direction", value: 94 },
  { label: "Dedication", value: 100 },
];

const techStackPanels = [
  {
    title: "Frontend",
    icon: Code2,
    items: [
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
      { name: "Vite", icon: SiVite, color: "#A78BFA" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "Responsive UI", icon: MonitorSmartphone, color: "#7DD3FC" },
    ],
  },
  {
    title: "Backend",
    icon: Database,
    items: [
      { name: "Java", icon: SiOpenjdk, color: "#F89820" },
      { name: "Spring Boot", icon: SiSpringboot, color: "#6DB33F" },
      { name: "RESTful APIs", icon: Workflow, color: "#60A5FA" },
      { name: "MySQL", icon: SiMysql, color: "#4479A1" },
      { name: "Supabase", icon: SiSupabase, color: "#3ECF8E" },
      { name: "Auth & Security", icon: ShieldCheck, color: "#A78BFA" },
      { name: "Python", icon: SiPython, color: "#FFD43B" },
      { name: "PHP", icon: SiPhp, color: "#777BB4" },
    ],
  },
  {
    title: "DevOps & Cloud",
    icon: Rocket,
    items: [
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "GitHub", icon: SiGithub, color: "#FFFFFF" },
      { name: "Vercel", icon: SiVercel, color: "#FFFFFF" },
    ],
  },
  {
    title: "AI & Creative Tools",
    icon: Sparkles,
    wide: true,
    items: [
      { name: "Google Flow", icon: SiGoogle, color: "#4285F4" },
      { name: "CapCut", icon: Scissors, color: "#FFFFFF" },
      { name: "PixVerse", icon: Sparkles, color: "#A78BFA" },
      { name: "Canva", icon: Palette, color: "#00C4CC" },
      { name: "TikTok Editing", icon: SiTiktok, color: "#25F4EE" },
      { name: "Meta AI", icon: SiMetaai, color: "#0081FB" },
      { name: "Visual Studio Code", icon: Code2, color: "#23A9F2" },
      { name: "Codex", icon: TerminalSquare, color: "#10A37F" },
      { name: "Claude Code", icon: SiClaudecode, color: "#D97757" },
      { name: "Antigravity", icon: Orbit, color: "#A78BFA" },
      { name: "Devin", icon: Bot, color: "#60A5FA" },
      { name: "Cursor", icon: SiCursor, color: "#FFFFFF" },
    ],
  },
];


function App() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [emailCopied, setEmailCopied] = useState(false);
  const [contactFields, setContactFields] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [contactSent, setContactSent] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState(null);

  useEffect(() => {
    const loadChat = () => setShowChat(true);
    const idleId = window.requestIdleCallback?.(loadChat, { timeout: 3000 });
    const timeoutId = idleId === undefined ? window.setTimeout(loadChat, 2200) : undefined;

    return () => {
      if (idleId !== undefined) window.cancelIdleCallback?.(idleId);
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    const sections = navItems.map(({ id }) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-24% 0px -58%", threshold: [0.05, 0.2, 0.45] }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    setMobileNavOpen(false);
    setActiveSection(id);
    const isCategory = mediaCategories.some((cat) => cat.id === id);
    if (isCategory) {
      setExpandedCategory(id);
    } else {
      setExpandedCategory(null);
    }
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      });
    }, 80);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("arrontuazon9@gmail.com");
      setEmailCopied(true);
      window.setTimeout(() => setEmailCopied(false), 1800);
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
    ]
      .filter(Boolean)
      .join("\n");

    window.location.href = `mailto:arrontuazon9@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    setContactSent(true);
    setContactFields({ name: "", email: "", message: "" });
    window.setTimeout(() => setContactSent(false), 2400);
  };

  return (
    <div className="app-shell min-h-screen">
      <div className="scene-root" aria-hidden="true">
        <div className="scene-aurora scene-aurora--left" />
        <div className="scene-aurora scene-aurora--right" />
        <div className="scene-grid" />
        <div className="scene-vignette" />
      </div>

      <header className="sticky top-0 z-40 px-4 pt-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between rounded-full border border-white/10 bg-[rgba(6,12,24,0.72)] px-4 py-3 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
          <button
            type="button"
            onClick={() => scrollToSection("home")}
            className="flex items-center gap-3 rounded-full px-2 py-1 text-left"
            data-cursor="hover"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 font-mono text-lg font-semibold text-white/90">
              AT
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Arron Tuazon</p>
              <p className="text-[11px] uppercase tracking-[0.28em] text-white/45">
                AI-ready portfolio
              </p>
            </div>
          </button>

          <nav className="hidden items-center gap-2 lg:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className={cn("nav-link rounded-full px-4 py-2 text-sm text-white/68 transition hover:bg-white/6 hover:text-white", activeSection === item.id && "is-active")}
                aria-current={activeSection === item.id ? "page" : undefined}
                data-cursor="hover"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollToSection("contact")}
              className="hidden rounded-full border border-white/12 bg-[linear-gradient(135deg,rgba(120,88,255,0.16),rgba(77,201,255,0.16))] px-5 py-2 text-sm font-semibold text-white shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset] transition hover:-translate-y-0.5 hover:border-white/20 md:inline-flex"
              data-cursor="hover"
            >
              Let&apos;s Connect
            </button>
            <button
              type="button"
              onClick={() => setMobileNavOpen((current) => !current)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/5 text-white/80 transition hover:bg-white/10 hover:text-white lg:hidden"
              aria-label={mobileNavOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={mobileNavOpen}
              data-cursor="hover"
            >
              {mobileNavOpen ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {mobileNavOpen && (
            <motion.nav
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="mx-auto mt-2 grid max-w-[1600px] grid-cols-2 gap-2 rounded-[1.5rem] border border-white/10 bg-[rgba(6,12,24,0.9)] p-3 shadow-[0_24px_70px_rgba(0,0,0,0.38)] backdrop-blur-2xl lg:hidden"
            >
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className={cn("rounded-xl border border-white/6 bg-white/[0.025] px-4 py-3 text-left text-sm text-white/72 transition hover:border-white/12 hover:bg-white/[0.06] hover:text-white", activeSection === item.id && "border-cyan-300/20 bg-cyan-300/[0.07] text-white")}
                  aria-current={activeSection === item.id ? "page" : undefined}
                >
                  {item.label}
                </button>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main className="relative z-10 mx-auto flex max-w-[1600px] flex-col gap-6 px-4 pb-12 pt-4 sm:px-6 lg:px-8">
        <motion.section
          id="home"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.58, ease: [0.2, 0.8, 0.2, 1] }}
          className="hero-shell glass-panel overflow-hidden"
        >
          <div className="hero-background-lines" />
          <div className="hero-layout">
            <div className="hero-content">
              <span className="section-kicker">
                <span className="kicker-dot" />
                Hello, I&apos;m Arron
              </span>

              <div className="mt-5 max-w-xl">
                <h1 className="hero-title text-gradient">Tuazon</h1>
                <p className="hero-subtitle">AI-powered Full Stack Developer</p>
                <p className="hero-copy mt-4">
                  Building intelligent digital experiences with modern technologies.
                </p>
                <p className="hero-copy mt-4 text-white/72">
                  I&apos;m a full-stack web developer focused on building modern web
                  applications with React on the frontend and Java on the backend. I
                  enjoy creating clean, responsive interfaces and reliable APIs that
                  feel great to use.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-white/68">
                <span className="info-badge">
                  <MapPin size={15} />
                  Laguna, Philippines
                </span>
                <span className="info-badge">
                  <BrainCircuit size={15} />
                  Intelligent system builder
                </span>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {roleChips.map((role) => (
                  <span key={role} className="chip">
                    {role}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => scrollToSection("school-projects")}
                  className="cta-primary"
                  data-cursor="hover"
                >
                  View My Work
                  <ArrowRight size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection("school-projects")}
                  className="cta-secondary"
                  data-cursor="hover"
                >
                  <BookOpen size={16} />
                  Read my blog
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection("contact")}
                  className="cta-secondary"
                  data-cursor="hover"
                >
                  <Mail size={16} />
                  Contact
                </button>
              </div>

            </div>

            <div className="hero-visual-column">
              <HeroVisual />
            </div>
          </div>
        </motion.section>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] items-start">
          <motion.section
            id="about"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="glass-panel p-5 sm:p-6"
          >
            <SectionHeader
              eyebrow="About"
              title="About"
              description="The original story stays intact. The presentation becomes far more cinematic."
            />

            <div className="mt-6 grid gap-6 md:grid-cols-[auto_1fr] md:items-start">
              <ProfileAvatar />
              <div className="space-y-4 text-white/76">
                <p>
                  I&apos;m a full-stack web developer focused on building modern web
                  applications with React on the frontend and Java on the backend. I
                  enjoy creating clean, responsive interfaces and reliable APIs that
                  feel great to use.
                </p>
                <p>
                  I have a passion for learning new technologies and staying
                  up-to-date with the latest trends in web development. I&apos;m always
                  looking for ways to improve my skills and take on new challenges.
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <InfoPanel
                    icon={Bot}
                    title="AI-flavored direction"
                    description="This redesign frames the portfolio like a living operating system for your work."
                  />
                  <InfoPanel
                    icon={Wrench}
                    title="Execution mindset"
                    description="Clean systems, useful interfaces, and practical problem solving remain the core."
                  />
                </div>
              </div>
            </div>
          </motion.section>

          <div className="grid gap-5">
            <motion.section
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.06 }}
              className="glass-panel p-5 sm:p-6"
            >
              <SectionHeader
                eyebrow="Stats"
                title="Mission Data"
                description="A quick pulse check across the portfolio footprint."
              />
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-2">
                {stats.map((stat) => (
                  <div key={stat.label} className="stat-card">
                    <p className="stat-value">{stat.value}</p>
                    <p className="stat-label">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="glass-panel p-5 sm:p-6"
            >
              <SectionHeader
                eyebrow="Signals"
                title="System Readiness"
                description="A live overview of my development, creative, and delivery capabilities."
              />
              <div className="mt-6 space-y-3">
                {systemMetrics.map((metric) => (
                  <MetricRow key={metric.label} metric={metric} />
                ))}
              </div>
            </motion.section>
          </div>
        </div>

        <motion.section
          id="skills"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="glass-panel p-5 sm:p-6"
        >
          <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr] items-start">
            <div>
              <SectionHeader
                eyebrow="Tech Stack"
                title="Tech Stack"
                description="Every original technology stays present, reorganized into futuristic signal panels."
              />
              <div className="mt-8 grid gap-4 lg:grid-cols-3">
                {techStackPanels.map((panel) => (
                  <div
                    key={panel.title}
                    className={cn("stack-card", panel.wide && "lg:col-span-3")}
                  >
                    <div className="flex items-center gap-3">
                      <div className="icon-pill">
                        <panel.icon size={18} />
                      </div>
                      <h3 className="text-base font-semibold text-white">{panel.title}</h3>
                    </div>
                    <div
                      className={cn(
                        "tech-logo-grid",
                        panel.wide && "tech-logo-grid--tools",
                      )}
                    >
                      {panel.items.map((item) => (
                        <div
                          key={item.name}
                          className="tech-logo-item"
                          aria-label={`${item.name} technology`}
                          role="img"
                        >
                          <item.icon
                            className="tech-logo-icon"
                            style={{ color: item.color }}
                            aria-hidden="true"
                            title={item.name}
                          />
                          <span>{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="stack-feature-panel">
              <div className="flex items-center gap-3">
                <div className="icon-pill">
                  <Orbit size={18} />
                </div>
              <div>
                  <p className="text-sm font-semibold text-white">Neural Systems Map</p>
                  <p className="text-xs uppercase tracking-[0.24em] text-white/45">
                    Lightweight signal layer
                  </p>
                </div>
              </div>
              <div className="mt-6 stack-brain-scene">
                <NeuralSystemsMap />
              </div>
              <div className="mt-6 space-y-3 text-sm text-white/68">
                <p>
                  A focused neural signal visual keeps the AI-first identity without
                  requiring a continuous 3D render loop.
                </p>
                <p>
                  This keeps the work professional, minimal, and premium instead of
                  drifting into a loud gaming aesthetic.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.div
          id="explore"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.62 }}
        >
          <ExploreWork onPortalClick={(id) => {
            setExpandedCategory(id);
            setTimeout(() => {
              document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 100);
          }} />
        </motion.div>

        {mediaCategories
          .filter((category) => expandedCategory === null || expandedCategory === category.id)
          .map((category) => (
            <ShowcaseSection
              key={category.folder}
              id={category.id}
              eyebrow={`${category.folder} · ${String(category.items.length).padStart(2, "0")} media files`}
              title={category.title}
              showSeeAll={true}
              isExpanded={expandedCategory === category.id}
              onSeeAllClick={() => {
                if (expandedCategory === category.id) {
                  setExpandedCategory(null);
                } else {
                  setExpandedCategory(category.id);
                  setTimeout(() => {
                    document.getElementById(category.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }, 100);
                }
              }}
            >
              {category.id === "school-projects" || category.id === "certificates" ? (
                <LoopingMediaCarousel
                  items={category.items}
                  direction={category.direction}
                  variant={category.variant}
                />
              ) : (
                <MediaGrid items={category.items} variant={category.variant} />
              )}
            </ShowcaseSection>
          ))}

        <motion.section
          id="contact"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="glass-panel p-5 sm:p-6"
        >
          <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr] items-start">
            {/* ── Left column: Social Links + Direct Contact ── */}
            <div>
              <SectionHeader
                eyebrow="Network · Contact"
                title="Connect"
                description="Direct channels for collaboration, updates, and creative work."
              />

              <div className="mt-6">
                <SocialLinks />
              </div>

              <div className="mt-6 space-y-4">
                <div className="contact-card">
                  <div className="flex items-center gap-3">
                    <div className="icon-pill">
                      <Mail size={18} />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] text-white/40">
                        Direct line
                      </p>
                      <a
                        href="mailto:arrontuazon9@gmail.com"
                        className="mt-1 inline-block text-base font-semibold text-white transition hover:text-white/80"
                      >
                        arrontuazon9@gmail.com
                      </a>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="cta-secondary mt-5 w-full justify-center"
                    data-cursor="hover"
                  >
                    {emailCopied ? <Check size={16} /> : <Copy size={16} />}
                    {emailCopied ? "Copied!" : "Copy"}
                  </button>
                </div>

                <div className="info-panel">
                  <div className="flex items-center gap-3">
                    <div className="icon-pill">
                      <MessageDeckIcon />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">
                        Chat with Arron
                      </p>
                      <p className="mt-1 text-sm text-white/62">
                        The AI chat widget remains available for live questions about
                        the portfolio and general topics.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Right column: Contact Form ── */}
            <div>
              <div className="mb-6 flex items-center gap-3">
                <div className="icon-pill">
                  <ScanLine size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Contact Console</p>
                  <p className="text-xs uppercase tracking-[0.24em] text-white/42">
                    Animated inputs + preserved email fallback
                  </p>
                </div>
              </div>

              <form onSubmit={handleContactSubmit} className="space-y-3">
                <div className="grid gap-3 md:grid-cols-2">
                  <FloatingInput
                    id="contact-name"
                    label="Name"
                    value={contactFields.name}
                    onChange={(event) =>
                      setContactFields((current) => ({
                        ...current,
                        name: event.target.value,
                      }))
                    }
                  />
                  <FloatingInput
                    id="contact-email"
                    label="Email"
                    type="email"
                    value={contactFields.email}
                    onChange={(event) =>
                      setContactFields((current) => ({
                        ...current,
                        email: event.target.value,
                      }))
                    }
                  />
                </div>

                <FloatingInput
                  id="contact-message"
                  label="Message"
                  value={contactFields.message}
                  textarea
                  onChange={(event) =>
                    setContactFields((current) => ({
                      ...current,
                      message: event.target.value,
                    }))
                  }
                />

                <div className="flex flex-wrap items-center gap-3">
                  <button type="submit" className="cta-primary" data-cursor="hover">
                    Send Inquiry
                    <ArrowRight size={16} />
                  </button>
                  <span className="text-xs text-white/48">
                    Uses your default email client while keeping the original direct
                    email path intact.
                  </span>
                </div>

                {contactSent && (
                  <div className="success-note">
                    <BadgeCheck size={16} />
                    Inquiry handoff prepared.
                  </div>
                )}
              </form>
            </div>
          </div>
        </motion.section>

        <footer className="glass-panel flex flex-col items-center justify-between gap-4 px-6 py-5 text-center text-sm text-white/58 sm:flex-row sm:text-left">
          <p className="font-medium">© 2026 Arron Tuazon</p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.26em] text-white/68 transition hover:border-white/20 hover:text-white"
            data-cursor="hover"
          >
            Back to Top
          </button>
        </footer>
      </main>

      {showChat && (
        <Suspense fallback={null}>
          <ChatWidget />
        </Suspense>
      )}

    </div>
  );
}

function SectionHeader({ eyebrow, title, description }) {
  return (
    <div className="max-w-2xl">
      <span className="section-kicker">
        <span className="kicker-dot" />
        {eyebrow}
      </span>
      <h2 className="mt-4 font-semibold tracking-[-0.04em] text-white sm:text-2xl" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.7rem)' }}>
        {title}
      </h2>
      {description && <p className="mt-3 text-sm leading-7 text-white/62 sm:text-base" style={{ fontSize: 'clamp(0.9rem, 1vw, 1.05rem)' }}>{description}</p>}
    </div>
  );
}

function ShowcaseSection({ id, eyebrow, title, children, showSeeAll, isExpanded, onSeeAllClick }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="showcase-section"
    >
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <SectionHeader eyebrow={eyebrow} title={title} />
        {showSeeAll && (
          <button
            type="button"
            onClick={onSeeAllClick}
            className="cta-secondary self-start sm:self-auto"
            data-cursor="hover"
          >
            {isExpanded ? "Back to All" : "See All"}
          </button>
        )}
      </div>
      <div className="showcase-section__content">{children}</div>
    </motion.section>
  );
}

function InfoPanel({ icon: Icon, title, description }) {
  return (
    <div className="info-panel">
      <div className="flex items-start gap-3">
        <div className="icon-pill">
          <Icon size={16} />
        </div>
        <div>
          <p className="text-sm font-semibold text-white">{title}</p>
          <p className="mt-1 text-sm leading-6 text-white/56">{description}</p>
        </div>
      </div>
    </div>
  );
}

function MetricRow({ metric }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-white/54">
        <span>{metric.label}</span>
        <span>{metric.value}%</span>
      </div>
      <div className="metric-track">
        <span className="metric-fill" style={{ width: `${metric.value}%` }} />
      </div>
    </div>
  );
}

function FloatingInput({
  id,
  label,
  value,
  onChange,
  type = "text",
  textarea = false,
}) {
  if (textarea) {
    return (
      <div className="floating-input">
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          placeholder=" "
          rows={5}
          className="floating-input__field floating-input__field--textarea peer"
        />
        <label htmlFor={id} className="floating-input__label">
          {label}
        </label>
      </div>
    );
  }

  return (
    <div className="floating-input">
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder=" "
        className="floating-input__field peer"
      />
      <label htmlFor={id} className="floating-input__label">
        {label}
      </label>
    </div>
  );
}

function MessageDeckIcon() {
  return <Images size={18} />;
}

export default App;
