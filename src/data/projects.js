import { Layers3, MonitorSmartphone, Sparkles, Workflow } from "lucide-react";

import seolinahImage from "../assets/seolinah.png";
import coloringBookImage from "../assets/Colorful Coloring Book Cover A4 Document.png";
import coffeeImage from "../assets/COFFEE.png";
import burgerImage from "../assets/gallary/burger.png";
import realityNotFoundImage from "../assets/gallary/404 REALITY NOT FOUND.png";
import freshVideo from "../assets/gallary/FRESH (2).mp4";
import lemonSlideVideo from "../assets/gallary/lemon slideeeeeeee.mp4";
import printflowPreview from "../assets/printflow.png";
import photoboothPreview from "../assets/photobooth1.png";

export const projectFilters = [
  { id: "all", label: "All" },
  { id: "web-development", label: "Web Development" },
  { id: "graphic-design", label: "Graphic Design" },
  { id: "video-editing", label: "Video Editing" },
];

export const projects = [
  {
    id: "printflow",
    key: "printflow",
    title: "PrintFlow",
    category: "Web Application",
    categorySlug: "web-development",
    type: "web",
    description:
      "A sales, inventory, and ordering management system that helps Mr. and Mrs. Prints track orders, stock, and business transactions.",
    tools: ["Tailwind CSS", "PHP", "MySQL"],
    tags: ["Tailwind CSS", "PHP", "MySQL"],
    src: printflowPreview,
    thumbnail: printflowPreview,
    previewImage: printflowPreview,
    icon: Layers3,
  },
  {
    id: "attendance-management-system",
    key: "attendance",
    title: "Attendance Management System",
    category: "Mobile Application",
    categorySlug: "web-development",
    type: "web",
    description:
      "A digital attendance tracking system designed to simplify monitoring and managing attendance records.",
    tools: ["Kotlin", "Java", "Firebase"],
    tags: ["Kotlin", "Java", "Firebase"],
    icon: MonitorSmartphone,
  },
  {
    id: "attendex",
    key: "attendex",
    title: "Attendex: Attendance and Examination Management System",
    category: "Academic Management",
    categorySlug: "web-development",
    type: "web",
    description:
      "An academic management system for tracking student attendance and managing examination records.",
    tools: ["CSS", "PHP", "MySQL"],
    tags: ["CSS", "PHP", "MySQL"],
    icon: Workflow,
  },
  {
    id: "photobooth-ac",
    key: "photobooth",
    title: "Photobooth AC",
    category: "Web Application",
    categorySlug: "web-development",
    type: "web",
    description:
      "A modern photobooth management system with session tracking, automated photo processing, and customer management for event services.",
    tools: ["React", "Vite", "Tailwind CSS", "Supabase"],
    tags: ["React", "Vite", "Tailwind CSS", "Supabase"],
    src: photoboothPreview,
    thumbnail: photoboothPreview,
    previewImage: photoboothPreview,
    icon: Sparkles,
  },
  {
    id: "seolinah-editorial-poster",
    title: "Seolinah Editorial Poster",
    category: "Graphic Design",
    categorySlug: "graphic-design",
    type: "image",
    src: seolinahImage,
    thumbnail: seolinahImage,
    description: "An editorial portrait poster with a clean, magazine-inspired composition.",
    tools: ["Canva"],
  },
  {
    id: "404-reality-not-found",
    title: "404 Reality Not Found",
    category: "Graphic Design",
    categorySlug: "graphic-design",
    type: "image",
    src: realityNotFoundImage,
    thumbnail: realityNotFoundImage,
    description: "A conceptual editorial poster built around a digital-reality theme.",
    tools: ["Canva"],
  },
  {
    id: "colorful-coloring-book-cover",
    title: "Colorful Coloring Book Cover",
    category: "Graphic Design",
    categorySlug: "graphic-design",
    type: "image",
    src: coloringBookImage,
    thumbnail: coloringBookImage,
    description: "A bright educational cover designed for a children's coloring activity book.",
    tools: ["Canva"],
  },
  {
    id: "coffee-promotional-poster",
    title: "Coffee Promotional Poster",
    category: "Graphic Design",
    categorySlug: "graphic-design",
    type: "image",
    src: coffeeImage,
    thumbnail: coffeeImage,
    description: "A product-focused promotional layout for a coffee campaign.",
    tools: ["Canva"],
  },
  {
    id: "burger-promotional-poster",
    title: "Burger Promotional Poster",
    category: "Graphic Design",
    categorySlug: "graphic-design",
    type: "image",
    src: burgerImage,
    thumbnail: burgerImage,
    description: "A bold food-promotion poster designed to highlight a featured burger offer.",
    tools: ["Canva"],
  },
  {
    id: "fresh-promotional-video",
    title: "Fresh Promotional Video",
    category: "Video Editing",
    categorySlug: "video-editing",
    type: "video",
    src: freshVideo,
    description: "A short-form promotional edit with energetic product-focused motion.",
    tools: ["Canva"],
  },
  {
    id: "lemon-slide-promotional-video",
    title: "Lemon Slide Promotional Video",
    category: "Video Editing",
    categorySlug: "video-editing",
    type: "video",
    src: lemonSlideVideo,
    description: "A bright promotional video edit built around a fresh lemon visual concept.",
    tools: ["Canva"],
  },
];

export const schoolProjects = projects.filter(
  (project) => project.categorySlug === "web-development"
);
