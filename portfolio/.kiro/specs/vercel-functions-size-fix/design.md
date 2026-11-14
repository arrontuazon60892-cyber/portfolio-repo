# Vercel Functions Size Fix Bugfix Design

## Overview

This design addresses the Vercel deployment failure caused by server functions exceeding the 250MB limit due to webpack bundling ~280MB of portfolio assets into every function. The fix involves migrating all media assets from webpack imports in src/assets/ to public/ directory structure and updating all references to use public URLs instead of direct imports.

The strategy focuses on preserving existing gallery functionality while eliminating webpack asset bundling from server-side code, ensuring all 3 oversized functions (certificates, graphic-design, school-projects) deploy successfully under the 250MB limit.

## Glossary

- **Bug_Condition (C)**: Webpack import statements that cause media assets to be bundled into server functions
- **Property (P)**: Assets served as static files from public/ directory without bundling into functions
- **Preservation**: Existing gallery, lightbox, and media display functionality that must remain unchanged
- **mediaManifest.generated.js**: The auto-generated file containing 27+ asset imports from src/assets/
- **Asset Migration**: Moving files from src/assets/ to public/assets/ and updating import references to public URLs
- **Function Size**: The uncompressed bundle size of Vercel Edge/Node.js functions that must stay under 250MB

## Bug Details

### Bug Condition

The bug manifests when webpack processes server functions that contain import statements for media assets. The webpack configuration in next.config.mjs treats all media files as bundled assets, causing every imported image and video to be included in the server function bundle.

**Formal Specification:**
```
FUNCTION isBugCondition(input)
  INPUT: input of type ImportStatement
  OUTPUT: boolean
  
  RETURN input.moduleType IN ['image', 'video']
         AND input.importPath.startsWith('src/assets/')
         AND input.isProcessedByWebpack == true
         AND input.targetEnvironment == 'server'
END FUNCTION
```

### Examples

- **mediaManifest.generated.js**: Contains `import mediaAsset0 from "../assets/GRAPHIC_DESIGN_V2/404 REALITY NOT FOUND.png"` → Bundles 200MB+ of videos and images into every function
- **projects.js**: Contains `import printflowPreview from "../assets/projects_school/mrs.png"` → Bundles project images into server functions
- **App.jsx**: Contains `import profileImage from "./assets/profile-hover.jpg"` → Bundles profile image into server functions  
- **ProfileAvatar.jsx**: Contains `import profileDark from "../assets/profile-hover.jpg"` → Duplicates profile image bundling

## Expected Behavior

### Preservation Requirements

**Unchanged Behaviors:**
- Gallery grid display with lightbox functionality must continue to work exactly as before
- Video playback in LoopingMediaCarousel components must remain unchanged
- Certificate viewing functionality must continue to display all 6 images correctly
- Project preview images must continue to display correctly in project cards
- Profile avatar display must remain unchanged
- All media categories (Graphic Design, AI Video, Commercial Videos, etc.) must function identically

**Scope:**
All media display, gallery functionality, and user interactions that do NOT involve server-side asset imports should be completely unaffected by this fix. This includes:
- Client-side image loading and display
- Lightbox opening and navigation
- Video playback controls and streaming
- Gallery grid layouts and responsive behavior

## Hypothesized Root Cause

Based on the bug description and code analysis, the root causes are:

1. **Webpack Asset Processing**: The custom webpack rule in next.config.mjs processes all media imports as bundled assets using `type: "asset/resource"`, causing them to be included in every function that imports them

2. **Import-Heavy Media Manifest**: The generated mediaManifest.generated.js contains 27+ direct import statements that pull all portfolio assets into the module bundle

3. **Direct Asset Imports**: Multiple components (App.jsx, ProfileAvatar.jsx, projects.js) use direct import statements for assets instead of public URLs

4. **Server-Side Asset Processing**: Next.js App Router processes these imports on the server side, causing assets to be bundled into function deployments rather than served as static files

## Correctness Properties

Property 1: Bug Condition - Asset Import Elimination

_For any_ media asset import where the bug condition holds (webpack processes src/assets imports for server functions), the fixed code SHALL reference the asset via public URL instead of direct import, eliminating the asset from server function bundles.

**Validates: Requirements 2.2, 2.3, 2.4, 2.5, 2.6**

Property 2: Preservation - Gallery Functionality Unchanged

_For any_ gallery interaction that does NOT involve server-side asset imports (client-side display, lightbox, video playback), the fixed code SHALL produce exactly the same visual and interactive behavior as the original code, preserving all existing media functionality.

**Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8**

## Fix Implementation

### Changes Required

Assuming our root cause analysis is correct:

**Phase 1: Asset Migration**

1. **Move Assets to Public Directory**:
   - Create `public/assets/` directory structure mirroring `src/assets/`
   - Move all files from `src/assets/GRAPHIC_DESIGN_V2/` to `public/assets/GRAPHIC_DESIGN_V2/`
   - Move all files from `src/assets/projects_school/` to `public/assets/projects_school/`
   - Move all files from `src/assets/certicate/` to `public/assets/certicate/`
   - Move all files from `src/assets/ai_video/` to `public/assets/ai_video/`
   - Move all files from `src/assets/video_commercial/` to `public/assets/video_commercial/`
   - Move `src/assets/profile-hover.jpg` to `public/assets/profile-hover.jpg`

**Phase 2: Update Media Manifest Generation**

**File**: `scripts/generate-media-manifest.mjs`

