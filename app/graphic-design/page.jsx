import WorkPageShell from "../../src/components/WorkPageShell";
import GraphicDesignGrid from "../../src/components/GraphicDesignGrid";
import { graphicDesignMedia } from "../../src/data/mediaManifest";

export const metadata = { title: "Graphic Design | Arron Tuazon" };

export default function GraphicDesignPage() {
  return <WorkPageShell eyebrow="CREATIVE VISUALS" title="Graphic Design" description="Editorial, campaign, publication, and motion work." count={graphicDesignMedia.length}><GraphicDesignGrid items={graphicDesignMedia} /></WorkPageShell>;
}
