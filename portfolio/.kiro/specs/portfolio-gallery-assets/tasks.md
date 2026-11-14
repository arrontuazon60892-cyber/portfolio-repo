# Implementation Plan

- [ ] 1. Write bug condition exploration test
  - **Property 1: Bug Condition** - Media Array Population Failure
  - **CRITICAL**: This test MUST FAIL on unfixed code - failure confirms the bug exists
  - **DO NOT attempt to fix the test or the code when it fails**
  - **NOTE**: This test encodes the expected behavior - it will validate the fix when it passes after implementation
  - **GOAL**: Surface counterexamples that demonstrate the bug exists
  - **Scoped PBT Approach**: For deterministic bugs, scope the property to the concrete failing case(s) to ensure reproducibility
  - Test that import resolution succeeds but `graphicDesignMedia.length === 8` and `aiVideoMedia` includes 0717.mp4 (from Bug Condition in design)
  - Test that `mediaCategories` contains correct structure but `itemsFor("graphic-design")` returns empty array
  - Test that generated manifest file exists and contains 8 graphic design items but export arrays are empty
  - Run test on UNFIXED code
  - **EXPECTED OUTCOME**: Test FAILS (this is correct - it proves the bug exists)
  - Document counterexamples found to understand root cause (e.g., "mediaCategories imports successfully but graphicDesignMedia.length = 0 instead of 8")
  - Mark task complete when test is written, run, and failure is documented
  - _Requirements: 1.1, 1.2, 1.3, 1.4_

- [ ] 2. Write preservation property tests (BEFORE implementing fix)
  - **Property 2: Preservation** - Non-Import Gallery Functionality
  - **IMPORTANT**: Follow observation-first methodology
  - Observe behavior on UNFIXED code for non-buggy inputs (other portfolio sections, modal behavior, build process)
  - Observe: School Projects section displays 7 images correctly on unfixed code
  - Observe: Commercial Videos section displays 2 videos correctly on unfixed code
  - Observe: Certificate section displays 6 certificates correctly on unfixed code
  - Observe: Media modal opens and navigates correctly when media exists on unfixed code
  - Write property-based tests capturing observed behavior patterns from Preservation Requirements
  - Property-based testing generates many test cases for stronger guarantees
  - Run tests on UNFIXED code
  - **EXPECTED OUTCOME**: Tests PASS (this confirms baseline behavior to preserve)
  - Mark task complete when tests are written, run, and passing on unfixed code
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6_

- [ ] 3. Fix for portfolio gallery assets import and display bug

  - [ ] 3.1 Implement the media manifest import fix
    - Investigate why `itemsFor("graphic-design")` returns empty array despite mediaCategories containing correct data
    - Check if there's a timing issue with ES module import resolution in Next.js environment
    - Verify that generated file structure matches expected `mediaCategories.find()` pattern
    - Add diagnostic logging to identify exact failure point in import chain
    - Apply the identified fix (may involve import strategy, file generation timing, or array filtering logic)
    - Ensure 0717.mp4 video appears in aiVideoMedia array after fix
    - _Bug_Condition: isBugCondition(input) where mediaCategories imports but filtered arrays are empty_
    - _Expected_Behavior: graphicDesignMedia.length === 8 AND aiVideoMedia includes 0717.mp4 from design_
    - _Preservation: All non-import functionality (modal, other sections, build process) from design_
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6_

  - [ ] 3.2 Verify bug condition exploration test now passes
    - **Property 1: Expected Behavior** - Media Array Population Success
    - **IMPORTANT**: Re-run the SAME test from task 1 - do NOT write a new test
    - The test from task 1 encodes the expected behavior
    - When this test passes, it confirms the expected behavior is satisfied
    - Run bug condition exploration test from step 1
    - **EXPECTED OUTCOME**: Test PASSES (confirms bug is fixed)
    - Verify graphicDesignMedia.length === 8 and contains all PNG files
    - Verify aiVideoMedia.length === 4 and includes 0717.mp4 video
    - Verify MediaGrid component receives populated arrays and renders gallery
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6_

  - [ ] 3.3 Verify preservation tests still pass
    - **Property 2: Preservation** - Non-Import Gallery Functionality
    - **IMPORTANT**: Re-run the SAME tests from task 2 - do NOT write new tests
    - Run preservation property tests from step 2
    - **EXPECTED OUTCOME**: Tests PASS (confirms no regressions)
    - Confirm School Projects, Commercial Videos, and Certificates sections still work correctly
    - Confirm media modal functionality remains unchanged
    - Confirm build process and performance optimizations are preserved
    - Confirm all tests still pass after fix (no regressions)

- [ ] 4. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.
  - Verify graphic design gallery displays all 8 images correctly
  - Verify AI video section includes the new 0717.mp4 video
  - Verify no regressions in other portfolio sections
  - Verify modal interactions work correctly with populated galleries