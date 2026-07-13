import WorkPageShell from "../../src/components/WorkPageShell";
import VisualArchive from "../../src/components/VisualArchive";
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
      <VisualArchive items={galleryMedia} />
    </WorkPageShell>
  );
}
