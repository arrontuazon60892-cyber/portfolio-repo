import realityPoster from "../assets/graphic_design/404 REALITY NOT FOUND.png";
import burgerPoster from "../assets/graphic_design/burger.png";
import coffeePoster from "../assets/graphic_design/COFFEE.png";
import cosmeticPoster from "../assets/graphic_design/COSMETIC COSMETIC COSMETIC COSMETIC COSMETIC COSMETIC COSMETIC.png";
import coloringCover from "../assets/graphic_design/Colorful Coloring Book Cover A4 Document.png";
import seolinahPoster from "../assets/graphic_design/seolinah.png";
import shoesPoster from "../assets/graphic_design/shoes.png";
import windbreakerPoster from "../assets/graphic_design/wiindbreaker.png";

import mrs0 from "../assets/projects_school/mrs.png";
import mrs1 from "../assets/projects_school/mrs1.png";
import mrs2 from "../assets/projects_school/mrs2.png";
import mrs3 from "../assets/projects_school/mrs3.png";
import booth0 from "../assets/projects_school/photoobooth.png";
import booth1 from "../assets/projects_school/photobooth1.png";
import booth2 from "../assets/projects_school/photobooth2.png";

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

import octopusVideo from "../assets/ai_video/octopus.mp4";
import penguinVideo from "../assets/ai_video/penguin.mp4";
import finalHumanVideo from "../assets/ai_video/final-human.mp4";
import freshVideo from "../assets/video_commercial/FRESH (2).mp4";
import lemonVideo from "../assets/video_commercial/lemon slideeeeeeee.mp4";

export const graphicDesignMedia = [
  { id: "reality", folder: "graphic_design", title: "404 Reality Not Found", type: "image", src: realityPoster, category: "Concept Poster", tools: ["Canva"] },
  { id: "burger", folder: "graphic_design", type: "image", title: "Burger Promotional Poster", src: burgerPoster, category: "Campaign Visual", tools: ["Canva"] },
  { id: "coffee", folder: "graphic_design", title: "Coffee Promotional Poster", type: "image", src: coffeePoster, category: "Campaign Visual", tools: ["Canva"] },
  { id: "cosmetic", folder: "graphic_design", title: "Cosmetic Campaign", type: "image", src: cosmeticPoster, category: "Campaign Visual", tools: ["Canva"] },
  { id: "coloring", folder: "graphic_design", title: "Colorful Coloring Book Cover", type: "image", src: coloringCover, category: "Publication Design", tools: ["Canva"] },
  { id: "seolinah", folder: "graphic_design", title: "Seolinah Editorial Poster", type: "image", src: seolinahPoster, category: "Editorial Design", tools: ["Canva"] },
  { id: "shoes", folder: "graphic_design", title: "Shoes Campaign", type: "image", src: shoesPoster, category: "Campaign Visual", tools: ["Canva"] },
  { id: "windbreaker", folder: "graphic_design", title: "Windbreaker Design", type: "image", src: windbreakerPoster, category: "Campaign Visual", tools: ["Canva"] },
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

export const schoolProjectSlides = schoolProjectsMedia.flatMap((project) =>
  project.images.map((src, index) => ({
    ...project,
    id: `${project.id}-${index + 1}`,
    folder: "projects_school",
    type: "image",
    src,
    cover: src,
    title: `${project.title} · View ${index + 1}`,
  })),
);

export const certificateMedia = [
  { id: "arduino-complete", folder: "certicate", type: "image", title: "Arduino for Beginners — Complete Course", src: cert0, category: "Verified Credential" },
  { id: "arduino-ai", folder: "certicate", type: "image", title: "Arduino Masterclass: AI, Robotics & ChatGPT", src: cert1, category: "Verified Credential" },
  { id: "power-bi", folder: "certicate", type: "image", title: "Basics of Power BI: Pros and Cons", src: cert2, category: "Verified Credential" },
  { id: "nlp-chatbot", folder: "certicate", type: "image", title: "Chatbot Using NLP with Regex", src: cert3, category: "Verified Credential" },
  { id: "it-consulting", folder: "certicate", type: "image", title: "The Road to IT Consulting Opportunities", src: cert4, category: "Verified Credential" },
  { id: "digital-divide", folder: "certicate", type: "image", title: "Transforming Industries Through Technology", src: cert5, category: "Verified Credential" },
];

export const galleryMedia = [
  { id: "campus", folder: "gallary", type: "image", title: "Campus Team", src: gallery1, category: "Visual Archive" },
  { id: "presentation", folder: "gallary", type: "image", title: "Project Presentation", src: gallery2, category: "Visual Archive" },
  { id: "development-team", folder: "gallary", type: "image", title: "Development Team", src: gallery3, category: "Visual Archive" },
  { id: "project-group", folder: "gallary", type: "image", title: "Project Group", src: gallery4, category: "Visual Archive" },
];

export const aiVideoMedia = [
  { id: "octopus", folder: "ai_video", type: "video", title: "AI Octopus", src: octopusVideo, category: "AI Video Creation", tools: ["AI Video"] },
  { id: "penguin", folder: "ai_video", type: "video", title: "AI Penguin", src: penguinVideo, category: "AI Video Creation", tools: ["AI Video"] },
  { id: "final-human", folder: "ai_video", type: "video", title: "Final Human", src: finalHumanVideo, category: "AI Video Creation", tools: ["AI Video"] },
];

export const commercialVideoMedia = [
  { id: "fresh-commercial", folder: "video_commercial", type: "video", title: "Fresh Commercial", src: freshVideo, category: "Commercial Video", tools: ["CapCut"] },
  { id: "lemon-commercial", folder: "video_commercial", type: "video", title: "Lemon Commercial", src: lemonVideo, category: "Commercial Video", tools: ["CapCut"] },
];

export const mediaCategories = [
  { id: "certificates", folder: "certicate", title: "Certificates", direction: "right", variant: "certificates", items: certificateMedia },
  { id: "gallery", folder: "gallary", title: "Gallery", direction: "left", variant: "gallery", items: galleryMedia },
  { id: "graphic-design", folder: "graphic_design", title: "Graphic Design", direction: "right", variant: "creative", items: graphicDesignMedia },
  { id: "school-projects", folder: "projects_school", title: "School Projects", direction: "left", variant: "systems", items: schoolProjectSlides },
  { id: "ai-video", folder: "ai_video", title: "AI Video Creations", direction: "right", variant: "video", items: aiVideoMedia },
  { id: "commercial-videos", folder: "video_commercial", title: "Commercial Videos", direction: "left", variant: "commercial", items: commercialVideoMedia },
];

export const mediaCounts = {
  graphicDesign: graphicDesignMedia.length,
  schoolProjectAssets: schoolProjectsMedia.reduce((total, project) => total + project.images.length, 0),
  certificates: certificateMedia.length,
  gallery: galleryMedia.length,
  aiVideo: aiVideoMedia.length,
  commercialVideo: commercialVideoMedia.length,
};
