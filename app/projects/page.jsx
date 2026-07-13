import WorkPageShell from "../../src/components/WorkPageShell";
import DevelopmentProjectsPage from "../../src/components/DevelopmentProjectsPage";
import { projects } from "../../src/data/projects";

export const metadata = { title: "Development Projects | Arron Tuazon" };

export default function ProjectsPage() {
  return <WorkPageShell eyebrow="SYSTEM BUILDS" title="Development Projects" description="Web, mobile, and academic software systems engineered around practical workflows." count={projects.length}><DevelopmentProjectsPage /></WorkPageShell>;
}
