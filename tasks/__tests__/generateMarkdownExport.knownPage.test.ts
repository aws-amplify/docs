// Unit test: Markdown export of a known page
// **Validates: Requirements 4.1, 4.2, 4.5**

import * as fs from 'fs';
import * as path from 'path';

/**
 * Mirrors extractMeta() from generateMarkdownExport.mjs.
 * Extracts the meta object from MDX source using regex + JSON5-style parsing.
 */
function extractMeta(
  source: string
): { title?: string; description?: string; platforms?: string[] } | null {
  const regex = /const\s+meta\s*=\s*(\{[\s\S]*?\n\};)/;
  const match = source.match(regex);
  if (!match || !match[1]) return null;

  try {
    const metaStr = match[1].replaceAll('`', "'").replaceAll(';', '');
    // Simple extraction via regex instead of JSON5 dependency
    const titleMatch = metaStr.match(/title:\s*['"](.+?)['"]/);
    const descMatch = metaStr.match(/description:\s*\n?\s*['"](.+?)['"]/s);
    const platformsMatch = metaStr.match(/platforms:\s*\[([\s\S]*?)\]/);

    const platforms = platformsMatch
      ? platformsMatch[1]
          .split(',')
          .map((p) => p.trim().replace(/['"]/g, ''))
          .filter(Boolean)
      : [];

    return {
      title: titleMatch ? titleMatch[1] : undefined,
      description: descMatch ? descMatch[1] : undefined,
      platforms
    };
  } catch {
    return null;
  }
}

/**
 * Mirrors deriveSection() from generateMarkdownExport.mjs.
 */
function deriveSection(relativePath: string): string {
  const sectionMap: Record<string, string> = {
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
  const firstSegment = relativePath.split(/[\\/]/)[0];
  return sectionMap[firstSegment] || 'reference';
}

/**
 * Mirrors deriveRoute() from generateMarkdownExport.mjs.
 */
function deriveRoute(relativePath: string): string {
  const posixPath = relativePath.split(/[\\/]/).join('/');
  const lastSlash = posixPath.lastIndexOf('/');
  const dir = lastSlash >= 0 ? posixPath.substring(0, lastSlash) : '';
  const basename = posixPath.substring(lastSlash + 1).replace(/\.mdx$/, '');
  if (basename === 'index') {
    return '/[platform]/' + dir;
  }
  return '/[platform]/' + (dir ? dir + '/' : '') + basename;
}

/**
 * Mirrors generateFrontmatter() from generateMarkdownExport.mjs.
 */
function generateFrontmatter(
  meta: { title?: string; platforms?: string[] },
  section: string,
  route: string,
  lastUpdated: string
): string {
  const title = meta.title || route.split('/').pop() || 'Untitled';
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
 * Mirrors stripMdxToMarkdown() from generateMarkdownExport.mjs.
 */
function stripMdxToMarkdown(source: string): string {
  const codeBlocks: string[] = [];

  let content = source.replace(/^(```[\s\S]*?^```)/gm, (match) => {
    const index = codeBlocks.length;
    codeBlocks.push(match);
    return `__CODE_BLOCK_${index}__`;
  });

  content = content.replace(/^import\s+.*$/gm, '');
  content = content.replace(
    /^export\s+const\s+meta\s*=\s*\{[\s\S]*?\n\};?\s*$/gm,
    ''
  );
  content = content.replace(
    /^export\s+(const|function|async\s+function)\s+\w+[\s\S]*?^\}\s*$/gm,
    ''
  );
  content = content.replace(/^export\s+.*$/gm, '');
  content = content.replace(/<[A-Z][A-Za-z0-9.]*\s[^>]*\/>/g, '');
  content = content.replace(/<[A-Z][A-Za-z0-9.]*\s*\/>/g, '');
  content = content.replace(
    /<[A-Z][A-Za-z0-9.]*(?:\s+[^>]*)?>|<\/[A-Z][A-Za-z0-9.]*>/g,
    ''
  );
  content = content.replace(/\{props\.\w+\}/g, '');
  content = content.replace(/^\s*\{[^}]*\}\s*$/gm, '');
  content = content.replace(/__CODE_BLOCK_(\d+)__/g, (_, index) => {
    return codeBlocks[Number(index)];
  });
  content = content.replace(/\n{4,}/g, '\n\n\n');

  return content.trim();
}

/**
 * Parses YAML-like frontmatter delimited by --- markers.
 */
function parseFrontmatter(frontmatter: string): Record<string, string> {
  const lines = frontmatter.split('\n');
  const result: Record<string, string> = {};
  for (const line of lines) {
    if (line.trim() === '---') continue;
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;
    const key = line.substring(0, colonIdx).trim();
    const value = line.substring(colonIdx + 1).trim();
    result[key] = value;
  }
  return result;
}

/**
 * Extracts all fenced code blocks from content.
 * Handles MDX-style code blocks that may have attributes after the language
 * annotation, e.g. ```ts title="file.ts" showLineNumbers={false}
 */
function extractCodeBlocks(
  content: string
): Array<{ lang: string; body: string }> {
  const blocks: Array<{ lang: string; body: string }> = [];
  const regex = /^```(\w*)[^\n]*\n([\s\S]*?)^```/gm;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(content)) !== null) {
    blocks.push({ lang: match[1], body: match[2] });
  }
  return blocks;
}

// ─── Known page: src/pages/[platform]/build-a-backend/auth/set-up-auth/index.mdx ───

const KNOWN_PAGE_PATH = path.resolve(
  __dirname,
  '../../src/pages/[platform]/build-a-backend/auth/set-up-auth/index.mdx'
);
const PLATFORM_DIR = path.resolve(__dirname, '../../src/pages/[platform]');

describe('Unit test: markdown export of a known page (set-up-auth)', () => {
  let source: string;
  let meta: ReturnType<typeof extractMeta>;
  let relativePath: string;
  let section: string;
  let route: string;
  let frontmatterStr: string;
  let parsed: Record<string, string>;
  let markdownBody: string;

  beforeAll(() => {
    source = fs.readFileSync(KNOWN_PAGE_PATH, 'utf-8');
    meta = extractMeta(source);
    relativePath = path.relative(PLATFORM_DIR, KNOWN_PAGE_PATH);
    section = deriveSection(relativePath);
    route = deriveRoute(relativePath);
    const lastUpdated = fs.statSync(KNOWN_PAGE_PATH).mtime.toISOString();
    frontmatterStr = generateFrontmatter(
      { title: meta?.title, platforms: meta?.platforms },
      section,
      route,
      lastUpdated
    );
    parsed = parseFrontmatter(frontmatterStr);
    markdownBody = stripMdxToMarkdown(source);
  });

  // ── Requirement 4.1, 4.2: Frontmatter correctness ──

  it('extracts the meta object with title and platforms', () => {
    expect(meta).not.toBeNull();
    expect(meta!.title).toBe('Set up Amplify Auth');
    expect(meta!.platforms).toEqual(
      expect.arrayContaining([
        'react',
        'angular',
        'swift',
        'flutter',
        'android'
      ])
    );
    expect(meta!.platforms!.length).toBeGreaterThanOrEqual(9);
  });

  it('produces frontmatter with all required fields', () => {
    expect(parsed).toHaveProperty('title');
    expect(parsed).toHaveProperty('section');
    expect(parsed).toHaveProperty('platforms');
    expect(parsed).toHaveProperty('genVersion');
    expect(parsed).toHaveProperty('lastUpdated');
    expect(parsed).toHaveProperty('url');
  });

  it('frontmatter title matches the page meta title', () => {
    expect(parsed['title']).toBe('"Set up Amplify Auth"');
  });

  it('frontmatter section is "backend" for build-a-backend pages', () => {
    expect(parsed['section']).toBe('backend');
  });

  it('frontmatter genVersion is "gen2"', () => {
    expect(parsed['genVersion']).toBe('gen2');
  });

  it('frontmatter platforms contains all expected platforms', () => {
    const platformsStr = parsed['platforms'];
    expect(platformsStr).toMatch(/^\[.+\]$/);
    expect(platformsStr).toContain('react');
    expect(platformsStr).toContain('swift');
    expect(platformsStr).toContain('flutter');
    expect(platformsStr).toContain('android');
  });

  it('frontmatter lastUpdated is a valid ISO date', () => {
    const dateStr = parsed['lastUpdated'].replace(/^"|"$/g, '');
    const date = new Date(dateStr);
    expect(date.toString()).not.toBe('Invalid Date');
    expect(dateStr).toMatch(/^\d{4}-\d{2}-\d{2}T/);
  });

  it('frontmatter url matches the expected route', () => {
    const url = parsed['url'].replace(/^"|"$/g, '');
    expect(url).toBe('/[platform]/build-a-backend/auth/set-up-auth');
  });

  // ── Requirement 4.5: Code block preservation ──

  it('preserves code blocks with language annotations', () => {
    const blocks = extractCodeBlocks(markdownBody);
    expect(blocks.length).toBeGreaterThan(0);

    // The page has ts, bash, html, css, kotlin, dart, swift, yaml code blocks
    const langs = blocks.map((b) => b.lang);
    expect(langs).toContain('ts');
    expect(langs).toContain('bash');
  });

  it('preserves the first TypeScript code block content (defineAuth)', () => {
    const blocks = extractCodeBlocks(markdownBody);
    const tsBlocks = blocks.filter((b) => b.lang === 'ts');
    expect(tsBlocks.length).toBeGreaterThan(0);

    // The first ts block defines the auth resource with defineAuth
    const firstTs = tsBlocks[0].body;
    expect(firstTs).toContain('defineAuth');
    expect(firstTs).toContain('loginWith');
  });

  // ── JSX stripping ──

  it('strips JSX components from the output', () => {
    expect(markdownBody).not.toMatch(/<InlineFilter\b/);
    expect(markdownBody).not.toMatch(/<\/InlineFilter>/);
    expect(markdownBody).not.toMatch(/<Callout\b/);
    expect(markdownBody).not.toMatch(/<\/Callout>/);
    expect(markdownBody).not.toMatch(/<BlockSwitcher\b/);
    expect(markdownBody).not.toMatch(/<\/BlockSwitcher>/);
    expect(markdownBody).not.toMatch(/<Block\b/);
    expect(markdownBody).not.toMatch(/<\/Block>/);
  });

  it('strips top-level MDX import statements from the output', () => {
    // MDX-level imports like "import { getCustomStaticPath } from ..." should be stripped
    // but imports inside code blocks (e.g. TypeScript examples) are preserved
    expect(markdownBody).not.toContain('getCustomStaticPath');
  });

  it('strips export statements from the output', () => {
    expect(markdownBody).not.toMatch(/^export\s+const\s+meta/m);
    expect(markdownBody).not.toMatch(/^export\s+function\s+getStaticPaths/m);
    expect(markdownBody).not.toMatch(/^export\s+function\s+getStaticProps/m);
  });

  it('preserves plain text content from the page', () => {
    expect(markdownBody).toContain('Amplify Auth is powered by');
    expect(markdownBody).toContain('Amazon Cognito');
    expect(markdownBody).toContain('Deploy auth resource');
  });
});
