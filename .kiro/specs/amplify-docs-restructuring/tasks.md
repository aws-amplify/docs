# Implementation Plan: Amplify Docs Restructuring

## Overview

Incremental implementation of the Amplify documentation restructuring, organized by priority (P0 → P3 → Bonus). Each task builds on previous work, starting with core data model changes and navigation, then layering search, code examples, markdown export, and finally lower-priority features. The existing `/legacy/` infrastructure and `useIsLegacy` hook remain untouched — new features extend the system.

## Tasks

- [ ] 1. Extend data models and directory types
  - [ ] 1.1 Extend `PageMeta` interface in `src/directory/directory.d.ts`
    - Add `section`, `contentType`, `frameworks`, `crossRefs`, `genVersion`, `gen2Equivalent` fields to the `PageNode` interface
    - Add `lastUpdated` field if not already present
    - _Requirements: 1.7, 2.5, 5.1, 8.1_

  - [ ] 1.2 Create `src/data/gen1-to-gen2-map.json` mapping file
    - Define the `GenMapping` structure with `gen1Route` keys mapping to `{ gen2Route, migrationGuide? }` objects
    - Populate with initial known Gen1-to-Gen2 route mappings from the legacy directory
    - _Requirements: 8.2, 8.5_

  - [ ] 1.3 Update `meta.json` files for existing new docs pages (`src/pages/auth/`, `src/pages/data/`, `src/pages/storage/`, `src/pages/configure/`)
    - Add `section`, `contentType`, and `frameworks` fields to each `meta.json`
    - _Requirements: 1.7, 2.5_

- [ ] 2. Restructure page hierarchy for backend/frontend separation
  - [ ] 2.1 Create `src/pages/frontend/` directory with `index.mdx` and `meta.json`
    - Create the frontend landing page with overview content describing client-side libraries
    - Move or re-route existing `src/pages/auth/`, `src/pages/data/`, `src/pages/storage/` content as frontend sub-sections
    - _Requirements: 1.1, 1.2, 1.6_

  - [ ] 2.2 Create `src/pages/backend/` directory with `index.mdx` and `meta.json`
    - Create the backend landing page with overview content describing infrastructure tooling
    - Create sub-directories: `auth/`, `data/`, `storage/`, `functions/`, `hosting/` with index pages
    - _Requirements: 1.1, 1.3, 1.6_

  - [ ] 2.3 Update `src/directory/directory.mjs` with `frontend` and `backend` top-level branches
    - Add `frontend` and `backend` entries to the directory tree
    - Ensure each branch contains only its own section's children
    - _Requirements: 1.7_

  - [ ] 2.4 Update `src/directory/generateDirectory.mjs` to produce separate section subtrees
    - Ensure the generated `directory.json` contains distinct `frontend` and `backend` subtrees with no overlapping child routes
    - _Requirements: 1.7_

  - [ ]* 2.5 Write property test for section isolation in navigation (Property 1)
    - **Property 1: Section isolation in navigation**
    - Generate random directory trees with frontend/backend branches; verify sidebar menu for any `/frontend/` or `/backend/` route contains only same-section children
    - **Validates: Requirements 1.2, 1.3**

  - [ ]* 2.6 Write property test for directory generator separate section trees (Property 3)
    - **Property 3: Directory generator produces separate section trees**
    - Generate valid `directory.mjs` configs with frontend/backend entries; verify generated `directory.json` has two distinct subtrees with no overlapping routes
    - **Validates: Requirements 1.7**

- [ ] 3. Update navigation and landing page
  - [ ] 3.1 Update `src/pages/index.tsx` landing page
    - Update Overview cards to show separate entry points for Frontend Docs and Backend Docs with clear descriptions
    - Maintain existing Hosting and Legacy links
    - _Requirements: 1.6_

  - [ ] 3.2 Add cross-reference links between frontend and backend pages
    - Implement cross-reference rendering in page layout: read `crossRefs` from `meta.json` and render "Related" links to the other section
    - _Requirements: 1.4, 1.5_

  - [ ]* 3.3 Write property test for cross-reference route validity (Property 2)
    - **Property 2: Cross-reference route validity**
    - Generate random `meta.json` objects with `crossRefs` arrays; verify every route corresponds to an existing page in `directory.json`
    - **Validates: Requirements 1.4**

