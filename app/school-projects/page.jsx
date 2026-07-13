import WorkPageShell from "../../src/components/WorkPageShell";
import LoopingMediaCarousel from "../../src/components/LoopingMediaCarousel";
import { schoolProjectsMedia, mediaCounts } from "../../src/data/mediaManifest";

export const metadata = { title: "School Projects | Arron Tuazon" };

export default function SchoolProjectsPage() {
  return <WorkPageShell eyebrow="ACADEMIC SYSTEMS" title="School Projects" description="Technical builds and interface studies created through academic development work." count={mediaCounts.schoolProjectAssets}><LoopingMediaCarousel items={schoolProjectsMedia} direction="right" variant="systems" /></WorkPageShell>;
}
