import WorkPageShell from "../../src/components/WorkPageShell";
import LoopingMediaCarousel from "../../src/components/LoopingMediaCarousel";
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
      <LoopingMediaCarousel
        items={aiVideoMedia}
        direction="right"
        variant="video"
      />
    </WorkPageShell>
  );
}
