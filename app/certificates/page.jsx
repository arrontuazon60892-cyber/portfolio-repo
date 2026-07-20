import WorkPageShell from "../../src/components/WorkPageShell";
import PortfolioCollectionPage from "../../src/components/PortfolioCollectionPage";
import { certificateMedia } from "../../src/data/mediaManifest";

export const metadata = { title: "Certificates | Arron Tuazon" };

export default function CertificatesPage() {
  return (
    <WorkPageShell eyebrow="Verified Learning" title="Certificate" accent="Vault" description="Completed technical programs, workshops, and professional learning." count={certificateMedia.length} activeSection="about">
      <PortfolioCollectionPage kind="images" items={certificateMedia} />
    </WorkPageShell>
  );
}
