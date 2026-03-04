// Feature: amplify-docs-restructuring, Property 1: Section-to-sidebar mapping
// **Validates: Requirements 1.3, 1.5, 1.6**

import * as fc from 'fast-check';
import {
  resolveSection,
  GEN2_SECTIONS,
  TopNavSection
} from '@/components/SectionContext/SectionContext';
import { PLATFORMS } from '@/data/platforms';
import { findDirectoryNode } from '@/utils/findDirectoryNode';
import type { PageNode } from '@/directory/directory.d';

/**
 * Recursively collect all routes from a directory subtree.
 */
function collectRoutes(node: PageNode): string[] {
  const routes: string[] = [];
  if (node.route) {
    routes.push(node.route);
  }
  if (node.children) {
    for (const child of node.children) {
      routes.push(...collectRoutes(child));
    }
  }
  return routes;
}

/**
 * Replaces the [platform] placeholder in a route prefix with the actual
 * platform string, mirroring the logic in Menu.tsx.
 */
function resolvePrefixWithPlatform(
  routePrefix: string,
  platform: string
): string {
  return routePrefix.replace('[platform]', platform);
}

/**
 * Arbitrary that generates random Gen2 section + platform pairs.
 * Each generated value includes the section, a platform, and the
 * resolved route prefix that the Menu component would use to call
 * findDirectoryNode.
 */
const sectionPlatformArbitrary = fc
  .tuple(fc.constantFrom(...GEN2_SECTIONS), fc.constantFrom(...PLATFORMS))
  .map(([section, platform]) => ({
    section,
    platform,
    resolvedPrefix: resolvePrefixWithPlatform(section.routePrefix, platform)
  }));

/**
 * Given a route and a platform, determine which section's routePrefix
 * the route falls under (if any). Returns the matching section or null.
 */
function findOwningSection(
  route: string,
  platform: string
): TopNavSection | null {
  for (const section of GEN2_SECTIONS) {
    const resolved = resolvePrefixWithPlatform(section.routePrefix, platform);
    if (route === resolved || route.startsWith(resolved + '/')) {
      return section;
    }
  }
  return null;
}

describe('Property 1: Section-to-sidebar mapping', () => {
  it('sidebar subtree for a section contains only pages from that section (no cross-section leakage)', () => {
    fc.assert(
      fc.property(sectionPlatformArbitrary, ({ resolvedPrefix }) => {
        const rootNode = findDirectoryNode(resolvedPrefix);

        // If findDirectoryNode returns null for this section+platform combo,
        // the sidebar would render empty — this is acceptable behavior per
        // the Menu component's fallback. Skip the subtree assertions.
        if (rootNode === null) {
          return;
        }

        const subtreeRoutes = collectRoutes(rootNode);

        // Every route in the subtree should either:
        // 1. Be the section root itself, OR
        // 2. Start with the section's resolved prefix + '/'
        // This ensures no pages from other sections leak into this sidebar.
        for (const route of subtreeRoutes) {
          // Skip external links (URLs starting with http)
          if (route.startsWith('http')) continue;

          const belongsToSection =
            route === resolvedPrefix || route.startsWith(resolvedPrefix + '/');

          expect(belongsToSection).toBe(true);
        }
      }),
      { numRuns: 100 }
    );
  });

  it('sidebar subtree does not contain pages that belong to a different section', () => {
    fc.assert(
      fc.property(
        sectionPlatformArbitrary,
        ({ section, platform, resolvedPrefix }) => {
          const rootNode = findDirectoryNode(resolvedPrefix);

          if (rootNode === null) {
            return;
          }

          const subtreeRoutes = collectRoutes(rootNode);

          // For each non-external route in the subtree, verify it does NOT
          // match any OTHER section's route prefix
          for (const route of subtreeRoutes) {
            if (route.startsWith('http')) continue;

            const owningSection = findOwningSection(route, platform);

            // If the route maps to a section, it must be THIS section
            if (owningSection !== null) {
              expect(owningSection.label).toBe(section.label);
            }
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it('resolveSection correctly identifies the section for URLs within a section subtree', () => {
    fc.assert(
      fc.property(
        fc.tuple(
          fc.constantFrom(...GEN2_SECTIONS),
          fc.constantFrom(...PLATFORMS),
          fc.array(fc.stringMatching(/^[a-z][a-z0-9-]{0,15}$/), {
            minLength: 0,
            maxLength: 3
          })
        ),
        ([section, platform, subSegments]) => {
          const resolvedPrefix = resolvePrefixWithPlatform(
            section.routePrefix,
            platform
          );
          const subPath =
            subSegments.length > 0 ? '/' + subSegments.join('/') : '';
          const fullUrl = resolvedPrefix + subPath;

          // resolveSection should return the same section for any URL
          // within that section's route prefix
          const resolved = resolveSection(fullUrl);

          expect(resolved).not.toBeNull();
          expect(resolved!.label).toBe(section.label);
          expect(resolved!.routePrefix).toBe(section.routePrefix);
        }
      ),
      { numRuns: 100 }
    );
  });
});
