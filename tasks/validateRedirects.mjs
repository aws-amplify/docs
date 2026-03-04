/**
 * validateRedirects.mjs
 *
 * For each entry in redirects.json:
 *   1. Verify the target path corresponds to an existing page in directory.json
 *   2. Report any broken redirect targets with descriptive messages
 *   3. Categorize broken redirects:
 *      - "Restructuring" entries (with a `reason` field) → hard fail (exit 1)
 *      - "Legacy" entries (without `reason` field) → warn only (exit 0)
 *
 * Requirements: 8.5, 8.7, 8.8
 */

import { promises as fs } from 'fs';
import path from 'path';
import { cwd } from 'node:process';

const ROOT = cwd();
const REDIRECTS_PATH = path.resolve(ROOT, 'redirects.json');
const DIRECTORY_PATH = path.resolve(ROOT, 'src/directory/directory.json');

/**
 * Known platform slugs used in URL paths.
 */
const PLATFORMS = [
  'android',
  'angular',
  'flutter',
  'javascript',
  'nextjs',
  'react',
  'react-native',
  'swift',
  'vue'
];

/**
 * Recursively collect all routes from the directory tree.
 * @param {object} node - A directory tree node
 * @param {Set<string>} routes - Accumulator set of route strings
 */
function collectRoutes(node, routes) {
  if (node.route) {
    routes.add(node.route);
  }
  if (node.children) {
    for (const child of node.children) {
      collectRoutes(child, routes);
    }
  }
}

/**
 * Determine if a redirect entry should be skipped during validation.
 *
 * Skipped entries include:
 * - Catch-all 404 entries (status "404-200")
 * - External URL targets (https://, http://)
 * - Parameterized rewrite rules with dynamic segments (<platform>, <page>,
 *   <category>, <library>, <*>, etc.) — these are Amplify Hosting rewrite
 *   patterns that resolve at request time, not static paths
 * - Targets with URL fragments (#section) that can't be validated against
 *   the directory tree since fragments are client-side
 *
 * @param {object} entry - A redirect entry from redirects.json
 * @returns {boolean}
 */
function shouldSkipEntry(entry) {
  // Skip the catch-all 404 entry
  if (entry.status === '404-200') return true;

  // Skip external URL targets
  if (
    entry.target.startsWith('http://') ||
    entry.target.startsWith('https://')
  ) {
    return true;
  }

  // Skip entries whose target contains dynamic segments (Amplify Hosting
  // rewrite patterns like <platform>, <page>, <category>, <*>, etc.)
  if (/<[^>]+>/.test(entry.target)) return true;

  // Skip entries whose source contains dynamic segments — these are
  // pattern-based rewrites that match families of URLs at request time
  if (/<[^>]+>/.test(entry.source)) return true;

  // Skip targets with URL fragments (#...) — fragments are client-side
  // and can't be validated against the directory tree
  if (entry.target.includes('#')) return true;

  return false;
}

/**
 * Normalize a redirect target path to match directory.json route format.
 *
 * Directory routes use `/legacy/[platform]/...` for Gen2 pages and
 * `/legacy/gen1/[platform]/...` for Gen1 pages. Redirect targets use
 * actual platform names like `/react/...` or `/gen1/javascript/...`.
 *
 * This function converts redirect targets into the directory route format
 * so they can be looked up in the route set.
 *
 * @param {string} target - The redirect target path
 * @returns {string[]} - Array of possible normalized routes to check
 */
function normalizeTarget(target) {
  // Strip trailing slash for consistent matching
  const cleaned = target.endsWith('/') ? target.slice(0, -1) : target;

  // Empty path after stripping means root
  if (cleaned === '') return ['/'];

  const candidates = [];

  // Check if target starts with /gen1/<platform>/...
  for (const platform of PLATFORMS) {
    const gen1Prefix = `/gen1/${platform}/`;
    const gen1Exact = `/gen1/${platform}`;
    if (cleaned.startsWith(gen1Prefix) || cleaned === gen1Exact) {
      const rest = cleaned.slice(`/gen1/${platform}`.length);
      candidates.push(`/legacy/gen1/[platform]${rest}`);
      return candidates;
    }
  }

  // Check if target starts with /<platform>/...
  for (const platform of PLATFORMS) {
    const prefix = `/${platform}/`;
    const exact = `/${platform}`;
    if (cleaned.startsWith(prefix) || cleaned === exact) {
      const rest = cleaned.slice(`/${platform}`.length);
      candidates.push(`/legacy/[platform]${rest}`);
      return candidates;
    }
  }

  // For paths that don't start with a platform (e.g., /configure, /frontend)
  // try the path as-is
  candidates.push(cleaned);

  return candidates;
}

