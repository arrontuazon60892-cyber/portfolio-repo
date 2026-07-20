import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Footer, Navbar, SectionHeading } from "./PortfolioHome";

export default function WorkPageShell({ eyebrow, title, accent, description, count, activeSection, children }) {
  return (
    <div className="v2-site">
      <Navbar activeSection={activeSection} />
      <main className="v2-route-main">
        <section className="v2-section v2-route-section">
          <div className="v2-container">
            <Link href="/" className="v2-route-back"><ArrowLeft size={16} /> Back to portfolio</Link>
            <SectionHeading eyebrow={eyebrow} title={title} accent={accent} description={description} />
            <div className="v2-route-count">{String(count).padStart(2, "0")} curated items</div>
            {children}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
