// Feature: amplify-docs-restructuring, Property 4: Sidebar depth limit
// **Validates: Requirements 1.11**

import * as fc from 'fast-check';
import {
  GEN2_SECTIONS,
  TopNavSection
} from '@/components/SectionContext/SectionContext';
import { PLATFORMS, Platform } from '@/data/platforms';
import { findDirectoryNode } from '@/utils/findDirectoryNode';
import type { PageNode } from '@/directory/directory.d';

const MAX_SIDEBAR_DEPTH = 4;

/**
 * Recursively compute the maximum nesting depth of a directory subtree.
 * A leaf node (no children) has depth 1.
 * A node with children has depth 1 + max(children depths).
 */
function maxDepth(node: PageNode): number {
  if (!node.children || node.children.length === 0) {
    return 1;
  }
  let deepest = 0;
  for (const child of node.children) {
    const childDepth = maxDepth(child);
    if (childDepth > deepest) {
      deepest = childDepth;
    }
  }
  return 1 + deepest;
}

/**
 * Finds the deepest path in a subtree and returns it as an array of titles
 * for diagnostic purposes when a test fails.
 */
function findDeepestPath(node: PageNode): string[] {
  if (!node.children || node.children.length === 0) {
    return [node.title || node.route];
  }
  let deepestChildPath: string[] = [];
  for (const child of node.children) {
    const childPath = findDeepestPath(child);
    if (childPath.length > deepestChildPath.length) {
      deepestChildPath = childPath;
    }
  }
  return [node.title || node.route, ...deepestChildPath];
}

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

describe('Property 4: Sidebar depth limit', () => {
  it('sidebar subtree nesting depth does not exceed 4 levels for any Gen2 section', () => {
    fc.assert(
      fc.property(
        sectionPlatformArbitrary,
        ({ section, platform, resolvedPrefix }) => {
          const rootNode = findDirectoryNode(resolvedPrefix);

          // If findDirectoryNode returns null, the section has no directory
          // entry for this platform — sidebar renders empty, which is fine.
          if (rootNode === null) {
            return;
          }

          const depth = maxDepth(rootNode);

          // Provide a helpful error message if the depth exceeds the limit
          if (depth > MAX_SIDEBAR_DEPTH) {
            const deepestPath = findDeepestPath(rootNode);
            fail(
              `Section "${section.label}" (platform: ${platform}) has sidebar depth ${depth}, ` +
                `exceeding the limit of ${MAX_SIDEBAR_DEPTH}. ` +
                `Deepest path: ${deepestPath.join(' → ')}`
            );
          }

          expect(depth).toBeLessThanOrEqual(MAX_SIDEBAR_DEPTH);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('every individual child subtree within a section respects the depth limit', () => {
    fc.assert(
      fc.property(
        sectionPlatformArbitrary,
        ({ section, platform, resolvedPrefix }) => {
          const rootNode = findDirectoryNode(resolvedPrefix);

          if (rootNode === null || !rootNode.children) {
            return;
          }

          // Check each top-level child of the section independently.
          // This gives more granular failure info — we know which feature
          // subtree (e.g., Auth, Data) is too deep.
          for (const child of rootNode.children) {
            // Each child's depth + 1 (for the section root) must be ≤ MAX_SIDEBAR_DEPTH
            const childDepth = maxDepth(child);
            const totalDepth = 1 + childDepth; // section root + child subtree

            if (totalDepth > MAX_SIDEBAR_DEPTH) {
              const deepestPath = findDeepestPath(child);
              fail(
                `Section "${section.label}" > "${child.title || child.route}" ` +
                  `(platform: ${platform}) has total depth ${totalDepth}, ` +
                  `exceeding the limit of ${MAX_SIDEBAR_DEPTH}. ` +
                  `Deepest path: ${deepestPath.join(' → ')}`
              );
            }

            expect(totalDepth).toBeLessThanOrEqual(MAX_SIDEBAR_DEPTH);
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});