/**
 * Main validation function.
 */
async function validateRedirects() {
  console.log('Validating redirect targets...');

  // Load redirects.json
  let redirects;
  try {
    const raw = await fs.readFile(REDIRECTS_PATH, 'utf-8');
    redirects = JSON.parse(raw);
  } catch (err) {
    console.error(`Failed to load redirects.json: ${err.message}`);
    process.exit(1);
  }

  // Load directory.json
  let directory;
  try {
    const raw = await fs.readFile(DIRECTORY_PATH, 'utf-8');
    directory = JSON.parse(raw);
  } catch (err) {
    console.error(`Failed to load directory.json: ${err.message}`);
    process.exit(1);
  }

  // Collect all known routes from the directory tree
  const knownRoutes = new Set();
  collectRoutes(directory, knownRoutes);
  console.log(`  Loaded ${knownRoutes.size} routes from directory.json`);
  console.log(`  Loaded ${redirects.length} entries from redirects.json`);

  // Validate each redirect entry
  const brokenLegacy = [];
  const brokenRestructuring = [];
  let checked = 0;
  let skipped = 0;

  for (const entry of redirects) {
    if (shouldSkipEntry(entry)) {
      skipped++;
      continue;
    }

    checked++;
    const candidates = normalizeTarget(entry.target);
    const found = candidates.some((candidate) => knownRoutes.has(candidate));

    if (!found) {
      const detail = {
        source: entry.source,
        target: entry.target,
        normalizedCandidates: candidates,
        status: entry.status
      };

      if (entry.reason) {
        brokenRestructuring.push(detail);
      } else {
        brokenLegacy.push(detail);
      }
    }
  }

  // Report results
  console.log(`  Checked: ${checked} redirect entries`);
  console.log(
    `  Skipped: ${skipped} entries (external URLs, wildcards, or fragments)`
  );

  // Log broken legacy entries as warnings
  if (brokenLegacy.length > 0) {
    console.warn(
      `\n  WARNING: ${brokenLegacy.length} broken legacy redirect(s) (pre-existing, no "reason" field):\n`
    );
    for (const b of brokenLegacy) {
      console.warn(`    WARNING Source: ${b.source}`);
      console.warn(`    WARNING Target: ${b.target}`);
      console.warn(`    WARNING Tried:  ${b.normalizedCandidates.join(', ')}`);
      console.warn('');
    }
  }

  // Log broken restructuring entries as errors
  if (brokenRestructuring.length > 0) {
    console.error(
      `\n  VALIDATION FAILED: ${brokenRestructuring.length} broken restructuring redirect(s) found:\n`
    );
    for (const b of brokenRestructuring) {
      console.error(`    ERROR Source: ${b.source}`);
      console.error(`    ERROR Target: ${b.target}`);
      console.error(`    ERROR Tried:  ${b.normalizedCandidates.join(', ')}`);
      console.error('');
    }
  }

  // Summary
  console.log('\n  --- Redirect Validation Summary ---');
  console.log(`  Broken legacy redirects (warnings): ${brokenLegacy.length}`);
  console.log(
    `  Broken restructuring redirects (errors): ${brokenRestructuring.length}`
  );

  if (brokenRestructuring.length > 0) {
    console.error(
      `\n  ${brokenRestructuring.length} restructuring redirect(s) point to pages that do not exist in directory.json.`
    );
    console.error('  Fix the redirect targets or add the missing pages.');
    process.exit(1);
  }

  if (brokenLegacy.length > 0) {
    console.warn(
      `\n  ${brokenLegacy.length} legacy redirect(s) have broken targets (pre-existing — not failing build).`
    );
  }

  console.log('  All restructuring redirect targets are valid.');
  console.log('Redirect validation complete.');
}

validateRedirects().catch((err) => {
  console.error(`Redirect validation failed unexpectedly: ${err.message}`);
  process.exit(1);
});
