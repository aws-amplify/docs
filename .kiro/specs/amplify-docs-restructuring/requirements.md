# Requirements Document

## Introduction

The Amplify Documentation Restructuring is a comprehensive initiative to address systemic issues identified in the December 2025 Feedback Analysis. The current documentation structure reflects the product's evolution rather than user mental models, resulting in unclear Gen2 documentation, missing migration guidance, search failures, and content duplication across framework silos.

Foundational work has already been completed: all existing docs have been moved under a `/legacy/` URL prefix, legacy-only components have been separated into `src/components/legacy/`, a new top-level page structure (auth, configure, data, storage) has been created, and a dual-mode rendering system with a `useIsLegacy` hook is in place. A new landing page with Overview cards linking to frontend libraries, backend tooling, and hosting sections is live.

This requirements document covers the prioritized restructuring proposals (P0 through P3) to transform the documentation into a user-centric, searchable, AI-friendly resource.

## Glossary

- **Documentation_Site**: The Next.js-based Amplify documentation web application (`amplify-docs`), built with MDX, SCSS, and TypeScript
- **Legacy_Docs**: All existing documentation pages served under the `/legacy/` URL prefix, encompassing both Gen1 and Gen2 content in the previous structure
- **New_Docs**: The restructured documentation pages served from the new top-level page structure (outside `/legacy/`), organized by domain (auth, data, storage, configure)
- **Frontend_Docs**: Documentation covering Amplify client-side libraries (Amplify JS, Amplify UI) used within web and mobile applications
- **Backend_Docs**: Documentation covering Amplify server-side and infrastructure tooling (Amplify CLI, Amplify Backend, CDK constructs)
- **Search_System**: The documentation search functionality, currently powered by Algolia, responsible for indexing and returning search results
- **Code_Example**: A code snippet embedded in documentation pages that demonstrates usage of Amplify APIs, libraries, or configurations
- **Markdown_Exporter**: A feature that generates downloadable Markdown representations of documentation pages for consumption by AI tools and agents
- **Navigation_System**: The site-wide navigation structure including the global nav, sidebar menu, and breadcrumbs that guide users through documentation
- **Directory_Generator**: The build-time system (`src/directory/`) that generates the navigation tree and page metadata from the file system structure
- **Content_Author**: A documentation contributor who writes or edits MDX content pages
- **Developer_User**: A software developer consuming the Amplify documentation to build applications
- **AEO_System**: Agent Engine Optimization system that structures documentation for discoverability by AI engines and LLM-based tools
- **Framework_Filter**: A UI mechanism that allows users to view framework-specific code examples without changing the page or navigation context

## Requirements

### Requirement 1: Backend and Frontend Documentation Separation (P0)

**User Story:** As a Developer_User, I want backend infrastructure documentation separated from frontend library documentation, so that I can find guidance relevant to my current task without navigating unrelated concepts.

#### Acceptance Criteria

1. THE Documentation_Site SHALL present Frontend_Docs and Backend_Docs as distinct top-level sections in the Navigation_System
2. WHEN a Developer_User navigates to the Frontend_Docs section, THE Documentation_Site SHALL display only client-side library content (Amplify JS, Amplify UI) without requiring navigation through backend infrastructure concepts
3. WHEN a Developer_User navigates to the Backend_Docs section, THE Documentation_Site SHALL display only infrastructure and server-side tooling content (Amplify CLI, Amplify Backend, CDK) without requiring navigation through frontend library concepts
4. THE Documentation_Site SHALL provide cross-reference links between Frontend_Docs and Backend_Docs pages where a concept spans both domains
5. WHEN a page in Frontend_Docs references a backend resource (e.g., an Auth configuration), THE Documentation_Site SHALL link to the corresponding Backend_Docs page rather than duplicating the backend content
6. THE New_Docs landing page SHALL display separate entry points for Frontend_Docs and Backend_Docs with clear descriptions of what each section covers
7. THE Directory_Generator SHALL produce separate navigation trees for Frontend_Docs and Backend_Docs sections

### Requirement 2: Search Experience Improvement (P0)

**User Story:** As a Developer_User, I want search results that are relevant, filterable, and scoped to the documentation version I am using, so that I can find answers without sifting through outdated or irrelevant content.

#### Acceptance Criteria

