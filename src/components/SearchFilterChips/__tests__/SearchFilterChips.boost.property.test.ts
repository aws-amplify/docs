// Feature: amplify-docs-restructuring, Property 7: Search platform boosting preserves all results
// **Validates: Requirements 3.3**

import * as fc from 'fast-check';
import { PLATFORMS, Platform } from '@/data/platforms';
import { PlatformFilterMode } from '@/components/SearchFilterChips/SearchFilterChips';

/**
 * Mirrors the search parameter building logic from LayoutHeader.tsx.
 * Given a gen, platform, platform filter mode, and optional section filter,
 * produces the same searchParameters object that DocSearch receives.
 */
function buildSearchParameters(
  isGen1: boolean,
  currentPlatform: Platform,
  platformFilterMode: PlatformFilterMode,
  sectionFilter: string | null
): { facetFilters: string[]; optionalFacetFilters?: string[] } {
  const facetFilters: string[] = [`gen:${isGen1 ? 'gen1' : 'gen2'}`];
  const optionalFacetFilters: string[] = [];

  if (platformFilterMode === 'boost') {
    optionalFacetFilters.push(`platform:${currentPlatform}`);
  } else if (platformFilterMode === 'hard') {
    facetFilters.push(`platform:${currentPlatform}`);
  }
  // 'none' — no platform filter at all

  if (sectionFilter) {
    facetFilters.push(`section:${sectionFilter}`);
  }

  const params: { facetFilters: string[]; optionalFacetFilters?: string[] } = {
    facetFilters
  };
  if (optionalFacetFilters.length > 0) {
    params.optionalFacetFilters = optionalFacetFilters;
  }
  return params;
}

/**
 * Simulates Algolia search result filtering.
 *
 * - facetFilters are HARD filters: a page must match ALL of them to appear.
 * - optionalFacetFilters are BOOST filters: matching pages rank higher,
 *   but non-matching pages are NOT excluded.
 *
 * Given a set of pages (each with facets) and search parameters, returns
 * the set of page IDs that would appear in results.
 */
function simulateSearchResults(
  pages: Array<{ id: string; facets: Record<string, string> }>,
  params: { facetFilters: string[]; optionalFacetFilters?: string[] }
): Set<string> {
  const results = new Set<string>();

  for (const page of pages) {
    // A page must match ALL hard facetFilters to be included
    const matchesAllHard = params.facetFilters.every((filter) => {
      const [key, value] = filter.split(':');
      return page.facets[key] === value;
    });

    if (matchesAllHard) {
      results.add(page.id);
    }
    // optionalFacetFilters only affect ranking, not inclusion
  }

  return results;
}

/**
 * Arbitrary for generating a random search context: gen version, platform,
 * and optional section filter.
 */
const searchContextArbitrary = fc.record({
  isGen1: fc.boolean(),
  platform: fc.constantFrom(...PLATFORMS),
  sectionFilter: fc.option(
    fc.constantFrom(
      'quickstart',
      'frontend',
      'backend',
      'ui',
      'hosting',
      'reference'
    ),
    { nil: null }
  )
});

/**
 * Arbitrary for generating a random corpus of pages with facets.
 * Each page has a gen, platform, and section facet.
 */
const pageCorpusArbitrary = fc.array(
  fc.record({
    id: fc.uuid(),
    facets: fc.record({
      gen: fc.constantFrom('gen1', 'gen2'),
      platform: fc.constantFrom(...PLATFORMS),
      section: fc.constantFrom(
        'quickstart',
        'frontend',
        'backend',
        'ui',
        'hosting',
        'reference'
      )
    })
  }),
  { minLength: 1, maxLength: 50 }
);

