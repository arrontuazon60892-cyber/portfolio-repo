import "../src/index.css";
import "../src/App.css";

export const metadata = {
  title: "Arron Tuazon | Full-Stack Developer & AI Creative Specialist",
  description:
    "The minimalist portfolio of Arron Tuazon, a full-stack developer and AI creative specialist.",
  metadataBase: new URL("https://arrontuazon.vercel.app"),
  openGraph: {
    title: "Arron Tuazon | Full-Stack Developer & AI Creative Specialist",
    description:
      "Development projects, creative work, certificates, and contact details in a clean black-and-white portfolio.",
    type: "website",
    url: "/",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#020202",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
