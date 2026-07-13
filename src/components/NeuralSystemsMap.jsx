"use client";

import { useEffect, useRef, useState } from "react";
import { Cpu, Radio, Satellite } from "lucide-react";

const systems = [
  { name: "Frontend", tools: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vite", "Responsive UI"], size: 31, duration: 34, hue: "#54dcff" },
  { name: "Backend", tools: ["Java", "Spring Boot", "PHP", "REST APIs", "Python"], size: 39, duration: 43, hue: "#7c6bff" },
  { name: "Database", tools: ["MySQL", "Supabase", "Firebase"], size: 47, duration: 52, hue: "#49efc1" },
  { name: "Cloud", tools: ["Vercel", "GitHub", "Git"], size: 55, duration: 60, hue: "#9b84ff" },
  { name: "Data", tools: ["Data Analysis", "SQL", "Python"], size: 63, duration: 69, hue: "#4ca4ff" },
  { name: "Design", tools: ["Graphic Design", "UI Design", "Creative Direction"], size: 71, duration: 78, hue: "#df67ff" },
  { name: "Video", tools: ["Video Editing", "Motion Design"], size: 79, duration: 87, hue: "#ff6fb1" },
  { name: "Mobile", tools: ["Kotlin", "Firebase"], size: 87, duration: 96, hue: "#6ee7ff" },
];

export default function NeuralSystemsMap() {
  const rootRef = useRef(null);
  const [active, setActive] = useState(false);
  const [selected, setSelected] = useState(0);
  const system = systems[selected];

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting && !document.hidden), { rootMargin: "100px", threshold: 0.1 });
    const onVisibility = () => setActive(!document.hidden && root.getBoundingClientRect().bottom > 0 && root.getBoundingClientRect().top < innerHeight);
    observer.observe(root);
    document.addEventListener("visibilitychange", onVisibility);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", onVisibility); };
  }, []);

  return (
    <div ref={rootRef} className={`neural-galaxy ${active ? "is-active" : "is-paused"}`}>
      <div className="neural-galaxy__stars" aria-hidden="true">
        {Array.from({ length: 18 }, (_, index) => <i key={index} style={{ "--star": index, left: `${(index * 37 + 9) % 94}%`, top: `${(index * 61 + 7) % 88}%` }} />)}
      </div>
      <div className="ai-sun" aria-label="AI neural core">
        <span className="ai-sun__wave" /><span className="ai-sun__ring ai-sun__ring--one" /><span className="ai-sun__ring ai-sun__ring--two" />
        <b>AI</b><small>NEURAL CORE</small>
      </div>

      {systems.map((item, index) => (
        <div
          className={`galaxy-orbit ${selected === index ? "is-selected" : ""}`}
          key={item.name}
          style={{ "--orbit-size": `${item.size}%`, "--orbit-duration": `${item.duration}s`, "--orbit-delay": `${index * -7.2}s`, "--planet-hue": item.hue, "--static-angle": `${index * 45}deg` }}
        >
          <button type="button" className="galaxy-planet" onMouseEnter={() => setSelected(index)} onFocus={() => setSelected(index)} onClick={() => setSelected(index)} aria-pressed={selected === index}>
            <span className="galaxy-planet__surface"><i /><b>{item.name}</b><small>ONLINE</small></span>
            <span className="galaxy-moons" aria-hidden={selected !== index}>
              {item.tools.slice(0, 4).map((tool, toolIndex) => <i key={tool} style={{ "--moon": toolIndex }}><Satellite size={9} /><span>{tool}</span></i>)}
            </span>
          </button>
        </div>
      ))}

      <aside className="galaxy-details" aria-live="polite">
        <span><Radio size={12} /> SELECTED SYSTEM</span>
        <h3>{system.name}</h3>
        <div>{system.tools.map((tool) => <b key={tool}>{tool}</b>)}</div>
        <footer><Cpu size={13} /> {system.tools.length} CONNECTED SATELLITES</footer>
      </aside>
      <div className="galaxy-coordinates" aria-hidden="true">X: 08.21 / Y: 47.92 / SIGNAL STABLE</div>
    </div>
  );
}
