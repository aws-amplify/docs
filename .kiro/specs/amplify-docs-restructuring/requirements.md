# Requirements Document

## Introduction

The Amplify Documentation site is a Next.js application that serves documentation for AWS Amplify across multiple platforms (React, Angular, Vue, Next.js, React Native, Swift, Flutter, Android). The site currently organizes content using framework/platform as the top-level navigation dimension (`/[platform]/...`) with separate Gen1 and Gen2 documentation trees.

Users report that Gen2 documentation is unclear and incomplete, migration guidance is missing, authentication/OAuth implementation has gaps, and code examples contain bugs. The framework-first navigation creates content silos and duplication. Frontend (client library) and backend (infrastructure) concerns are conflated within the same sections.

This spec covers restructuring the existing documentation pages to address these systemic issues. The restructuring reuses existing pages and content — it reorganizes site structure, navigation hierarchy, and content grouping rather than creating new content from scratch.

### Core Principle: Gen2 as the Redesigned Experience

This restructuring is specifically about redefining and elevating the Gen2 documentation experience. Gen1 documentation remains as-is — its structure, pages, and navigation are not being redesigned. All structural improvements, navigation redesigns, and content reorganization described in this document apply to the Gen2 documentation. Users should clearly perceive Gen2 as the modern, improved, and recommended experience. Gen1 pages serve as a reference for developers who have not yet migrated, but Gen2 is the primary focus of this restructuring effort.

## Glossary

- **Docs_Site**: The Amplify Documentation Next.js application that serves documentation at docs.amplify.aws
- **Navigation_System**: The combination of `directory.mjs`, the `Menu` component, and the `[platform]` dynamic routing that determines how users browse documentation
- **Directory_Tree**: The `directory.mjs` file that defines the hierarchical page structure and drives sidebar navigation rendering
- **Platform_Router**: The Next.js dynamic route segment `[platform]` that filters content by framework (React, Angular, Vue, Next.js, React Native, Swift, Flutter, Android)
- **Gen_Switcher**: The component and routing mechanism that allows users to toggle between Gen1 (`/gen1/[platform]/...`) and Gen2 (`/[platform]/...`) documentation
- **Backend_Section**: Documentation pages covering infrastructure and cloud resource configuration (Auth setup, Data modeling, Storage buckets, Functions) — content that describes what runs on AWS
- **Frontend_Section**: Documentation pages covering client library usage (API calls, UI components, state management) — content that describes what runs in the user's app
- **Fragment**: Reusable MDX content snippets in `src/fragments/` that are included across multiple pages to share content between platforms
- **InlineFilter**: A component that conditionally renders content based on the selected platform, used within pages to show platform-specific code samples
- **Redirect_Map**: The `redirects.json` file that maps old URL paths to new URL paths to preserve existing links after restructuring
- **Search_Index**: The Algolia-powered search configuration that indexes documentation content for the site search feature
- **Top_Navigation_Bar**: The horizontal navigation bar at the top of the Gen2 documentation site that provides direct access to major Amplify capability sections (Quickstart, Frontend Libraries, Build a Backend, UI Library, Hosting, Reference)
- **Sidebar_Navigation**: The vertical navigation panel on the left side of the page that displays the hierarchical page structure within the currently active top navigation section, driven by the Directory_Tree

## Requirements

### Requirement 1: Gen2 Navigation Redesign — Top Navigation Bar and Content Separation

**User Story:** As a developer, I want a clear top navigation bar that surfaces all Amplify capabilities at a glance with backend and frontend content clearly separated, so that I can quickly orient myself and find content matching my current task.

#### Acceptance Criteria

