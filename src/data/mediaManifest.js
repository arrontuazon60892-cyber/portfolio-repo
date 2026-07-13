import realityPoster from "../assets/graphic_design/404 REALITY NOT FOUND.png";
import coffeePoster from "../assets/graphic_design/COFFEE.png";
import coloringCover from "../assets/graphic_design/Colorful Coloring Book Cover A4 Document.png";
import freshVideo from "../assets/graphic_design/FRESH (2).mp4";
import lemonVideo from "../assets/graphic_design/lemon slideeeeeeee.mp4";
import seolinahPoster from "../assets/graphic_design/seolinah.png";

import mrs0 from "../assets/projects_school/mrs.png";
import mrs1 from "../assets/projects_school/mrs1.png";
import mrs2 from "../assets/projects_school/mrs2.png";
import mrs3 from "../assets/projects_school/mrs3.png";
import booth0 from "../assets/projects_school/photoobooth.png";
import booth1 from "../assets/projects_school/photobooth1.png";
import booth2 from "../assets/projects_school/photobooth2.png";

import gallery0 from "../assets/gallary/burger.png";
import gallery1 from "../assets/gallary/gallary.webp";
import gallery2 from "../assets/gallary/gallary1.webp";
import gallery3 from "../assets/gallary/gallary2.webp";
import gallery4 from "../assets/gallary/gallary3.webp";

import cert0 from "../assets/certicate/Arduino For Begginners - 2025 Complete Course.jpg";
import cert1 from "../assets/certicate/Arduino Masterclass For Begginers Ai, Robotics & ChatGPT.jpg";
import cert2 from "../assets/certicate/Basics of PowerBI Pros and Cons .jpg";
import cert3 from "../assets/certicate/Chatbot using Natural Language Processing with Regex.jpg";
import cert4 from "../assets/certicate/The Road to IT Consulting Opportunities from Nothing.jpg";
import cert5 from "../assets/certicate/Transforming industries Through Technology Closing the Digital Divide for a Better Process.jpg";

export const graphicDesignMedia = [
  { id: "reality", title: "404 Reality Not Found", type: "image", src: realityPoster, category: "Concept Poster" },
  { id: "coffee", title: "Coffee Promotional Poster", type: "image", src: coffeePoster, category: "Campaign Visual" },
  { id: "coloring", title: "Colorful Coloring Book Cover", type: "image", src: coloringCover, category: "Publication Design" },
  { id: "seolinah", title: "Seolinah Editorial Poster", type: "image", src: seolinahPoster, category: "Editorial Design" },
  { id: "fresh", title: "Fresh Promotional Motion", type: "video", src: freshVideo, poster: seolinahPoster, category: "Motion Design" },
  { id: "lemon", title: "Lemon Slide Promotional Motion", type: "video", src: lemonVideo, poster: coffeePoster, category: "Video Editing" },
];

export const schoolProjectsMedia = [
  {
    id: "printflow",
    title: "PrintFlow",
    category: "Business Management System",
    description: "Sales, ordering, and inventory workflows for a local printing business.",
    tools: ["PHP", "MySQL", "Tailwind CSS"],
    status: "SYSTEM BUILD",
    cover: mrs0,
    images: [mrs0, mrs1, mrs2, mrs3],
  },
  {
    id: "photobooth",
    title: "Photobooth AC",
    category: "Web Application",
    description: "Session management and automated photo workflows for event services.",
    tools: ["React", "Vite", "Supabase"],
    status: "DEPLOYMENT READY",
    cover: booth0,
    images: [booth0, booth1, booth2],
  },
];

export const certificateMedia = [
  { id: "arduino-complete", title: "Arduino for Beginners — Complete Course", src: cert0, category: "Verified Credential" },
  { id: "arduino-ai", title: "Arduino Masterclass: AI, Robotics & ChatGPT", src: cert1, category: "Verified Credential" },
  { id: "power-bi", title: "Basics of Power BI: Pros and Cons", src: cert2, category: "Verified Credential" },
  { id: "nlp-chatbot", title: "Chatbot Using NLP with Regex", src: cert3, category: "Verified Credential" },
  { id: "it-consulting", title: "The Road to IT Consulting Opportunities", src: cert4, category: "Verified Credential" },
  { id: "digital-divide", title: "Transforming Industries Through Technology", src: cert5, category: "Verified Credential" },
];

export const galleryMedia = [
  { id: "burger", title: "Burger Campaign Archive", src: gallery0, category: "Creative Archive" },
  { id: "campus", title: "Campus Team", src: gallery1, category: "Visual Archive" },
  { id: "presentation", title: "Project Presentation", src: gallery2, category: "Visual Archive" },
  { id: "development-team", title: "Development Team", src: gallery3, category: "Visual Archive" },
  { id: "project-group", title: "Project Group", src: gallery4, category: "Visual Archive" },
];

export const mediaCounts = {
  graphicDesign: graphicDesignMedia.length,
  schoolProjectAssets: schoolProjectsMedia.reduce((total, project) => total + project.images.length, 0),
  certificates: certificateMedia.length,
  gallery: galleryMedia.length,
};
