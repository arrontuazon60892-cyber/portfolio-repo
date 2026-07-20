import WorkPageShell from "../../src/components/WorkPageShell";
import PortfolioCollectionPage from "../../src/components/PortfolioCollectionPage";
import { schoolProjectSlides } from "../../src/data/mediaManifest";

export const metadata = { title: "Academic Projects | Arron Tuazon" };

export default function SchoolProjectsPage() {
  return (
    <WorkPageShell eyebrow="Academic Work" title="Academic" accent="Project Archive" description="Screens and interface studies from systems developed through academic work." count={schoolProjectSlides.length} activeSection="development">
      <PortfolioCollectionPage kind="images" items={schoolProjectSlides} />
    </WorkPageShell>
  );
}
