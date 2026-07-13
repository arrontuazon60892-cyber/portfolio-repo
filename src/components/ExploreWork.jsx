import Link from "next/link";
import { Award, Code2, GalleryHorizontal, GraduationCap, Palette, Radio } from "lucide-react";
import { mediaCounts } from "../data/mediaManifest";

const portals = [
  { href: "/projects", label: "Development Projects", system: "SYSTEM BUILDS", count: 4, icon: Code2 },
  { href: "/graphic-design", label: "Graphic Design", system: "CREATIVE VISUALS", count: mediaCounts.graphicDesign, icon: Palette },
  { href: "/school-projects", label: "School Projects", system: "ACADEMIC SYSTEMS", count: mediaCounts.schoolProjectAssets, icon: GraduationCap },
  { href: "/certificates", label: "Certificates", system: "VERIFIED CREDENTIALS", count: mediaCounts.certificates, icon: Award },
  { href: "/gallery", label: "Gallery", system: "VISUAL ARCHIVE", count: mediaCounts.gallery, icon: GalleryHorizontal },
];

export default function ExploreWork() {
  return (
    <section className="explore-work" aria-labelledby="explore-work-title">
      <div className="explore-work__heading">
        <span><Radio size={14} /> PORTAL DIRECTORY</span>
        <h2 id="explore-work-title">Explore My Work</h2>
        <p>Enter a dedicated system for each part of my development and creative practice.</p>
      </div>
      <div className="work-portals">
        {portals.map(({ href, label, system, count, icon: Icon }, index) => (
          <Link href={href} className="work-portal" key={href} style={{ "--portal-delay": `${index * 80}ms` }}>
            <span className="work-portal__icon"><Icon size={20} /></span>
            <span className="work-portal__copy"><b>{label}</b><small>{system}</small></span>
            <span className="work-portal__count">{String(count).padStart(2, "0")}</span>
            <i aria-hidden="true" />
          </Link>
        ))}
      </div>
    </section>
  );
}
