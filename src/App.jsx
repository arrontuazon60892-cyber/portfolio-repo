import React, { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
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
  Cpu,
  Database,
  ExternalLink,
  GraduationCap,
  Images,
  Layers3,
  Mail,
  MapPin,
  MonitorSmartphone,
  Moon,
  Orbit,
  Palette,
  Rocket,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Sun,
  TerminalSquare,
  Workflow,
  Wrench,
} from "lucide-react";
import PrintFlowCarousel from "./components/PrintFlowCarousel";
import PhotoboothCarousel from "./components/PhotoboothCarousel";
import SocialLinks from "./components/SocialLinks";
import Certifications from "./components/Certifications";
import Modal from "./components/Modal";
import Gallery from "./components/Gallery";
import ChatWidget from "./components/ChatWidget";
import ProfileAvatar from "./components/ProfileAvatar";
import PosterCard from "./components/PosterCard";
import ImageModal from "./components/ImageModal";
import VideoCard from "./components/VideoCard";
import VideoModal from "./components/VideoModal";
import { cn } from "./lib/utils";
import seolinahImage from "./assets/seolinah.png";
import coloringBookImage from "./assets/Colorful Coloring Book Cover A4 Document.png";
import coffeeImage from "./assets/COFFEE.png";
import burgerImage from "./assets/gallary/burger.png";
import realityNotFoundImage from "./assets/gallary/404 REALITY NOT FOUND.png";
import freshVideo from "./assets/gallary/FRESH (2).mp4";
import lemonSlideVideo from "./assets/gallary/lemon slideeeeeeee.mp4";
import printflowPreview from "./assets/printflow.png";
import photoboothPreview from "./assets/photobooth1.png";

const navItems = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Projects", id: "projects" },
  { label: "Skills", id: "skills" },
  { label: "Experience", id: "experience" },
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
    items: ["React + Vite", "TypeScript", "Tailwind CSS", "Responsive UI"],
  },
  {
    title: "Backend",
    icon: Database,
    items: [
      "Java (Spring Boot)",
      "RESTful APIs",
      "MySQL and Supabase",
      "Auth & Security",
      "Python",
      "Php",
    ],
  },
  {
    title: "DevOps & Cloud",
    icon: Rocket,
    items: ["Git & GitHub", "Vercel (for frontend deployment)"],
  },
];

const schoolProjects = [
  {
    key: "printflow",
    title: "PrintFlow",
    description:
      "PrintFlow is a sales, inventory, and ordering management system designed to help Mr. and Mrs. Prints efficiently track orders, manage stock, and monitor business transactions.(Web Application)",
    tags: ["Tailwind", "Php", "MySQL"],
    category: "Web Application",
    previewImage: printflowPreview,
    icon: Layers3,
  },
  {
    key: "attendance",
    title: "Attedance Management System",
    description:
      "A digital attendance tracking system designed to simplify monitoring and managing attendance records.(Mobile Application)",
    tags: ["kotlin", "java", "Firebase"],
    category: "Mobile Application",
    icon: MonitorSmartphone,
  },
  {
    key: "attendex",
    title: "Attendex: Attendance and Examination Management System",
    description:
      "An academic management system for tracking student attendance and managing examination records..",
    tags: ["Css", "Php", "MySQL"],
    category: "Academic Management",
    icon: Workflow,
  },
  {
    key: "photobooth",
    title: "Photobooth AC",
    description:
      "A modern photobooth management system that streamlines photo booth operations with real-time session tracking, automated photo processing, and comprehensive customer management for efficient event services.(Web Application)",
    tags: ["React", "Vite", "Tailwind CSS", "Supabase"],
    category: "Web Application",
    previewImage: photoboothPreview,
    icon: Sparkles,
  },
];

const creativeCollections = [
  {
    title: "Editorial Poster Design",
    items: [
      { type: "image", src: seolinahImage, tools: ["Canva"] },
      { type: "image", src: realityNotFoundImage, tools: ["Canva"] },
    ],
  },
  {
    title: "Educational Poster Design",
    items: [{ type: "image", src: coloringBookImage, tools: ["Canva"] }],
  },
  {
    title: "Promotional Poster Design",
    items: [
      { type: "image", src: coffeeImage, tools: ["Canva"] },
      { type: "image", src: burgerImage, tools: ["Canva"] },
    ],
  },
  {
    title: "Promotional Video Design",
    items: [
      { type: "video", src: freshVideo, tools: ["Canva"] },
      { type: "video", src: lemonSlideVideo, tools: ["Canva"] },
    ],
  },
];