describe('Property 7: Search platform boosting preserves all results', () => {
  it('boosted results (optionalFacetFilters) are a superset of hard-filtered results (facetFilters)', () => {
    fc.assert(
      fc.property(
        searchContextArbitrary,
        pageCorpusArbitrary,
        ({ isGen1, platform, sectionFilter }, pages) => {
          // Build search params for boost mode (default behavior)
          const boostParams = buildSearchParameters(
            isGen1,
            platform,
            'boost',
            sectionFilter
          );

          // Build search params for hard filter mode
          const hardParams = buildSearchParameters(
            isGen1,
            platform,
            'hard',
            sectionFilter
          );

          // Simulate search results for both modes
          const boostResults = simulateSearchResults(pages, boostParams);
          const hardResults = simulateSearchResults(pages, hardParams);

          // Every result from hard filtering must also appear in boost results.
          // Boost mode should never exclude results that hard mode includes,
          // because boost only affects ranking, not inclusion.
          for (const id of hardResults) {
            expect(boostResults.has(id)).toBe(true);
          }

          // Boost results should be >= hard results in size
          expect(boostResults.size).toBeGreaterThanOrEqual(hardResults.size);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('boost mode does not add platform to hard facetFilters', () => {
    fc.assert(
      fc.property(
        searchContextArbitrary,
        ({ isGen1, platform, sectionFilter }) => {
          const boostParams = buildSearchParameters(
            isGen1,
            platform,
            'boost',
            sectionFilter
          );

          // In boost mode, no facetFilter entry should contain a platform filter.
          // Platform should only appear in optionalFacetFilters.
          const hasPlatformInHardFilters = boostParams.facetFilters.some(
            (filter) => filter.startsWith('platform:')
          );
          expect(hasPlatformInHardFilters).toBe(false);

          // Platform should be present in optionalFacetFilters
          expect(boostParams.optionalFacetFilters).toBeDefined();
          expect(boostParams.optionalFacetFilters).toContain(
            `platform:${platform}`
          );
        }
      ),
      { numRuns: 100 }
    );
  });

  it('hard mode places platform in facetFilters and has no optionalFacetFilters for platform', () => {
    fc.assert(
      fc.property(
        searchContextArbitrary,
        ({ isGen1, platform, sectionFilter }) => {
          const hardParams = buildSearchParameters(
            isGen1,
            platform,
            'hard',
            sectionFilter
          );

          // In hard mode, platform should be in facetFilters
          expect(hardParams.facetFilters).toContain(`platform:${platform}`);

          // No optionalFacetFilters should exist (or should not contain platform)
          if (hardParams.optionalFacetFilters) {
            const hasPlatformInOptional = hardParams.optionalFacetFilters.some(
              (filter) => filter.startsWith('platform:')
            );
            expect(hasPlatformInOptional).toBe(false);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it('"none" mode excludes platform from both facetFilters and optionalFacetFilters', () => {
    fc.assert(
      fc.property(
        searchContextArbitrary,
        ({ isGen1, platform, sectionFilter }) => {
          const noneParams = buildSearchParameters(
            isGen1,
            platform,
            'none',
            sectionFilter
          );

          // No platform filter in facetFilters
          const hasPlatformInHard = noneParams.facetFilters.some((filter) =>
            filter.startsWith('platform:')
          );
          expect(hasPlatformInHard).toBe(false);

          // No optionalFacetFilters at all (or none with platform)
          if (noneParams.optionalFacetFilters) {
            const hasPlatformInOptional = noneParams.optionalFacetFilters.some(
              (filter) => filter.startsWith('platform:')
            );
            expect(hasPlatformInOptional).toBe(false);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it('gen filter is always a hard filter regardless of platform filter mode', () => {
    fc.assert(
      fc.property(
        fc.tuple(
          searchContextArbitrary,
          fc.constantFrom<PlatformFilterMode>('boost', 'hard', 'none')
        ),
        ([{ isGen1, platform, sectionFilter }, mode]) => {
          const params = buildSearchParameters(
            isGen1,
            platform,
            mode,
            sectionFilter
          );

          const expectedGen = isGen1 ? 'gen:gen1' : 'gen:gen2';

          // Gen should always be in hard facetFilters
          expect(params.facetFilters).toContain(expectedGen);

          // Gen should never be in optionalFacetFilters
          if (params.optionalFacetFilters) {
            const hasGenInOptional = params.optionalFacetFilters.some(
              (filter) => filter.startsWith('gen:')
            );
            expect(hasGenInOptional).toBe(false);
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});
