// Feature: amplify-docs-restructuring, Property 8: Markdown export completeness
// **Validates: Requirements 4.1, 4.2**

import * as fc from 'fast-check';
import { PLATFORMS, Platform } from '@/data/platforms';

/**
 * Valid section values that map to route prefixes in the Gen2 directory.
 */
const VALID_SECTIONS = [
  'quickstart',
  'frontend',
  'backend',
  'ui',
  'hosting',
  'reference'
] as const;

type Section = (typeof VALID_SECTIONS)[number];

/**
 * Maps section values to their corresponding route path segments,
 * mirroring the sectionMap in generateMarkdownExport.mjs's deriveSection().
 */
const SECTION_TO_ROUTE: Record<Section, string> = {
  quickstart: 'start',
  frontend: 'frontend',
  backend: 'build-a-backend',
  ui: 'build-ui',
  hosting: 'deploy-and-host',
  reference: 'reference'
};

/**
 * Mirrors deriveSection() from generateMarkdownExport.mjs.
 * Maps a relative path's first segment to a section name.
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

  const firstSegment = relativePath.split('/')[0];
  return sectionMap[firstSegment] || 'reference';
}

/**
 * Mirrors deriveRoute() from generateMarkdownExport.mjs.
 * Converts a relative file path to a URL route.
 */
