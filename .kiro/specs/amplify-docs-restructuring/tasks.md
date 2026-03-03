# Implementation Plan: Amplify Docs Restructuring

## Overview

Restructure the Gen2 documentation experience with a capability-first top navigation bar, section-scoped sidebars, platform boosting in search, markdown export for AI agents, and comprehensive URL redirect coverage. Gen1 remains untouched. Implementation proceeds foundation-first: data model and context, then components, then features, then content reorganization, then validation.

## Tasks

- [ ] 1. Foundation: SectionContext, CSS variables, and data model changes
  - [ ] 1.1 Create `SectionContext` React context and provider
    - Create `src/components/SectionContext/SectionContext.tsx`
    - Define `SectionContextValue` interface with `currentSection: TopNavSection | null` and `showPlatformSelector: boolean`
    - Export `SectionContext`, `SectionProvider`, and `useSectionContext` hook
    - Define `TopNavSection` interface (`label`, `routePrefix`, `hasPlatformSelector`) and `GEN2_SECTIONS` constant array with all 6 sections (Quickstart, Frontend Libraries, Build a Backend, UI Library, Hosting, Reference)
    - Implement `resolveSection(pathname: string): TopNavSection | null` that prefix-matches the current route against `GEN2_SECTIONS`
    - _Requirements: 1.1, 1.3, 1.4_

  - [ ] 1.2 Extend `PageNode` type with new fields
    - Add `section?: 'quickstart' | 'frontend' | 'backend' | 'ui' | 'hosting' | 'reference'` to the `PageNode` type definition
    - Add `relatedPages?: string[]` for cross-linking between sections
    - Add `genVersion?: 'gen1' | 'gen2' | 'both'` for version tagging
    - _Requirements: 1.7, 2.3, 6.1_

  - [ ] 1.3 Extend `RedirectEntry` type with `reason` field
    - Add `reason?: string` to the redirect entry type used by `redirects.json`
    - _Requirements: 8.9_

  - [ ] 1.4 Add CSS custom properties for TopNavBar layout
    - Define `--top-nav-height: 3rem` and `--nav-total-height: 7rem` (Gen2) in the global stylesheet
    - Add Gen1 override: `--top-nav-height: 0rem` and `--nav-total-height: 4rem`
    - Update components that use `--docs-dev-center-nav` for `top` offset (search bar, sidebar) to use `--nav-total-height`
    - _Requirements: 1.1, 1.14_

  - [ ]* 1.5 Write property test for URL-to-active-section mapping (Property 2)
    - **Property 2: URL-to-active-section mapping**
    - Generate random valid Gen2 page URLs, verify exactly one `TopNavSection` is marked active and its `routePrefix` matches the URL
    - **Validates: Requirements 1.4**

  - [ ]* 1.6 Write property test for Gen1 directory preservation (Property 5)
    - **Property 5: Gen1 directory preservation**
    - Generate random Gen1 page nodes, verify route, title, children structure, and platforms are identical before and after restructuring
    - **Validates: Requirements 1.14, 5.8**

