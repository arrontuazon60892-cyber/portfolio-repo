import Link from "next/link";
import { ArrowLeft, Cpu, Radio } from "lucide-react";

export default function WorkPageShell({ eyebrow, title, description, count, children }) {
  return (
    <main className="work-route">
      <div className="work-route__grid" aria-hidden="true" />
      <header className="work-route__header">
        <Link href="/" className="work-route__back"><ArrowLeft size={16} /> Portfolio Core</Link>
        <div className="work-route__status"><Radio size={14} /> ROUTE ONLINE</div>
      </header>
      <section className="work-route__intro">
        <span><Cpu size={14} /> {eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
        <div className="work-route__count">{String(count).padStart(2, "0")} INDEXED ITEMS</div>
      </section>
      {children}
    </main>
  );
}
