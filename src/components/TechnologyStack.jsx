import { Braces, Clapperboard, ImageIcon, Sparkles, TerminalSquare } from "lucide-react";
import { FaJava } from "react-icons/fa";
import {
  SiAnthropic,
  SiClaudecode,
  SiCursor,
  SiGit,
  SiGithub,
  SiGoogle,
  SiMetaai,
  SiMysql,
  SiNextdotjs,
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
import { VscVscode } from "react-icons/vsc";

const developmentTools = [
  ["React", SiReact], ["Next.js", SiNextdotjs], ["Vite", SiVite],
  ["TypeScript", SiTypescript], ["Tailwind CSS", SiTailwindcss], ["Java", FaJava],
  ["Spring Boot", SiSpringboot], ["REST APIs", Braces], ["MySQL", SiMysql],
  ["Supabase", SiSupabase], ["Python", SiPython], ["PHP", SiPhp], ["Git", SiGit],
  ["GitHub", SiGithub], ["Vercel", SiVercel], ["Visual Studio Code", VscVscode],
];

const creativeTools = [
  ["Google Flow", SiGoogle],
  ["CapCut", null, "capcut"],
  ["PixVerse", null, "PV"],
  ["Canva", null, "C"],
  ["TikTok Editing", SiTiktok],
  ["Meta AI", SiMetaai],
  ["Codex", TerminalSquare],
  ["Claude Code", SiClaudecode || SiAnthropic],
  ["Antigravity", null, "A/G"],
  ["Devin", null, "D"],
  ["Cursor", SiCursor],
];

export const creativeSkills = [
  ["AI-Assisted Image Editing", ImageIcon],
  ["AI-Assisted Video Editing", Clapperboard],
  ["Generative AI Content Creation", Sparkles],
  ["AI Prompt Engineering", TerminalSquare],
  ["Graphic Design", ImageIcon],
  ["Video Editing", Clapperboard],
  ["Short-Form Video Editing", SiTiktok],
  ["Visual Storytelling", Sparkles],
];

function LogoList({ items, label }) {
  return (
    <div className="logo-grid" aria-label={label}>
      {items.map(([name, Icon, mark]) => (
        <div className="logo-item" key={name}>
          <span className="logo-item__mark" aria-hidden="true">
            {Icon ? <Icon /> : <span className={`brand-glyph brand-glyph--${String(mark).toLowerCase()}`}>{mark}</span>}
          </span>
          <span>{name}</span>
        </div>
      ))}
    </div>
  );
}

export default function TechnologyStack() {
  return (
    <div className="stack-sections">
      <section className="stack-section" aria-labelledby="development-stack-title">
        <h3 id="development-stack-title">Development Stack</h3>
        <LogoList items={developmentTools} label="Development tools and technologies" />
      </section>
      <section className="stack-section" aria-labelledby="creative-tools-title">
        <h3 id="creative-tools-title">Creative Tools</h3>
        <LogoList items={creativeTools} label="Creative and AI tools" />
      </section>
      <section className="stack-section" aria-labelledby="creative-skills-title">
        <h3 id="creative-skills-title">AI Creative Skills</h3>
        <div className="creative-skill-list">
          {creativeSkills.map(([name, Icon]) => (
            <span key={name}><Icon aria-hidden="true" />{name}</span>
          ))}
        </div>
      </section>
    </div>
  );
}