- [ ] 2. Checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 3. TopNavBar component and Layout integration
  - [ ] 3.1 Create `TopNavBar` component
    - Create `src/components/TopNavBar/TopNavBar.tsx`
    - Implement `TopNavBarProps` interface (`sections`, `currentSection`, `isGen1`)
    - Return `null` when `isGen1` is true
    - Render `<nav>` with `role="navigation"` and `aria-label="Section navigation"`
    - Render each section as an `<a>` link with `aria-current="page"` when active
    - Apply active state underline indicator (2px, brand color) via `top-nav-item--active::after` CSS
    - Implement mobile responsive behavior: horizontal scroll with `overflow-x: auto`, hidden scrollbar, auto-scroll active item into view via `scrollIntoView({ inline: 'center', behavior: 'smooth' })`
    - Desktop breakpoint at 975px (matching existing site breakpoint)
    - _Requirements: 1.1, 1.2, 1.4, 1.12, 1.13, 1.14_

  - [ ] 3.2 Integrate `TopNavBar` and `SectionContext.Provider` into `Layout.tsx`
    - Determine current section from `router.pathname` using `resolveSection()`
    - Wrap children in `SectionContext.Provider` with resolved section value
    - Render `TopNavBar` between `GlobalNav` and `LayoutHeader` (Gen2 only, controlled by `isGen1` flag)
    - Set `--top-nav-height` CSS variable to `3rem` (Gen2) or `0rem` (Gen1) on the layout container
    - _Requirements: 1.1, 1.4, 1.14_

  - [ ]* 3.3 Write unit tests for TopNavBar
    - Verify all 6 section labels render for Gen2 pages
    - Verify Gen1 pages don't show TopNavBar (returns null)
    - Verify TopNavBar renders as a separate row below GlobalNav
    - Verify horizontal scroll container renders on mobile breakpoint
    - Verify underline indicator appears on the correct section for known URLs
    - _Requirements: 1.1, 1.2, 1.4, 1.14_

  - [ ]* 3.4 Write unit tests for SectionContext
    - Verify `SectionContext` provides correct `currentSection` and `showPlatformSelector` values for known URLs
    - Verify `showPlatformSelector` is true only for Frontend Libraries section
    - _Requirements: 1.3, 5.6_

  - [ ]* 3.5 Write unit test for CSS variable updates
    - Verify `--nav-total-height` is `7rem` for Gen2 and `4rem` for Gen1
    - Verify `--top-nav-height` is `3rem` for Gen2 and `0rem` for Gen1
    - _Requirements: 1.1, 1.14_

- [ ] 4. Modify sidebar and platform selector
  - [ ] 4.1 Modify `Menu.tsx` to accept section prop and scope sidebar
    - Accept an optional `section` prop (the current `TopNavSection`)
    - When section is provided, call `findDirectoryNode` with the section's `routePrefix` instead of the full `/[platform]` root
    - This scopes the sidebar to only show pages within the current top-nav section
    - Handle `null` from `findDirectoryNode` gracefully (render empty sidebar with message)
    - _Requirements: 1.3, 1.5, 1.6, 1.11_

  - [ ] 4.2 Modify `LayoutHeader.tsx` to consume `SectionContext`
    - Use `useSectionContext()` to get current section
    - Pass section info to `Menu` component
    - Conditionally render `PlatformNavigator` only when `showPlatformSelector` is true
    - Update `top` CSS offset from `var(--docs-dev-center-nav)` to `var(--nav-total-height)`
    - _Requirements: 1.3, 1.13, 5.6_

  - [ ] 4.3 Modify `PlatformNavigator` for conditional rendering
    - Wrap rendering in a check for `SectionContext.showPlatformSelector`
    - No structural changes to the component itself — only conditional display
    - _Requirements: 1.13, 5.6_

  - [ ]* 4.4 Write property test for section-to-sidebar mapping (Property 1)
    - **Property 1: Section-to-sidebar mapping**
    - Generate random Gen2 section + URL pairs, verify sidebar renders only pages from that section's subtree
    - **Validates: Requirements 1.3, 1.5, 1.6**

  - [ ]* 4.5 Write property test for sidebar depth limit (Property 4)
    - **Property 4: Sidebar depth limit**
    - Generate random directory subtrees, verify max nesting depth ≤ 4 levels
    - **Validates: Requirements 1.11**

  - [ ]* 4.6 Write property test for feature-based sidebar organization (Property 10)
    - **Property 10: Feature-based sidebar organization**
    - Generate random Gen2 section sidebar trees, verify no top-level children have platform names as titles
    - **Validates: Requirements 5.1**

  - [ ]* 4.7 Write property test for feature uniqueness in sidebar (Property 11)
    - **Property 11: Feature uniqueness in sidebar**
    - Generate random feature names, verify each appears as a top-level sidebar entry in at most one section
    - **Validates: Requirements 5.4**

  - [ ]* 4.8 Write property test for platform as content filter (Property 12)
    - **Property 12: Platform as content filter**
    - Generate random platform pairs, verify sidebar page routes are identical regardless of platform selection
    - **Validates: Requirements 5.2**

  - [ ]* 4.9 Write unit tests for PlatformNavigator conditional rendering
    - Verify PlatformNavigator renders in Frontend Libraries section
    - Verify PlatformNavigator is hidden in Build a Backend section
    - _Requirements: 1.13, 5.6_

  - [ ]* 4.10 Write unit test for GenSwitcher preservation
    - Verify GenSwitcher component behavior is unchanged and stays in GlobalNav row
    - _Requirements: 6.9_

  - [ ]* 4.11 Write unit test for Connect to Existing Resources
    - Verify the "Connect to Existing Resources" subsection exists in Frontend Libraries sidebar
    - _Requirements: 2.1_

