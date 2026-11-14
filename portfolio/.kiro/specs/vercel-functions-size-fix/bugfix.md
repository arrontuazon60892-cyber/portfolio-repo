# Bugfix Requirements Document

## Introduction

This document specifies requirements for fixing Vercel deployment failures caused by server functions exceeding the 250MB uncompressed size limit. The bug occurs when webpack bundles all portfolio assets (~280MB of videos, images, and media files) into every server function, causing certificates, graphic-design, and school-projects pages to fail deployment despite successful local builds.

## Bug Analysis

### Current Behavior (Defect)

1.1 WHEN deploying to Vercel THEN the system fails with "3 functions exceeded the uncompressed maximum size of 250 MB"

1.2 WHEN webpack processes server functions THEN the system bundles ALL portfolio assets into EVERY function

1.3 WHEN mediaManifest.generated.js contains import statements THEN the system includes ~200MB of video files in server bundles

1.4 WHEN projects.js contains direct asset imports THEN the system includes project images in server bundles

1.5 WHEN App.jsx and ProfileAvatar.jsx import profile images THEN the system includes profile assets in server bundles

1.6 WHEN functions are generated for certificates, graphic-design, and school-projects pages THEN each function exceeds 283MB due to bundled assets

### Expected Behavior (Correct)

2.1 WHEN deploying to Vercel THEN the system SHALL successfully deploy all functions under 250MB limit

2.2 WHEN webpack processes server functions THEN the system SHALL exclude media assets from server bundles

2.3 WHEN media assets are needed THEN the system SHALL serve them from public/ directory as static files

2.4 WHEN mediaManifest.generated.js is processed THEN the system SHALL reference public URLs instead of importing assets

2.5 WHEN projects.js references assets THEN the system SHALL use public URLs instead of direct imports

2.6 WHEN App.jsx and ProfileAvatar.jsx need profile images THEN the system SHALL reference public URLs instead of importing assets

### Unchanged Behavior (Regression Prevention)

3.1 WHEN users view the gallery functionality THEN the system SHALL CONTINUE TO display all Graphic Design V2 images correctly

3.2 WHEN users view AI creations THEN the system SHALL CONTINUE TO play all 4 AI videos correctly

3.3 WHEN users view certificates THEN the system SHALL CONTINUE TO display all 6 certificate images correctly

3.4 WHEN users view school projects THEN the system SHALL CONTINUE TO display all project screenshots correctly

3.5 WHEN users view commercial videos THEN the system SHALL CONTINUE TO play both commercial videos correctly

3.6 WHEN lightbox components are used THEN the system SHALL CONTINUE TO function with proper image/video loading

3.7 WHEN profile images are displayed THEN the system SHALL CONTINUE TO show profile-hover.jpg correctly

3.8 WHEN the application runs locally THEN the system SHALL CONTINUE TO build and function identically