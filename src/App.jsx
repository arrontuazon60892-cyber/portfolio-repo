import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import profilePic from "./assets/profile.jpg";
import profileHover from "./assets/profile-hover.jpg";
import AnimatedSection from "./components/AnimatedSection";
import PrintFlowCarousel from "./components/PrintFlowCarousel";
import SocialLinks from "./components/SocialLinks";
import Certifications from "./components/Certifications";
import { cn } from "./lib/utils";

function App() {
  const [imgSrc, setImgSrc] = useState(profilePic);
  const [theme, setTheme] = useState("light");

  const isDark = theme === "dark";
  const primaryTextColor = isDark ? "#ffffff" : "#0f172a";
  const mutedTextColor = isDark ? "#94a3b8" : "#64748b";

  const cardClasses = cn(
    "rounded-3xl border transition-all duration-500 px-6 py-8 sm:px-8 sm:py-10 group",
    isDark
      ? "bg-slate-900/40 backdrop-blur-md border-slate-800/50 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-black/50"
      : "bg-white/70 backdrop-blur-md border-slate-200/60 hover:border-blue-500/20 hover:shadow-2xl hover:shadow-slate-200/50",
    "hover:scale-[1.01] hover:-translate-y-1"
  );

  const specialCardClasses = cn(
    "rounded-3xl border transition-all duration-500 px-6 py-8 sm:px-8 sm:py-10 group",
    isDark
      ? "bg-white text-black border-white hover:shadow-2xl hover:shadow-white/20"
      : "bg-slate-900 text-white border-slate-900 hover:shadow-2xl hover:shadow-black/20",
    "hover:scale-[1.02] cursor-default"
  );

  return (
    <div
      className={cn(
        "min-h-screen transition-colors duration-500",
        isDark ? "bg-[#020617] dark" : "bg-[#f8fafc]"
      )}
      style={{ color: primaryTextColor }}
    >
      <div className="max-w-[800px] mx-auto px-6 pt-16 pb-20">
        {/* Header Section (Brylim-style) */}
        <AnimatedSection animation="fadeIn" duration={0.8}>
          <header className="flex flex-col sm:flex-row items-center sm:items-start gap-8 mb-16">
            <div className="relative group shrink-0">
              <motion.div
                whileHover={{ scale: 1.05, rotate: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="relative z-10"
              >
                <img
                  src={imgSrc}
                  alt="Arron Tuazon"
                  className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl object-cover shadow-2xl transition-all duration-700 group-hover:shadow-blue-500/30"
                  onMouseEnter={() => setImgSrc(profileHover)}
                  onMouseLeave={() => setImgSrc(profilePic)}
                />
              </motion.div>
              <div className="absolute inset-0 bg-blue-600/20 blur-3xl rounded-full scale-0 group-hover:scale-100 transition-transform duration-700 -z-10" />
            </div>

            <div className="flex-1 flex flex-col items-center sm:items-start text-center sm:text-left pt-2">
              <div className="flex items-center gap-3 mb-2">
                <motion.h1
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-4xl font-black tracking-tight"
                >
                  Arron Tuazon
                </motion.h1>
                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white p-1 shadow-lg shadow-blue-500/20 shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>

                {/* Relocated Theme Toggle */}
                <button
                  onClick={() => setTheme(isDark ? "light" : "dark")}
                  aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                  className={cn(
                    "p-2 rounded-full transition-all duration-300 ml-1 shrink-0",
                    isDark
                      ? "bg-white/10 hover:bg-white/20 text-yellow-400"
                      : "bg-black/5 hover:bg-black/10 text-slate-700"
                  )}
                >
                  {isDark ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" /></svg>
                  ) : (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg>
                  )}
                </button>
              </div>

              <div className="flex items-center gap-2 text-sm font-medium opacity-60 mb-4">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                Laguna, Philippines
              </div>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-8 text-base font-semibold">
                <span className={isDark ? "text-white" : "text-slate-900"}>Data Analyst</span>
                <span className="opacity-20 font-black">/</span>
                <span className={isDark ? "text-white" : "text-slate-900"}>Web Developer</span>
                <span className="opacity-20 font-black">/</span>
                <span className={isDark ? "text-white" : "text-slate-900"}>Content Creator</span>

                <div className="ml-2 py-1 px-3 rounded-lg bg-blue-600 text-white text-[0.65rem] font-black uppercase tracking-wider flex items-center gap-1.5 shadow-lg shadow-blue-600/20">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
                  Hackathon Champion
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-black text-sm shadow-xl hover:shadow-2xl transition-all"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  Schedule a Call
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white text-slate-900 dark:bg-slate-900 dark:text-white font-black text-sm shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  Send Email
                </motion.button>
              </div>
            </div>
          </header>
        </AnimatedSection>


        {/* Main Content */}
        <main className="space-y-12">
          {/* About */}
          <AnimatedSection animation="slideUp" delay={0.1}>
            <section className={cardClasses}>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="w-8 h-1 bg-blue-600 rounded-full" />
                About
              </h2>
              <div className="space-y-4 text-[0.95rem] leading-relaxed opacity-80">
                <p>
                  I'm a full‑stack web developer focused on building modern web applications with React on the frontend and Java on the backend. I enjoy creating clean, responsive interfaces and reliable APIs that feel great to use.
                </p>
                <p>
                  I have a passion for learning new technologies and staying up‑to‑date with the latest trends in web development. I'm always looking for ways to improve my skills and take on new challenges.
                </p>
              </div>
            </section>
          </AnimatedSection>

          {/* Tech Stack and Experience side by side */}
          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            {/* Tech Stack */}
            <AnimatedSection animation="slideUp" delay={0.2}>
              <section className={cn(specialCardClasses, "h-full")}>
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <span className={cn("w-8 h-1 rounded-full", isDark ? "bg-black" : "bg-white")} />
                  Tech Stack
                </h2>
                <div className="grid gap-6">
                  {[
                    { title: "Frontend", items: ["React + Vite", "TypeScript", "Tailwind CSS", "Responsive UI"] },
                    { title: "Backend", items: ["Java (Spring Boot)", "RESTful APIs", "MySQL / PostgreSQL", "Auth & Security"] },
                    { title: "Tools", items: ["Git & GitHub", "CI/CD pipelines", "Docker & Cloud", "Monitoring"] }
                  ].map((stack, i) => (
                    <div key={i} className="space-y-3">
                      <h3 className={cn("text-sm font-bold uppercase tracking-wider", isDark ? "text-slate-800" : "text-white/90")}>
                        {stack.title}
                      </h3>
                      <ul className="space-y-2 text-sm opacity-80">
                        {stack.items.map((item, j) => (
                          <li key={j} className="flex items-center gap-2">
                            <span className={cn("w-1 h-1 rounded-full", isDark ? "bg-black/30" : "bg-white/30")} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            </AnimatedSection>

            {/* Experience (Timeline style) */}
            <AnimatedSection animation="slideUp" delay={0.3}>
              <section className={cn(specialCardClasses, "px-8 py-10 h-full")}>
                <h2 className="text-2xl font-black mb-10 italic">Experience</h2>

                <div className={cn(
                  "space-y-12 relative before:absolute before:inset-0 before:left-[11px] before:w-[2px]",
                  isDark ? "before:bg-black/10" : "before:bg-white/10"
                )}>
                  {[
                    {
                      role: "Full‑Stack Developer",
                      organization: "Software Team",
                      period: "2023 — Present",
                      isWork: true
                    },
                    {
                      role: "Freelance Developer",
                      organization: "Various clients",
                      period: "2021 — 2023",
                      isWork: true
                    },
                    {
                      role: "Graduated",
                      organization: "Laguna University",
                      period: "2027",
                      isWork: false
                    },
                    {
                      role: "Started Coding",
                      organization: "Laguna University",
                      period: "2024",
                      isWork: false
                    }
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="relative pl-10 flex items-start justify-between group/item"
                    >
                      {/* Timeline Dot */}
                      <div className={cn(
                        "absolute left-0 top-1.5 w-6 h-6 rounded border-2 transition-colors duration-300 z-10",
                        isDark
                          ? (i === 0 ? "bg-black border-black" : "bg-white border-black/20 group-hover/item:border-black")
                          : (i === 0 ? "bg-white border-white" : "bg-slate-900 border-white/20 group-hover/item:border-white")
                      )} />

                      <div className="flex-1">
                        <h3 className="font-black text-lg leading-tight uppercase tracking-tight">
                          {item.role}
                        </h3>
                        <p className="text-sm font-bold opacity-60 mt-1 uppercase tracking-wider">
                          {item.organization}
                        </p>
                      </div>

                      <div className={cn(
                        "text-xs font-black transition-opacity px-2 py-1 rounded",
                        isDark ? "bg-black/5 opacity-50 group-hover/item:opacity-100" : "bg-white/10 opacity-40 group-hover/item:opacity-100"
                      )}>
                        {item.period}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            </AnimatedSection>
          </div>

          {/* Certifications */}
          <AnimatedSection animation="slideUp" delay={0.4}>
            <section className={cardClasses}>
              <Certifications isDark={isDark} />
            </section>
          </AnimatedSection>

          {/* Sidebar-style cards but centered */}
          <div className="grid md:grid-cols-2 gap-6">
            <AnimatedSection animation="slideRight" delay={0.4}>
              <div className="rounded-3xl bg-slate-900 text-white p-8 flex flex-col justify-between min-h-[240px] shadow-2xl hover:scale-[1.05] transition-transform duration-500 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
                  <code className="text-4xl">&gt;_</code>
                </div>
                <header className="text-[0.7rem] font-bold tracking-[0.2em] uppercase opacity-50">
                  Access Card
                </header>
                <div>
                  <p className="text-[0.6rem] font-bold tracking-[0.3em] uppercase text-blue-400 mb-1">
                    Senior Developer
                  </p>
                  <p className="text-2xl font-bold">Arron Tuazon</p>
                </div>
                <footer className="flex items-center justify-between text-[0.6rem] font-bold tracking-widest opacity-50">
                  <span>VERIFIED IDENTITY</span>
                  <div className="w-10 h-10 border border-dashed border-white/30 rounded-lg flex items-center justify-center">
                    QR
                  </div>
                </footer>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="slideLeft" delay={0.5}>
              <div className="flex flex-col gap-6 h-full">
                <div className="flex-1 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 p-6 text-white shadow-xl hover:shadow-blue-500/20 transition-all group overflow-hidden relative">
                  <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                  <p className="text-[0.7rem] font-bold tracking-[0.2em] uppercase opacity-70 mb-2">
                    Featured
                  </p>
                  <p className="font-medium leading-relaxed">
                    Highlighted in developer community for AI‑assisted projects and modern web development.
                  </p>
                </div>
                <motion.button
                  whileHover={{ y: -5 }}
                  className="w-full py-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-sm shadow-xl hover:shadow-2xl transition-all"
                >
                  Chat with Arron
                </motion.button>
              </div>
            </AnimatedSection>
          </div>

          {/* Social Links */}
          <AnimatedSection animation="slideUp" delay={0.6}>
            <section className="space-y-6">
              <div className="flex items-center gap-2">
                <span className="w-8 h-1 bg-blue-600 rounded-full" />
                <h2 className="text-xl font-black italic">Social Links</h2>
              </div>
              <SocialLinks isDark={isDark} />
            </section>
          </AnimatedSection>

          {/* PrintFlow Showcase */}
          <AnimatedSection animation="fadeIn" delay={0.6}>
            <section className="space-y-6">
              <div className="flex items-center justify-center gap-2">
                <span className="w-12 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full" />
                <h2 className="text-2xl font-bold tracking-tight">PrintFlow System</h2>
                <span className="w-12 h-1 bg-gradient-to-l from-blue-600 to-indigo-600 rounded-full" />
              </div>
              <p className="text-center text-sm opacity-60 max-w-lg mx-auto">
                A professional print management and workflow automation system designed for efficiency and scaling.
              </p>
              <PrintFlowCarousel isDark={isDark} />
            </section>
          </AnimatedSection>
        </main>

        <footer className="mt-20 pt-10 border-t border-slate-200 dark:border-slate-800 text-center">
          <p className="text-xs font-medium opacity-40 uppercase tracking-[0.2em]">
            © 2026 Arron Tuazon · Built with React & Framer Motion
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
