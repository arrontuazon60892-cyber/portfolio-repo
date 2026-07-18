import WorkPageShell from "../../src/components/WorkPageShell";
import MediaGallery from "../../src/components/MediaGallery";
import { commercialVideoMedia } from "../../src/data/mediaManifest";

export const metadata = { title: "Commercial Videos | Arron Tuazon" };

export default function CommercialVideosPage() {
  return (
    <WorkPageShell
      eyebrow="COMMERCIAL EDITS"
      title="Commercial Videos"
      description="Short-form campaign videos and product-focused motion work."
      count={commercialVideoMedia.length}
    >
      <MediaGallery
        items={commercialVideoMedia}
        direction="right"
        variant="commercial"
        title="Commercial Videos"
        showToggle
      />
    </WorkPageShell>
  );
}
