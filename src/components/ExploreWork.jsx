import { Award, Code2, GalleryHorizontal, GraduationCap, Palette, Radio } from "lucide-react";
import { mediaCounts } from "../data/mediaManifest";

const portals = [
  { href: "#projects", label: "Development Projects", count: 4, icon: Code2 },
  { href: "#graphic-design", label: "Graphic Design", count: mediaCounts.graphicDesign, icon: Palette },
  { href: "#school-projects", label: "School Projects", count: mediaCounts.schoolProjectAssets, icon: GraduationCap },
  { href: "#certificates", label: "Certificates", count: mediaCounts.certificates, icon: Award },
  { href: "#gallery", label: "Gallery", count: mediaCounts.gallery, icon: GalleryHorizontal },
];

export default function ExploreWork() {
  return (
    <section className="explore-work" aria-labelledby="explore-work-title">
      <div className="explore-work__heading">
        <span><Radio size={14} /> PORTAL DIRECTORY</span>
        <h2 id="explore-work-title">Explore My Work</h2>
      </div>
      <div className="work-portals">
        {portals.map(({ href, label, count, icon: Icon }, index) => (
          <a href={href} className="work-portal" key={href} style={{ "--portal-delay": `${index * 80}ms` }}>
            <span className="work-portal__icon"><Icon size={20} /></span>
            <span className="work-portal__copy"><b>{label}</b></span>
            <span className="work-portal__count">{String(count).padStart(2, "0")}</span>
            <i aria-hidden="true" />
          </a>
        ))}
      </div>
    </section>
  );
}
