import { Geist } from "next/font/google";
import "../src/index.css";
import "../src/App.css";
import "../src/portfolio-v2.css";
import "../src/portfolio-light.css";
import OfflineStatus from "../src/components/OfflineStatus";
import ServiceWorkerRegister from "../src/components/ServiceWorkerRegister";
import ThemeLoader from "../src/components/ThemeLoader";

export const metadata = {
  title: "Arron Tuazon | AI Videos, Short Commercials & Graphic Design",
  description:
    "Graphic design, AI video creation, and development work by Arron Tuazon.",
  metadataBase: new URL("https://arrontuazon.vercel.app"),
  openGraph: {
    title: "Arron Tuazon | Creative Technologist Portfolio",
    description:
      "Explore graphic design, AI video creation, and development projects by Arron Tuazon.",
    type: "website",
    url: "/",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#141414",
};

const geist = Geist({ subsets: ["latin"], display: "swap" });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={geist.className}>
        <noscript><style>{`.v2-loader{display:none!important}`}</style></noscript>
        <ThemeLoader />
        <ServiceWorkerRegister />
        <OfflineStatus />
        {children}
      </body>
    </html>
  );
}
