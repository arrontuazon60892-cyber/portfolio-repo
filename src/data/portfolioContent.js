import { projects as developmentProjects } from "./projects";

export const graphicDesigns = [
  {
    id: "smoky-burger",
    title: "Smoky Burger",
    category: "Food",
    categoryLabel: "Food Advertisement",
    src: "/assets/GRAPHIC_DESIGN_V2/graphic_design (1).png",
  },
  {
    id: "floral-mist",
    title: "Floral Mist",
    category: "Product",
    categoryLabel: "Product Poster",
    src: "/assets/GRAPHIC_DESIGN_V2/perfume.png",
  },
  {
    id: "coffee-time",
    title: "Coffee Time",
    category: "Food",
    categoryLabel: "Food Advertisement",
    src: "/assets/GRAPHIC_DESIGN_V2/graphic_design (4).png",
  },
  {
    id: "reality-not-found",
    title: "404: Reality Not Found",
    category: "Social Media",
    categoryLabel: "Social Media Design",
    src: "/assets/GRAPHIC_DESIGN_V2/404 REALITY NOT FOUND.png",
  },
  {
    id: "choco-blast",
    title: "Choco Blast",
    category: "Food",
    categoryLabel: "Food Advertisement",
    src: "/assets/GRAPHIC_DESIGN_V2/graphic_design (2).png",
  },
  {
    id: "stay-in-motion",
    title: "Stay in Motion",
    category: "Product",
    categoryLabel: "Product Poster",
    src: "/assets/GRAPHIC_DESIGN_V2/shoes.png",
  },
  {
    id: "healthy-burger",
    title: "Healthy Burger",
    category: "Food",
    categoryLabel: "Food Advertisement",
    src: "/assets/GRAPHIC_DESIGN_V2/burger.png",
  },
  {
    id: "coffee-offer",
    title: "Coffee Offer",
    category: "Food",
    categoryLabel: "Promotional Design",
    src: "/assets/GRAPHIC_DESIGN_V2/COFFEE.png",
  },
  {
    id: "crunch-burger",
    title: "Crunch Burger",
    category: "Food",
    categoryLabel: "Food Advertisement",
    src: "/assets/GRAPHIC_DESIGN_V2/graphic_design (3).png",
  },
  {
    id: "cosmetic-campaign",
    title: "Cosmetic Campaign",
    category: "Product",
    categoryLabel: "Product Poster",
    src: "/assets/GRAPHIC_DESIGN_V2/COSMETIC COSMETIC COSMETIC COSMETIC COSMETIC COSMETIC COSMETIC.png",
  },
  {
    id: "coloring-book",
    title: "Creative Coloring Book",
    category: "Branding",
    categoryLabel: "Publication Design",
    src: "/assets/GRAPHIC_DESIGN_V2/Colorful Coloring Book Cover A4 Document.png",
  },
  {
    id: "seolinah",
    title: "Seolinah",
    category: "Social Media",
    categoryLabel: "Editorial Design",
    src: "/assets/GRAPHIC_DESIGN_V2/seolinah.png",
  },
  {
    id: "windbreaker",
    title: "Windbreaker",
    category: "Product",
    categoryLabel: "Fashion Promotion",
    src: "/assets/GRAPHIC_DESIGN_V2/wiindbreaker.png",
  },
  {
    id: "gym-shirt-design-01",
    title: "Gym Shirt Design 01",
    category: "Product",
    categoryLabel: "Apparel Design",
    src: "/assets/GRAPHIC_DESIGN_V2/gymshirt1.png",
  },
  {
    id: "gym-shirt-design-02",
    title: "Gym Shirt Design 02",
    category: "Product",
    categoryLabel: "Apparel Design",
    src: "/assets/GRAPHIC_DESIGN_V2/gymshirt2.png",
  },
  {
    id: "gym-shirt-design-03",
    title: "Gym Shirt Design 03",
    category: "Product",
    categoryLabel: "Apparel Design",
    src: "/assets/GRAPHIC_DESIGN_V2/gymshirt3.png",
  },
  {
    id: "oversized-gym-shirt",
    title: "Oversized Gym Shirt",
    category: "Product",
    categoryLabel: "Apparel Design",
    src: "/assets/GRAPHIC_DESIGN_V2/Oversized Gym Shirt.png",
  },
];

export const designFilters = ["All", "Food", "Product", "Branding", "Social Media"];

