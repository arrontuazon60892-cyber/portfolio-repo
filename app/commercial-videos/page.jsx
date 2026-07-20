import WorkPageShell from "../../src/components/WorkPageShell";
import PortfolioCollectionPage from "../../src/components/PortfolioCollectionPage";
import { videos } from "../../src/data/portfolioContent";

const commercials = videos.filter((item) => item.category.includes("Commercial"));

export const metadata = { title: "Short Commercial Videos | Arron Tuazon" };

export default function CommercialVideosPage() {
  return (
    <WorkPageShell eyebrow="Commercial Edits" title="Short" accent="Commercials" description="Short-form product and campaign videos created for social-first viewing." count={commercials.length} activeSection="ai-videos">
      <PortfolioCollectionPage kind="video" items={commercials} />
    </WorkPageShell>
  );
}
