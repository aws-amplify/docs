import { findDirectoryNode } from '@/utils/findDirectoryNode';
import { SectionKey } from '@/data/sections';

/**
 * Walk the directory tree from a page's pathname upward to find
 * the nearest ancestor with a non-'both' section tag.
 * Also finds the feature category route (e.g., /[platform]/build-a-backend/auth)
 * for smart CrossLink targeting.
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

  // Find feature category (e.g., /[platform]/build-a-backend/auth)
  // by extracting the feature segment from the pathname
  let featureRoute: string | undefined;
  const featureMatch = pathname.match(
    /(\/\[platform\]\/build-a-backend\/[^/]+)/
  );
  if (featureMatch) {
    const candidate = featureMatch[1];
    const node = findDirectoryNode(candidate);
    if (node?.section === 'both') {
      featureRoute = candidate;
    }
  }

  return { section, featureRoute };
}
