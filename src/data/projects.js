import { Layers3, MonitorSmartphone, Sparkles, Workflow } from "lucide-react";
import printflowPreview from "../assets/projects_school/mrs.png";
import photoboothPreview from "../assets/projects_school/photoobooth.png";

export const projectFilters = [
  { id: "all", label: "All Systems" },
  { id: "web-development", label: "Web Applications" },
  { id: "mobile-application", label: "Mobile Applications" },
  { id: "academic-system", label: "Academic Systems" },
];

export const projects = [
  {
    id: "printflow",
    key: "printflow",
    title: "PrintFlow",
    category: "Web Application",
    categorySlug: "web-development",
    type: "web",
    description: "A sales, inventory, and ordering system for tracking business operations.",
    tools: ["Tailwind CSS", "PHP", "MySQL"],
    tags: ["Tailwind CSS", "PHP", "MySQL"],
    thumbnail: "/assets/projects_school/mrs.png",
    previewImage: "/assets/projects_school/mrs.png",
    status: "BUILD STABLE",
    icon: Layers3,
  },
  {
    id: "attendance-management-system",
    key: "attendance",
    title: "Attendance Management System",
    category: "Mobile Application",
    categorySlug: "mobile-application",
    type: "web",
    description: "A mobile attendance workflow for monitoring and managing academic records.",
    tools: ["Kotlin", "Java", "Firebase"],
    tags: ["Kotlin", "Java", "Firebase"],
    status: "ACADEMIC BUILD",
    icon: MonitorSmartphone,
  },
  {
    id: "attendex",
    key: "attendex",
    title: "Attendex",
    category: "Academic System",
    categorySlug: "academic-system",
    type: "web",
    description: "Attendance and examination management for streamlined academic operations.",
    tools: ["CSS", "PHP", "MySQL"],
    tags: ["CSS", "PHP", "MySQL"],
    status: "SYSTEM ONLINE",
    icon: Workflow,
  },
  {
    id: "photobooth-ac",
    key: "photobooth",
    title: "Photobooth AC",
    category: "Web Application",
    categorySlug: "web-development",
    type: "web",
    description: "Session tracking and automated photo processing for event services.",
    tools: ["React", "Vite", "Tailwind CSS", "Supabase"],
    tags: ["React", "Vite", "Tailwind CSS", "Supabase"],
    thumbnail: "/assets/projects_school/photoobooth.png",
    previewImage: "/assets/projects_school/photoobooth.png",
    status: "DEPLOYMENT READY",
    icon: Sparkles,
  },
];

export const schoolProjects = projects;