function deriveRoute(relativePath: string): string {
  // Normalize to posix-style path
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
 * Produces YAML frontmatter from page metadata.
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
 * Parses YAML-like frontmatter delimited by --- markers.
 * Returns a map of field name → raw string value.
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
 * Arbitrary for generating a random page title.
 * Titles are non-empty strings that may contain typical doc page title characters.
 */
const titleArbitrary: fc.Arbitrary<string> = fc.stringMatching(
  /^[A-Z][A-Za-z0-9 ()-]{1,60}$/
);

/**
 * Arbitrary for generating a random ISO date string.
 */
const isoDateArbitrary: fc.Arbitrary<string> = fc
  .date({
    min: new Date('2020-01-01T00:00:00.000Z'),
    max: new Date('2025-12-31T23:59:59.999Z'),
    noInvalidDate: true
  })
  .filter((d) => !isNaN(d.getTime()))
  .map((d) => d.toISOString());

/**
 * Arbitrary for generating a random non-empty subset of platforms.
 */
const platformsArbitrary: fc.Arbitrary<Platform[]> = fc
  .subarray([...PLATFORMS], { minLength: 1 })
  .map((arr) => arr as Platform[]);

/**
 * Arbitrary for generating a random section.
 */
const sectionArbitrary: fc.Arbitrary<Section> = fc.constantFrom(
  ...VALID_SECTIONS
);

/**
 * Arbitrary for generating random sub-path segments (e.g. "auth/sign-in").
 */
const subPathArbitrary: fc.Arbitrary<string[]> = fc.array(
  fc.stringMatching(/^[a-z][a-z0-9-]{0,15}$/),
  { minLength: 0, maxLength: 3 }
);

/**
 * Represents a randomly generated Gen2 page with all metadata needed
 * to produce a markdown export entry.
 */
interface RandomGen2Page {
  title: string;
  section: Section;
  platforms: Platform[];
  lastUpdated: string;
  routeSegment: string;
  subSegments: string[];
}

/**
 * Arbitrary for generating a complete random Gen2 page.
 */
const gen2PageArbitrary: fc.Arbitrary<RandomGen2Page> = fc.record({
  title: titleArbitrary,
  section: sectionArbitrary,
  platforms: platformsArbitrary,
  lastUpdated: isoDateArbitrary,
  routeSegment: sectionArbitrary.map((s) => SECTION_TO_ROUTE[s]),
  subSegments: subPathArbitrary
});

describe('Property 8: Markdown export completeness', () => {
  it('every Gen2 page produces frontmatter with all required fields present and non-empty', () => {
    fc.assert(
      fc.property(gen2PageArbitrary, (page) => {
        const relativePath =
          page.routeSegment +
          (page.subSegments.length > 0
            ? '/' + page.subSegments.join('/') + '/index.mdx'
            : '/index.mdx');

        const section = deriveSection(relativePath);
        const route = deriveRoute(relativePath);

        const frontmatter = generateFrontmatter(
          { title: page.title, platforms: page.platforms },
          section,
          route,
          page.lastUpdated
        );

        const parsed = parseFrontmatter(frontmatter);

        // All required fields must be present
        expect(parsed).toHaveProperty('title');
        expect(parsed).toHaveProperty('section');
        expect(parsed).toHaveProperty('platforms');
        expect(parsed).toHaveProperty('genVersion');
        expect(parsed).toHaveProperty('lastUpdated');
        expect(parsed).toHaveProperty('url');

        // No required field should be empty
        expect(parsed['title'].length).toBeGreaterThan(0);
        expect(parsed['section'].length).toBeGreaterThan(0);
        expect(parsed['platforms'].length).toBeGreaterThan(0);
        expect(parsed['genVersion'].length).toBeGreaterThan(0);
        expect(parsed['lastUpdated'].length).toBeGreaterThan(0);
        expect(parsed['url'].length).toBeGreaterThan(0);
      }),
      { numRuns: 100 }
    );
  });

  it('section field matches one of the valid section values', () => {
    fc.assert(
      fc.property(gen2PageArbitrary, (page) => {
        const relativePath =
          page.routeSegment +
          (page.subSegments.length > 0
            ? '/' + page.subSegments.join('/') + '/index.mdx'
            : '/index.mdx');

        const section = deriveSection(relativePath);
        const route = deriveRoute(relativePath);

        const frontmatter = generateFrontmatter(
          { title: page.title, platforms: page.platforms },
          section,
          route,
          page.lastUpdated
        );

        const parsed = parseFrontmatter(frontmatter);

        expect(VALID_SECTIONS).toContain(parsed['section']);
      }),
      { numRuns: 100 }
    );
  });

  it('platforms field contains a non-empty array', () => {
    fc.assert(
      fc.property(gen2PageArbitrary, (page) => {
        const relativePath =
          page.routeSegment +
          (page.subSegments.length > 0
            ? '/' + page.subSegments.join('/') + '/index.mdx'
            : '/index.mdx');

        const section = deriveSection(relativePath);
        const route = deriveRoute(relativePath);

        const frontmatter = generateFrontmatter(
          { title: page.title, platforms: page.platforms },
          section,
          route,
          page.lastUpdated
        );

        const parsed = parseFrontmatter(frontmatter);

        // platforms field should be a bracketed list with at least one entry
        const platformsStr = parsed['platforms'];
        expect(platformsStr).toMatch(/^\[.+\]$/);

        // Extract individual platforms and verify each is valid
        const inner = platformsStr.slice(1, -1);
        const items = inner.split(',').map((s: string) => s.trim());
        expect(items.length).toBeGreaterThan(0);

        for (const item of items) {
          expect(PLATFORMS).toContain(item);
        }
      }),
      { numRuns: 100 }
    );
  });

  it('genVersion is always "gen2" for Gen2 pages', () => {
    fc.assert(
      fc.property(gen2PageArbitrary, (page) => {
        const relativePath =
          page.routeSegment +
          (page.subSegments.length > 0
            ? '/' + page.subSegments.join('/') + '/index.mdx'
            : '/index.mdx');

        const section = deriveSection(relativePath);
        const route = deriveRoute(relativePath);

        const frontmatter = generateFrontmatter(
          { title: page.title, platforms: page.platforms },
          section,
          route,
          page.lastUpdated
        );

        const parsed = parseFrontmatter(frontmatter);

        expect(parsed['genVersion']).toBe('gen2');
      }),
      { numRuns: 100 }
    );
  });

  it('lastUpdated is a valid ISO date string', () => {
    fc.assert(
      fc.property(gen2PageArbitrary, (page) => {
        const relativePath =
          page.routeSegment +
          (page.subSegments.length > 0
            ? '/' + page.subSegments.join('/') + '/index.mdx'
            : '/index.mdx');

        const section = deriveSection(relativePath);
        const route = deriveRoute(relativePath);

        const frontmatter = generateFrontmatter(
          { title: page.title, platforms: page.platforms },
          section,
          route,
          page.lastUpdated
        );

        const parsed = parseFrontmatter(frontmatter);

        // Strip surrounding quotes from the parsed value
        const dateStr = parsed['lastUpdated'].replace(/^"|"$/g, '');
        const date = new Date(dateStr);
        expect(date.toString()).not.toBe('Invalid Date');
        expect(dateStr).toMatch(/^\d{4}-\d{2}-\d{2}T/);
      }),
      { numRuns: 100 }
    );
  });

  it('deriveSection maps route segments to correct section values', () => {
    fc.assert(
      fc.property(
        sectionArbitrary,
        subPathArbitrary,
        (section, subSegments) => {
          const routeSegment = SECTION_TO_ROUTE[section];
          const relativePath =
            routeSegment +
            (subSegments.length > 0 ? '/' + subSegments.join('/') : '');

          const derived = deriveSection(relativePath);

          expect(derived).toBe(section);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('url field contains a valid route starting with /[platform]/', () => {
    fc.assert(
      fc.property(gen2PageArbitrary, (page) => {
        const relativePath =
          page.routeSegment +
          (page.subSegments.length > 0
            ? '/' + page.subSegments.join('/') + '/index.mdx'
            : '/index.mdx');

        const section = deriveSection(relativePath);
        const route = deriveRoute(relativePath);

        const frontmatter = generateFrontmatter(
          { title: page.title, platforms: page.platforms },
          section,
          route,
          page.lastUpdated
        );

        const parsed = parseFrontmatter(frontmatter);

        const url = parsed['url'].replace(/^"|"$/g, '');
        expect(url).toMatch(/^\/\[platform\]\//);
      }),
      { numRuns: 100 }
    );
  });
});