- [ ] 4. Checkpoint — Backend/frontend separation complete
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 5. Implement search with faceted filtering
  - [ ] 5.1 Create `src/components/Search/SearchWithFacets.tsx`
    - Wrap `@docsearch/react` with section-aware facet filtering
    - Accept `currentSection`, `currentPlatform`, and `isGen1` props
    - Build Algolia facet filters that exclude legacy content from new docs searches and scope to current section
    - _Requirements: 2.1, 2.2, 2.3_

  - [ ] 5.2 Implement search result grouping by section
    - Create `groupResultsBySection()` utility that partitions results into labeled groups
    - Display section labels in search results UI
    - _Requirements: 2.4_

  - [ ] 5.3 Wire `SearchWithFacets` into layout, replacing current DocSearch usage
    - Update `src/components/Layout/` and header components to use `SearchWithFacets`
    - Pass current section context from page metadata
    - _Requirements: 2.1, 2.2_

  - [ ] 5.4 Add legacy search banner and zero-results suggestions
    - Show "Try new docs" banner when searching from legacy section
    - Show related terms or section links when search returns zero results
    - _Requirements: 2.6, 2.7_

  - [ ] 5.5 Update Algolia indexing configuration to include new facets
    - Extend the indexing script to emit `section`, `contentType`, `frameworks`, `isLegacy`, and `gen` facets per page
    - _Requirements: 2.5, 8.4_

  - [ ]* 5.6 Write property test for search facet filter correctness (Property 4)
    - **Property 4: Search facet filter correctness**
    - Generate random search contexts (section, isLegacy combinations); verify facet filters exclude/include correctly
    - **Validates: Requirements 2.1, 2.2, 2.6**

  - [ ]* 5.7 Write property test for search result grouping (Property 5)
    - **Property 5: Search result grouping by section**
    - Generate random search result arrays with multiple sections; verify grouping partitions correctly with labels
    - **Validates: Requirements 2.4**

  - [ ]* 5.8 Write property test for Algolia index record completeness (Property 6)
    - **Property 6: Algolia index record completeness**
    - Generate random `PageMeta` objects with required fields; verify generated Algolia records include all facets
    - **Validates: Requirements 2.5, 8.4**

- [ ] 6. Enhance code example components
  - [ ] 6.1 Extend `src/components/MDXComponents/MDXCode.tsx` with new props
    - Add `bestPractice` prop that renders a "Recommended" badge
    - Add `context` prop that renders a prerequisites/context note above the code block
    - Add `warning` prop that renders a destructive operation warning label
    - Ensure copy-to-clipboard button and syntax highlighting remain functional
    - _Requirements: 3.1, 3.3, 3.5, 9.4_

  - [ ] 6.2 Create `scripts/lint-code-examples.mjs` build-time linter
    - Extract code blocks from MDX files and validate syntax using `acorn` for JS/TS and `JSON.parse` for JSON
    - Support `--strict` flag to fail the build on errors
    - Integrate into `yarn prebuild` script in `package.json`
    - _Requirements: 3.7_

  - [ ]* 6.3 Write property test for code example rendering (Property 7)
    - **Property 7: Code example rendering with optional props**
    - Generate random combinations of `bestPractice`, `context`, `warning`, and `codeString` props; verify rendered output contains expected elements
    - **Validates: Requirements 3.1, 3.3, 3.5, 9.4**

  - [ ]* 6.4 Write property test for code example syntax linter (Property 8)
    - **Property 8: Code example syntax linter**
    - Generate random valid/invalid JS/TS/JSON strings; verify linter returns zero errors for valid and at least one error for invalid
    - **Validates: Requirements 3.7**

