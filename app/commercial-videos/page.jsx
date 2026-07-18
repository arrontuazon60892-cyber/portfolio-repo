import WorkPageShell from "../../src/components/WorkPageShell";
import LoopingMediaCarousel from "../../src/components/LoopingMediaCarousel";
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
      <LoopingMediaCarousel
        items={commercialVideoMedia}
        direction="right"
        variant="commercial"
      />
    </WorkPageShell>
  );
}