1. THE Search_System SHALL exclude Legacy_Docs pages from search results by default when a Developer_User searches from the New_Docs section
2. WHEN a Developer_User performs a search, THE Search_System SHALL return results ranked by relevance to the current documentation section (Frontend_Docs or Backend_Docs)
3. THE Search_System SHALL provide filter controls that allow a Developer_User to narrow results by documentation section (Frontend, Backend, Hosting), content type (guide, API reference, tutorial), and framework
4. WHEN a search query matches content in both Frontend_Docs and Backend_Docs, THE Search_System SHALL group results by section with clear section labels
5. THE Search_System SHALL index New_Docs pages with structured metadata including section, content type, framework applicability, and keywords
6. WHEN a Developer_User searches from the Legacy_Docs section, THE Search_System SHALL scope results to Legacy_Docs content and display a banner suggesting the Developer_User try the New_Docs search
7. IF a search query returns zero results, THEN THE Search_System SHALL suggest related terms or link to the most relevant documentation section

### Requirement 3: Code Example Quality Improvement (P0)

**User Story:** As a Developer_User, I want code examples that are correct, complete, and follow best practices, so that I can confidently use them as a starting point for my implementation.

#### Acceptance Criteria

1. THE Documentation_Site SHALL display each Code_Example with explicit context indicating when the approach is appropriate and any prerequisites
2. THE Documentation_Site SHALL include error handling in every Code_Example that involves asynchronous operations, API calls, or resource access
3. THE Documentation_Site SHALL display a "best practice" indicator on Code_Example blocks that demonstrate the recommended approach for a given use case
4. WHEN a Code_Example has multiple valid approaches, THE Documentation_Site SHALL present each approach with a description of the trade-offs
5. THE Documentation_Site SHALL render each Code_Example with a copy-to-clipboard button and syntax highlighting appropriate to the language
6. WHEN a Code_Example references configuration or setup steps, THE Documentation_Site SHALL link to the relevant prerequisite documentation
7. THE Documentation_Site SHALL provide a linting or validation mechanism in the build pipeline that checks Code_Example blocks for syntax correctness
8. IF a Code_Example is framework-specific, THEN THE Documentation_Site SHALL display the Code_Example only when the corresponding framework is selected via the Framework_Filter

### Requirement 4: Markdown Export for AI Agents (P0)

**User Story:** As a Developer_User, I want to export any documentation page as Markdown, so that I can feed accurate and current Amplify documentation to AI coding assistants.

#### Acceptance Criteria

1. THE Documentation_Site SHALL display a "Copy page as Markdown" control on every New_Docs page
2. WHEN a Developer_User activates the "Copy page as Markdown" control, THE Markdown_Exporter SHALL copy a Markdown representation of the current page content to the clipboard
3. THE Markdown_Exporter SHALL produce valid Markdown that preserves headings, code blocks, lists, tables, links, and callout structures from the source MDX page
4. THE Markdown_Exporter SHALL include front matter metadata (title, description, section, last updated date) at the top of the exported Markdown
5. THE Markdown_Exporter SHALL convert internal documentation links to absolute URLs in the exported Markdown
6. THE Markdown_Exporter SHALL exclude navigation elements, feedback widgets, and site chrome from the exported Markdown
7. FOR ALL valid New_Docs pages, exporting to Markdown and then parsing the Markdown back SHALL produce content equivalent to the original page content (round-trip property)

### Requirement 5: Agent SEO and AI Engine Discoverability (P2)

**User Story:** As a Developer_User, I want AI engines to surface accurate Amplify documentation when I ask coding questions, so that I receive correct guidance without visiting the documentation site directly.

#### Acceptance Criteria

1. THE Documentation_Site SHALL include structured data (JSON-LD schema) on every New_Docs page with page title, description, code examples, and last updated date
2. THE Documentation_Site SHALL generate a machine-readable sitemap that includes all New_Docs pages with metadata about content type and section
3. THE Documentation_Site SHALL serve an `llms.txt` file at the site root that provides an index of documentation sections, their purposes, and entry point URLs
4. WHEN a New_Docs page contains a Code_Example, THE Documentation_Site SHALL wrap the Code_Example in semantic markup that AI engines can extract and attribute
5. THE Documentation_Site SHALL use terminology in page titles and headings that matches common developer search queries and AI prompt patterns rather than internal AWS product naming
6. THE Documentation_Site SHALL provide a bulk Markdown export endpoint that serves all New_Docs content in a structured archive for AI training and retrieval pipelines

