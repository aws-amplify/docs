import dotenv from 'dotenv';

dotenv.config({ path: './.env.custom' });

// Canonical site origin used to build absolute URLs in generated artifacts
// (sitemap, robots.txt, and the .well-known discovery files).
export const DOMAIN = process.env.SITEMAP_DOMAIN
  ? process.env.SITEMAP_DOMAIN
  : 'https://docs.amplify.aws';

// Path of the Next.js static HTML build output that postBuildTasks writes into.
export const ROOT_PATH = './client/www/next-build';

// Canonical platform used when building absolute doc URLs for platform-agnostic
// pages. The site requires a platform segment (a platform-neutral path 404s),
// and the existing llms.txt generator canonicalizes on this same platform.
// Defined once here so a canonical-platform change is a single edit.
export const CANONICAL_PLATFORM = 'react';
