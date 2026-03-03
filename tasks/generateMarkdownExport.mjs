/**
 * generateMarkdownExport.mjs
 *
 * Traverses all MDX files in src/pages/[platform]/
 * For each file:
 *   1. Reads the MDX source
 *   2. Extracts the meta object (title, description, platforms)
 *   3. Strips JSX components (InlineFilter, Callout, etc.) leaving text content
 *   4. Preserves fenced code blocks with language annotations
 *   5. Writes frontmatter + markdown body to output
 *   6. Generates index file at public/ai/llms.txt with links to all pages
 *   7. Generates full export at public/ai/llms-full.txt with all content
 *
 * Requirements: 4.1, 4.2, 4.3, 4.4, 4.5
 */

import { promises as fs } from 'fs';
import path from 'path';
import { cwd } from 'node:process';
import JSON5 from 'json5';

const ROOT_PATH = path.resolve(cwd(), 'src/pages');
const PLATFORM_DIR = path.resolve(ROOT_PATH, '[platform]');
const OUTPUT_DIR = path.resolve(cwd(), 'public/ai');
const SITE_URL = 'https://docs.amplify.aws';

/**
 * Recursively find all MDX files under a directory.
 * @param {string} dir
 * @returns {Promise<string[]>}
 */
async function findMdxFiles(dir) {
  const results = [];
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return results;
  }
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const nested = await findMdxFiles(fullPath);
      results.push(...nested);
    } else if (entry.name.endsWith('.mdx')) {
      results.push(fullPath);
    }
  }
  return results;
}

/**
 * Extract the meta object from an MDX file using regex.
 * Mirrors the approach in generateDirectory.mjs.
 * @param {string} source - MDX file content
 * @param {string} filePath - Path for error reporting
 * @returns {object|null}
 */
function extractMeta(source, filePath) {
  const regex = /const\s+meta\s*=\s*(\{[\s\S]*?\n\};)/;
  const match = source.match(regex);
  if (!match || !match[1]) {
    return null;
  }
  try {
    const metaStr = match[1].replaceAll('`', "'").replaceAll(';', '');
    return JSON5.parse(metaStr);
  } catch (err) {
    console.warn(
      `  Warning: Could not parse meta in ${filePath}: ${err.message}`
    );
    return null;
  }
}

/**
 * Derive the section name from a file path relative to the [platform] directory.
 * Maps top-level directories to section names.
 * @param {string} relativePath - Path relative to src/pages/[platform]/
 * @returns {string}
 */
function deriveSection(relativePath) {
  const sectionMap = {
    start: 'quickstart',
    frontend: 'frontend',
    'build-a-backend': 'backend',
    'build-ui': 'ui',
    'deploy-and-host': 'hosting',
    reference: 'reference',
    'how-amplify-works': 'quickstart',
    ai: 'backend',
    sdk: 'reference'
  };

  const firstSegment = relativePath.split(path.sep)[0];
  return sectionMap[firstSegment] || 'reference';
}

/**
 * Derive a URL route from a file path relative to src/pages/[platform]/.
 * @param {string} relativePath
 * @returns {string}
 */
function deriveRoute(relativePath) {
  const posixPath = relativePath.split(path.sep).join('/');
  const parsed = path.posix.parse(posixPath);
  if (parsed.name === 'index') {
    return '/[platform]/' + parsed.dir;
  }
  return '/[platform]/' + path.posix.join(parsed.dir, parsed.name);
}

/**
 * Strip JSX/MDX components from content while preserving:
 * - Plain text content
 * - Fenced code blocks with language annotations
 * - Markdown headings, lists, links, etc.
 *
 * Strategy:
 * 1. Protect fenced code blocks by replacing them with placeholders
 * 2. Strip import statements
 * 3. Strip export statements (meta, getStaticPaths, getStaticProps)
 * 4. Strip JSX self-closing tags: <Component />
 * 5. Strip JSX opening/closing tags but keep inner content
 * 6. Strip JSX expression containers: {props.something}
 * 7. Restore code blocks from placeholders
 *
 * @param {string} source - Raw MDX content
 * @returns {string} - Cleaned markdown content
 */
