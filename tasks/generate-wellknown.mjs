import { promises as fs } from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: './.env.custom' });

const DOMAIN = process.env.SITEMAP_DOMAIN
  ? process.env.SITEMAP_DOMAIN
  : 'https://docs.amplify.aws';

// Path of the Next.js static HTML build output (same target used for
// robots.txt and sitemap.xml in postBuildTasks).
const ROOT_PATH = './client/www/next-build';

/**
 * Build the API catalog linkset document (RFC 9727 / RFC 9264).
 *
 * This is a documentation site rather than a hosted API, so the catalog
 * advertises the machine-readable documentation resources the build already
 * produces (the llms.txt index, the full export, and the sitemap) instead of
 * an OpenAPI service description, which does not exist for this site.
 *
 * @returns {string} Pretty-printed application/linkset+json document
 */
export function generateApiCatalog(domain = DOMAIN) {
  const linkset = {
    linkset: [
      {
        anchor: `${domain}/`,
        'service-doc': [
          {
            href: `${domain}/ai/llms.txt`,
            type: 'text/plain',
            title: 'AWS Amplify documentation index for LLMs (llms.txt)'
          },
          {
            href: `${domain}/ai/llms-full.txt`,
            type: 'text/plain',
            title: 'AWS Amplify documentation full export for LLMs'
          }
        ],
        related: [
          {
            href: `${domain}/sitemap.xml`,
            type: 'text/xml',
            title: 'Sitemap'
          }
        ]
      }
    ]
  };

  return JSON.stringify(linkset, null, 2);
}

/**
 * Writes the API catalog to /.well-known/api-catalog in the build output.
 */
export async function writeApiCatalog() {
  const wellKnownDir = path.join(ROOT_PATH, '.well-known');
  const catalogPath = path.join(wellKnownDir, 'api-catalog');

  try {
    await fs.mkdir(wellKnownDir, { recursive: true });
    await fs.writeFile(catalogPath, generateApiCatalog());
    console.log(`api-catalog written to ${catalogPath}`);
  } catch (error) {
    console.error(`Error writing api-catalog to ${catalogPath}:`, error);
  }
}
