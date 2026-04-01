import { findDirectoryNode } from '@/utils/findDirectoryNode';
import { SectionKey } from '@/data/sections';

/**
 * Walk the directory tree from a page's pathname upward to find
 * the nearest ancestor with a non-'both' section tag.
 * Also finds the best matching backend/frontend route for CrossLink targeting.
 */
export function getPageSection(pathname: string): {
  section: SectionKey | undefined;
  featureRoute: string | undefined;
} {
  const segments = pathname.split('/').filter(Boolean);
  let section: SectionKey | undefined;

  // Find nearest non-'both' section by walking up from deepest
  for (let i = segments.length; i > 0; i--) {
    const route = '/' + segments.slice(0, i).join('/');
    const node = findDirectoryNode(route);
    if (node?.section && node.section !== 'both') {
      section = node.section as SectionKey;
      break;
    }
  }

  // CrossLink: find the corresponding page in the other section.
  // Try progressively shorter sub-paths for the best match.
  const featureRoute = findCrossLink(pathname);

  return { section, featureRoute };
}

const BACKEND_ROOTS = [
  '/[platform]/build-a-backend/',
  '/[platform]/build-a-backend/add-aws-services/'
];
const FRONTEND_ROOT = '/[platform]/frontend/';

/**
 * Given a pathname, find the best matching route in the opposite section.
 * Tries deepest sub-path first, then walks up to feature-level.
 */
function findCrossLink(pathname: string): string | undefined {
  // Backend → Frontend
  for (const root of BACKEND_ROOTS) {
    if (pathname.startsWith(root)) {
      const relative = pathname.slice(root.length);
      return findBestMatch(relative, FRONTEND_ROOT);
    }
  }

  // Frontend → Backend (try sub-paths from deepest to shallowest)
  if (pathname.startsWith(FRONTEND_ROOT)) {
    const relative = pathname.slice(FRONTEND_ROOT.length);
    for (const root of BACKEND_ROOTS) {
      const match = findBestMatch(relative, root);
      if (match) return match;
    }
  }

  return undefined;
}

/**
 * Try progressively shorter sub-paths of `relative` under `targetRoot`.
 * e.g. relative="analytics/kinesis" tries "analytics/kinesis" then "analytics".
 */
function findBestMatch(relative: string, targetRoot: string): string | undefined {
  const parts = relative.split('/').filter(Boolean);
  for (let i = parts.length; i > 0; i--) {
    const candidate = targetRoot + parts.slice(0, i).join('/');
    if (findDirectoryNode(candidate)) {
      return candidate;
    }
  }
  return undefined;
}
