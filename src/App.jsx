import React, { useState } from "react";
import profilePic from "./assets/profile.jpg";
import profileHover from "./assets/profile-hover.jpg";

function App() {
  const [imgSrc, setImgSrc] = useState(profilePic);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "2rem 1.5rem 3rem",
          textAlign: "center",
        }}
      >
        {/* Top profile bar */}
        <header style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center" }}>
          <div>
            <img
              src={imgSrc}
              alt="Arron Tuazon"
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "12px",
                objectFit: "cover",
                display: "block",
                margin: "0 auto",
                boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
              }}
              onMouseEnter={() => setImgSrc(profileHover)}
              onMouseLeave={() => setImgSrc(profilePic)}
            />
          </div>

          <div>
            <h1 style={{ fontSize: "1.6rem", fontWeight: 700, marginBottom: "0.25rem" }}>
              Arron Tuazon
            </h1>
            <p style={{ margin: 0, fontSize: "0.9rem", color: "#6b7280" }}>
              Laguna, Philippines
            </p>
            <p style={{ marginTop: "0.25rem", fontSize: "0.9rem", color: "#4b5563" }}>
              Data Analyst / Web Developer / Content Creator
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", alignItems: "center", marginTop: "0.5rem" }}>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", justifyContent: "center" }}>
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
        <main className="w-full space-y-6 flex flex-col items-center">
          {/* Content column */}
          <section className="space-y-4 w-full">
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

          {/* Right column content centered under main */}
          <aside className="space-y-4 w-full max-w-md">
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