function stripMdxToMarkdown(source) {
  const codeBlocks = [];

  // Step 1: Protect fenced code blocks
  let content = source.replace(/^(```[\s\S]*?^```)/gm, (match) => {
    const index = codeBlocks.length;
    codeBlocks.push(match);
    return `__CODE_BLOCK_${index}__`;
  });

  // Step 2: Strip import statements
  content = content.replace(/^import\s+.*$/gm, '');

  // Step 3: Strip export blocks (meta, getStaticPaths, getStaticProps, etc.)
  // Handle multi-line exports like: export const meta = { ... };
  content = content.replace(
    /^export\s+const\s+meta\s*=\s*\{[\s\S]*?\n\};?\s*$/gm,
    ''
  );
  // Handle export function blocks
  content = content.replace(
    /^export\s+(const|function|async\s+function)\s+\w+[\s\S]*?^\}\s*$/gm,
    ''
  );
  // Handle remaining single-line exports
  content = content.replace(/^export\s+.*$/gm, '');

  // Step 4: Strip self-closing JSX tags: <Component ... />
  content = content.replace(/<[A-Z][A-Za-z0-9.]*\s[^>]*\/>/g, '');
  content = content.replace(/<[A-Z][A-Za-z0-9.]*\s*\/>/g, '');

  // Step 5: Strip JSX opening and closing tags but keep inner content
  // Handle tags like <InlineFilter filters={...}> and </InlineFilter>
  // Also handles <Callout info>, <Callout warning>, etc.
  content = content.replace(
    /<[A-Z][A-Za-z0-9.]*(?:\s+[^>]*)?>|<\/[A-Z][A-Za-z0-9.]*>/g,
    ''
  );

  // Step 6: Strip JSX expression containers like {props.childPageNodes}
  content = content.replace(/\{props\.\w+\}/g, '');
  // Strip other simple JSX expressions that are standalone on a line
  content = content.replace(/^\s*\{[^}]*\}\s*$/gm, '');

  // Step 7: Restore code blocks
  content = content.replace(/__CODE_BLOCK_(\d+)__/g, (_, index) => {
    return codeBlocks[Number(index)];
  });

  // Clean up excessive blank lines (more than 2 consecutive)
  content = content.replace(/\n{4,}/g, '\n\n\n');

  return content.trim();
}

/**
 * Generate YAML frontmatter string from page metadata.
 * @param {object} meta - Extracted meta object
 * @param {string} section - Derived section name
 * @param {string} route - Page route
 * @param {string} lastUpdated - ISO date string or fallback
 * @returns {string}
 */
function generateFrontmatter(meta, section, route, lastUpdated) {
  const title = meta.title || path.basename(route) || 'Untitled';
  const platforms = meta.platforms || [];
  const genVersion = 'gen2';
  const dateStr = lastUpdated || new Date().toISOString();

  const lines = [
    '---',
    `title: "${title.replace(/"/g, '\\"')}"`,
    `section: ${section}`,
    `platforms: [${platforms.join(', ')}]`,
    `genVersion: ${genVersion}`,
    `lastUpdated: "${dateStr}"`,
    `url: "${route}"`,
    '---'
  ];
  return lines.join('\n');
}

/**
 * Process a single MDX file and return its export data.
 * @param {string} filePath - Absolute path to the MDX file
 * @returns {Promise<object|null>}
 */