- [ ] 7. Checkpoint — Search and code examples complete
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 8. Implement Markdown exporter
  - [ ] 8.1 Create `src/components/MarkdownExporter/MarkdownExporter.tsx`
    - Implement `htmlToMarkdown()` function that reads from the `.main` DOM element
    - Strip navigation, feedback widgets, copy buttons, and site chrome
    - Preserve headings, code blocks (with language), lists, tables, links, and `Callout` components
    - _Requirements: 4.2, 4.3, 4.6_

  - [ ] 8.2 Implement `generateFrontMatter()` and `resolveInternalLinks()` utilities
    - `generateFrontMatter()`: produce YAML front matter with title, description, section, lastUpdated
    - `resolveInternalLinks()`: convert internal relative links to absolute URLs using `docs.amplify.aws` base, leave external URLs unchanged
    - _Requirements: 4.4, 4.5_

  - [ ] 8.3 Add "Copy page as Markdown" button to new docs page layout
    - Render the button on every New_Docs page (not legacy pages)
    - Copy combined front matter + markdown to clipboard
    - Handle clipboard API unavailability with textarea fallback, then modal fallback
    - _Requirements: 4.1, 4.2_

  - [ ]* 8.4 Write property test for Markdown round-trip (Property 10)
    - **Property 10: Markdown export round-trip**
    - Generate random HTML structures with headings, code blocks, lists, tables; verify export and re-parse produces structurally equivalent content
    - **Validates: Requirements 4.3, 4.7**

  - [ ]* 8.5 Write property test for front matter completeness (Property 11)
    - **Property 11: Markdown front matter completeness**
    - Generate random `PageMeta` objects; verify `generateFrontMatter` output contains all four fields
    - **Validates: Requirements 4.4**

  - [ ]* 8.6 Write property test for internal link resolution (Property 12)
    - **Property 12: Internal link resolution to absolute URLs**
    - Generate random Markdown strings with mixed internal/external links; verify internal links become absolute and external links are unchanged
    - **Validates: Requirements 4.5**

  - [ ]* 8.7 Write property test for chrome exclusion (Property 13)
    - **Property 13: Markdown export excludes site chrome**
    - Generate random HTML with navigation/feedback elements; verify `htmlToMarkdown` output excludes them
    - **Validates: Requirements 4.6**

- [ ] 9. Checkpoint — P0 features complete
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 10. Implement framework filter with session persistence (P1)
  - [ ] 10.1 Create `src/utils/useFrameworkFilter.ts` hook
    - Implement URL query parameter `?framework=X` as highest priority source
    - Fall back to sessionStorage, then to `null` (framework-agnostic view)
    - Persist framework selection to sessionStorage on change
    - Handle sessionStorage unavailability gracefully with in-memory fallback
    - _Requirements: 6.3, 6.6_

  - [ ] 10.2 Update `src/components/InlineFilter/index.tsx` to use `useFrameworkFilter`
    - Show only content blocks matching the selected framework
    - Show shared/conceptual content when no framework is selected
    - _Requirements: 6.4, 6.5_

  - [ ] 10.3 Add framework filter UI control to new docs page layout
    - Present framework selection as a secondary filter within topic pages (not top-level nav)
    - Ensure the Navigation_System organizes by domain topic as primary level
    - _Requirements: 6.1, 6.2_

  - [ ]* 10.4 Write property test for framework filter state resolution (Property 18)
    - **Property 18: Framework filter state resolution**
    - Generate random framework values and state sources; verify URL > sessionStorage > null priority
    - **Validates: Requirements 6.3, 6.6**

  - [ ]* 10.5 Write property test for framework filter content visibility (Property 9)
    - **Property 9: Framework filter controls content visibility**
    - Generate random filter arrays and framework selections; verify only matching blocks are visible
    - **Validates: Requirements 3.8, 6.4**

- [ ] 11. Checkpoint — P1 features complete
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 12. Implement Agent SEO and AEO features (P2)
  - [ ] 12.1 Create `src/components/SEO/JsonLd.tsx` component
    - Inject `<script type="application/ld+json">` into page head for new docs pages
    - Use schema.org `TechArticle` type with title, description, url, lastUpdated, and optional codeExamples
    - Handle incomplete metadata gracefully by omitting missing optional fields
    - _Requirements: 5.1, 5.4_

  - [ ] 12.2 Create `scripts/generate-sitemap.mjs`
    - Read `directory.json` and produce `public/sitemap.xml`
    - Include one `<url>` entry per non-legacy page with `<loc>`, `<lastmod>`, and metadata attributes
    - _Requirements: 5.2_

  - [ ] 12.3 Create `scripts/generate-llms-txt.mjs`
    - Read `directory.json` and produce `public/llms.txt`
    - List all section names (frontend, backend, hosting) with entry point URLs
    - _Requirements: 5.3_

  - [ ] 12.4 Create `scripts/generate-bulk-markdown.mjs`
    - Post-build script that walks exported HTML in `client/www/next-build/`
    - Convert each new docs page to Markdown, produce a `.tar.gz` archive
    - Exclude legacy pages from the archive
    - _Requirements: 5.6_

  - [ ] 12.5 Wire JSON-LD into new docs page layout
    - Add `JsonLd` component to the layout for all New_Docs pages
    - Pass page metadata from `meta.json` and MDX front matter
    - _Requirements: 5.1_

  - [ ]* 12.6 Write property test for JSON-LD completeness (Property 14)
    - **Property 14: JSON-LD structured data completeness**
    - Generate random metadata objects; verify JSON-LD output contains all required fields
    - **Validates: Requirements 5.1**

  - [ ]* 12.7 Write property test for sitemap completeness (Property 15)
    - **Property 15: Sitemap completeness**
    - Generate random directory trees; verify sitemap has one entry per non-legacy page
    - **Validates: Requirements 5.2**

  - [ ]* 12.8 Write property test for llms.txt section coverage (Property 16)
    - **Property 16: llms.txt section coverage**
    - Generate directories with frontend/backend/hosting sections; verify output lists all sections with URLs
    - **Validates: Requirements 5.3**

  - [ ]* 12.9 Write property test for bulk Markdown export completeness (Property 17)
    - **Property 17: Bulk Markdown export completeness**
    - Generate sets of HTML pages; verify archive contains one Markdown file per new docs page, no legacy pages
    - **Validates: Requirements 5.6**

