import "../src/index.css";
import "../src/App.css";
import "../src/portfolio-v2.css";

export const metadata = {
  title: "Arron Tuazon | IT Specialist, AI Video Creator & Graphic Designer",
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
  themeColor: "#050713",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
