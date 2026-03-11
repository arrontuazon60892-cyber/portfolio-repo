import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import profilePic from "./assets/profile.jpg";
import profileHover from "./assets/profile-hover.jpg";
import gallaryImg from "./assets/gallary/gallary.webp";
import gallaryImg1 from "./assets/gallary/gallary1.webp";
import gallaryImg2 from "./assets/gallary/gallary2.webp";
import gallaryImg3 from "./assets/gallary/gallary3.webp";
import AnimatedSection from "./components/AnimatedSection";
import PrintFlowCarousel from "./components/PrintFlowCarousel";
import SocialLinks from "./components/SocialLinks";
import Certifications from "./components/Certifications";
import Modal from "./components/Modal";
import Gallery from "./components/Gallery";
import { cn } from "./lib/utils";
import { Moon, Sun, Mail, Calendar, BookOpen, ExternalLink, MessageSquare, Box, ChevronLeft } from "lucide-react";

function App() {
  const [imgSrc, setImgSrc] = useState(profilePic);
  const [theme, setTheme] = useState("light");
  const [isPrintFlowOpen, setIsPrintFlowOpen] = useState(false);

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
          <div className="relative shrink-0">
            <img
              src={imgSrc}
              alt="Arron Tuazon"
              className="w-40 h-40 md:w-48 md:h-48 rounded-xl object-cover transition-all duration-500"
              onMouseEnter={() => setImgSrc(profileHover)}
              onMouseLeave={() => setImgSrc(profilePic)}
            />
          </div>

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
              <span>Content Creator</span>
              
              <div className="ml-2 py-1 px-3 rounded bg-blue-600 text-white text-[0.65rem] font-bold uppercase tracking-wider flex items-center gap-1.5">
                Hackathon Champion
                <ChevronRight size={10} />
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm transition-all",
                isDark ? "bg-white text-black" : "bg-black text-white"
              )}>
                <Calendar size={18} />
                Schedule a Call
                <ChevronRight size={14} />
              </button>
              <button className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-lg border font-bold text-sm transition-all",
                isDark ? "border-gray-800 hover:bg-gray-900" : "border-gray-200 hover:bg-gray-50"
              )}>
                <Mail size={18} />
                Send Email
              </button>
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
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-[1.1rem] font-bold">Tech Stack</h2>
                <button className="text-[0.7rem] font-bold hover:underline transition-opacity flex items-center gap-1">
                  View All <ChevronRight size={12} />
                </button>
              </div>
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
                    {["Java (Spring Boot)", "RESTful APIs", "MySQL / PostgreSQL", "Auth & Security", "Python", "Php"].map(tech => (
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
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-[1.1rem] font-bold">Recent Projects in School</h2>
                <button className="text-[0.7rem] font-bold hover:underline transition-opacity flex items-center gap-1">
                  View All <ChevronRight size={12} />
                </button>
              </div>
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
                  }
                ].map((project, idx) => (
                  <div 
                    key={idx} 
                    className="group cursor-pointer"
                    onClick={() => {
                        if (project.title === "PrintFlow") {
                            setIsPrintFlowOpen(true);
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
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-[1.1rem] font-bold">Recent Certifications</h2>
                <button className="text-[0.7rem] font-bold hover:underline transition-opacity flex items-center gap-1">
                  View All <ChevronRight size={12} />
                </button>
              </div>
              <Certifications isDark={isDark} />
            </section>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
               {/* Member of */}
              <section>
                <h2 className="text-[1.1rem] font-bold mb-6">A member of</h2>
                <div className="space-y-6">
                  {[
                    { org: "Analytics & AI Association of the Phil.", role: "Member" },
                    { org: "Philippine Software Industry Association", role: "Contributor" },
                    { org: "Stack Overflow", role: "Top 5% Contributor" }
                  ].map((item, idx) => (
                    <div key={idx} className="flex flex-col">
                      <span className="text-sm font-bold leading-tight">{item.org}</span>
                      <span className="text-[10px] uppercase tracking-widest font-bold mt-1">{item.role}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Social Links */}
              <section>
                <h2 className="text-[1.1rem] font-bold mb-6">Social Links</h2>
                <SocialLinks isDark={isDark} />
              </section>
            </div>

            {/* Gallery Section */}
            <section>
              <h2 className="text-[1.1rem] font-bold mb-8">Gallery</h2>
              <Gallery isDark={isDark} />
            </section>

          </div>

          {/* Right Column (40%) */}
          <div className="md:col-span-5 space-y-16">
            
            {/* Devs One Hundred Card */}
            <div className={cn(
              "p-8 rounded-xl flex flex-col justify-between min-h-[340px] relative overflow-hidden group",
              isDark ? "bg-gray-900 text-white" : "bg-gray-900 text-white"
            )}>
              <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-40 transition-opacity">
                <code className="text-5xl font-bold tracking-tighter">&gt;_</code>
              </div>
              <header className="text-[0.7rem] font-bold tracking-[0.2em] uppercase">
                Access Card
              </header>
              <div>
                <p className="text-[0.6rem] font-bold tracking-[0.3em] uppercase text-white mb-2">
                  Founding Member
                </p>
                <p className="text-3xl font-bold tracking-tight">Arron</p>
              </div>
              <footer className="flex items-center justify-between text-[0.6rem] font-bold tracking-widest">
                <span className="uppercase">Developer</span>
                <div className="w-12 h-12 border border-dashed border-white/40 rounded-lg flex items-center justify-center">
                  QR
                </div>
              </footer>
            </div>

            {/* Experience Section */}
            <section>
              <h2 className="text-[1.1rem] font-bold mb-8">Experience</h2>
              <div className="space-y-8 relative before:absolute before:inset-0 before:left-[4px] before:w-[1px] before:bg-gray-200 dark:before:bg-gray-800">
                {[
                  { title: "Junior Web Developer", org: "WebDevs", year: "2027" },
                  { title: "BS Information Technology in Business Analytics", org: "Laguna University", year: "2027" },
                  { title: "Data Analyst Intern", org: "GCM", year: "2026" },
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

            {/* Recommendations Section */}
            <section>
              <h2 className="text-[1.1rem] font-bold mb-8">Recommendations</h2>
              <div className="space-y-10">
                {[
                  {
                    name: "xinsoo",
                    role: "Senior Developer ",
                    text: "Arron is a dedicated developer with a strong focus on clean code and efficient problem solving."
                  },
                  {
                    name: "Eunsoyaa",
                    role: "boss",
                    text: "Highly skilled and professional. Delivered exceptional results on our recent project."
                  }
                ].map((rec, idx) => (
                  <div key={idx} className="border-l border-gray-100 dark:border-gray-900 pl-6">
                    <p className="text-sm italic leading-relaxed mb-4">
                      "{rec.text}"
                    </p>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold">{rec.name}</span>
                      <span className="text-[10px] uppercase tracking-widest font-bold mt-1">{rec.role}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Speaking Section */}
            <section>
              <h2 className="text-[1.1rem] font-bold mb-6">Speaking</h2>
              <div className="space-y-6">
                <p className="text-sm leading-relaxed">
                  Available for speaking at events about software development and emerging technologies.
                </p>
                <div className="flex items-center gap-2 text-sm font-bold cursor-pointer hover:underline">
                  Get in touch <ChevronRight size={14} />
                </div>
              </div>
            </section>

            {/* Footer-Contact Section */}
            <section className="space-y-4 pt-10 border-t border-gray-100 dark:border-gray-900">
               {[
                 { label: "Email", value: "arron60892@gmail.com", icon: <Mail size={16} /> },
                 { label: "Let's Talk", value: "Schedule a Call", icon: <MessageSquare size={16} />, suffix: <ChevronRight size={12} /> },
                 { label: "Blog", value: "Read my blog", icon: <BookOpen size={16} />, suffix: <ChevronRight size={12} /> }
               ].map(item => (
                 <div key={item.label} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors cursor-pointer group">
                   <div className="flex items-center gap-3">
                     <span>{item.icon}</span>
                     <div>
                       <p className="text-[0.6rem] font-bold uppercase leading-none mb-1">{item.label}</p>
                       <p className="text-sm font-bold">{item.value}</p>
                     </div>
                   </div>
                   <div>{item.suffix}</div>
                 </div>
               ))}
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

      {/* Persistent Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="bg-black text-white dark:bg-white dark:text-black px-6 py-3 rounded-lg font-bold text-sm shadow-xl flex items-center gap-2 hover:scale-105 transition-transform">
          <MessageSquare size={18} />
          Chat with Arron
        </button>
      </div>

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

    </div>
  );
}

export default App;
