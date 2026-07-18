import WorkPageShell from "../../src/components/WorkPageShell";
import MediaGallery from "../../src/components/MediaGallery";
import { certificateMedia } from "../../src/data/mediaManifest";

export const metadata = { title: "Certificates | Arron Tuazon" };

export default function CertificatesPage() {
  return <WorkPageShell eyebrow="VERIFIED CREDENTIALS" title="Certificate Vault" description="A holographic archive of completed technical programs, workshops, and professional learning." count={certificateMedia.length}><MediaGallery items={certificateMedia} direction="right" variant="certificates" title="Certificates" showToggle /></WorkPageShell>;
}
