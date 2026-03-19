# URL Restructuring Plan — Frontend Pages

## Problem

Frontend pages currently live under `/[platform]/build-a-backend/...` which is:
- **Confusing** — URL says "build-a-backend" but content is about client-side usage
- **Not shareable** — switching to "Frontend Libraries" section depends on `sessionStorage`, so shared links always show as "Build a Backend"
- **Requires workarounds** — title overrides in Layout, Menu, and Breadcrumbs (see `SECTION_NAV_OVERRIDES.md`)

## Solution

Move all 69 frontend-tagged pages (excluding the `/frontend/` landing and `/ai/` which are already correct) to new URLs under `/[platform]/frontend/`.

### New URL Structure

```
/[platform]/frontend/                              → Landing page (already exists)
/[platform]/frontend/auth/                         → Auth overview
/[platform]/frontend/auth/sign-in/                 → Sign-in
/[platform]/frontend/auth/sign-up/                 → Sign-up
/[platform]/frontend/auth/sign-out/                → Sign-out
/[platform]/frontend/auth/authenticator/           → Using the Authenticator
/[platform]/frontend/auth/manage-sessions/         → Manage user sessions
/[platform]/frontend/auth/manage-attributes/       → Manage user attributes
/[platform]/frontend/auth/listen-to-events/        → Listen to auth events
/[platform]/frontend/auth/delete-account/          → Delete user account
/[platform]/frontend/auth/multi-step-sign-in/      → Multi-step sign-in
/[platform]/frontend/auth/switching-flows/         → Switching authentication flows
/[platform]/frontend/auth/web-ui-sign-in/          → Enable sign-in with web UI
/[platform]/frontend/auth/advanced-workflows/      → Advanced workflows
/[platform]/frontend/auth/app-uninstall/           → App uninstall

/[platform]/frontend/data/                         → Data overview
/[platform]/frontend/data/connect-to-api/          → Connect to API
/[platform]/frontend/data/query-data/              → Query data
/[platform]/frontend/data/mutate-data/             → Mutate data
/[platform]/frontend/data/subscribe-data/          → Subscribe to data
/[platform]/frontend/data/optimistic-ui/           → Optimistic UI
/[platform]/frontend/data/working-with-files/      → Working with files
/[platform]/frontend/data/connect-event-api/       → Connect to Events API
/[platform]/frontend/data/custom-subscription/     → Custom subscriptions
/[platform]/frontend/data/server-runtime/          → Server-side runtimes
/[platform]/frontend/data/apollo-extensions/       → Apollo extensions

/[platform]/frontend/storage/                      → Storage overview
/[platform]/frontend/storage/upload/               → Upload files
/[platform]/frontend/storage/download/             → Download files
/[platform]/frontend/storage/list/                 → List files
/[platform]/frontend/storage/remove/               → Remove files
/[platform]/frontend/storage/copy/                 → Copy files
/[platform]/frontend/storage/custom-s3/            → Use with custom S3
/[platform]/frontend/storage/data-usage/           → Data usage

/[platform]/frontend/server-side-rendering/        → SSR overview
/[platform]/frontend/server-side-rendering/nextjs/ → Next.js App Router
/[platform]/frontend/server-side-rendering/nuxt/   → Nuxt

/[platform]/frontend/analytics/                    → Analytics client usage
/[platform]/frontend/analytics/record-events/      → Record events
/[platform]/frontend/analytics/identify-user/      → Identify user
...etc for geo, in-app-messaging, rest-api, predictions, logging, interactions, pubsub
```

### What stays unchanged

```
/[platform]/build-a-backend/                       → Backend landing (unchanged)
/[platform]/build-a-backend/auth/set-up-auth/      → Backend auth setup (unchanged)
/[platform]/build-a-backend/data/set-up-data/      → Backend data setup (unchanged)
...all backend pages stay at current URLs
```

## Implementation Steps

### Step 1: Create new page files (69 pages)

For each frontend page, create a new MDX file at the new path. Two approaches:

**Option A: Re-export (keeps old files, avoids content duplication)**
```tsx
// src/pages/[platform]/frontend/auth/sign-in/index.mdx
export { default, getStaticPaths, getStaticProps } from
  '@/pages/[platform]/build-a-backend/auth/connect-your-frontend/sign-in/index.mdx';
```
Note: MDX re-exports may not work with Next.js. Need to test.

**Option B: Move files (clean, but breaks old URLs)**
```bash
# Move the file
mv src/pages/[platform]/build-a-backend/auth/connect-your-frontend/sign-in/ \
   src/pages/[platform]/frontend/auth/sign-in/
```
Then add redirect in `redirects.json`.

**Option C: Copy + redirect (safest)**
1. Copy the MDX file to the new location
2. Update the `meta` object (title, route, platforms)
3. Delete the old file
4. Add redirect for old URL → new URL

**Recommended: Option C** — cleanest result, clear history.