- [ ] 5. Checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 6. Search improvements: platform boosting and filter chips
  - [ ] 6.1 Update DocSearch configuration in `LayoutHeader.tsx`
    - Change `facetFilters` to only include `gen` as a hard filter
    - Add `optionalFacetFilters` with current platform for boosting
    - Consume `SectionContext` to determine current section for search context
    - _Requirements: 3.2, 3.3_

  - [ ] 6.2 Create `SearchFilterChips` component
    - Create `src/components/SearchFilterChips/SearchFilterChips.tsx`
    - Implement `SearchFilterChipsProps` interface with `currentGen`, `currentPlatform`, `currentSection`, `onPlatformFilterChange`, `onSectionFilterChange`
    - Render Gen chip (always active, not toggleable)
    - Render Platform chip with three toggle states: "Prioritize {platform}" (boost/default), "Only {platform}" (hard filter), "All platforms" (no filter)
    - Render Section chips (off by default, user can toggle to add hard section filter)
    - _Requirements: 3.2, 3.4_

  - [ ] 6.3 Integrate `SearchFilterChips` into `LayoutHeader.tsx`
    - Render `SearchFilterChips` below the DocSearch input
    - Wire chip state changes to update `searchParameters` on DocSearch
    - _Requirements: 3.2_

  - [ ]* 6.4 Write property test for search platform boosting (Property 7)
    - **Property 7: Search platform boosting preserves all results**
    - Generate random search queries with platform context, verify boosted results are a superset of hard-filtered results
    - **Validates: Requirements 3.3**

  - [ ]* 6.5 Write property test for search metadata completeness (Property 6)
    - **Property 6: Search metadata completeness**
    - Generate random pages, verify search index entries have `gen`, `platform`, and `section` facets
    - **Validates: Requirements 3.1**

  - [ ]* 6.6 Write unit tests for SearchFilterChips
    - Verify filter chips render with boost/hard/none toggle for platform
    - Verify Gen chip is always active and not toggleable
    - Verify section chips toggle correctly
    - _Requirements: 3.2_

  - [ ]* 6.7 Write unit test for search optionalFacetFilters
    - Verify DocSearch config uses `optionalFacetFilters` for platform and hard `facetFilters` for gen
    - _Requirements: 3.3_

