import WorkPageShell from "../../src/components/WorkPageShell";
import PortfolioCollectionPage from "../../src/components/PortfolioCollectionPage";
import { projects } from "../../src/data/projects";

export const metadata = { title: "Development Projects | Arron Tuazon" };

export default function ProjectsPage() {
  return (
    <WorkPageShell eyebrow="Builds 04" title="Development" accent="Projects" description="Web, mobile, and academic software systems built around practical workflows." count={projects.length} activeSection="development">
      <PortfolioCollectionPage kind="projects" items={projects} />
    </WorkPageShell>
  );
}
