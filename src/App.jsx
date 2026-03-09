import React, { useState } from "react";
import profilePic from "./assets/profile.jpg";
import profileHover from "./assets/profile-hover.jpg";

function App() {
  const [imgSrc, setImgSrc] = useState(profilePic);

  return (
    <div className="min-h-screen bg-slate-100 bg-gradient-to-b from-slate-100 via-slate-50 to-slate-200 text-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 space-y-8">
        {/* Top profile bar */}
        <header className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-center gap-4 md:gap-6">
            <div className="relative rounded-lg overflow-hidden border border-slate-200 shadow-sm flex-shrink-0">
              <img
                src={imgSrc}
                alt="Arron Tuazon"
                className="rounded-lg w-40 h-40 md:w-40 md:h-40 object-cover flex-shrink-0 transition-transform duration-300 hover:scale-105"
                onMouseEnter={() => setImgSrc(profileHover)}
                onMouseLeave={() => setImgSrc(profilePic)}
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 class="text-lg md:text-2xl font-bold truncate">Arron Tuazon</h1>
                <span className="h-3.5 w-3.5 rounded-full border-2 border-blue-100 bg-gradient-to-br from-blue-400 to-blue-700 shadow-[0_0_0_3px_rgba(59,130,246,0.35)]" />
              </div>
              <p className="mt-1 text-sm text-slate-500">
                Laguna, Philippines
              </p>
              <p className="mt-1 text-sm text-slate-600">
                Data Analyst / Web Developer / Content Creator
              </p>
            </div>
          </div>

          <div className="flex flex-col items-start lg:items-end gap-2">
            <div className="flex flex-wrap justify-start lg:justify-end gap-2">
              <button className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-md hover:from-blue-700 hover:to-indigo-700 transition">
                Schedule a Call
              </button>
              <button className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-800 shadow-sm hover:bg-slate-50 transition">
                Send Email
              </button>
            </div>
            <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
              <input
                type="checkbox"
                className="h-3.5 w-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span>Read my blog</span>
            </label>
            <div className="inline-flex rounded-full bg-slate-900 text-[0.7rem] font-medium tracking-[0.12em] text-slate-100 px-3 py-1 uppercase shadow-lg">
              <span>Hackathon Champion</span>
            </div>
          </div>
        </header>

        {/* Main layout */}
        <main className="grid gap-6 lg:grid-cols-[minmax(0,2.1fr)_minmax(260px,1fr)] items-start">
          {/* Left column */}
          <section className="space-y-4">
            {/* About */}
            <section className="rounded-2xl bg-white/90 backdrop-blur shadow-[0_18px_40px_rgba(15,23,42,0.08)] border border-slate-200 px-5 py-5 sm:px-6 sm:py-6">
              <h2 className="text-lg font-semibold mb-3">About</h2>
              <p className="text-sm sm:text-[0.95rem] text-slate-700 leading-relaxed">
                I&apos;m a full‑stack web developer focused on building
                modern web applications with React on the frontend and Java on
                the backend. I enjoy creating clean, responsive interfaces and
                reliable APIs that feel great to use.
              </p>
              <p className="mt-2 text-sm sm:text-[0.95rem] text-slate-700 leading-relaxed">
                i have a passio for learning new technologies and staying up‑to‑date with the latest trends in web development. I&apos;m always looking for ways to
                improve my skills and take on new challenges, whether it&apos;s
                building a side project or contributing to open source.
              </p>
              <p className="mt-2 text-sm sm:text-[0.95rem] text-slate-700 leading-relaxed">
                now i am looking for new opportunities to grow as a developer and work on
              </p>
            </section>

            {/* Tech Stack */}
            <section className="rounded-2xl bg-white/90 backdrop-blur shadow-[0_18px_40px_rgba(15,23,42,0.08)] border border-slate-200 px-5 py-5 sm:px-6 sm:py-6">
              <h2 className="text-lg font-semibold mb-4">Tech Stack</h2>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <h3 className="text-sm font-semibold text-slate-800 mb-1.5">
                    Frontend
                  </h3>
                  <ul className="space-y-1 text-sm text-slate-700">
                    <li>React + Vite</li>
                    <li>TypeScript</li>
                    <li>Tailwind CSS</li>
                    <li>Responsive UI design</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-800 mb-1.5">
                    Backend
                  </h3>
                  <ul className="space-y-1 text-sm text-slate-700">
                    <li>Java (Spring Boot)</li>
                    <li>RESTful APIs</li>
                    <li>MySQL / PostgreSQL</li>
                    <li>Authentication &amp; security</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-800 mb-1.5">
                    Tools
                  </h3>
                  <ul className="space-y-1 text-sm text-slate-700">
                    <li>Git &amp; GitHub</li>
                    <li>CI/CD pipelines</li>
                    <li>Docker &amp; cloud</li>
                    <li>Monitoring &amp; observability</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Experience */}
            <section className="rounded-2xl bg-white/90 backdrop-blur shadow-[0_18px_40px_rgba(15,23,42,0.08)] border border-slate-200 px-5 py-5 sm:px-6 sm:py-6">
              <h2 className="text-lg font-semibold mb-4">Experience</h2>
              <div className="space-y-4">
                <article>
                  <header className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900">
                        Full‑Stack Developer
                      </h3>
                      <p className="text-xs text-slate-600 mt-1">
                        Software Team · Full‑time
                      </p>
                    </div>
                    <div className="flex flex-col items-start sm:items-end text-xs text-slate-600">
                      <span>2023 — Present</span>
                      <span>Hybrid</span>
                    </div>
                  </header>
                  <p className="mt-2 text-sm text-slate-700 leading-relaxed">
                    Building and maintaining web applications using React and Java,
                    collaborating with cross‑functional teams to deliver high‑quality
                    software solutions that meet user needs and business goals.
                  </p>
                </article>

                <article>
                  <header className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900">
                        Freelance Developer
                      </h3>
                      <p className="text-xs text-slate-600 mt-1">
                        Various clients · Project‑based
                      </p>
                    </div>
                    <div className="flex flex-col items-start sm:items-end text-xs text-slate-600">
                      <span>2021 — 2023</span>
                      <span>Remote</span>
                    </div>
                  </header>
                  <p className="mt-2 text-sm text-slate-700 leading-relaxed">
                    Helped small businesses and teams ship custom websites,
                    dashboards, and internal tools tailored to their workflows.
                  </p>
                </article>
              </div>
            </section>
          </section>

          {/* Right column */}
          <aside className="space-y-4">
            {/* Access card */}
            <section className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-slate-100 shadow-[0_22px_45px_rgba(15,23,42,0.8)] p-5 sm:p-6 flex flex-col justify-between min-h-[220px]">
              <header className="flex items-center justify-between text-[0.7rem] font-medium tracking-[0.16em] uppercase text-slate-400">
                <span>Access Card</span>
                <span className="text-lg">&gt;_</span>
              </header>
              <div className="mt-8">
                <p className="text-xs font-medium tracking-[0.18em] uppercase text-slate-400">
                  Developer
                </p>
                <p className="mt-2 text-xl font-semibold">Arron Tuazon</p>
              </div>
              <footer className="mt-8 flex items-center justify-between text-xs text-slate-400">
                <span>Portfolio</span>
                <span className="h-11 w-11 rounded-xl border border-dashed border-slate-500 flex items-center justify-center text-[0.7rem]">
                  QR
                </span>
              </footer>
            </section>

            {/* Highlight card */}
            <section className="rounded-2xl bg-gradient-to-r from-violet-800 via-violet-600 to-indigo-500 text-violet-50 shadow-[0_16px_40px_rgba(88,28,135,0.55)] p-4">
              <p className="text-[0.7rem] font-semibold tracking-[0.18em] uppercase opacity-80">
                Featured
              </p>
              <p className="mt-1.5 text-sm font-medium">
                Highlighted in developer community for AI‑assisted projects and
                modern web development.
              </p>
            </section>

            {/* Chat button */}
            <button className="w-full inline-flex items-center justify-center rounded-full bg-slate-900 px-4 py-2.5 text-sm font-medium text-slate-50 shadow-[0_12px_28px_rgba(15,23,42,0.6)] hover:bg-black/90 hover:-translate-y-0.5 transition">
              Chat with Arron
            </button>
          </aside>
        </main>
      </div>
    </div>
  );
}

export default App;