const timeline = [
  {
    title: "Junior Web Developer, Aspiring Full-Stack Developer",
    org: "WebDevs",
    year: "2027",
    icon: Briefcase,
  },
  {
    title: "BS Information Technology in Business Analytics",
    org: "Laguna University (Expected Graduating)",
    year: "2027",
    icon: GraduationCap,
  },
  {
    title: "Data Analyst Intern",
    org: "",
    year: "Ongoing(2026)",
    icon: BrainCircuit,
  },
  {
    title: "Hello World!",
    org: "Wrote my first line of code",
    year: "2024",
    icon: TerminalSquare,
  },
];

const floatingNodes = [
  { top: "11%", left: "8%", size: 10, delay: 0 },
  { top: "20%", left: "28%", size: 6, delay: 0.8 },
  { top: "18%", left: "78%", size: 8, delay: 1.4 },
  { top: "30%", left: "54%", size: 9, delay: 0.3 },
  { top: "46%", left: "16%", size: 7, delay: 1.2 },
  { top: "55%", left: "83%", size: 11, delay: 0.5 },
  { top: "66%", left: "37%", size: 7, delay: 1.8 },
  { top: "78%", left: "12%", size: 9, delay: 0.2 },
  { top: "82%", left: "66%", size: 8, delay: 1.1 },
  { top: "72%", left: "90%", size: 6, delay: 0.7 },
];

const codeLineWidths = [84, 58, 92, 44, 0, 77, 62, 41];

