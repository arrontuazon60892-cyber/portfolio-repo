import WorkPageShell from "../../src/components/WorkPageShell";
import MediaGallery from "../../src/components/MediaGallery";
import { graphicDesignMedia } from "../../src/data/mediaManifest";

export const metadata = { title: "Graphic Design | Arron Tuazon" };

export default function GraphicDesignPage() {
  return (
    <WorkPageShell
      eyebrow="CREATIVE VISUALS"
      title="Graphic Design"
      description="Editorial, campaign, publication, and motion work."
      count={graphicDesignMedia.length}
    >
      <MediaGallery
        items={graphicDesignMedia}
        direction="left"
        variant="creative"
        title="Graphic Design"
        showToggle
      />
    </WorkPageShell>
  );
}