### Requirement 6: Remove Frameworks as Top-Level Navigation (P1)

**User Story:** As a Developer_User, I want to navigate documentation by topic rather than by framework, so that I can discover cross-framework patterns and find content regardless of which framework I use.

#### Acceptance Criteria

1. THE Navigation_System SHALL organize New_Docs pages by domain topic (Authentication, Data, Storage, Hosting, Configure) as the primary navigation level
2. THE Navigation_System SHALL present framework selection as a secondary filter within topic pages rather than as a top-level navigation choice
3. WHEN a Developer_User selects a framework via the Framework_Filter, THE Documentation_Site SHALL persist the selection across page navigations within the same session
4. WHEN a documentation page contains framework-specific content, THE Documentation_Site SHALL display only the content relevant to the selected framework while keeping shared content visible
5. THE Documentation_Site SHALL default to a framework-agnostic view that shows conceptual content applicable to all frameworks when no framework is selected
6. WHEN a Developer_User shares a URL that includes a framework selection, THE Documentation_Site SHALL render the page with that framework pre-selected for the recipient

### Requirement 7: Custom Infrastructure Manual Configuration (P3)

**User Story:** As a Developer_User with existing AWS infrastructure, I want clear guidance on integrating Amplify libraries with my custom infrastructure, so that I can use Amplify frontend libraries without adopting the full Amplify backend stack.

#### Acceptance Criteria

1. THE Frontend_Docs section SHALL include a "Manual Configuration" guide for each Amplify library category (Auth, Data, Storage) that documents how to connect the library to existing AWS resources
2. WHEN a Developer_User follows a Manual Configuration guide, THE Documentation_Site SHALL provide complete configuration examples for common infrastructure tools (CDK, Terraform, CloudFormation)
3. THE Documentation_Site SHALL document the minimum required configuration parameters for each Amplify library to connect to an externally provisioned AWS resource
4. WHEN a Manual Configuration guide references an AWS resource, THE Documentation_Site SHALL link to the relevant AWS service documentation for resource provisioning
5. IF a Developer_User attempts to use an Amplify library feature that requires Amplify Backend, THEN THE Documentation_Site SHALL clearly indicate the dependency and provide the manual alternative

### Requirement 8: Gen1 vs Gen2 Clarity and Migration (P3)

**User Story:** As a Developer_User using Gen1, I want clear guidance on the differences between Gen1 and Gen2 and a migration path, so that I can plan and execute an upgrade with confidence.

#### Acceptance Criteria

1. THE Documentation_Site SHALL display a clear visual indicator on every Legacy_Docs page identifying whether the content applies to Gen1, Gen2, or both
2. WHEN a Developer_User views a Gen1 Legacy_Docs page, THE Documentation_Site SHALL display a banner linking to the equivalent Gen2 page or migration guide when one exists
3. THE Documentation_Site SHALL provide a migration guide that lists breaking changes, deprecated APIs, and step-by-step upgrade instructions from Gen1 to Gen2
4. THE Search_System SHALL tag all Legacy_Docs search results with a Gen1 or Gen2 label so Developer_Users can distinguish between versions in search results
5. IF a Developer_User navigates to a Gen1 page that has been superseded by a Gen2 equivalent, THEN THE Documentation_Site SHALL display a deprecation notice with a direct link to the Gen2 page

### Requirement 9: Safety Warnings for Destructive Operations

**User Story:** As a Developer_User, I want clear warnings before performing operations that could cause data loss or service disruption, so that I can make informed decisions and avoid accidental damage.

#### Acceptance Criteria

1. WHEN a documentation page describes a schema change that could result in data loss, THE Documentation_Site SHALL display a prominent warning callout before the instructions
2. WHEN a documentation page describes a sandbox-to-production migration step, THE Documentation_Site SHALL display a checklist of prerequisites and potential risks
3. THE Documentation_Site SHALL use a consistent, visually distinct warning component for all destructive operation warnings across New_Docs and Legacy_Docs
4. WHEN a CLI command documented on a page has destructive side effects, THE Documentation_Site SHALL annotate the Code_Example with a warning label indicating the risk
