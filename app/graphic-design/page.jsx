import WorkPageShell from "../../src/components/WorkPageShell";
import PortfolioCollectionPage from "../../src/components/PortfolioCollectionPage";
import { graphicDesigns } from "../../src/data/portfolioContent";

export const metadata = { title: "Graphic Design | Arron Tuazon" };

export default function GraphicDesignPage() {
  return (
    <WorkPageShell eyebrow="Featured Work" title="All" accent="Graphic Designs" description="A complete collection of product, food, editorial, and promotional creative work." count={graphicDesigns.length} activeSection="graphic-design">
      <PortfolioCollectionPage kind="design" items={graphicDesigns} />
    </WorkPageShell>
  );
}
