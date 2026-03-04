// Feature: amplify-docs-restructuring, Property 6: Search metadata completeness
// **Validates: Requirements 3.1**

import * as fc from 'fast-check';
import { PLATFORMS, Platform } from '@/data/platforms';
import {
  GEN2_SECTIONS,
  resolveSection
} from '@/components/SectionContext/SectionContext';

/**
 * Valid values for the section facet in the search index.
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
 * Valid values for the gen facet in the search index.
 */
const VALID_GENS = ['gen1', 'gen2'] as const;
type Gen = (typeof VALID_GENS)[number];

/**
 * Represents the search facets that Algolia indexes for each page.
 * Every page in the search index must have all three facets populated.
 */
interface SearchFacets {
  platform: Platform;
  gen: Gen;
  section: Section;
}

/**
 * Simplified PageNode for testing — mirrors the fields relevant to
 * search metadata derivation from the PageNode type in directory.d.ts.
 */
interface TestPageNode {
  route: string;
  platforms: Platform[];
  section?: Section;
  genVersion?: 'gen1' | 'gen2' | 'both';
}

/**
 * Derives the gen facet from a page node.
 *
 * - If genVersion is explicitly set, use it (mapping 'both' to 'gen2' as
 *   the primary/default experience per Requirement 6.2).
 * - If the route contains '/gen1/', it's a Gen1 page.
 * - Otherwise, default to 'gen2'.
 */
function deriveGenFacet(node: TestPageNode): Gen {
  if (node.genVersion === 'gen1') return 'gen1';
  if (node.genVersion === 'gen2' || node.genVersion === 'both') return 'gen2';

  // Fallback: infer from route
  if (node.route.includes('/gen1/')) return 'gen1';
  return 'gen2';
}

/**
 * Derives the section facet from a page node.
 *
 * - If the node has an explicit section field, use it.
 * - Otherwise, attempt to resolve from the route using the same logic
 *   as the SectionContext (prefix-matching against GEN2_SECTIONS).
 * - Falls back to 'reference' if no section can be determined (per the
 *   error handling spec: "assigns defaults section: 'reference'").
 */
function deriveSectionFacet(node: TestPageNode): Section {
  if (node.section) return node.section;

  // Try to resolve from route using the same logic as SectionContext
  const resolved = resolveSection(node.route);
  if (resolved) {
    // Map the routePrefix to a section value
    const sectionMap: Record<string, Section> = {};
    for (const s of GEN2_SECTIONS) {
      // Extract the section key from the routePrefix
      // e.g. '/[platform]/start' → 'quickstart'
      // e.g. '/[platform]/build-a-backend' → 'backend'
      const lastSegment = s.routePrefix.split('/').pop() || '';
      if (s.label === 'Quickstart') sectionMap[s.routePrefix] = 'quickstart';
      else if (s.label === 'Frontend Libraries')
        sectionMap[s.routePrefix] = 'frontend';
      else if (s.label === 'Build a Backend')
        sectionMap[s.routePrefix] = 'backend';
      else if (s.label === 'UI Library') sectionMap[s.routePrefix] = 'ui';
      else if (s.label === 'Hosting') sectionMap[s.routePrefix] = 'hosting';
      else if (s.label === 'Reference') sectionMap[s.routePrefix] = 'reference';
    }
    const mapped = sectionMap[resolved.routePrefix];
    if (mapped) return mapped;
  }

  // Default fallback per error handling spec
  return 'reference';
}

/**
 * Derives all search facets for a page node.
 * Returns one SearchFacets entry per platform the page supports.
 */
function deriveSearchFacets(node: TestPageNode): SearchFacets[] {
  const gen = deriveGenFacet(node);
  const section = deriveSectionFacet(node);

  return node.platforms.map((platform) => ({
    platform,
    gen,
    section
  }));
}

/**
 * Arbitrary for generating a random Gen2 page node with explicit section.
 * These represent pages that have been properly tagged with section metadata.
 */
const gen2PageWithSectionArbitrary: fc.Arbitrary<TestPageNode> = fc.record({
  route: fc
    .tuple(
      fc.constantFrom(...PLATFORMS),
      fc.constantFrom(...VALID_SECTIONS),
      fc.array(fc.stringMatching(/^[a-z][a-z0-9-]{0,12}$/), {
        minLength: 0,
        maxLength: 3
      })
    )
    .map(([platform, section, subSegments]) => {
      // Map section values to route prefixes
      const sectionToRoute: Record<Section, string> = {
        quickstart: 'start',
        frontend: 'frontend',
        backend: 'build-a-backend',
        ui: 'build-ui',
        hosting: 'deploy-and-host',
        reference: 'reference'
      };
      const routeSection = sectionToRoute[section];
      const subPath = subSegments.length > 0 ? '/' + subSegments.join('/') : '';
      return `/${platform}/${routeSection}${subPath}`;
    }),
  platforms: fc
    .subarray([...PLATFORMS], { minLength: 1 })
    .map((arr) => arr as Platform[]),
  section: fc.constantFrom(...VALID_SECTIONS),
  genVersion: fc.constantFrom<'gen1' | 'gen2' | 'both'>('gen2', 'both')
});

/**
 * Arbitrary for generating a random Gen1 page node.
 */
