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

  // Find feature category for CrossLink targeting.
  // For backend pages, link to the corresponding frontend category.
  // For frontend pages, link to the corresponding backend category.
  let featureRoute: string | undefined;
  const backendFeature = pathname.match(
    /\/\[platform\]\/build-a-backend\/([^/]+)/
  );
  const frontendFeature = pathname.match(/\/\[platform\]\/frontend\/([^/]+)/);

  if (backendFeature) {
    // Backend page → link to frontend equivalent
    const feature = backendFeature[1];
    const frontendNode = findDirectoryNode(
      `/[platform]/frontend/${feature}`
    );
    if (frontendNode) {
      featureRoute = `/[platform]/frontend/${feature}`;
    }
  } else if (frontendFeature) {
    // Frontend page → link to backend equivalent
    const feature = frontendFeature[1];
    const backendNode = findDirectoryNode(
      `/[platform]/build-a-backend/${feature}`
    );
    if (backendNode) {
      featureRoute = `/[platform]/build-a-backend/${feature}`;
    }
  }

  return { section, featureRoute };
}