- [ ] 7. Markdown export for AI agents
  - [ ] 7.1 Create `generateMarkdownExport.mjs` build script
    - Create `tasks/generateMarkdownExport.mjs`
    - Traverse all MDX files in `src/pages/[platform]/`
    - For each file: read MDX source, extract `meta` object, strip JSX components leaving text content, preserve fenced code blocks with language annotations
    - Write frontmatter (title, section, platforms, genVersion, lastUpdated) + markdown body to output
    - Generate index file at `public/ai/llms.txt` with links to all pages
    - Generate full export at `public/ai/llms-full.txt` with all content
    - Handle MDX parsing failures gracefully (log and skip, don't fail build)
    - Handle missing frontmatter fields with fallback values from directory tree
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

  - [ ] 7.2 Integrate markdown export into build pipeline
    - Add `generateMarkdownExport.mjs` to the `yarn prebuild` script sequence
    - Ensure export regenerates on every build
    - _Requirements: 4.4_

  - [ ]* 7.3 Write property test for markdown export completeness (Property 8)
    - **Property 8: Markdown export completeness**
    - Generate random Gen2 pages, verify markdown export contains corresponding file with all required frontmatter fields
    - **Validates: Requirements 4.1, 4.2**

  - [ ]* 7.4 Write property test for markdown code block preservation (Property 9)
    - **Property 9: Markdown code block preservation**
    - Generate random MDX with fenced code blocks, verify export preserves every code block with language annotation and content
    - **Validates: Requirements 4.5**

  - [ ]* 7.5 Write unit test for markdown export of a known page
    - Verify a specific page produces correct frontmatter and content
    - _Requirements: 4.1, 4.2, 4.5_

- [ ] 8. Checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 9. Redirect validation and URL compatibility
  - [ ] 9.1 Create `validateRedirects.mjs` build script
    - Create `tasks/validateRedirects.mjs`
    - For each entry in `redirects.json`: verify target path corresponds to an existing page in `directory.json`
    - Report all broken redirect targets with descriptive error messages
    - Exit with non-zero code if any validation fails (hard build failure)
    - _Requirements: 8.5, 8.7, 8.8_

  - [ ] 9.2 Create `urlCoverageCheck.mjs` build script
    - Create `tasks/urlCoverageCheck.mjs`
    - Compare pre-restructuring URL snapshot against post-restructuring directory
    - Flag any URL present in the snapshot but absent in the new directory without a redirect entry
    - Fail build if any pre-existing URL would produce a 404
    - _Requirements: 8.1, 8.6, 8.7_

  - [ ] 9.3 Integrate redirect validation into build pipeline
    - Add `validateRedirects.mjs` and `urlCoverageCheck.mjs` to the `yarn prebuild` script sequence
    - Ensure validation runs after `generateDirectory.mjs` (needs `directory.json` output)
    - _Requirements: 8.7, 8.8_

  - [ ]* 9.4 Write property test for zero 404s (Property 17)
    - **Property 17: Zero 404s for pre-existing URLs**
    - Generate random pre-restructuring URLs, verify each either resolves to a page (200) or has a redirect entry in `redirects.json` (301)
    - **Validates: Requirements 8.1, 8.6**

  - [ ]* 9.5 Write property test for redirect entry validity (Property 18)
    - **Property 18: Redirect entry validity**
    - Generate random restructuring redirect entries, verify: status is "301", target resolves to existing page, all platform variants included, non-empty `reason` field
    - **Validates: Requirements 8.2, 8.4, 8.5, 8.8, 8.9**

  - [ ]* 9.6 Write property test for Gen1 URL preservation (Property 19)
    - **Property 19: Gen1 URL preservation**
    - Generate random `/gen1/` URLs, verify they exist unchanged post-restructuring with no redirect entry needed
    - **Validates: Requirements 8.3**

  - [ ]* 9.7 Write unit test for redirect format validation
    - Verify redirect entries have required fields (source, target, status, reason)
    - _Requirements: 8.9_

- [ ] 10. Content reorganization: directory.mjs restructuring and redirects
  - [ ] 10.1 Reorganize Gen2 subtree in `directory.mjs`
    - Add `section` property to all top-level Gen2 nodes
    - Create "Frontend Libraries" section node at `/[platform]/frontend/` containing:
      - Auth client pages (from `build-a-backend/auth/connect-your-frontend/`)
      - Data client pages (query, mutate, subscribe, optimistic-ui)
      - Storage client pages (upload, download, list, remove)
      - Analytics, Geo, PubSub, REST API client pages (from `add-aws-services/`)
      - "Connect to Existing Resources" subsection
    - Retain infrastructure-focused pages in "Build a Backend" section
    - Add `relatedPages` cross-links between split pages
    - Preserve all Gen1 subtree structure unchanged
    - _Requirements: 1.5, 1.6, 1.7, 1.8, 2.1, 5.1, 5.4_

  - [ ] 10.2 Add redirect entries to `redirects.json` for all moved pages
    - Add 301 redirect entries for every URL path that changes
    - Include all platform-specific variants for each moved page
    - Include `reason` field on every new entry
    - Cover both platform-specific paths and any framework-agnostic variants
    - _Requirements: 8.1, 8.2, 8.4, 8.9_

  - [ ]* 10.3 Write property test for cross-link integrity (Property 3)
    - **Property 3: Cross-link integrity**
    - Generate random pages with `relatedPages`, verify all links resolve to existing pages in different sections
    - **Validates: Requirements 1.8, 2.3**

  - [ ]* 10.4 Write property test for platform persistence in Frontend Libraries (Property 13)
    - **Property 13: Platform persistence in Frontend Libraries**
    - Generate random navigation sequences within Frontend Libraries, verify platform selection persists across page loads
    - **Validates: Requirements 5.7**

- [ ] 11. Gen1/Gen2 clarity: banners, notices, and version indicators
  - [ ] 11.1 Add Gen1 legacy banner to Gen1 pages
    - Ensure Gen1Banner component renders on all `/gen1/...` pages with "Gen1 (Legacy)" text
    - Include link to corresponding Gen2 page (when available)
    - Display notice for Gen1 pages with no Gen2 equivalent indicating feature status
    - _Requirements: 6.6, 6.7_

  - [ ] 11.2 Ensure Gen2 is the default experience
    - Verify that users landing without version context are routed to Gen2 documentation
    - Ensure Gen2 content appears first in navigation and search contexts
    - Preserve existing GenSwitcher component behavior unchanged
    - _Requirements: 6.2, 6.8, 6.9_

  - [ ]* 11.3 Write property test for Gen1 legacy banner presence (Property 15)
    - **Property 15: Gen1 legacy banner presence**
    - Generate random `/gen1/...` URLs, verify page includes Gen1Banner with "Gen1 (Legacy)" text and Gen2 link
    - **Validates: Requirements 6.6**

  - [ ]* 11.4 Write property test for Gen1 orphan page notice (Property 16)
    - **Property 16: Gen1 orphan page notice**
    - Generate random Gen1 pages with no Gen2 equivalent, verify notice renders indicating feature status
    - **Validates: Requirements 6.7**

  - [ ]* 11.5 Write property test for Gen1-to-Gen2 switcher links (Property 14)
    - **Property 14: Gen1-to-Gen2 switcher links**
    - Generate random Gen1 routes with Gen2 equivalents, verify GenSwitcher produces valid Gen2 page URLs
    - **Validates: Requirements 6.3**

  - [ ]* 11.6 Write unit tests for Gen1Banner rendering
    - Verify banner text and link on Gen1 pages
    - Verify banner does not render on Gen2 pages
    - _Requirements: 6.6_

  - [ ]* 11.7 Write unit test for 404 page behavior
    - Verify 404 page renders correctly for unknown URLs
    - _Requirements: 8.5_

- [ ] 12. Checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 13. Algolia search index configuration
  - [ ] 13.1 Update Algolia crawler configuration
    - Add `section` to `attributesForFaceting` in the Algolia crawler config
    - Map URL path structure to section values during indexing
    - Ensure all pages have `gen`, `platform`, and `section` facets
    - _Requirements: 3.1_

- [ ] 14. Wire everything together and final validation
  - [ ] 14.1 End-to-end wiring verification
    - Verify `Layout.tsx` correctly chains: GlobalNav → TopNavBar → LayoutHeader (with search + sidebar) → main content
    - Verify SectionContext propagates correctly to all consumers (TopNavBar, Menu, LayoutHeader, PlatformNavigator, SearchFilterChips)
    - Verify CSS variable cascade works for both Gen1 and Gen2 page layouts
    - Verify build pipeline runs in correct order: generateDirectory → urlCoverageCheck → validateRedirects → generateMarkdownExport → next build
    - _Requirements: 1.1, 1.3, 1.14_

  - [ ]* 14.2 Write integration test for build pipeline
    - Verify build completes without errors
    - Verify redirect validation passes
    - Verify markdown export is generated at `public/ai/llms.txt` and `public/ai/llms-full.txt`
    - _Requirements: 4.3, 8.7_

  - [ ]* 14.3 Write URL crawl integration test
    - Load pre-restructuring URL list and verify each URL against post-restructuring build output
    - Each URL must return either a file (200) or a redirect entry (301)
    - _Requirements: 8.6, 8.7_

- [ ] 15. Final checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Property-based tests use fast-check with minimum 100 iterations per property
- Checkpoints ensure incremental validation at logical breakpoints
- Gen1 documentation is never modified — all changes target Gen2 only
- The existing GlobalNav component is not modified