1. THE Top_Navigation_Bar SHALL display distinct sections for: Quickstart (Home), Frontend Libraries, Build a Backend, UI Library, Hosting, and Reference in the Gen2 experience
2. THE Docs_Site SHALL visually distinguish each top navigation section so that users can identify the scope of each area without clicking into it
3. WHEN a user selects a top navigation section, THE Docs_Site SHALL display the corresponding Sidebar_Navigation for that section, organized by feature (e.g., Auth, Data, Storage, Functions within "Build a Backend")
4. THE Docs_Site SHALL highlight the currently active top navigation section to indicate the user's location within the documentation
5. WHEN a user navigates to the "Build a Backend" section, THE Sidebar_Navigation SHALL display only Gen2 pages related to cloud resource configuration (Auth setup, Data modeling, Storage configuration, Functions, CDK constructs)
6. WHEN a user navigates to the "Frontend Libraries" section, THE Sidebar_Navigation SHALL display only Gen2 pages related to client library usage (API calls, authentication flows, data fetching, storage operations)
7. THE Directory_Tree SHALL organize existing Gen2 pages from `src/pages/[platform]/build-a-backend/` into the "Build a Backend" section and client-facing library pages into the "Frontend Libraries" section
8. WHEN a Gen2 page contains both backend configuration and frontend usage content, THE Docs_Site SHALL split the content into separate pages with cross-links between them
9. THE Docs_Site SHALL display a clear contextual label on backend and frontend sections indicating whether content covers "What runs on AWS" (backend) or "What runs in your app" (frontend)
10. WHEN a user navigates between top-level sections, THE Docs_Site SHALL maintain navigation state (e.g., sidebar scroll position) where possible
11. THE Sidebar_Navigation SHALL structure content hierarchically so that all relevant pages within a section are discoverable without excessive click depth
12. THE Docs_Site SHALL NOT include a sub-navigation row — all drill-down navigation is handled by the Sidebar_Navigation within each top-level section
13. THE Top_Navigation_Bar SHALL NOT include a global platform/framework selector — platform selection is scoped to the "Frontend Libraries" section where it is contextually relevant (see Requirement 5)
14. THE Docs_Site SHALL preserve the existing Gen1 documentation structure and navigation without modification

##### Proposed Navigation Layout

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  [Amplify Logo]   Quickstart | Frontend Libraries | Build a Backend |       │
│                   UI Library | Hosting | Reference                          │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────┐   ┌──────────────────────────────────────────────────┐     │
│  │ Sidebar Nav │   │                                                  │     │
│  │             │   │              Page Content                        │     │
│  │ ▸ Auth      │   │                                                  │     │
│  │ ▸ Data      │   │  Content structured so all data is accessible   │     │
│  │ ▸ Storage   │   │  to the user within the sidebar hierarchy.      │     │
│  │ ▸ Functions │   │                                                  │     │
│  │ ▸ AI        │   │                                                  │     │
│  │             │   │                                                  │     │
│  └─────────────┘   └──────────────────────────────────────────────────┘     │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘

