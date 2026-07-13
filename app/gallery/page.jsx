import WorkPageShell from "../../src/components/WorkPageShell";
import LoopingMediaCarousel from "../../src/components/LoopingMediaCarousel";
import { galleryMedia } from "../../src/data/mediaManifest";

export const metadata = { title: "Gallery | Arron Tuazon" };

export default function GalleryPage() {
  return (
    <WorkPageShell
      eyebrow="VISUAL ARCHIVE"
      title="Gallery"
      description="A cinematic archive of development milestones, teams, and selected visual moments."
      count={galleryMedia.length}
    >
      <LoopingMediaCarousel items={galleryMedia} direction="left" variant="gallery" />
    </WorkPageShell>
  );
}