export const videos = [
  {
    id: "ai-0717",
    title: "0717",
    description: "An AI-assisted cinematic visual study.",
    category: "AI Visual Story",
    src: "/assets/ai_video/0717.mp4",
  },
  {
    id: "final-human",
    title: "Final Human",
    description: "A character-led experiment in imagined futures.",
    category: "AI Short Film",
    src: "/assets/ai_video/final-human.mp4",
  },
  {
    id: "octopus",
    title: "Octopus",
    description: "An AI creature study shaped through cinematic motion.",
    category: "AI Creature Study",
    src: "/assets/ai_video/octopus.mp4",
  },
  {
    id: "penguin",
    title: "Penguin",
    description: "A playful AI-generated character sequence.",
    category: "AI Character Film",
    src: "/assets/ai_video/penguin.mp4",
  },
  {
    id: "ai-running",
    title: "AI-Generated Running Video",
    description: "A high-energy AI-generated running concept created for short-form video.",
    category: "AI Video Preview",
    src: "/assets/ai_video/running.png",
    mediaType: "image",
    platform: "tiktok",
  },
  {
    id: "hd-189733-b",
    title: "The Deadly Glass Rain of HD 189733 b",
    description: "A cinematic AI-generated video exploring the violent glass rain and extreme storms of the distant exoplanet HD 189733 b.",
    category: "AI Video Preview",
    src: "/assets/ai_video/PLANET.png",
    mediaType: "image",
    platform: "tiktok",
    tiktokUrl: "https://www.tiktok.com/@YOUR_USERNAME/video/YOUR_VIDEO_ID",
  },
  {
    id: "fresh-commercial",
    title: "Fresh",
    description: "A short-form product-focused commercial edit.",
    category: "Product Commercial",
    src: "/assets/video_commercial/FRESH (2).mp4",
  },
  {
    id: "lemon-slide",
    title: "Lemon Slide",
    description: "Bright product motion built for social-first viewing.",
    category: "Short Commercial",
    src: "/assets/video_commercial/lemon slideeeeeeee.mp4",
  },
];

export { developmentProjects };

export const academicProjects = developmentProjects
  .filter((project) => ["attendance", "attendex", "photobooth"].includes(project.id))
  .map((project) => ({
    ...project,
    image: project.previewImage || project.thumbnail,
    stack: project.tools,
    detailsUrl: "/school-projects",
  }));

export const toolGroups = [
  {
    title: "Frontend",
    tools: [
      ["HTML", "html"],
      ["CSS", "css"],
      ["JavaScript", "javascript"],
      ["TypeScript", "typescript"],
      ["React", "react"],
      ["Next.js", "next"],
      ["Tailwind CSS", "tailwind"],
    ],
  },
  {
    title: "Backend",
    tools: [
      ["PHP", "php"],
      ["Java", "java"],
      ["Spring Boot", "spring"],
      ["Python", "python"],
      ["REST APIs", "api"],
    ],
  },
  {
    title: "Database",
    tools: [
      ["MySQL", "mysql"],
      ["Supabase", "supabase"],
      ["Firebase", "firebase"],
    ],
  },
  {
    title: "Creative Tools",
    tools: [
      ["Adobe Photoshop", "photoshop"],
      ["Adobe Illustrator", "illustrator"],
      ["Adobe Premiere Pro", "premiere"],
      ["Adobe After Effects", "aftereffects"],
      ["Figma", "figma"],
      ["Canva", "canva"],
      ["CapCut", "capcut"],
    ],
  },
  {
    title: "AI Tools",
    tools: [
      ["ChatGPT", "openai"],
      ["Midjourney", "midjourney"],
      ["Runway", "runway"],
      ["Sora", "sora"],
      ["DALL-E", "dalle"],
      ["Google Flow", "google"],
      ["PixVerse", "pixverse"],
      ["Kling AI", "kling"],
      ["Luma AI", "luma"],
      ["ElevenLabs", "elevenlabs"],
      ["Meta AI", "meta"],
      ["Claude Code", "anthropic"],
      ["Codex", "codex"],
      ["Antigravity", "antigravity"],
      ["Devin", "devin"],
      ["Cursor", "cursor"],
    ],
  },
  {
    title: "Cloud / DevOps",
    tools: [
      ["Git", "git"],
      ["GitHub", "github"],
      ["Vercel", "vercel"],
    ],
  },
];

export const capabilities = [
  {
    title: "Full-Stack Development",
    description: "Responsive interfaces and practical systems built around real workflows.",
    icon: "code",
  },
  {
    title: "Graphic Design",
    description: "Clear, engaging promotional visuals and brand-ready creative work.",
    icon: "palette",
  },
  {
    title: "AI Video Creation",
    description: "Cinematic concepts shaped through AI-assisted visual storytelling.",
    icon: "video",
  },
  {
    title: "Continuous Learning",
    description: "An evolving practice across technology, design, and new creative tools.",
    icon: "sparkles",
  },
];

export const contactDetails = {
  email: "arrontuazon9@gmail.com",
  github: "https://github.com/arrontuazon60892-cyber/portfolio-repo",
  tiktok: "https://www.tiktok.com/@no0zee22?is_from_webapp=1&sender_device=pc",
};