When in "Frontend Libraries":
┌─────────────────┐
│ [Platform ▾]    │  ← Platform selector scoped to this section
│                 │
│ ▸ Auth          │
│ ▸ Data          │
│ ▸ Storage       │
│ ▸ Analytics     │
│ ▸ ...           │
└─────────────────┘
```

The sidebar navigation is the primary drill-down mechanism. Each top-level section (e.g., "Build a Backend") has its own sidebar tree organized by feature. Content pages must be structured so that all relevant information is reachable through the sidebar hierarchy without requiring users to navigate away from their current section.

### Requirement 2: Support Manual Infrastructure Configuration

**User Story:** As a developer using existing AWS infrastructure (CDK, Terraform, CloudFormation), I want documentation on using Amplify client libraries with my own infrastructure, so that I can adopt Amplify libraries without being forced into the Amplify backend workflow.

#### Acceptance Criteria

1. THE "Frontend Libraries" section SHALL include a "Connect to Existing Resources" subsection in its Sidebar_Navigation that documents how to configure each Amplify client library (Auth, API, Storage, Analytics) with manually provisioned AWS resources
2. WHEN a user selects the "Connect to Existing Resources" path, THE Docs_Site SHALL display configuration instructions that reference `amplify_outputs.json` manual configuration without requiring `ampx` CLI usage
3. THE Docs_Site SHALL provide cross-links from each "Build a Backend" service page to the corresponding manual configuration page in the "Frontend Libraries" section
4. WHEN a user views a backend service page, THE Docs_Site SHALL include a callout indicating that the service can also be configured manually with existing infrastructure

### Requirement 3: Improve Search Experience

**User Story:** As a developer, I want to filter search results by Gen version and framework, so that I find relevant documentation without sifting through results for other versions or platforms.

#### Acceptance Criteria

1. THE Search_Index SHALL tag each indexed page with metadata including: Gen version (Gen1, Gen2), applicable platforms, and documentation section (backend, frontend, getting-started, reference)
2. WHEN a user performs a search, THE Docs_Site SHALL display filter controls that allow narrowing results by Gen version and by platform
3. WHEN a user has a platform selected in the Platform_Router, THE Search_Index SHALL boost results matching that platform in the search ranking
4. WHEN search results are displayed, THE Docs_Site SHALL show the Gen version and section as visual badges on each result item
5. IF a search query returns zero results, THEN THE Docs_Site SHALL suggest related pages or alternative search terms

### Requirement 4: Provide Markdown Export for AI Agents

**User Story:** As a developer using AI coding assistants, I want a structured markdown export of the documentation, so that AI tools can programmatically access Amplify documentation content.

#### Acceptance Criteria

1. THE Docs_Site SHALL generate a structured markdown export of all documentation pages at build time
2. THE markdown export SHALL include frontmatter metadata on each page containing: title, section, applicable platforms, Gen version, and last-updated date
3. THE Docs_Site SHALL serve the markdown export at a well-known URL path (e.g., `/ai/llms.txt` or `/ai/llms-full.txt`)
4. WHEN the documentation is rebuilt, THE Docs_Site SHALL regenerate the markdown export to reflect current content
5. THE markdown export SHALL preserve code examples with language annotations and platform indicators

### Requirement 5: Remove Frameworks as Top-Level Navigation (Gen2)

**User Story:** As a developer, I want Gen2 documentation organized by feature rather than by framework, so that I can find content without navigating through framework-specific silos that duplicate information.

#### Acceptance Criteria

1. THE Sidebar_Navigation within each top navigation section SHALL organize content by feature (e.g., Authentication, Data, Storage, Functions, AI) rather than by framework/platform
2. THE Platform_Router SHALL function as a content filter within Gen2 feature pages rather than as a navigation organizer — platform selection filters code examples and instructions, not page visibility
3. WHEN a user selects a platform, THE Docs_Site SHALL filter code examples and platform-specific instructions within the current Gen2 page using the InlineFilter component
4. THE Directory_Tree SHALL be restructured so that each Gen2 feature appears once in the Sidebar_Navigation hierarchy, with platform-specific content handled via inline filtering rather than separate page trees
5. WHEN a feature is not available for the selected platform, THE Docs_Site SHALL display a notice indicating platform availability instead of hiding the page entirely
6. THE "Frontend Libraries" section SHALL include a platform selector (e.g., React, Vue, Angular, Next.js, React Native, Swift, Flutter, Android) within its Sidebar_Navigation or section header, allowing users to filter code examples and platform-specific instructions
7. THE platform selector SHALL persist the user's choice across pages within the "Frontend Libraries" section
8. THE Docs_Site SHALL preserve the existing Gen1 framework-based navigation structure without modification

### Requirement 6: Clarify Gen1 vs Gen2 and Provide Migration Guidance

**User Story:** As a developer on Gen1, I want clear migration paths and version indicators throughout the documentation, so that I can plan and execute my migration to Gen2 — the redesigned and recommended experience.

#### Acceptance Criteria

1. THE Docs_Site SHALL display a persistent version indicator on every page showing whether the content applies to Gen1, Gen2, or both
2. THE Docs_Site SHALL present Gen2 as the default and recommended documentation experience, with Gen2 content appearing first in all navigation and search contexts
3. WHEN a user views a Gen1 page that has a Gen2 equivalent, THE Gen_Switcher SHALL display a prominent link to the corresponding Gen2 page with a migration callout encouraging adoption
4. THE Navigation_System SHALL include a dedicated "Migration" section under Getting Started that consolidates all Gen1-to-Gen2 migration guides
5. WHEN a user views a Gen2 page for a feature that has breaking changes from Gen1, THE Docs_Site SHALL display an inline migration note describing the key differences
6. THE Docs_Site SHALL display a banner on all Gen1 pages labeling them as "Gen1 (Legacy)" and indicating that Gen2 is the current and recommended experience, with a link to the Gen2 alternative
7. IF a Gen1 page has no Gen2 equivalent, THEN THE Docs_Site SHALL display a notice indicating the feature status in Gen2 (planned, not available, or replaced by alternative)
8. WHEN a new user lands on the Docs_Site without a version context, THE Docs_Site SHALL route the user to Gen2 documentation by default
9. THE existing Gen_Switcher component SHALL be preserved as-is — the Gen1/Gen2 switching mechanism is out of scope for this restructuring and will be revisited separately

### Requirement 7: Improve Code Examples

**User Story:** As a developer, I want production-ready code examples that include error handling and edge cases, so that I can implement features correctly without discovering issues in production.

#### Acceptance Criteria

1. THE Docs_Site SHALL display code examples that include error handling patterns (try/catch, error callbacks, error state rendering) for all API operations
2. WHEN a code example demonstrates an API call, THE Docs_Site SHALL include both the success path and at least one error handling path
3. THE Docs_Site SHALL display a "Copy" button on each code example that copies the complete, runnable code snippet
4. WHEN a code example has prerequisites (imports, configuration, environment setup), THE Docs_Site SHALL display them in a collapsible "Prerequisites" section above the example
5. THE Docs_Site SHALL display a visual indicator on code examples distinguishing between "Quick Start" (minimal) and "Production" (complete with error handling) variants
6. WHEN a schema change can cause data loss, THE Docs_Site SHALL display a warning callout before the relevant code example describing the risk and mitigation steps

### Requirement 8: Maintain URL Compatibility After Restructuring (Zero-Tolerance Policy)

**User Story:** As a developer with bookmarked documentation links, I want every existing URL to continue working after the restructuring, so that I never encounter a broken link.

#### Acceptance Criteria

1. THE Redirect_Map SHALL contain entries for every single URL path that changes during the restructuring, mapping old paths to their new locations — no exceptions
2. WHEN a user visits a deprecated URL path, THE Docs_Site SHALL return an HTTP 301 redirect to the new URL path
3. THE Docs_Site SHALL preserve all existing `/gen1/` URL paths without modification to avoid breaking Gen1 documentation links
4. WHEN the restructuring moves a page to a new location, THE Redirect_Map SHALL include both the platform-specific path and any framework-agnostic path variants
5. IF a redirect target page does not exist, THEN THE Docs_Site SHALL redirect to the nearest parent section page instead of returning a 404 error
6. THE Docs_Site SHALL produce zero 404 responses for any URL that existed prior to the restructuring — this is a zero-tolerance policy
7. THE Redirect_Map SHALL be validated by automated testing that crawls all pre-restructuring URLs and verifies each one returns either a 200 or 301 response
8. WHEN a new redirect is added to the Redirect_Map, THE Docs_Site build process SHALL verify that the redirect target URL resolves to an existing page
9. THE Redirect_Map SHALL be treated as a comprehensive, auditable artifact — every URL change must be documented with the old path, new path, and reason for the change
