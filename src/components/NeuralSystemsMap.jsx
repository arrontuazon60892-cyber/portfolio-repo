"use client";

import { useEffect, useRef, useState } from "react";

const nodes = [
  ["AI", 50, 48, "Model integration and intelligent systems"],
  ["Frontend", 24, 25, "React, Next.js, TypeScript, Tailwind CSS"],
  ["Backend", 76, 25, "Java, Spring Boot, PHP, REST APIs"],
  ["Database", 82, 61, "MySQL, Supabase, Firebase"],
  ["Cloud", 64, 82, "Vercel and GitHub delivery"],
  ["Data", 36, 82, "Analytics and data pipelines"],
  ["Design", 15, 61, "Graphic design and responsive UI"],
  ["Video", 50, 12, "Video editing and visual storytelling"],
];

const edges = [[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[1,7],[2,3],[3,4],[5,6]];

export default function NeuralSystemsMap() {
  const rootRef = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting && !document.hidden), { threshold: 0.15 });
    const onVisibility = () => setActive(!document.hidden && root.getBoundingClientRect().bottom > 0 && root.getBoundingClientRect().top < window.innerHeight);
    observer.observe(root);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div ref={rootRef} className={`neural-map ${active ? "is-active" : "is-paused"}`}>
      <svg viewBox="0 0 100 100" role="img" aria-label="Interactive map of Arron Tuazon's technology skills">
        <defs>
          <linearGradient id="neuralLine" x1="0" x2="1"><stop stopColor="#4dc9ff" /><stop offset="1" stopColor="#8b5cff" /></linearGradient>
        </defs>
        <g className="neural-map__edges">
          {edges.map(([from, to], index) => {
            const [,, x1, y1] = [null, null, nodes[from][1], nodes[from][2]];
            const [x2, y2] = [nodes[to][1], nodes[to][2]];
            return <line key={`${from}-${to}`} x1={x1} y1={y1} x2={x2} y2={y2} className={index < 4 ? "has-signal" : ""} />;
          })}
        </g>
        <g className="neural-map__nodes">
          {nodes.map(([label, x, y, detail], index) => (
            <g key={label} className={`neural-map__node neural-map__node--${index}`} transform={`translate(${x} ${y})`} tabIndex="0" role="button" aria-label={`${label}: ${detail}`}>
              <circle r={index === 0 ? 6.8 : 4.4} />
              <circle r={index === 0 ? 3.2 : 2} className="neural-map__node-core" />
              <text y={index === 0 ? 11 : 8}>{label}</text>
              <title>{detail}</title>
            </g>
          ))}
        </g>
      </svg>
      <div className="neural-map__readout"><span>8 SYSTEMS</span><span>11 ACTIVE ROUTES</span><b>MODEL READY</b></div>
    </div>
  );
}
