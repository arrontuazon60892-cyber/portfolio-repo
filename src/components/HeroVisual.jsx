"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const terminalSource = `const developer = {
  frontend: ["React", "Next.js"],
  backend: ["Java", "Spring Boot"],
  data: ["MySQL", "Supabase"],
  status: "building"
};`;

const metrics = [
  ["Frontend Systems", 96],
  ["Backend Systems", 92],
  ["AI Integration", 94],
  ["Creative Systems", 90],
  ["Deployment", 100],
];

export default function HeroVisual() {
  const [code, setCode] = useState("");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const reducedTimer = window.setTimeout(() => setCode(terminalSource), 0);
      return () => window.clearTimeout(reducedTimer);
    }

    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setCode(terminalSource.slice(0, index));
      if (index >= terminalSource.length) window.clearInterval(timer);
    }, 18);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="hero-visual" aria-label="Human developer collaborating with a digital human AI">
      <div className="hero-visual__grid" aria-hidden="true" />
      <div className="hero-visual__data" aria-hidden="true">
        <span>compiling components</span>
        <span>validating types</span>
        <span>model ready</span>
        <span>deployment successful</span>
      </div>

      <div className="hero-person hero-person--ai" aria-hidden="true">
        <Image
          src="/images/ai-face-layer.webp"
          alt=""
          fill
          priority
          sizes="(max-width: 1023px) 55vw, 34vw"
          className="hero-person__image"
        />
        <svg className="ai-neural-overlay" viewBox="0 0 500 700" role="presentation">
          <path d="M96 182L180 124L260 186L336 126M112 286L204 224L302 282L378 218M118 390L220 332L332 394M156 492L246 430L326 486" />
          {[ [96,182], [180,124], [260,186], [336,126], [112,286], [204,224], [302,282], [378,218], [118,390], [220,332], [332,394], [156,492], [246,430], [326,486] ].map(([cx, cy], index) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={index % 4 === 0 ? 5 : 3} className={index % 4 === 0 ? "is-active" : ""} />
          ))}
          <circle r="4" className="ai-signal"><animateMotion dur="5.5s" repeatCount="indefinite" path="M96 182L180 124L260 186L336 126" /></circle>
        </svg>
        <span className="hero-eyelid hero-eyelid--ai" />
        <span className="hero-pupil hero-pupil--ai" />
        <span className="hero-ai-scan" />
      </div>

      <div className="hero-person hero-person--human" aria-hidden="true">
        <Image
          src="/images/human-face-layer.webp"
          alt=""
          fill
          priority
          sizes="(max-width: 1023px) 46vw, 30vw"
          className="hero-person__image"
        />
        <span className="hero-human-light" />
        <span className="hero-eyelid hero-eyelid--human" />
        <span className="hero-pupil hero-pupil--human" />
      </div>

      <div className="developer-terminal" aria-label="Developer terminal initialization">
        <div className="developer-terminal__bar"><span>REACT.RUNTIME</span><b>BUILD.SUCCESS</b></div>
        <pre><code>{code}</code><i aria-hidden="true" /></pre>
      </div>

      <div className="system-panel" aria-label="Development system status">
        <span className="system-panel__title">SYSTEM.ONLINE</span>
        {metrics.map(([label, value]) => (
          <div className="system-panel__metric" key={label}>
            <span>{label}</span><strong>{value}%</strong>
            <i><b style={{ "--metric": `${value}%` }} /></i>
          </div>
        ))}
      </div>

      <div className="hero-stack-labels" aria-hidden="true">
        <span>SPRING.API</span><span>MYSQL.NODE</span><span>SUPABASE.AUTH</span><span>VERCEL.DEPLOY</span>
      </div>
    </div>
  );
}
