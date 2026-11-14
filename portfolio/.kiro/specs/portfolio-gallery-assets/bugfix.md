# Bugfix Requirements Document

## Introduction

The portfolio's **Work / Graphic Design V2** section displays "08 files" in the count indicator but shows a completely blank gallery with no images visible. Additionally, a new AI-generated video (0717.mp4) has been added but is not appearing in the **AI Creations** section. This affects the user experience by preventing visitors from viewing the graphic design portfolio work and the latest AI video creation.

## Bug Analysis

### Current Behavior (Defect)

1.1 WHEN accessing the Work / Graphic Design V2 page THEN the system displays "08 INDEXED ITEMS" but shows a completely blank gallery with no visible images

1.2 WHEN the media manifest is generated THEN the system does not include the new AI video file (0717.mp4) in the AI Creations section

1.3 WHEN graphic design images are loaded THEN the system fails to display any of the 8 PNG files from the GRAPHIC_DESIGN_V2 folder despite them being present in the filesystem

1.4 WHEN users navigate to the AI Creations section THEN the system does not show the newly added 0717.mp4 video file

### Expected Behavior (Correct)

2.1 WHEN accessing the Work / Graphic Design V2 page THEN the system SHALL display all 8 graphic design images in a responsive gallery grid

2.2 WHEN the media manifest is regenerated THEN the system SHALL include the new AI video file (0717.mp4) in the AI Creations section

2.3 WHEN graphic design images are loaded THEN the system SHALL render each PNG file with proper lazy loading and error handling

2.4 WHEN users navigate to the AI Creations section THEN the system SHALL display the 0717.mp4 video with controls, playsInline, and preload="metadata" attributes

2.5 WHEN users click on any graphic design image THEN the system SHALL open the image in a lightbox/modal for detailed viewing

2.6 WHEN users click on the 0717.mp4 video THEN the system SHALL allow video playback with proper controls without autoplay audio

### Unchanged Behavior (Regression Prevention)

3.1 WHEN accessing other portfolio sections (School Projects, Commercial Videos, Certificates) THEN the system SHALL CONTINUE TO display their media items correctly

3.2 WHEN the build process runs THEN the system SHALL CONTINUE TO generate optimized imports and maintain performance

3.3 WHEN images fail to load THEN the system SHALL CONTINUE TO show appropriate fallback previews

3.4 WHEN videos are displayed THEN the system SHALL CONTINUE TO use muted autoplay for previews and intersection observer for performance

3.5 WHEN the gallery modal is opened THEN the system SHALL CONTINUE TO provide navigation between items and proper accessibility attributes

3.6 WHEN media manifest generation runs THEN the system SHALL CONTINUE TO maintain existing category mappings and file type detection