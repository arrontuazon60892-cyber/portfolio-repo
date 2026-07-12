import "../src/index.css";
import "../src/App.css";

export const metadata = {
  title: "Arron Tuazon | AI-Powered Full Stack Developer",
  description:
    "The interactive portfolio of Arron Tuazon, a full-stack developer building intelligent digital experiences.",
  metadataBase: new URL("https://arrontuazon.vercel.app"),
  openGraph: {
    title: "Arron Tuazon | AI-Powered Full Stack Developer",
    description:
      "Projects, skills, certifications, and creative work inside an immersive real-time AI interface.",
    type: "website",
    url: "/",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#04070d",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