async function processFile(filePath) {
  let source;
  try {
    source = await fs.readFile(filePath, 'utf-8');
  } catch (err) {
    console.warn(`  Warning: Could not read ${filePath}: ${err.message}`);
    return null;
  }

  const meta = extractMeta(source, filePath);
  if (!meta) {
    console.warn(`  Warning: No meta found in ${filePath}, using fallbacks`);
  }

  const relativePath = path.relative(PLATFORM_DIR, filePath);
  const section = deriveSection(relativePath);
  const route = deriveRoute(relativePath);

  // Use meta values with fallbacks from directory structure
  const effectiveMeta = {
    title: meta?.title || path.basename(path.dirname(filePath)),
    description: meta?.description || '',
    platforms: meta?.platforms || [],
    ...meta
  };

  // Get last modified date from file stat
  let lastUpdated;
  try {
    const stat = await fs.stat(filePath);
    lastUpdated = stat.mtime.toISOString();
  } catch {
    lastUpdated = new Date().toISOString();
  }

  const frontmatter = generateFrontmatter(
    effectiveMeta,
    section,
    route,
    lastUpdated
  );
  const markdownBody = stripMdxToMarkdown(source);

  return {
    title: effectiveMeta.title,
    section,
    route,
    platforms: effectiveMeta.platforms,
    frontmatter,
    markdownBody,
    fullContent: frontmatter + '\n\n' + markdownBody
  };
}

/**
 * Main entry point: traverse MDX files, generate exports.
 */
async function generateMarkdownExport() {
  console.log('Generating markdown export for AI agents...');

  // Find all MDX files
  const mdxFiles = await findMdxFiles(PLATFORM_DIR);
  console.log(`  Found ${mdxFiles.length} MDX files`);

  // Process each file
  const pages = [];
  const skipped = [];

  for (const filePath of mdxFiles) {
    try {
      const result = await processFile(filePath);
      if (result) {
        pages.push(result);
      } else {
        skipped.push(filePath);
      }
    } catch (err) {
      console.warn(`  Warning: Failed to process ${filePath}: ${err.message}`);
      skipped.push(filePath);
    }
  }

  // Sort pages by route for consistent output
  pages.sort((a, b) => a.route.localeCompare(b.route));

  // Ensure output directory exists
  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  // Generate llms.txt (index file with links)
  const indexLines = [
    '# Amplify Documentation',
    '',
    '> AWS Amplify documentation export for AI agents',
    '',
    `> Generated: ${new Date().toISOString()}`,
    '',
    `> Total pages: ${pages.length}`,
    '',
    '## Pages',
    ''
  ];

  for (const page of pages) {
    const url = `${SITE_URL}${page.route.replace('/[platform]/', '/react/')}`;
    indexLines.push(`- [${page.title}](${url})`);
  }

  const indexContent = indexLines.join('\n') + '\n';
  const indexPath = path.join(OUTPUT_DIR, 'llms.txt');
  await fs.writeFile(indexPath, indexContent, 'utf-8');
  console.log(`  Written index to ${indexPath}`);

  // Generate llms-full.txt (full content export)
  const fullParts = [
    '# Amplify Documentation - Full Export',
    '',
    `> Generated: ${new Date().toISOString()}`,
    '',
    `> Total pages: ${pages.length}`,
    ''
  ];

  for (const page of pages) {
    fullParts.push('---');
    fullParts.push('');
    fullParts.push(page.fullContent);
    fullParts.push('');
  }

  const fullContent = fullParts.join('\n');
  const fullPath = path.join(OUTPUT_DIR, 'llms-full.txt');
  await fs.writeFile(fullPath, fullContent, 'utf-8');
  console.log(`  Written full export to ${fullPath}`);

  // Summary
  console.log(`  Processed: ${pages.length} pages`);
  if (skipped.length > 0) {
    console.log(`  Skipped: ${skipped.length} files:`);
    for (const s of skipped) {
      console.log(`    - ${s}`);
    }
  }

  console.log('Markdown export complete.');
}

generateMarkdownExport().catch((err) => {
  console.error('Markdown export failed:', err);
  // Don't fail the build — log and exit gracefully
  process.exit(0);
});
