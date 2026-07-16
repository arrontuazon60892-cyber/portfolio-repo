import { Award, Clapperboard, GraduationCap, Palette, Radio } from "lucide-react";
import { mediaCategories } from "../data/mediaManifest";

const portalIcons = {
  "graphic-design": Palette,
  "school-projects": GraduationCap,
  certificates: Award,
  "ai-video": Clapperboard,
  "commercial-videos": Clapperboard,
};

const portals = mediaCategories.map((category) => ({
  id: category.id,
  href: `#${category.id}`,
  label: category.title,
  count: category.items.length,
  icon: portalIcons[category.id],
}));

export default function ExploreWork({ onPortalClick }) {
  return (
    <section className="explore-work" aria-labelledby="explore-work-title">
      <div className="explore-work__heading">
        <span><Radio size={14} /> PORTAL DIRECTORY</span>
        <h2 id="explore-work-title">Explore My Work</h2>
      </div>
      <div className="work-portals">
        {portals.map(({ id, href, label, count, icon: Icon }, index) => (
          <a
            href={href}
            className="work-portal"
            key={href}
            style={{ "--portal-delay": `${index * 80}ms` }}
            onClick={(e) => {
              if (onPortalClick) {
                e.preventDefault();
                onPortalClick(id);
              }
            }}
          >
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
