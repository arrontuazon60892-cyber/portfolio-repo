import WorkPageShell from "../../src/components/WorkPageShell";
import CertificateVault from "../../src/components/CertificateVault";
import { certificateMedia } from "../../src/data/mediaManifest";

export const metadata = { title: "Certificates | Arron Tuazon" };

export default function CertificatesPage() {
  return <WorkPageShell eyebrow="VERIFIED CREDENTIALS" title="Certificate Vault" description="A holographic archive of completed technical programs, workshops, and professional learning." count={certificateMedia.length}><CertificateVault items={certificateMedia} /></WorkPageShell>;
}
