import { allMediaAssets, mediaCategories } from "./mediaManifest.generated";

const itemsFor = (id) => mediaCategories.find((category) => category.id === id)?.items || [];

export const graphicDesignMedia = itemsFor("graphic-design");
export const schoolProjectSlides = itemsFor("school-projects");
export const commercialVideoMedia = itemsFor("commercial-videos");
export const aiVideoMedia = itemsFor("ai-video");
export const certificateMedia = itemsFor("certificates");
export const galleryMedia = itemsFor("gallery");

export const mediaCounts = {
  graphicDesign: graphicDesignMedia.length,
  schoolProjectAssets: schoolProjectSlides.length,
  certificates: certificateMedia.length,
  gallery: galleryMedia.length,
  aiVideo: aiVideoMedia.length,
  commercialVideo: commercialVideoMedia.length,
};

export { allMediaAssets, mediaCategories };
