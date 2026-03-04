// Feature: amplify-docs-restructuring, Property 3: Cross-link integrity
// **Validates: Requirements 1.8, 2.3**

import * as fc from 'fast-check';
import type { PageNode } from '../directory.d';
import {
  GEN2_SECTIONS,
  TopNavSection
} from '@/components/SectionContext/SectionContext';

// Load the generated directory tree
import directoryData from '../directory.json';

/**
 * Recursively collect all page nodes that have a non-empty relatedPages array.
 */
function collectNodesWithRelatedPages(node: PageNode): PageNode[] {
  const results: PageNode[] = [];

  if (
    node.relatedPages &&
    Array.isArray(node.relatedPages) &&
    node.relatedPages.length > 0
  ) {
    results.push(node);
  }

  if (node.children) {
    for (const child of node.children) {
      results.push(...collectNodesWithRelatedPages(child));
    }
  }

  return results;
}

/**
 * Recursively collect all routes in the directory tree into a Set.
 */
function collectAllRoutes(node: PageNode): Set<string> {
  const routes = new Set<string>();

  if (node.route) {
    routes.add(node.route);
  }

  if (node.children) {
    for (const child of node.children) {
      for (const route of collectAllRoutes(child)) {
        routes.add(route);
      }
    }
  }

  return routes;
}

/**
 * Determine which GEN2_SECTION a route belongs to by matching against
 * section routePrefixes. Uses the [platform] placeholder form since
 * directory routes use that format.
 */
function resolveSectionForRoute(route: string): TopNavSection | null {
  for (const section of GEN2_SECTIONS) {
    if (
      route === section.routePrefix ||
      route.startsWith(section.routePrefix + '/')
    ) {
      return section;
    }
  }
  return null;
}

/**
 * Find the section of a node by walking up the tree. We check the node's
 * own route first, then look at the section property if set, and finally
 * fall back to route-prefix matching.
 */
function findNodeSection(node: PageNode): TopNavSection | null {
  // First try the node's explicit section property
  if (node.section) {
    return (
      GEN2_SECTIONS.find(
        (s) =>
          s.label.toLowerCase().includes(node.section!) ||
          (node.section === 'backend' && s.label === 'Build a Backend') ||
          (node.section === 'frontend' && s.label === 'Frontend Libraries') ||
          (node.section === 'quickstart' && s.label === 'Quickstart') ||
          (node.section === 'ui' && s.label === 'UI Library') ||
          (node.section === 'hosting' && s.label === 'Hosting') ||
          (node.section === 'reference' && s.label === 'Reference')
      ) ?? null
    );
  }

  // Fall back to route-prefix matching
  return resolveSectionForRoute(node.route);
}

/**
 * Determine the section for a node by looking at which section subtree
 * it appears under in the directory tree. This walks the tree and tracks
 * the current section context.
 */
function buildRouteSectionMap(
  node: PageNode,
  currentSection: TopNavSection | null
): Map<string, TopNavSection> {
  const map = new Map<string, TopNavSection>();

  // If this node has an explicit section, update the current section context
  const nodeSection = node.section ? findNodeSection(node) : currentSection;

  // Use route-prefix matching as a fallback
  const effectiveSection = nodeSection ?? resolveSectionForRoute(node.route);

  if (node.route && effectiveSection) {
    map.set(node.route, effectiveSection);
  }

  if (node.children) {
    for (const child of node.children) {
      const childMap = buildRouteSectionMap(child, effectiveSection);
      for (const [route, section] of childMap) {
        map.set(route, section);
      }
    }
  }

  return map;
}

const rootNode = directoryData as unknown as PageNode;
const nodesWithRelatedPages = collectNodesWithRelatedPages(rootNode);
const allRoutes = collectAllRoutes(rootNode);
const routeSectionMap = buildRouteSectionMap(rootNode, null);

// Sanity check: we should have nodes with relatedPages to test
if (nodesWithRelatedPages.length === 0) {
  throw new Error(
    'No nodes with relatedPages found in directory.json — cannot run cross-link integrity tests'
  );
}

/**
 * Arbitrary that picks a random node that has relatedPages.
 */
const nodeWithRelatedPagesArb = fc.constantFrom(...nodesWithRelatedPages);

describe('Property 3: Cross-link integrity', () => {
  it('every relatedPages entry resolves to an existing page in the directory tree', () => {
    fc.assert(
      fc.property(nodeWithRelatedPagesArb, (node: PageNode) => {
        for (const linkedRoute of node.relatedPages!) {
          expect(allRoutes.has(linkedRoute)).toBe(true);
        }
      }),
      { numRuns: 100 }
    );
  });

  it('every relatedPages entry points to a page in a different section than the source', () => {
    fc.assert(
      fc.property(nodeWithRelatedPagesArb, (node: PageNode) => {
        const sourceSection = routeSectionMap.get(node.route);

        for (const linkedRoute of node.relatedPages!) {
          const targetSection = routeSectionMap.get(linkedRoute);

          // Both source and target should have a resolved section
          expect(sourceSection).toBeDefined();
          expect(targetSection).toBeDefined();

          // The target should be in a different section than the source
          if (sourceSection && targetSection) {
            expect(targetSection.label).not.toBe(sourceSection.label);
          }
        }
      }),
      { numRuns: 100 }
    );
  });

  it('relatedPages entries are valid string arrays', () => {
    fc.assert(
      fc.property(nodeWithRelatedPagesArb, (node: PageNode) => {
        expect(Array.isArray(node.relatedPages)).toBe(true);
        for (const linkedRoute of node.relatedPages!) {
          expect(typeof linkedRoute).toBe('string');
          expect(linkedRoute.length).toBeGreaterThan(0);
          // Routes should start with /
          expect(linkedRoute.startsWith('/')).toBe(true);
        }
      }),
      { numRuns: 100 }
    );
  });
});
