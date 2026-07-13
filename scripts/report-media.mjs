import { readdir } from "node:fs/promises";
import path from "node:path";

const folders = {
  "Graphic design": "src/assets/graphic_design",
  "School projects": "src/assets/projects_school",
  Certificates: "src/assets/certicate",
  Gallery: "src/assets/gallary",
  "AI videos": "src/assets/ai_video",
  "Commercial videos": "src/assets/video_commercial",
};

for (const [label, folder] of Object.entries(folders)) {
  const files = await readdir(path.resolve(folder), { withFileTypes: true });
  const media = files.filter((entry) => entry.isFile());
  console.log(`${label}: ${media.length}`);
}