### Step 2: Update directory.mjs

Move all frontend page entries from under `build-a-backend` to under `frontend`:

```js
// Before:
{
  path: 'src/pages/[platform]/build-a-backend/auth/index.mdx',
  section: 'both',
  children: [
    { path: '.../auth/set-up-auth/index.mdx', section: 'backend' },
    { path: '.../auth/connect-your-frontend/index.mdx', section: 'frontend', children: [...] },
  ]
}

// After:
{
  path: 'src/pages/[platform]/build-a-backend/auth/index.mdx',
  section: 'backend',  // no longer 'both'
  children: [
    { path: '.../auth/set-up-auth/index.mdx', section: 'backend' },
    // connect-your-frontend moved out
  ]
}
// ...
{
  path: 'src/pages/[platform]/frontend/index.mdx',
  section: 'frontend',
  children: [
    { path: '.../frontend/auth/index.mdx', section: 'frontend', children: [
      { path: '.../frontend/auth/sign-in/index.mdx' },
      { path: '.../frontend/auth/sign-up/index.mdx' },
      ...
    ]},
    { path: '.../frontend/data/index.mdx', section: 'frontend', children: [...] },
    { path: '.../frontend/storage/index.mdx', section: 'frontend', children: [...] },
    ...
  ]
}
```

### Step 3: Add redirects (69 entries)

Add to `redirects.json`:
```json
{
  "source": "/<platform>/build-a-backend/auth/connect-your-frontend/sign-in/",
  "target": "/<platform>/frontend/auth/sign-in/",
  "status": "301"
}
```

One redirect per old URL → new URL. Pattern:
- `/<platform>/build-a-backend/auth/connect-your-frontend/<page>/` → `/<platform>/frontend/auth/<page>/`
- `/<platform>/build-a-backend/data/<frontend-page>/` → `/<platform>/frontend/data/<frontend-page>/`
- `/<platform>/build-a-backend/storage/<frontend-page>/` → `/<platform>/frontend/storage/<frontend-page>/`
- `/<platform>/build-a-backend/server-side-rendering/<page>/` → `/<platform>/frontend/server-side-rendering/<page>/`
- `/<platform>/build-a-backend/add-aws-services/<service>/<frontend-page>/` → `/<platform>/frontend/<service>/<frontend-page>/`

### Step 4: Remove workarounds

Once pages are at correct URLs, remove:
- `SECTION_NAV_OVERRIDES.md` — no longer needed
- Title override in `Layout.tsx` — page titles will be correct
- Title override in `Menu.tsx` — sidebar titles will be correct
- Breadcrumb override in `Breadcrumbs/index.tsx` — breadcrumbs will be correct
- `sessionStorage` section persistence — URL now determines section unambiguously
- `getSectionFromPath` can detect `/frontend/` directly

### Step 5: Update internal links

Any MDX page that links to an old frontend URL needs updating:
```md
<!-- Before -->
[Sign in](/[platform]/build-a-backend/auth/connect-your-frontend/sign-in/)

<!-- After -->
[Sign in](/[platform]/frontend/auth/sign-in/)
```

### Step 6: Update frontend landing page

The `/[platform]/frontend/index.mdx` landing page currently fetches `getChildPageNodes('/[platform]/build-a-backend')`. After restructuring, it would fetch its own children:
```js
const childPageNodes = getChildPageNodes('/[platform]/frontend');
```

## What gets removed after restructuring

| Workaround | File | Removed |
|-----------|------|---------|
| `sessionStorage` section persistence | `Layout.tsx` | Yes — URL determines section |
| Title override for build-a-backend | `Layout.tsx` | Yes — page has correct title |
| Sidebar title override | `Menu.tsx` | Yes — node has correct title |
| Breadcrumb override | `Breadcrumbs/index.tsx` | Yes — breadcrumb reads correct title |
| `section: 'both'` on feature nodes | `directory.mjs` | Yes — features are either backend or frontend |
| `getPageSection()` tree walk | `Layout.tsx` | Simplified — just use `getSectionFromPath()` |
| `hideFromNav` on frontend landing | `directory.mjs` | Yes — it's now the proper parent with children |

## Effort

| Task | Count | Effort |
|------|-------|--------|
| Create new MDX files | 69 | Medium — mostly file copies with updated meta |
| Update directory.mjs | 1 | Medium — restructure the tree |
| Add redirects | 69 | Small — scripted from old→new URL mapping |
| Update internal links | ~50 pages | Medium — grep and replace |
| Remove workarounds | 5 files | Small |
| Test | — | Medium — verify all sections, redirects, links |

**Total: ~2-3 days of focused work**

Can be done incrementally per feature:
1. Auth frontend pages (14 pages)
2. Data frontend pages (10 pages)
3. Storage frontend pages (7 pages)
4. SSR pages (3 pages)
5. Add AWS Services frontend pages (35 pages)
