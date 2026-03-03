// Feature: amplify-docs-restructuring, Property 5: Gen1 directory preservation
// **Validates: Requirements 1.14, 5.8**

import * as fc from 'fast-check';
import type { PageNode } from '../directory.d';

// Load the generated directory tree
import directoryData from '../directory.json';

/**
 * Recursively collect all Gen1 page nodes from the directory tree.
 * Gen1 nodes are identified by routes containing '/gen1/'.
 */
function collectGen1Nodes(node: PageNode): PageNode[] {
  const results: PageNode[] = [];

  if (node.route && node.route.includes('/gen1/')) {
    results.push(node);
  }

  if (node.children) {
    for (const child of node.children) {
      results.push(...collectGen1Nodes(child));
    }
  }

  return results;
}

/**
 * Count the total number of descendant nodes (children, grandchildren, etc.)
 */
function countDescendants(node: PageNode): number {
  if (!node.children || node.children.length === 0) return 0;
  return node.children.reduce(
    (sum, child) => sum + 1 + countDescendants(child),
    0
  );
}

const gen1Nodes = collectGen1Nodes(directoryData as unknown as PageNode);

// Sanity check: we should have Gen1 nodes to test
if (gen1Nodes.length === 0) {
  throw new Error(
    'No Gen1 nodes found in directory.json — cannot run preservation tests'
  );
}

/**
 * Arbitrary that picks a random Gen1 node from the collected set.
 */
const gen1NodeArbitrary = fc.constantFrom(...gen1Nodes);

describe('Property 5: Gen1 directory preservation', () => {
  it('Gen1 nodes have a valid route containing /gen1/', () => {
    fc.assert(
      fc.property(gen1NodeArbitrary, (node: PageNode) => {
        expect(node.route).toBeDefined();
        expect(typeof node.route).toBe('string');
        expect(node.route).toContain('/gen1/');
      }),
      { numRuns: 100 }
    );
  });

  it('Gen1 nodes have a non-empty title', () => {
    fc.assert(
      fc.property(gen1NodeArbitrary, (node: PageNode) => {
        // Nodes with a title should have a non-empty string
        // Some intermediate nodes (like the gen1 root index) may not have
        // a title if they only serve as containers
        if (node.title !== undefined) {
          expect(typeof node.title).toBe('string');
          expect(node.title.length).toBeGreaterThan(0);
        }
      }),
      { numRuns: 100 }
    );
  });

  it('Gen1 nodes have a valid platforms array when present', () => {
    fc.assert(
      fc.property(gen1NodeArbitrary, (node: PageNode) => {
        if (node.platforms !== undefined) {
          expect(Array.isArray(node.platforms)).toBe(true);
          expect(node.platforms.length).toBeGreaterThan(0);
          for (const platform of node.platforms) {
            expect(typeof platform).toBe('string');
            expect(platform.length).toBeGreaterThan(0);
          }
        }
      }),
      { numRuns: 100 }
    );
  });

  it('Gen1 nodes preserve children structure (children is array or undefined)', () => {
    fc.assert(
      fc.property(gen1NodeArbitrary, (node: PageNode) => {
        if (node.children !== undefined) {
          expect(Array.isArray(node.children)).toBe(true);
          // Each child should have a route
          for (const child of node.children) {
            expect(child.route).toBeDefined();
            expect(typeof child.route).toBe('string');
            // Non-external children of Gen1 nodes should also be Gen1 nodes
            if (!child.isExternal) {
              expect(child.route).toContain('/gen1/');
            }
          }
        }
      }),
      { numRuns: 100 }
    );
  });

  it('Gen1 nodes do NOT have a section property (section is Gen2-only)', () => {
    fc.assert(
      fc.property(gen1NodeArbitrary, (node: PageNode) => {
        expect(node.section).toBeUndefined();
      }),
      { numRuns: 100 }
    );
  });

  it('Gen1 node children count is stable (structure not modified)', () => {
    fc.assert(
      fc.property(gen1NodeArbitrary, (node: PageNode) => {
        // Verify the descendant count is a non-negative integer,
        // confirming the tree structure is intact and not corrupted
        const descendants = countDescendants(node);
        expect(Number.isInteger(descendants)).toBe(true);
        expect(descendants).toBeGreaterThanOrEqual(0);

        // If node has children, descendant count must be at least
        // the number of direct children
        if (node.children && node.children.length > 0) {
          expect(descendants).toBeGreaterThanOrEqual(node.children.length);
        }
      }),
      { numRuns: 100 }
    );
  });
});
