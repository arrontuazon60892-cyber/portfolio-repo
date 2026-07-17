import { readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const outputPath = path.join(root, "src/data/mediaManifest.generated.js");
const supported = new Set([".png", ".jpg", ".jpeg", ".jfif", ".webp", ".avif", ".gif", ".svg", ".mp4", ".m4v", ".webm", ".mov"]);
const videoExtensions = new Set([".mp4", ".m4v", ".webm", ".mov"]);
const categories = [
  { folder: "GRAPHIC_DESIGN_V2", id: "graphic-design", title: "Graphic Design", variant: "creative", direction: "left" },
  { folder: "projects_school", id: "school-projects", title: "School Projects", variant: "systems", direction: "left" },
  { folder: "project_school", id: "school-projects", title: "School Projects", variant: "systems", direction: "left", optional: true },
  // video_commercial and ai_video folders removed - videos now use external TikTok URLs
  { folder: "certicate", id: "certificates", title: "Certificates", variant: "certificates", direction: "right" },
  { folder: "certificate", id: "certificates", title: "Certificates", variant: "certificates", direction: "right", optional: true },
];

async function walk(directory) {
  let entries;
  try {
    entries = await readdir(directory, { withFileTypes: true });
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
  return (await Promise.all(entries.map((entry) => {
    const entryPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(entryPath) : [entryPath];
  }))).flat();
}

function titleFromFile(filePath) {
  return path.basename(filePath, path.extname(filePath))
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function slug(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const imports = [];
const grouped = new Map();
let assetIndex = 0;

for (const category of categories) {
  const directory = path.join(root, "src/assets", category.folder);
  const files = (await walk(directory))
    .filter((filePath) => supported.has(path.extname(filePath).toLowerCase()))
    .sort((a, b) => a.localeCompare(b));
  if (!files.length && category.optional) continue;
  const existing = grouped.get(category.id) || { ...category, items: [] };

  for (const filePath of files) {
    const identifier = `mediaAsset${assetIndex++}`;
    const extension = path.extname(filePath).toLowerCase();
    const relativeImport = path.relative(path.dirname(outputPath), filePath).replaceAll("\\", "/");
    const relativeAsset = path.relative(directory, filePath).replaceAll("\\", "/");
    imports.push(`import ${identifier} from ${JSON.stringify(relativeImport.startsWith(".") ? relativeImport : `./${relativeImport}`)};`);
    existing.items.push({
      identifier,
      id: `${category.id}-${slug(relativeAsset)}-${assetIndex}`,
      folder: category.folder,
      sourcePath: `src/assets/${category.folder}/${relativeAsset}`,
      title: titleFromFile(filePath),
      type: videoExtensions.has(extension) ? "video" : "image",
      category: category.title,
    });
  }
  grouped.set(category.id, existing);
}

// Add external video categories with TikTok URLs
grouped.set("commercial-videos", {
  id: "commercial-videos",
  folder: "video_commercial", 
  title: "Commercial Videos",
  direction: "right",
  variant: "commercial",
  items: [
    {
      id: "commercial-videos-fresh-2-mp4-16",
      folder: "video_commercial",
      sourcePath: "https://www.tiktok.com/@no0zee22/video/fresh-commercial", 
      title: "FRESH (2)",
      type: "external-video",
      src: "https://www.tiktok.com/@no0zee22/video/fresh-commercial",
      category: "Commercial Videos"
    },
    {
      id: "commercial-videos-lemon-slideeeeeeee-mp4-17",
      folder: "video_commercial", 
      sourcePath: "https://www.tiktok.com/@no0zee22/video/lemon-slide",
      title: "Lemon Slideeeeeeee", 
      type: "external-video",
      src: "https://www.tiktok.com/@no0zee22/video/lemon-slide",
      category: "Commercial Videos"
    }
  ]
});

grouped.set("ai-video", {
  id: "ai-video",
  folder: "ai_video",
  title: "AI Video Creations", 
  direction: "right",
  variant: "video",
  items: [
    {
      id: "ai-video-0717-mp4-18",
      folder: "ai_video",
      sourcePath: "https://www.tiktok.com/@no0zee22",
      title: "0717", 
      type: "external-video",
      src: "https://www.tiktok.com/@no0zee22",
      category: "AI Video Creations"
    },
    {
      id: "ai-video-final-human-mp4-19",
      folder: "ai_video", 
      sourcePath: "https://www.tiktok.com/@no0zee22",
      title: "Final Human",
      type: "external-video", 
      src: "https://www.tiktok.com/@no0zee22",
      category: "AI Video Creations"
    },
    {
      id: "ai-video-octopus-mp4-20",
      folder: "ai_video",
      sourcePath: "https://www.tiktok.com/@no0zee22", 
      title: "Octopus",
      type: "external-video",
      src: "https://www.tiktok.com/@no0zee22",
      category: "AI Video Creations"
    },
    {
      id: "ai-video-penguin-mp4-21",
      folder: "ai_video",
      sourcePath: "https://www.tiktok.com/@no0zee22",
      title: "Penguin",
      type: "external-video", 
      src: "https://www.tiktok.com/@no0zee22",
      category: "AI Video Creations"
    }
  ]
});

const categoryCode = [...grouped.values()].map((category) => {
  const items = category.items.map((item) => {
    const src = item.identifier ? item.identifier : JSON.stringify(item.src);
    return `    { id: ${JSON.stringify(item.id)}, folder: ${JSON.stringify(item.folder)}, sourcePath: ${JSON.stringify(item.sourcePath)}, title: ${JSON.stringify(item.title)}, type: ${JSON.stringify(item.type)}, src: ${src}, category: ${JSON.stringify(item.category)} }`;
  }).join(",\n");
  return `  { id: ${JSON.stringify(category.id)}, folder: ${JSON.stringify(category.folder)}, title: ${JSON.stringify(category.title)}, direction: ${JSON.stringify(category.direction)}, variant: ${JSON.stringify(category.variant)}, items: [\n${items}\n  ] }`;
}).join(",\n");

const source = `// Generated by scripts/generate-media-manifest.mjs. Do not edit by hand.\n${imports.join("\n")}\n\nexport const mediaCategories = [\n${categoryCode}\n];\n\nexport const allMediaAssets = mediaCategories.flatMap((category) => category.items);\n`;
await writeFile(outputPath, source, "utf8");

for (const category of grouped.values()) console.log(`${category.title}: ${category.items.length}`);
console.log(`Total portfolio media: ${[...grouped.values()].reduce((total, category) => total + category.items.length, 0)}`);