const gen1PageArbitrary: fc.Arbitrary<TestPageNode> = fc.record({
  route: fc
    .tuple(
      fc.constantFrom(...PLATFORMS),
      fc.array(fc.stringMatching(/^[a-z][a-z0-9-]{0,12}$/), {
        minLength: 1,
        maxLength: 4
      })
    )
    .map(([platform, segments]) => `/gen1/${platform}/${segments.join('/')}`),
  platforms: fc
    .subarray([...PLATFORMS], { minLength: 1 })
    .map((arr) => arr as Platform[]),
  section: fc.constant(undefined),
  genVersion: fc.constant<'gen1'>('gen1')
});

/**
 * Arbitrary for generating a random Gen2 page node WITHOUT explicit section
 * (section must be derived from the route).
 */
const gen2PageWithoutSectionArbitrary: fc.Arbitrary<TestPageNode> = fc.record({
  route: fc
    .tuple(
      fc.constantFrom(...PLATFORMS),
      fc.constantFrom(
        'start',
        'frontend',
        'build-a-backend',
        'build-ui',
        'deploy-and-host',
        'reference'
      ),
      fc.array(fc.stringMatching(/^[a-z][a-z0-9-]{0,12}$/), {
        minLength: 0,
        maxLength: 3
      })
    )
    .map(([platform, routeSection, subSegments]) => {
      const subPath = subSegments.length > 0 ? '/' + subSegments.join('/') : '';
      return `/${platform}/${routeSection}${subPath}`;
    }),
  platforms: fc
    .subarray([...PLATFORMS], { minLength: 1 })
    .map((arr) => arr as Platform[]),
  section: fc.constant(undefined),
  genVersion: fc.constantFrom<'gen2' | 'both'>('gen2', 'both')
});

/**
 * Combined arbitrary that generates any kind of page node (Gen1 or Gen2,
 * with or without explicit section).
 */
const anyPageArbitrary: fc.Arbitrary<TestPageNode> = fc.oneof(
  gen2PageWithSectionArbitrary,
  gen2PageWithoutSectionArbitrary,
  gen1PageArbitrary
);

describe('Property 6: Search metadata completeness', () => {
  it('every page node produces search facets with valid gen, platform, and section values', () => {
    fc.assert(
      fc.property(anyPageArbitrary, (page) => {
        const facetEntries = deriveSearchFacets(page);

        // Must produce at least one facet entry (one per platform)
        expect(facetEntries.length).toBeGreaterThan(0);
        expect(facetEntries.length).toBe(page.platforms.length);

        for (const facets of facetEntries) {
          // gen facet must be a valid value
          expect(VALID_GENS).toContain(facets.gen);

          // platform facet must be a valid platform
          expect(PLATFORMS).toContain(facets.platform);

          // section facet must be a valid section
          expect(VALID_SECTIONS).toContain(facets.section);
        }
      }),
      { numRuns: 100 }
    );
  });

  it('Gen1 pages always have gen facet set to "gen1"', () => {
    fc.assert(
      fc.property(gen1PageArbitrary, (page) => {
        const facetEntries = deriveSearchFacets(page);

        for (const facets of facetEntries) {
          expect(facets.gen).toBe('gen1');
        }
      }),
      { numRuns: 100 }
    );
  });

  it('Gen2 pages always have gen facet set to "gen2"', () => {
    fc.assert(
      fc.property(gen2PageWithSectionArbitrary, (page) => {
        const facetEntries = deriveSearchFacets(page);

        for (const facets of facetEntries) {
          expect(facets.gen).toBe('gen2');
        }
      }),
      { numRuns: 100 }
    );
  });

  it('pages with explicit section have that section in their facets', () => {
    fc.assert(
      fc.property(gen2PageWithSectionArbitrary, (page) => {
        const facetEntries = deriveSearchFacets(page);

        for (const facets of facetEntries) {
          expect(facets.section).toBe(page.section);
        }
      }),
      { numRuns: 100 }
    );
  });

  it('pages without explicit section derive a valid section from their route', () => {
    // Map route path segments to expected section values
    const routeSegmentToSection: Record<string, Section> = {
      start: 'quickstart',
      frontend: 'frontend',
      'build-a-backend': 'backend',
      'build-ui': 'ui',
      'deploy-and-host': 'hosting',
      reference: 'reference'
    };

    fc.assert(
      fc.property(gen2PageWithoutSectionArbitrary, (page) => {
        const facetEntries = deriveSearchFacets(page);

        // Extract the route section segment (second path segment after platform)
        const segments = page.route.split('/').filter(Boolean);
        const routeSegment = segments.length >= 2 ? segments[1] : '';
        const expectedSection = routeSegmentToSection[routeSegment];

        for (const facets of facetEntries) {
          // Section must be one of the valid values
          expect(VALID_SECTIONS).toContain(facets.section);

          // The derived section should match what we expect from the route
          if (expectedSection) {
            expect(facets.section).toBe(expectedSection);
          }
        }
      }),
      { numRuns: 100 }
    );
  });

  it('each platform in the page produces exactly one facet entry', () => {
    fc.assert(
      fc.property(anyPageArbitrary, (page) => {
        const facetEntries = deriveSearchFacets(page);

        // One entry per platform
        const facetPlatforms = facetEntries.map((f) => f.platform);
        expect(facetPlatforms).toEqual(page.platforms);

        // No duplicate platforms
        const uniquePlatforms = new Set(facetPlatforms);
        expect(uniquePlatforms.size).toBe(facetPlatforms.length);
      }),
      { numRuns: 100 }
    );
  });
});
