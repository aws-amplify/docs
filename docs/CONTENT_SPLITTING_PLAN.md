# Content Splitting Plan (Phase 11)

## Overview

11 pages under `build-a-backend/` contain both backend configuration and frontend client code. Each needs to be split into separate backend and frontend pages so content matches its section.

## Pages to Split

### Priority 1: Core Features (high traffic)

| Page | Path | Backend % | Frontend % | Action |
|------|------|-----------|------------|--------|
| **Set Up Auth** | `auth/set-up-auth/` | 30% | 70% | Split: `defineAuth` config stays. Move Authenticator component + framework integration examples to a new frontend page. |
| **Set Up Data** | `data/set-up-data/` | 50% | 50% | Split: `defineData` + schema stays. Move `generateClient`, `.create()`, `.list()`, `.subscribe()` examples to a new frontend page. |
| **Set Up Storage** | `storage/set-up-storage/` | 35% | 65% | Split: `defineStorage` + access rules stays. Move `uploadData`, `downloadData` + platform examples to a new frontend page. |

### Priority 2: Auth Flows

| Page | Path | Backend % | Frontend % | Action |
|------|------|-----------|------------|--------|
| **Custom Auth Flows** | `auth/customize-auth-lifecycle/custom-auth-flows/` | 15% | 85% | Split: Lambda trigger definition stays. Move platform-specific `signIn`/`confirmSignIn` implementations (Swift, Android, Flutter, JS) to frontend. |

### Priority 3: Data Features

| Page | Path | Backend % | Frontend % | Action |
|------|------|-----------|------------|--------|
| **Custom Subscriptions** | `data/custom-subscription/` | 60% | 40% | Split: `a.subscription()` definition + handler code stays. Move `.subscriptions.receive().subscribe()` client consumption to frontend. |

### Priority 4: Add AWS Services (6 pages)

| Page | Path | Backend % | Frontend % | Action |
|------|------|-----------|------------|--------|
| **Analytics Setup** | `add-aws-services/analytics/set-up-analytics/` | 25% | 75% | Split: CDK Pinpoint construct + IAM stays. Move client initialization per platform to frontend. |
| **Geo Setup** | `add-aws-services/geo/set-up-geo/` | 25% | 75% | Split: CDK Location construct + IAM stays. Move client initialization per platform to frontend. |
| **In-App Messaging** | `add-aws-services/in-app-messaging/set-up-in-app-messaging/` | 60% | 40% | Split: CDK Pinpoint + campaign config stays. Move `initializeInAppMessaging()` + client code to frontend. |
| **REST API Setup** | `add-aws-services/rest-api/set-up-rest-api/` | 60% | 40% | Split: `defineFunction` + API Gateway CDK stays. Move `Amplify.configure()` + client REST config to frontend. |
| **Predictions Setup** | `add-aws-services/predictions/set-up-predictions/` | 70% | 30% | Split: IAM policies for ML services stays. Move `Amplify.configure()` + client setup to frontend. |
| **Logging Setup** | `add-aws-services/logging/set-up-logging/` | 50% | 50% | Split: CloudWatch CDK + IAM stays. Move logger plugin initialization per platform to frontend. |

### No Action Needed

| Page | Path | Reason |
|------|------|--------|
| **Field-level Validation** | `data/field-level-validation/` | 100% backend — pure schema validation rules |

## How to Split Each Page

For each page:

1. **Identify the split point** — find where backend config ends and frontend usage begins. Look for:
   - Backend imports: `@aws-amplify/backend` (`defineAuth`, `defineData`, `defineStorage`, `defineFunction`)
   - Frontend imports: `aws-amplify/auth`, `aws-amplify/data`, `aws-amplify/storage`
   - `Amplify.configure()` calls (frontend)
   - `InlineFilter` blocks with platform-specific client code (frontend)

2. **Keep backend content in the existing page** — the page is already tagged `section: 'backend'` and has the correct URL

3. **Create a new frontend page** — either:
   - Add to the existing frontend path (e.g., `auth/connect-your-frontend/setup-guide/`)
   - Or create a parallel path (e.g., `auth/client-setup/`)

4. **Add CrossLink** — the auto-rendered CrossLink already links between sections, but for split pages you may want a manual `<CrossLink>` with specific text

5. **Update `directory.mjs`** — add the new frontend page to the directory tree with `section: 'frontend'`

6. **Update internal links** — any links between the split pages need updating

## Content Patterns to Watch For

- **`InlineFilter` blocks on backend pages**: These contain platform-specific frontend code. When splitting, move the entire `InlineFilter` block to the frontend page.
- **"Connect your app" sections**: Usually starts with `Amplify.configure(outputs)` — everything after this is frontend.
- **"Install dependencies" sections**: `npm install aws-amplify` is frontend setup — move to frontend page.
- **Multi-platform code blocks**: Swift/Android/Flutter/React examples are always frontend. Backend is TypeScript only.

## Effort Estimate

- **Per page**: 1-2 hours (read, extract, create new page, update directory, test)
- **Total**: ~15-20 hours for all 11 pages
- **Can be done incrementally**: Each page is independent, can be split in separate PRs
