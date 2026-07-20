import WorkPageShell from "../../src/components/WorkPageShell";
import PortfolioCollectionPage from "../../src/components/PortfolioCollectionPage";
import { videos } from "../../src/data/portfolioContent";

export const metadata = {
  title: "AI Videos & Short Commercials | Arron Tuazon",
  description: "Cinematic AI-generated stories, character films, and short-form commercial content.",
};

export default function AiVideoPage() {
  return (
    <WorkPageShell eyebrow="Motion & Story" title="AI Videos &" accent="Short Commercials" description="Cinematic AI-generated stories, character films, and short-form commercial content." count={videos.length} activeSection="ai-videos">
      <PortfolioCollectionPage kind="video" items={videos} />
    </WorkPageShell>
  );
}
