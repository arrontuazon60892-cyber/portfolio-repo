import WorkPageShell from "../../src/components/WorkPageShell";
import MediaGallery from "../../src/components/MediaGallery";
import { aiVideoMedia } from "../../src/data/mediaManifest";

export const metadata = { title: "AI Video Creations | Arron Tuazon" };

export default function AiVideoPage() {
  return (
    <WorkPageShell
      eyebrow="AI MOTION"
      title="AI Video Creations"
      description="Generated and AI-assisted visual experiments for cinematic motion."
      count={aiVideoMedia.length}
    >
      <MediaGallery
        items={aiVideoMedia}
        direction="right"
        variant="video"
        title="AI Video Creations"
        showToggle
      />
    </WorkPageShell>
  );
}
