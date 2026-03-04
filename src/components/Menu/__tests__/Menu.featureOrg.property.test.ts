// Feature: amplify-docs-restructuring, Property 10: Feature-based sidebar organization
// **Validates: Requirements 5.1**

import * as fc from 'fast-check';
import {
  GEN2_SECTIONS,
  TopNavSection
} from '@/components/SectionContext/SectionContext';
import { PLATFORMS, PLATFORM_DISPLAY_NAMES, Platform } from '@/data/platforms';
import { findDirectoryNode } from '@/utils/findDirectoryNode';

/**
 * Set of platform display names that must NOT appear as top-level sidebar
 * children titles. Sidebar should be organized by feature (Auth, Data,
 * Storage, Functions, etc.), not by platform/framework.
 */
const PLATFORM_NAMES = new Set(
  Object.values(PLATFORM_DISPLAY_NAMES).map((name) => name.toLowerCase())
);

/**
 * Arbitrary that generates random Gen2 section + platform pairs.
 */
const sectionPlatformArbitrary = fc
  .tuple(fc.constantFrom(...GEN2_SECTIONS), fc.constantFrom(...PLATFORMS))
  .map(([section, platform]: [TopNavSection, Platform]) => ({
    section,
    platform,
    resolvedPrefix: section.routePrefix.replace('[platform]', platform)
  }));

describe('Property 10: Feature-based sidebar organization', () => {
  it('no top-level sidebar children have platform names as titles', () => {
    fc.assert(
      fc.property(sectionPlatformArbitrary, ({ resolvedPrefix }) => {
        const rootNode = findDirectoryNode(resolvedPrefix);

        // If the section has no directory entry for this platform,
        // the sidebar renders empty — no children to check.
        if (rootNode === null || !rootNode.children) {
          return;
        }

        for (const child of rootNode.children) {
          const titleLower = (child.title || '').toLowerCase();

          // The top-level child title must not match any platform name.
          // Sidebar should be organized by feature, not by framework.
          expect(PLATFORM_NAMES.has(titleLower)).toBe(false);
        }
      }),
      { numRuns: 100 }
    );
  });

  it('top-level sidebar children titles do not match platform slug identifiers', () => {
    fc.assert(
      fc.property(sectionPlatformArbitrary, ({ resolvedPrefix }) => {
        const rootNode = findDirectoryNode(resolvedPrefix);

        if (rootNode === null || !rootNode.children) {
          return;
        }

        // Also check against the raw platform slug identifiers
        // (e.g., "react", "angular", "vue", "nextjs", "react-native",
        // "swift", "flutter", "android") in addition to display names.
        const platformSlugs = new Set(PLATFORMS.map((p) => p.toLowerCase()));

        for (const child of rootNode.children) {
          const titleLower = (child.title || '').toLowerCase();

          expect(platformSlugs.has(titleLower)).toBe(false);
        }
      }),
      { numRuns: 100 }
    );
  });
});
