import { allMediaAssets, mediaCategories } from "./mediaManifest.generated.js";

const itemsFor = (id) => mediaCategories.find((category) => category.id === id)?.items || [];

export const graphicDesignMedia = itemsFor("graphic-design");
export const schoolProjectSlides = itemsFor("school-projects");
export const commercialVideoMedia = itemsFor("commercial-videos");
export const aiVideoMedia = itemsFor("ai-video");
export const certificateMedia = itemsFor("certificates");

export const mediaCounts = {
  graphicDesign: graphicDesignMedia.length,
  schoolProjectAssets: schoolProjectSlides.length,
  certificates: certificateMedia.length,
  aiVideo: aiVideoMedia.length,
  commercialVideo: commercialVideoMedia.length,
};

export { allMediaAssets, mediaCategories };
