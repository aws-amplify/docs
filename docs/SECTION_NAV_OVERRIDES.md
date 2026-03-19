# Section Navigation: Title Overrides

## What

When the "Frontend Libraries" section is active, the `/[platform]/build-a-backend/` page displays "Frontend Libraries" as its title, breadcrumb, and sidebar heading instead of "Build & connect backend".

## Why

The current URL structure places both backend and frontend content under `/build-a-backend/`. Backend pages (e.g., `set-up-auth`, `defineData`) and frontend pages (e.g., `sign-in`, `query-data`) share the same parent path. Section-based navigation filters the sidebar and overview cards to show only relevant pages per section, but the parent page's title remains "Build & connect backend" — which is confusing when viewing frontend content.

## How it works

Three places override the title based on `activeSection`:

1. **Sidebar heading** (`src/components/Menu/Menu.tsx`): When rendering the `/[platform]/build-a-backend` node with `activeSection === 'frontend'`, the `title` property is overridden to "Frontend Libraries".

2. **Page H1** (`src/components/Layout/Layout.tsx`): When `activeSection === 'frontend'` and `pathname === '/[platform]/build-a-backend'`, the `<Heading>` renders "Frontend Libraries" instead of the page's meta title.

3. **Breadcrumb** (`src/components/Breadcrumbs/index.tsx`): When `activeSection === 'frontend'` and the breadcrumb URL is `/[platform]/build-a-backend`, the label is overridden to "Frontend Libraries".

## Temporary nature

This is a display-only override. The underlying page, URL, and meta title are unchanged. When the documentation is restructured to move frontend content to its own URL path (e.g., `/[platform]/frontend-libraries/auth/sign-in/`), these overrides should be removed in favor of proper page titles at the correct URLs.

## Files involved

- `src/components/Menu/Menu.tsx` — sidebar title override
- `src/components/Layout/Layout.tsx` — H1 title override
- `src/components/Breadcrumbs/index.tsx` — breadcrumb label override