**Specific Changes**:
1. **Change Source Directory**: Update script to scan `public/assets/` instead of `src/assets/`
2. **Generate Public URLs**: Instead of generating import statements, generate public URL strings
3. **Update Output Format**: Change from `src: mediaAsset0` to `src: "/assets/GRAPHIC_DESIGN_V2/404 REALITY NOT FOUND.png"`
4. **Remove Import Statements**: Eliminate all `import mediaAssetN from "..."` statements

**Phase 3: Update Component References**

**File**: `src/data/projects.js`

**Specific Changes**:
1. **Remove Import Statements**: Remove `import printflowPreview from "../assets/projects_school/mrs.png"`
2. **Use Public URLs**: Replace with `thumbnail: "/assets/projects_school/mrs.png"`
3. **Update All Project Images**: Convert all asset imports to public URLs

**File**: `src/App.jsx`

**Specific Changes**:
1. **Remove Profile Import**: Remove `import profileImage from "./assets/profile-hover.jpg"`
2. **Update Profile Reference**: Replace `profileImage` usage with `"/assets/profile-hover.jpg"`
3. **Update Loading Assets**: Convert asset references in `loadingAssets` array to public URLs

**File**: `src/components/ProfileAvatar.jsx`

**Specific Changes**:
1. **Remove Profile Import**: Remove `import profileDark from "../assets/profile-hover.jpg"`
2. **Use Public URL**: Replace `src={profileDark}` with `src="/assets/profile-hover.jpg"`

**Phase 4: Verification**

**File**: `next.config.mjs`

**Specific Changes**:
1. **Verify Webpack Config**: Ensure the custom webpack rule only processes remaining legitimate asset imports
2. **Test Static Serving**: Verify that Next.js serves files from `public/assets/` correctly
3. **Function Size Check**: Confirm that server functions no longer bundle media assets

## Testing Strategy

### Validation Approach

The testing strategy follows a three-phase approach: first, demonstrate the bug on unfixed code by measuring function bundle sizes, then implement the fix and verify both size reduction and preserved functionality, finally confirm deployment success.

### Exploratory Bug Condition Checking

**Goal**: Measure server function bundle sizes BEFORE implementing the fix to confirm they exceed 250MB and identify which assets are being bundled.

**Test Plan**: Use Vercel's build analysis tools and webpack bundle analyzer to measure function sizes. Deploy the unfixed code to observe the "3 functions exceeded" error and examine which assets are included in the bundles.

**Test Cases**:
1. **Build Size Analysis**: Measure certificates page function size (should exceed 283MB on unfixed code)
2. **Bundle Content Analysis**: Inspect graphic-design function bundle to confirm video assets are included (will show ~200MB of videos)
3. **School Projects Function**: Measure school-projects function size (should exceed 250MB on unfixed code)  
4. **Asset Tracking**: Trace which specific assets from mediaManifest.generated.js are bundled (should find all 27+ assets)

**Expected Counterexamples**:
- Function bundles contain video files (octopus.mp4, penguin.mp4, etc.) that should be static assets
- Possible causes: webpack import processing, mediaManifest import statements, direct component imports

### Fix Checking

**Goal**: Verify that for all server functions where the bug condition held, the fixed functions produce bundles under 250MB without media assets.

**Pseudocode:**
```
FOR ALL serverFunction WHERE containsMediaImports(serverFunction) DO
  bundleSize := measureBundleSize(serverFunction_fixed)
  bundleContents := analyzeBundleContents(serverFunction_fixed)
  ASSERT bundleSize < 250MB
  ASSERT NOT containsMediaAssets(bundleContents)
END FOR
```

### Preservation Checking

**Goal**: Verify that for all gallery functionality where the bug condition does NOT hold, the fixed application produces the same visual and interactive results as the original.

**Pseudocode:**
```
FOR ALL galleryInteraction WHERE NOT isServerSideImport(galleryInteraction) DO
  ASSERT galleryBehavior_original(galleryInteraction) = galleryBehavior_fixed(galleryInteraction)
END FOR
```

**Testing Approach**: Property-based testing is recommended for preservation checking because:
- It generates many test cases automatically across different media categories
- It catches edge cases in gallery navigation and lightbox functionality
- It provides strong guarantees that visual behavior is unchanged for all media types

**Test Plan**: Capture screenshots and interaction recordings on UNFIXED code first for all gallery states, then write automated tests comparing visual output and interaction behavior.

**Test Cases**:
1. **Gallery Grid Rendering**: Verify all Graphic Design images display correctly with same layout and styling
2. **Video Playback**: Verify all AI Video and Commercial Video files play correctly with same controls
3. **Lightbox Functionality**: Verify image/video lightbox opens and navigates correctly across all categories
4. **Certificate Display**: Verify all 6 certificate images load and display with correct titles and metadata

### Unit Tests

- Test public URL generation in updated mediaManifest.generated.js
- Test project image loading with public URLs in projects.js
- Test profile avatar rendering with public URL in ProfileAvatar.jsx
- Test that mediaManifest exports contain valid public URLs

### Property-Based Tests

- Generate random media category selections and verify all assets load correctly
- Generate random gallery navigation sequences and verify consistent behavior  
- Test that all video file types (mp4, m4v, webm, mov) continue to work with public URLs
- Verify lightbox behavior across many image/video combinations

### Integration Tests

- Test full portfolio navigation through all media categories
- Test deployment to Vercel staging environment with function size verification
- Test that static asset serving works correctly for all file types
- Verify that build process completes successfully without asset import errors