- [ ] 13. Implement Gen1/Gen2 indicators and migration support (P3)
  - [ ] 13.1 Create `src/components/GenIndicator/GenIndicator.tsx`
    - Render "Gen1", "Gen2", or "Gen1 & Gen2" badge on legacy pages based on `genVersion` metadata
    - _Requirements: 8.1_

  - [ ] 13.2 Extend `src/components/legacy/Gen1Banner/` with deprecation notices
    - Read `src/data/gen1-to-gen2-map.json` to find Gen2 equivalents
    - Render deprecation banner with direct link to Gen2 page when mapping exists
    - Render without link when no mapping exists
    - _Requirements: 8.2, 8.5_

  - [ ] 13.3 Create migration guide page at `src/pages/legacy/migration/`
    - Document breaking changes, deprecated APIs, and step-by-step upgrade instructions from Gen1 to Gen2
    - _Requirements: 8.3_

  - [ ]* 13.4 Write property test for Gen indicator correctness (Property 19)
    - **Property 19: Gen version indicator correctness**
    - Generate random `genVersion` values; verify badge text matches exactly
    - **Validates: Requirements 8.1**

  - [ ]* 13.5 Write property test for deprecation banner (Property 20)
    - **Property 20: Gen1-to-Gen2 deprecation banner**
    - Generate random gen1-to-gen2 mappings and page routes; verify banner link href matches mapped gen2Route
    - **Validates: Requirements 8.2, 8.5**

- [ ] 14. Implement custom infrastructure manual configuration docs (P3)
  - [ ] 14.1 Create manual configuration guide pages under `src/pages/frontend/`
    - Add `manual-config/` sub-directory with guides for Auth, Data, and Storage
    - Document minimum required configuration parameters for each library
    - Include configuration examples for CDK, Terraform, and CloudFormation
    - Link to relevant AWS service documentation for resource provisioning
    - _Requirements: 7.1, 7.2, 7.3, 7.4_

  - [ ] 14.2 Add dependency indicators for Amplify Backend features
    - Where a library feature requires Amplify Backend, add clear callouts indicating the dependency and the manual alternative
    - _Requirements: 7.5_

- [ ] 15. Implement safety warnings for destructive operations (Bonus)
  - [ ] 15.1 Extend `src/components/Callout/Callout.tsx` with `destructive` variant
    - Add `destructive` boolean prop with red/danger styling visually distinct from `warning` and `info`
    - _Requirements: 9.3_

  - [ ] 15.2 Add destructive warning callouts to relevant documentation pages
    - Add warnings before schema change instructions that could cause data loss
    - Add prerequisite checklists before sandbox-to-production migration steps
    - Apply consistent destructive callout across New_Docs and Legacy_Docs
    - _Requirements: 9.1, 9.2, 9.3_

  - [ ]* 15.3 Write property test for destructive warning callout styling (Property 21)
    - **Property 21: Destructive warning callout styling**
    - Render `Callout` with `destructive=true`; verify output uses danger color theme distinct from warning/info
    - **Validates: Requirements 9.3**

- [ ] 16. Final checkpoint — All features complete
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation after each priority tier
- Property tests use `fast-check` and validate universal correctness properties from the design document
- The implementation language is TypeScript/JavaScript throughout, matching the existing codebase
- All features must work with `output: 'export'` (static site) — no server runtime
