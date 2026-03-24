# Project Info

## Setup

```bash
# Prerequisites: Node.js 20+ (below 22.0.0)
corepack enable && yarn set version berry
yarn && yarn dev
# Site available at http://localhost:3000/
```

## Build

```bash
yarn build                                    # Full build (prebuild + next build + postbuild)
yarn prebuild                                 # Generate directory.json, flatDirectory.json, llms.txt
node src/directory/generateDirectory.mjs      # Regenerate directory.json only
node src/directory/generateFlatDirectory.mjs  # Regenerate flatDirectory.json only
```

## Testing

```bash
yarn test          # Run all tests (Jest)
npx jest           # Run all tests directly
npx jest <path>    # Run specific test file
```

All tests must pass before merging. Currently 259 tests across 60 suites.

## Linting

```bash
yarn lint          # ESLint + Next.js lint
```

## Project Coding Conventions & Patterns

### Project Overview
- **Language**: TypeScript, MDX
- **Framework**: Next.js 16 (Pages Router, static export with `output: 'export'`)
- **UI Library**: @aws-amplify/ui-react
- **Testing**: Jest + @testing-library/react
- **Styling**: SCSS modules (imported via `src/styles/styles.scss`)
- **Package Manager**: Yarn Berry

---

### 1. File & Directory Naming
- **PascalCase** for component directories and files: `GlobalNav/`, `MenuItem.tsx`, `CrossLink.tsx`
- **camelCase** for utility files: `findDirectoryNode.ts`, `getPageSection.ts`, `useCurrentPlatform.ts`
- **kebab-case** for page directories: `build-a-backend/`, `set-up-auth/`, `connect-to-API/`
- **SCSS** files use kebab-case: `global-nav.scss`, `feedback.scss`
- Component directories have `index.ts` barrel exports: `export { CrossLink } from './CrossLink';`
- Tests live alongside source in `__tests__/` directories

### 2. Page Structure
- All Gen2 pages live under `src/pages/[platform]/`
- **Backend pages**: `src/pages/[platform]/build-a-backend/<feature>/`
- **Frontend pages**: `src/pages/[platform]/frontend/<feature>/`
- **Gen1 pages**: `src/pages/gen1/[platform]/` — MUST NOT be modified
- Every page is an MDX file (`index.mdx`) that exports `meta`, `getStaticPaths`, and `getStaticProps`

### 3. Page Meta Pattern (Required on ALL pages)
```tsx
import { getCustomStaticPath } from '@/utils/getCustomStaticPath';

export const meta = {
  title: 'Page Title',
  description: 'Page description.',
  platforms: [
    'android',     // Keep alphabetically sorted
    'angular',
    'flutter',
    'javascript',
    'nextjs',
    'react',
    'react-native',
    'swift',
    'vue'
  ]
};

export const getStaticPaths = async () => {
  return getCustomStaticPath(meta.platforms);
};

export function getStaticProps(context) {
  return {
    props: {
      platform: context.params.platform,
      meta
    }
  };
}
```

- `platforms` array MUST only include platforms where the content is relevant
- `platforms` array MUST be alphabetically sorted
- Overview pages that show child cards use `getChildPageNodes(meta.route)` in `getStaticProps`

### 4. Section-Based Navigation Architecture

The docs use a section-based navigation system that filters content by category:

- **Sections**: `quickstart`, `backend`, `frontend`, `ui`, `hosting`, `reference`
- **Section config**: `src/data/sections.ts` — labels, subtitles, URL helpers
- **Directory tree**: `src/directory/directory.mjs` — source of truth for navigation hierarchy
- **Section tags**: Every node in `directory.mjs` has a `section` property (`'backend'`, `'frontend'`, `'quickstart'`, `'hosting'`, `'ui'`, `'reference'`)
- **Filtering**: `isNodeVisibleInSection()` in `sections.ts` — shared utility used by Menu, MenuItem, and Overview

#### Key files:
| File | Purpose |
|------|---------|
| `src/data/sections.ts` | Section definitions, `getSectionFromPath()`, `getDefaultPathForSection()`, `isNodeVisibleInSection()` |
| `src/utils/getPageSection.ts` | Directory tree walk for section detection + CrossLink feature route targeting |
| `src/directory/directory.mjs` | Hand-maintained navigation tree (source of truth) |
| `src/directory/generateDirectory.mjs` | Enriches directory.mjs with page metadata → writes `directory.json` |
| `src/components/GlobalNav/GlobalNav.tsx` | Top navigation bar with section tabs |
| `src/components/Menu/Menu.tsx` | Sidebar menu with section filtering |
| `src/components/Menu/MenuItem.tsx` | Recursive menu item with section-aware child filtering |
| `src/components/CrossLink/CrossLink.tsx` | Banner linking between backend ↔ frontend sections |
| `src/components/Overview/Overview.tsx` | Card grid for overview pages with section filtering |

#### Section tagging rules:
- Pages showing `defineAuth`, `defineData`, `defineStorage`, CDK config → `section: 'backend'`
- Pages showing client API calls (`signIn`, `query`, `uploadData`) → `section: 'frontend'`
- Overview pages visible in multiple sections → `section: 'both'` (only used if page appears in both backend and frontend sidebars)
- `'quickstart'` tagged on `how-amplify-works` and `start` sections (hidden from nav, shown on homepage)

### 5. Directory Tree (`directory.mjs`)

This is the source of truth for all navigation. When adding or moving pages:

1. Add/move the entry in `directory.mjs` with the correct `path` and `section` tag
2. Run `node src/directory/generateDirectory.mjs` to regenerate `directory.json`
3. Run `node src/directory/generateFlatDirectory.mjs` to regenerate `flatDirectory.json`

Structure:
```javascript
export const directory = {
  path: 'src/pages/index.tsx',
  children: [
    {
      path: 'src/pages/[platform]/index.tsx',
      children: [
        {
          path: 'src/pages/[platform]/build-a-backend/index.mdx',
          section: 'backend',
          children: [ /* auth, data, storage, functions, ai, services... */ ]
        },
        {
          path: 'src/pages/[platform]/frontend/index.mdx',
          section: 'frontend',
          children: [ /* auth, data, storage, ai, analytics, geo... */ ]
        },
        // ... other sections
      ]
    }
  ]
};
```

### 6. Redirects

When moving or deleting pages, add redirects to `redirects.json`:

```json
{
  "source": "/<platform>/old-path/",
  "target": "/<platform>/new-path/",
  "status": "301"
}
```

- Use `<platform>` placeholder (NOT `[platform]`)
- Always include trailing slashes
- Use `<*>` wildcard for path patterns: `"/<platform>/old-prefix/<*>"` → `"/<platform>/new-prefix/<*>"`
- Place wildcard redirects BEFORE the catch-all `/<*>` → `/404/index.html` entry
- See [Amplify Hosting redirect docs](https://docs.aws.amazon.com/amplify/latest/userguide/redirects.html)

### 7. MDX Components

Global MDX components are registered in `mdx-components.tsx`. Available in all MDX pages without import:

- `<InlineFilter filters={["react", "swift", ...]}>` — Platform-conditional content
- `<Callout>` — Info/warning callouts
- `<Accordion>` — Expandable sections
- `<BlockSwitcher>` / `<Block>` — Tab-switchable code blocks
- `<Overview childPageNodes={...} />` — Card grid for child pages
- `<CrossLink href="..." label="..." text="..." />` — Cross-section link banner
- `<Fragments>` — Legacy fragment inclusion (prefer InlineFilter)

### 8. Internal Links

- Use `[link text](/[platform]/path/to/page/)` format
- Do NOT use relative links (`../page/`)
- The `[platform]` placeholder resolves to the user's current platform
- Backend pages: `/[platform]/build-a-backend/<feature>/<page>/`
- Frontend pages: `/[platform]/frontend/<feature>/<page>/`
- NEVER hardcode a specific platform in links (e.g., `/react/...`) — always use `[platform]`

### 9. Styling

- All styles in `src/styles/` as SCSS files
- Imported via `src/styles/styles.scss` (global import order matters)
- Use Amplify UI design tokens: `var(--amplify-colors-primary-80)`, `var(--amplify-space-medium)`
- BEM-like naming: `.component`, `.component__element`, `.component__element--modifier`
- Dark mode via `@include darkMode { }` mixin
- Responsive breakpoints: `$mq-mobile: 1000px` (desktop breakpoint)

### 10. Component Patterns

- Functional components with TypeScript props
- Amplify UI primitives: `Flex`, `View`, `Text`, `Heading`, `Button`, `Badge`, `Card`
- `useRouter()` for navigation, `usePathWithoutHash()` for current path
- `findDirectoryNode()` for directory tree lookups
- `getPageSection()` for section detection (client-side only — NEVER call during SSR/static generation)

### 11. SSR Safety

This is a static export site (`output: 'export'`). Key rules:

- **NEVER** access `window`, `sessionStorage`, `localStorage`, or `document` outside of `useEffect` or event handlers
- **ALWAYS** guard with `typeof window !== 'undefined'` before browser API access
- **NEVER** call `getPageSection()` or `findDirectoryNode()` during render — only in `useEffect`
- `useState` initializers run on both server and client — must produce the same value to avoid hydration mismatch

### 12. Gen1 Documentation

- Gen1 pages at `/gen1/[platform]/` MUST NOT be modified by section navigation changes
- Gen1 pages show a legacy banner (`Gen1Banner` component)
- Gen1 Docs link in sidebar navigates to `/gen1/<platform>/`
- The `navbar--gen1` class applies Gen1-specific nav styling

### 13. Testing Patterns

- Tests use Jest + @testing-library/react
- Router mocks required for component tests:
  ```typescript
  jest.mock('next/router', () => ({
    __esModule: true,
    useRouter: () => ({
      query: { platform: 'react' },
      pathname: '/[platform]/build-a-backend',
      asPath: '/react/build-a-backend/'
    })
  }));
  ```
- Test files: `src/<path>/__tests__/<Component>.test.tsx`
- Snapshot tests for stable UI components
- Accessibility tests use `axe-core` via CI pipeline

### 14. Build & Deploy

- `output: 'export'` generates static HTML
- Build output: `client/www/next-build/`
- Amplify Hosting platform: `WEB` (static), NOT `WEB_COMPUTE` (SSR)
- `NODE_OPTIONS=--max-old-space-size=4096` may be needed for large builds
- Images optimized by `next-image-export-optimizer` during postbuild
- Sitemap generated in `postBuildTasks.mjs`

### 15. Important Constraints

- **No `getServerSideProps`** — static export only, use `getStaticProps` + `getStaticPaths`
- **No Next.js middleware** — not supported with `output: 'export'`
- **No runtime redirects** — all redirects are hosting-layer via `redirects.json`
- **Trailing slashes required** — `trailingSlash: true` in `next.config.mjs`
- **TypeScript errors ignored in build** — `ignoreBuildErrors: true` (do not rely on build to catch type errors)
