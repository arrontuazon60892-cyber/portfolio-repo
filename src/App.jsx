import React, { useState } from "react";
import PrintFlowCarousel from "./components/PrintFlowCarousel";
import PhotoboothCarousel from "./components/PhotoboothCarousel";
import SocialLinks from "./components/SocialLinks";
import Certifications from "./components/Certifications";
import Modal from "./components/Modal";
import Gallery from "./components/Gallery";
import ChatWidget from "./components/ChatWidget";
import ProfileAvatar from "./components/ProfileAvatar";
import { cn } from "./lib/utils";
import { Moon, Sun, Mail, BookOpen, ExternalLink, Copy, Check } from "lucide-react";

function App() {
  const [theme, setTheme] = useState("light");
  const [isPrintFlowOpen, setIsPrintFlowOpen] = useState(false);
  const [isAttendanceOpen, setIsAttendanceOpen] = useState(false);
  const [isAttendexOpen, setIsAttendexOpen] = useState(false);
  const [isPhotoboothOpen, setIsPhotoboothOpen] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  const isDark = theme === "dark";

  const toggleTheme = () => setTheme(isDark ? "light" : "dark");

  const ChevronRight = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
  );

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-300 font-sans",
      isDark ? "bg-[#000000] text-white dark" : "bg-white text-black"
    )}>
      <div className="max-w-[1100px] mx-auto px-6 py-10 sm:py-20">
        
        {/* Theme Toggle (Top Right) */}
        <div className="flex justify-end mb-8">
          <button
            onClick={toggleTheme}
            className={cn(
              "p-2 rounded-md transition-colors border",
              isDark ? "bg-gray-900 border-gray-800 text-yellow-500" : "bg-gray-100 border-gray-200 text-gray-600"
            )}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Hero Section */}
        <header className="flex flex-col md:flex-row gap-10 md:gap-16 mb-20 items-start">
          <ProfileAvatar isDark={isDark} />

          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-[2.5rem] font-bold tracking-tight leading-none">Arron Tuazon</h1>
              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
            </div>
            
            <p className="text-[1rem] mb-2 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              Laguna, Philippines
            </p>

            <div className="flex flex-wrap items-center gap-2 text-[1.1rem] font-medium mb-8">
              <span>Data Analyst</span>
              <span>\</span>
              <span>Web Developer</span>
              <span>\</span>
              <span>Video Editing</span>
            </div>

            <div className="flex flex-wrap gap-3">
              <button className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-lg border font-bold text-sm transition-all",
                isDark ? "border-gray-800 hover:bg-gray-900" : "border-gray-200 hover:bg-gray-50"
              )}>
                <BookOpen size={18} />
                Read my blog
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-12 gap-12 sm:gap-20 mb-20">
          
          {/* Left Column (60%) */}
          <div className="md:col-span-7 space-y-20">
            
            {/* About Section */}
            <section>
              <h2 className="text-[1.1rem] font-bold mb-5">About</h2>
              <div className="space-y-6 text-[1rem] leading-relaxed">
                <p>
                  I'm a full-stack web developer focused on building modern web applications with React on the frontend and Java on the backend. I enjoy creating clean, responsive interfaces and reliable APIs that feel great to use.
                </p>
                <p>
                  I have a passion for learning new technologies and staying up-to-date with the latest trends in web development. I'm always looking for ways to improve my skills and take on new challenges.
                </p>
              </div>
            </section>

            {/* Tech Stack Section */}
            <section>
              <h2 className="text-[1.1rem] font-bold mb-5">Tech Stack</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-[0.85rem] font-bold uppercase tracking-widest mb-3">Frontend</h3>
                  <div className="flex flex-wrap gap-2">
                    {["React + Vite", "TypeScript", "Tailwind CSS", "Responsive UI"].map(tech => (
                      <span key={tech} className={cn("pill", isDark ? "pill-dark" : "pill-light")}>{tech}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-[0.85rem] font-bold uppercase tracking-widest mb-3">Backend</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Java (Spring Boot)", "RESTful APIs", "MySQL and Supabase", "Auth & Security", "Python", "Php"].map(tech => (
                      <span key={tech} className={cn("pill", isDark ? "pill-dark" : "pill-light")}>{tech}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-[0.85rem] font-bold uppercase tracking-widest mb-3">DevOps & Cloud</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Git & GitHub", "Vercel (for frontend deployment)"].map(tech => (
                      <span key={tech} className={cn("pill", isDark ? "pill-dark" : "pill-light")}>{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Recent Projects Section */}
            <section>
              <h2 className="text-[1.1rem] font-bold mb-8">Recent Projects in School</h2>
              <div className="grid gap-10">
                {[
                  {
                    title: "PrintFlow",
                    description: "PrintFlow is a sales, inventory, and ordering management system designed to help Mr. and Mrs. Prints efficiently track orders, manage stock, and monitor business transactions.(Web Application)",
                    tags: ["Tailwind", "Php", "MySQL"],
                    link: "none link"
                  },
                  {
                    title: "Attedance Management System",
                    description: "A digital attendance tracking system designed to simplify monitoring and managing attendance records.(Mobile Application)",
                    tags: ["kotlin", "java", "Firebase"],
                    link: "none link"
                  },
                  {
                    title: "Attendex: Attendance and Examination Management System",
                    description: "An academic management system for tracking student attendance and managing examination records..",
                    tags: ["Css", "Php", "MySQL"],
                    link: "none link"
                  },
                  {
                    title: "Photobooth Management System",
                    description: "A comprehensive photobooth management system designed to streamline photo booth operations, including session management, photo processing, and customer tracking.(Web Application)",
                    tags: ["Php", "MySQL", "Bootstrap", "JavaScript"],
                    link: "none link"
                  }
                ].map((project, idx) => (
                  <div 
                    key={idx} 
                    className="group cursor-pointer"
                    onClick={() => {
                        if (project.title === "PrintFlow") {
                            setIsPrintFlowOpen(true);
                        } else if (project.title === "Attedance Management System") {
                            setIsAttendanceOpen(true);
                        } else if (project.title === "Attendex: Attendance and Examination Management System") {
                            setIsAttendexOpen(true);
                        } else if (project.title === "Photobooth Management System") {
                            setIsPhotoboothOpen(true);
                        }
                    }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-lg font-bold group-hover:underline">{project.title}</h4>
                      <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-sm leading-relaxed mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 items-center">
                      <span className={cn(
                        "px-2 py-0.5 rounded text-[10px] font-mono border",
                        isDark ? "border-gray-800 text-white" : "border-gray-100 text-black"
                      )}>
                        {project.link}
                      </span>
                      {project.tags.map(tag => (
                        <span key={tag} className={cn(
                          "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
                          isDark ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
                        )}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Certifications Section */}
            <section>
              <h2 className="text-[1.1rem] font-bold mb-5">Recent Certifications</h2>
              <Certifications isDark={isDark} />
            </section>

            {/* Social Links */}
            <section>
              <h2 className="text-[1.1rem] font-bold mb-6">Social Links</h2>
              <SocialLinks isDark={isDark} />
            </section>

            {/* Contact Section */}
            <section>
              <h2 className="text-[1.1rem] font-bold mb-6">Contact</h2>
              <div className={cn(
                "flex items-center justify-between p-4 rounded-lg border",
                isDark ? "border-gray-800 bg-gray-900/50" : "border-gray-200 bg-gray-50"
              )}>
                <div className="flex items-center gap-3">
                  <Mail size={20} className={isDark ? "text-blue-400" : "text-blue-600"} />
                  <a 
                    href="mailto:arrontuazon9@gmail.com"
                    className={cn(
                      "text-sm font-medium hover:underline transition-colors",
                      isDark ? "text-white" : "text-gray-900"
                    )}
                  >
                    arrontuazon9@gmail.com
                  </a>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText('arrontuazon9@gmail.com');
                    setEmailCopied(true);
                    setTimeout(() => setEmailCopied(false), 2000);
                  }}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all",
                    isDark 
                      ? "bg-gray-800 hover:bg-gray-700 text-gray-300" 
                      : "bg-white hover:bg-gray-100 text-gray-600 border border-gray-200"
                  )}
                >
                  {emailCopied ? (
                    <>
                      <Check size={14} />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      Copy
                    </>
                  )}
                </button>
              </div>
            </section>

            {/* Gallery Section */}
            <section>
              <h2 className="text-[1.1rem] font-bold mb-8">Gallery</h2>
              <Gallery isDark={isDark} />
            </section>

          </div>

          {/* Right Column (40%) */}
          <div className="md:col-span-5 space-y-16">

            {/* Experience Section */}
            <section>
              <h2 className="text-[1.1rem] font-bold mb-8">Experience</h2>
              <div className="space-y-8 relative before:absolute before:inset-0 before:left-[4px] before:w-[1px] before:bg-gray-200 dark:before:bg-gray-800">
                {[
                  { title: "Junior Web Developer, Aspiring Full-Stack Developer", org: "WebDevs", year: "2027" },
                  { title: "BS Information Technology in Business Analytics", org: "Laguna University (Expected Graduating)", year: "2027" },
                  { title: "Data Analyst Intern", org: "", year: "Ongoing(2026)" },
                  { title: "Hello World!", org: "Wrote my first line of code", year: "2024" }
                ].map((item, i) => (
                  <div key={i} className="relative pl-8">
                    <div className={cn(
                      "absolute left-0 top-[6px] w-[9px] h-[9px] rounded-sm transform rotate-45 z-10",
                      i === 0 ? "bg-black dark:bg-white" : "bg-gray-200 dark:bg-gray-800"
                    )} />
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-sm font-bold leading-none mb-1">{item.title}</h4>
                        <p className="text-xs font-medium">{item.org}</p>
                      </div>
                      <span className="text-xs font-bold">{item.year}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>


          </div>
        </main>

        <footer className="pt-20 border-t border-gray-100 dark:border-gray-900 flex flex-col md:flex-row justify-between items-center gap-4">
           <p className="text-[0.7rem] font-bold uppercase tracking-[0.2em]">© 2026 Arron Tuazon</p>
           <button 
             onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
             className="text-[0.7rem] font-bold hover:underline transition-opacity uppercase tracking-[0.2em]"
           >
             Back to Top ↑
           </button>
        </footer>

      </div>

      <ChatWidget isDark={isDark} />

      {/* Project Modals */}
      <Modal 
        isOpen={isPrintFlowOpen} 
        onClose={() => setIsPrintFlowOpen(false)}
        isDark={isDark}
      >
        <div className="flex flex-col gap-6">
            <header>
                <h3 className="text-2xl font-bold tracking-tight">PrintFlow System</h3>
                <p className="text-sm mt-2 leading-relaxed">
                    A sales, inventory, and ordering management system designed to help Mr. and Mrs. Prints efficiently track orders, manage stock, and monitor business transactions.
                </p>
            </header>
            
            <PrintFlowCarousel isDark={isDark} />
            
            <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                {["Tailwind", "Php", "MySQL"].map(tag => (
                    <span key={tag} className={cn(
                        "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest",
                        isDark ? "bg-slate-800 text-white" : "bg-slate-100 text-black"
                    )}>
                        {tag}
                    </span>
                ))}
            </div>
        </div>
      </Modal>

      <Modal 
        isOpen={isAttendanceOpen} 
        onClose={() => setIsAttendanceOpen(false)}
        isDark={isDark}
      >
        <div className="flex flex-col gap-6">
            <header>
                <h3 className="text-2xl font-bold tracking-tight">Attedance Management System</h3>
                <p className="text-sm mt-2 leading-relaxed">
                    A digital attendance tracking system designed to simplify monitoring and managing attendance records.(Mobile Application)
                </p>
            </header>
            
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 flex items-center justify-center min-h-[200px]">
                <p className="text-sm text-gray-500 dark:text-gray-400">Project images coming soon</p>
            </div>
            
            <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                {["kotlin", "java", "Firebase"].map(tag => (
                    <span key={tag} className={cn(
                        "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest",
                        isDark ? "bg-slate-800 text-white" : "bg-slate-100 text-black"
                    )}>
                        {tag}
                    </span>
                ))}
            </div>
        </div>
      </Modal>

      <Modal 
        isOpen={isAttendexOpen} 
        onClose={() => setIsAttendexOpen(false)}
        isDark={isDark}
      >
        <div className="flex flex-col gap-6">
            <header>
                <h3 className="text-2xl font-bold tracking-tight">Attendex: Attendance and Examination Management System</h3>
                <p className="text-sm mt-2 leading-relaxed">
                    An academic management system for tracking student attendance and managing examination records.
                </p>
            </header>
            
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 flex items-center justify-center min-h-[200px]">
                <p className="text-sm text-gray-500 dark:text-gray-400">Project images coming soon</p>
            </div>
            
            <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                {["Css", "Php", "MySQL"].map(tag => (
                    <span key={tag} className={cn(
                        "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest",
                        isDark ? "bg-slate-800 text-white" : "bg-slate-100 text-black"
                    )}>
                        {tag}
                    </span>
                ))}
            </div>
        </div>
      </Modal>

      <Modal 
        isOpen={isPhotoboothOpen} 
        onClose={() => setIsPhotoboothOpen(false)}
        isDark={isDark}
      >
        <div className="flex flex-col gap-6">
            <header>
                <h3 className="text-2xl font-bold tracking-tight">Photobooth Management System</h3>
                <p className="text-sm mt-2 leading-relaxed">
                    A comprehensive photobooth management system designed to streamline photo booth operations, including session management, photo processing, and customer tracking.
                </p>
            </header>
            
            <PhotoboothCarousel isDark={isDark} />
            
            <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                {["Php", "MySQL", "Bootstrap", "JavaScript"].map(tag => (
                    <span key={tag} className={cn(
                        "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest",
                        isDark ? "bg-slate-800 text-white" : "bg-slate-100 text-black"
                    )}>
                        {tag}
                    </span>
                ))}
            </div>
        </div>
      </Modal>

    </div>
  );
}

export default App;