function App() {
  const [theme, setTheme] = useState("dark");
  const [activeProjectKey, setActiveProjectKey] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [emailCopied, setEmailCopied] = useState(false);
  const [contactFields, setContactFields] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [contactSent, setContactSent] = useState(false);
  const [cursorHover, setCursorHover] = useState(false);
  const [cursorEnabled, setCursorEnabled] = useState(false);

  const isDark = true;
  const activeProject = schoolProjects.find(
    (project) => project.key === activeProjectKey
  );

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const ringX = useSpring(cursorX, { stiffness: 650, damping: 42, mass: 0.2 });
  const ringY = useSpring(cursorY, { stiffness: 650, damping: 42, mass: 0.2 });
  const dotX = useSpring(cursorX, { stiffness: 900, damping: 48, mass: 0.08 });
  const dotY = useSpring(cursorY, { stiffness: 900, damping: 48, mass: 0.08 });
  const heroX = useMotionValue(0);
  const heroY = useMotionValue(0);
  const heroXSpring = useSpring(heroX, { stiffness: 110, damping: 18, mass: 0.5 });
  const heroYSpring = useSpring(heroY, { stiffness: 110, damping: 18, mass: 0.5 });
  const robotRotateY = useTransform(heroXSpring, [-1, 1], [-10, 10]);
  const robotRotateX = useTransform(heroYSpring, [-1, 1], [8, -8]);
  const robotShiftX = useTransform(heroXSpring, [-1, 1], [-18, 18]);
  const robotShiftY = useTransform(heroYSpring, [-1, 1], [-10, 10]);
  const panelShiftX = useTransform(heroXSpring, [-1, 1], [-12, 12]);
  const panelShiftY = useTransform(heroYSpring, [-1, 1], [-8, 8]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const hoverSelector = "a, button, input, textarea, [data-cursor='hover']";
    const mediaQuery = window.matchMedia("(pointer: coarse)");

    const syncCursorMode = (event) => {
      const enabled = !event.matches;
      setCursorEnabled(enabled);
      document.body.classList.toggle("has-custom-cursor", enabled);
    };

    const setHoverState = (target) => {
      if (!(target instanceof Element)) {
        setCursorHover(false);
        return;
      }
      setCursorHover(Boolean(target.closest(hoverSelector)));
    };

    const handleMove = (event) => {
      const x = event.clientX;
      const y = event.clientY;

      cursorX.set(x);
      cursorY.set(y);
      heroX.set((x / window.innerWidth - 0.5) * 2);
      heroY.set((y / window.innerHeight - 0.5) * 2);
      setHoverState(event.target);
    };

    const handleOver = (event) => {
      setHoverState(event.target);
    };

    const handleLeave = () => {
      cursorX.set(-100);
      cursorY.set(-100);
      setCursorHover(false);
    };

    syncCursorMode(mediaQuery);
    mediaQuery.addEventListener("change", syncCursorMode);
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseover", handleOver);
      window.addEventListener("blur", handleLeave);

    return () => {
      mediaQuery.removeEventListener("change", syncCursorMode);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
      window.removeEventListener("blur", handleLeave);
      document.body.classList.remove("has-custom-cursor");
    };
  }, [cursorX, cursorY, heroX, heroY]);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
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
    <div
      className={cn(
        "app-shell min-h-screen",
        theme === "dark-alt" ? "theme-dark-alt" : "theme-dark"
      )}
    >
      {cursorEnabled && (
        <>
          <motion.div
            aria-hidden="true"
            className={cn("custom-cursor custom-cursor--ring", cursorHover && "is-hovering")}
            style={{ x: ringX, y: ringY }}
          />
          <motion.div
            aria-hidden="true"
            className="custom-cursor custom-cursor--dot"
            style={{ x: dotX, y: dotY }}
          />
        </>
      )}

      <div className="scene-root" aria-hidden="true">
        <div className="scene-aurora scene-aurora--left" />
        <div className="scene-aurora scene-aurora--right" />
        <div className="scene-grid" />
        <div className="scene-rings" />
        <div className="scene-vignette" />
        {floatingNodes.map((node) => (
          <motion.span
            key={`${node.top}-${node.left}`}
            className="ambient-node"
            style={{
              top: node.top,
              left: node.left,
              width: node.size,
              height: node.size,
            }}
            animate={{ opacity: [0.28, 0.92, 0.28], scale: [1, 1.5, 1] }}
            transition={{
              duration: 4.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: node.delay,
            }}
          />
        ))}
        {[18, 39, 62, 79].map((position, index) => (
          <span
            key={position}
            className="data-beam"
            style={{ left: `${position}%`, animationDelay: `${index * 2.4}s` }}
          />
        ))}
      </div>

      <header className="sticky top-0 z-40 px-4 pt-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-[rgba(6,12,24,0.72)] px-4 py-3 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
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
                className="rounded-full px-4 py-2 text-sm text-white/68 transition hover:bg-white/6 hover:text-white"
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
              onClick={() => setTheme((current) => (current === "dark" ? "dark-alt" : "dark"))}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/5 text-white/80 transition hover:-translate-y-0.5 hover:bg-white/10 hover:text-white"
              aria-label="Toggle interface accent mode"
              data-cursor="hover"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto flex max-w-7xl flex-col gap-8 px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <motion.section
          id="home"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.2, 0.8, 0.2, 1] }}
          className="hero-shell glass-panel overflow-hidden px-6 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-14"
        >
          <div className="hero-background-lines" />
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div className="relative z-10 max-w-2xl">
              <span className="section-kicker">
                <span className="kicker-dot" />
                Software Developer
              </span>

              <div className="mt-6 max-w-xl">
                <h1 className="hero-title">
                  Hello, I&apos;m <span className="text-gradient">Arron Tuazon</span>
                </h1>
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
                  onClick={() => scrollToSection("projects")}
                  className="cta-primary"
                  data-cursor="hover"
                >
                  View My Work
                  <ArrowRight size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection("projects")}
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

              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                <MiniSignalCard
                  icon={Cpu}
                  title="Live Systems"
                  description="Frontend, backend, and interface craft moving in sync."
                />
                <MiniSignalCard
                  icon={ShieldCheck}
                  title="Reliable Builds"
                  description="Responsive layouts, accessible flows, and clear hierarchy."
                />
                <MiniSignalCard
                  icon={Sparkles}
                  title="Creative Edge"
                  description="Design, motion, and storytelling layered into the work."
                />
              </div>
            </div>

            <div className="relative min-h-[560px] lg:min-h-[640px]">
              <motion.div
                className="hero-stage"
                style={{ x: panelShiftX, y: panelShiftY }}
              >
                <motion.div
                  className="robot-platform"
                  style={{
                    rotateY: robotRotateY,
                    rotateX: robotRotateX,
                    x: robotShiftX,
                    y: robotShiftY,
                  }}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="robot-halo" />
                  <div className="robot-ring robot-ring--outer" />
                  <div className="robot-ring robot-ring--inner" />
                  <div className="robot-figure">
                    <div className="robot-head">
                      <div className="robot-cranium" />
                      <div className="robot-faceplate" />
                      <div className="robot-eye" />
                      <div className="robot-ear" />
                    </div>
                    <div className="robot-neck" />
                    <div className="robot-shoulders">
                      <div className="robot-shoulder robot-shoulder--left" />
                      <div className="robot-torso">
                        <div className="robot-core" />
                        <div className="robot-circuit robot-circuit--left" />
                        <div className="robot-circuit robot-circuit--right" />
                      </div>
                      <div className="robot-shoulder robot-shoulder--right" />
                    </div>
                  </div>
                </motion.div>

                <FloatingWindow className="hero-window hero-window--code" label="CODE.SYS">
                  <CodeWindow />
                </FloatingWindow>

                <FloatingWindow className="hero-window hero-window--brain" label="AI MODEL">
                  <BrainOrb />
                </FloatingWindow>

                <FloatingWindow className="hero-window hero-window--system" label="SYSTEM.INFO">
                  <div className="space-y-3">
                    {systemMetrics.map((metric) => (
                      <MetricRow key={metric.label} metric={metric} />
                    ))}
                    <p className="pt-1 text-xs uppercase tracking-[0.24em] text-emerald-300/90">
                      Status: Running
                    </p>
                  </div>
                </FloatingWindow>
              </motion.div>
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => scrollToSection("about")}
              className="scroll-chip"
              data-cursor="hover"
            >
              Scroll to explore
            </button>
          </div>
        </motion.section>

        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.section
            id="about"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="glass-panel p-6 sm:p-8"
          >
            <SectionHeader
              eyebrow="About"
              title="About"
              description="The original story stays intact. The presentation becomes far more cinematic."
            />

            <div className="mt-8 grid gap-8 md:grid-cols-[auto_1fr] md:items-start">
              <ProfileAvatar isDark={isDark} />
              <div className="space-y-5 text-white/76">
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

          <div className="grid gap-8">
            <motion.section
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.06 }}
              className="glass-panel p-6 sm:p-8"
            >
              <SectionHeader
                eyebrow="Stats"
                title="Mission Data"
                description="A quick pulse check across the portfolio footprint."
              />
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
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
              className="glass-panel p-6 sm:p-8"
            >
              <SectionHeader
                eyebrow="Signals"
                title="System Readiness"
                description="A stylized snapshot inspired by the sci-fi command deck in your target reference."
              />
              <div className="mt-8 space-y-4">
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
          className="glass-panel p-6 sm:p-8"
        >
          <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
            <div>
              <SectionHeader
                eyebrow="Tech Stack"
                title="Tech Stack"
                description="Every original technology stays present, reorganized into futuristic signal panels."
              />
              <div className="mt-8 grid gap-4 lg:grid-cols-3">
                {techStackPanels.map((panel) => (
                  <div key={panel.title} className="stack-card">
                    <div className="flex items-center gap-3">
                      <div className="icon-pill">
                        <panel.icon size={18} />
                      </div>
                      <h3 className="text-base font-semibold text-white">{panel.title}</h3>
                    </div>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {panel.items.map((item) => (
                        <span key={item} className="chip">
                          {item}
                        </span>
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
                  <p className="text-sm font-semibold text-white">Holographic AI Brain</p>
                  <p className="text-xs uppercase tracking-[0.24em] text-white/45">
                    Continuous motion layer
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <BrainOrb />
              </div>
              <div className="mt-6 space-y-3 text-sm text-white/68">
                <p>
                  The background brain, floating code, and signal windows give the
                  interface an AI-first identity without removing any of the original
                  portfolio information.
                </p>
                <p>
                  This keeps the work professional, minimal, and premium instead of
                  drifting into a loud gaming aesthetic.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          id="projects"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="glass-panel p-6 sm:p-8"
        >
          <SectionHeader
            eyebrow="Projects"
            title="Recent Projects in School"
            description="All four original school projects remain, now framed like premium product cards."
          />

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {schoolProjects.map((project) => (
              <ProjectCard
                key={project.key}
                project={project}
                onOpen={() => setActiveProjectKey(project.key)}
              />
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="glass-panel p-6 sm:p-8"
        >
          <SectionHeader
            eyebrow="Creative Design Projects"
            title="Creative Design Projects"
            description="Poster work, promotional assets, and video design preserved as part of the same futuristic portfolio universe."
          />

          <div className="mt-8 grid gap-5">
            {creativeCollections.map((collection) => (
              <div key={collection.title} className="creative-collection">
                <div className="mb-4 flex items-center gap-3">
                  <div className="icon-pill">
                    {collection.title.includes("Video") ? (
                      <MonitorSmartphone size={18} />
                    ) : (
                      <Palette size={18} />
                    )}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white">{collection.title}</h3>
                    <p className="text-xs uppercase tracking-[0.24em] text-white/42">
                      Preserved original assets
                    </p>
                  </div>
                </div>
                <div
                  className={cn(
                    "grid gap-4",
                    collection.items.length === 1
                      ? "md:grid-cols-1"
                      : "md:grid-cols-2 xl:grid-cols-2"
                  )}
                >
                  {collection.items.map((item, index) => (
                    <div key={`${collection.title}-${index}`} className="creative-card-shell">
                      {item.type === "image" ? (
                        <PosterCard
                          imageSrc={item.src}
                          tools={item.tools}
                          onClick={() => setSelectedImage(item.src)}
                          isDark={isDark}
                        />
                      ) : (
                        <VideoCard
                          videoSrc={item.src}
                          tools={item.tools}
                          onClick={() => setSelectedVideo(item.src)}
                          isDark={isDark}
                          isModalOpen={Boolean(selectedVideo)}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        <div className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
          <motion.section
            id="experience"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="glass-panel p-6 sm:p-8"
          >
            <SectionHeader
              eyebrow="Experience"
              title="Experience"
              description="Experience and education stay connected in one cinematic timeline."
            />

            <div className="mt-8 space-y-6">
              {timeline.map((item, index) => (
                <div key={item.title} className="timeline-item">
                  <div className="timeline-line" />
                  <div className="timeline-marker">
                    <item.icon size={16} />
                  </div>
                  <div className="timeline-content">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-base font-semibold text-white">{item.title}</h3>
                      <span className="timeline-year">{item.year}</span>
                    </div>
                    <p className="mt-2 text-sm text-white/62">{item.org || " "}</p>
                    {index === 1 && (
                      <p className="mt-3 text-sm text-white/55">
                        Education, internship momentum, and developer trajectory all
                        remain visible as part of the same story arc.
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="glass-panel p-6 sm:p-8"
          >
            <SectionHeader
              eyebrow="Recent Certifications"
              title="Recent Certifications"
              description="Every original certificate entry stays accessible through a cleaner, more polished command list."
            />
            <div className="mt-8">
              <Certifications isDark={isDark} />
            </div>
          </motion.section>
        </div>

        <div className="grid gap-8 xl:grid-cols-[0.78fr_1.22fr]">
          <motion.section
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="glass-panel p-6 sm:p-8"
          >
            <SectionHeader
              eyebrow="Social Links"
              title="Social Links"
              description="Your direct channels remain one click away."
            />
            <div className="mt-8">
              <SocialLinks isDark={isDark} />
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="glass-panel p-6 sm:p-8"
          >
            <SectionHeader
              eyebrow="Gallery"
              title="Gallery"
              description="The original gallery now sits inside the same holographic visual language as the rest of the portfolio."
            />
            <div className="mt-8">
              <Gallery isDark={isDark} />
            </div>
          </motion.section>
        </div>

        <motion.section
          id="contact"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="glass-panel p-6 sm:p-8"
        >
          <div className="grid gap-8 xl:grid-cols-[0.85fr_1.15fr]">
            <div>
              <SectionHeader
                eyebrow="Contact"
                title="Contact"
                description="The direct email route is preserved, with a more premium interaction layer around it."
              />

              <div className="mt-8 space-y-4">
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

              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
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
                  <span className="text-sm text-white/48">
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

      <ChatWidget isDark={isDark} />

      <ImageModal
        isOpen={Boolean(selectedImage)}
        onClose={() => setSelectedImage(null)}
        imageSrc={selectedImage}
        isDark={isDark}
      />

      <VideoModal
        isOpen={Boolean(selectedVideo)}
        onClose={() => setSelectedVideo(null)}
        videoSrc={selectedVideo}
        isDark={isDark}
      />

      <Modal
        isOpen={Boolean(activeProject)}
        onClose={() => setActiveProjectKey(null)}
        isDark={isDark}
      >
        {activeProject && (
          <div className="space-y-6 p-3 sm:p-6">
            <header className="space-y-4">
              <span className="inline-flex rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-cyan-200">
                {activeProject.category}
              </span>
              <div>
                <h3 className="text-2xl font-semibold text-white">{activeProject.title}</h3>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-white/68">
                  {activeProject.description}
                </p>
              </div>
            </header>

            {activeProject.key === "printflow" ? (
              <PrintFlowCarousel isDark={isDark} />
            ) : activeProject.key === "photobooth" ? (
              <PhotoboothCarousel isDark={isDark} />
            ) : (
              <div className="rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(107,115,255,0.16),rgba(7,12,24,0.82))] p-10 text-center text-sm text-white/62">
                Project images coming soon
              </div>
            )}

            <div className="flex flex-wrap gap-2 border-t border-white/10 pt-5">
              {activeProject.tags.map((tag) => (
                <span key={tag} className="chip">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </Modal>
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
      <h2 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-white sm:text-3xl">
        {title}
      </h2>
      <p className="mt-3 text-sm leading-7 text-white/62 sm:text-base">{description}</p>
    </div>
  );
}

function MiniSignalCard({ icon: Icon, title, description }) {
  return (
    <div className="mini-signal-card">
      <div className="icon-pill">
        <Icon size={16} />
      </div>
      <div className="mt-4">
        <p className="text-sm font-semibold text-white">{title}</p>
        <p className="mt-2 text-sm leading-6 text-white/56">{description}</p>
      </div>
    </div>
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

function FloatingWindow({ label, className, children }) {
  return (
    <motion.div
      className={cn("floating-window", className)}
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="floating-window__bar">
        <span>{label}</span>
        <div className="flex gap-1.5">
          <span className="window-dot" />
          <span className="window-dot" />
          <span className="window-dot" />
        </div>
      </div>
      {children}
    </motion.div>
  );
}

function CodeWindow() {
  return (
    <div className="code-window">
      {codeLineWidths.map((width, index) => (
        <span
          key={`${width}-${index}`}
          className={cn("code-line", width === 0 && "code-line--spacer")}
          style={{
            width: width ? `${width}%` : undefined,
            animationDelay: `${index * 0.35}s`,
          }}
        />
      ))}
    </div>
  );
}

function BrainOrb() {
  return (
    <div className="brain-orb">
      <div className="brain-orb__core" />
      <div className="brain-orb__ring brain-orb__ring--one" />
      <div className="brain-orb__ring brain-orb__ring--two" />
      <div className="brain-orb__glow" />
      {[0, 1, 2, 3, 4, 5, 6].map((particle) => (
        <span
          key={particle}
          className="brain-orb__particle"
          style={{
            "--delay": `${particle * 0.4}s`,
            "--x": `${Math.cos((particle / 7) * Math.PI * 2) * 72}px`,
            "--y": `${Math.sin((particle / 7) * Math.PI * 2) * 44}px`,
          }}
        />
      ))}
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

function ProjectCard({ project, onOpen }) {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.25 }}
      className="project-card text-left"
      data-cursor="hover"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="project-badge">{project.category}</span>
        <ExternalLink size={16} className="text-white/52" />
      </div>

      <div className="mt-5">
        <ProjectPreview project={project} />
      </div>

      <div className="mt-5">
        <div className="flex items-center gap-3">
          <div className="icon-pill">
            <project.icon size={16} />
          </div>
          <h3 className="text-lg font-semibold text-white">{project.title}</h3>
        </div>
        <p className="mt-4 text-sm leading-7 text-white/62">{project.description}</p>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span key={tag} className="chip">
            {tag}
          </span>
        ))}
      </div>
    </motion.button>
  );
}

function ProjectPreview({ project }) {
  if (project.previewImage) {
    return (
      <div className="preview-image-shell">
        <img
          src={project.previewImage}
          alt={`${project.title} preview`}
          className="h-52 w-full object-cover opacity-82"
        />
        <div className="preview-overlay" />
      </div>
    );
  }

  return (
    <div className="preview-schematic">
      <div className="preview-schematic__grid" />
      <div className="preview-schematic__lines">
        {[62, 78, 54, 82].map((width, index) => (
          <span key={`${project.key}-${width}-${index}`} style={{ width: `${width}%` }} />
        ))}
      </div>
      <div className="preview-schematic__icon">
        <project.icon size={34} />
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
