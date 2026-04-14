export type SectionKey =
  | 'quickstart'
  | 'backend'
  | 'frontend'
  | 'ui'
  | 'ai'
  | 'hosting'
  | 'reference';

export interface SectionConfig {
  label: string;
  subtitle?: string;
  hideFromNav?: boolean;
}

// Sections shown as tabs in the nav bar
export const SECTIONS: Record<SectionKey, SectionConfig> = {
  quickstart: { label: 'Quickstart', hideFromNav: true },
  backend: { label: 'Build a Backend', subtitle: 'What runs on AWS' },
  frontend: { label: 'Frontend Libraries', subtitle: 'What runs in your app' },
  ui: { label: 'UI Libraries', subtitle: 'Pre-built components' },
  ai: { label: 'Develop with AI' },
  hosting: { label: 'Hosting' },
  reference: { label: 'Reference' }
};

/**
 * Get the default landing page URL for a section.
 */
export function getDefaultPathForSection(
  section: SectionKey,
  platform: string
): string {
  switch (section) {
    case 'quickstart':
      return `/${platform}/start/quickstart/`;
    case 'backend':
      return `/${platform}/build-a-backend/`;
    case 'frontend':
      return `/${platform}/frontend/`;
    case 'hosting':
      return `/${platform}/deploy-and-host/`;
    case 'ui':
      return `/${platform}/build-ui/`;
    case 'ai':
      return `/${platform}/develop-with-ai/`;
    case 'reference':
      return `/${platform}/reference/`;
    default:
      return `/${platform}/`;
  }
}

/**
 * Check if a directory node should be visible in the given section.
 * Nodes without a section tag are always visible.
 * 'both' nodes are visible in backend and frontend sections only.
 */
export function isNodeVisibleInSection(
  nodeSection: string | undefined,
  activeSection: string | undefined
): boolean {
  if (!activeSection) return true;
  if (!nodeSection) return true;
  if (nodeSection === activeSection) return true;
  if (
    nodeSection === 'both' &&
    (activeSection === 'backend' || activeSection === 'frontend')
  )
    return true;
  return false;
}

/**
 * Derive the active section from the current URL path.
 * Returns undefined for Gen1 pages or unrecognized paths.
 */
export function getSectionFromPath(path: string): SectionKey | undefined {
  if (path.startsWith('/gen1')) return undefined;

  if (/\/start(\/|$)/.test(path) || /\/how-amplify-works(\/|$)/.test(path)) {
    return 'quickstart';
  }
  if (/\/develop-with-ai(\/|$)/.test(path)) return 'ai';
  if (/\/deploy-and-host(\/|$)/.test(path)) return 'hosting';
  if (/\/reference(\/|$)/.test(path)) return 'reference';
  if (/\/build-ui(\/|$)/.test(path)) return 'ui';
  if (/\/frontend(\/|$)/.test(path)) return 'frontend';
  // AI is 'both' (has backend setup + frontend usage) — let directory tags decide
  if (/\/ai(\/|$)/.test(path)) return 'backend';
  if (/\/build-a-backend(\/|$)/.test(path)) return 'backend';

  return undefined;
}
