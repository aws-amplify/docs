export type SectionKey =
  | 'quickstart'
  | 'backend'
  | 'frontend'
  | 'hosting'
  | 'reference';

export interface SectionConfig {
  label: string;
  subtitle?: string;
}

export const SECTIONS: Record<SectionKey, SectionConfig> = {
  quickstart: { label: 'Quickstart' },
  backend: { label: 'Build a Backend', subtitle: 'What runs on AWS' },
  frontend: { label: 'Frontend Libraries', subtitle: 'What runs in your app' },
  hosting: { label: 'Hosting' },
  reference: { label: 'Reference' }
};

export const EXTERNAL_NAV_ITEMS = [
  {
    label: 'UI Library',
    url: 'https://ui.docs.amplify.aws/',
    isExternal: true
  }
];

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
    case 'reference':
      return `/${platform}/reference/`;
    default:
      return `/${platform}/`;
  }
}

/**
 * Derive the active section from the current URL path.
 * For build-a-backend pages, defaults to 'backend' unless explicitly set.
 * Returns undefined for Gen1 pages or unrecognized paths.
 */
export function getSectionFromPath(path: string): SectionKey | undefined {
  if (path.startsWith('/gen1')) return undefined;

  if (path.includes('/start/') || path.includes('/how-amplify-works/')) {
    return 'quickstart';
  }
  if (path.includes('/deploy-and-host/')) return 'hosting';
  if (path.includes('/reference/')) return 'reference';
  if (path.includes('/frontend/') || path.includes('/build-ui/') || path.includes('/ai/'))
    return 'frontend';
  if (path.includes('/build-a-backend/')) return 'backend';

  // Home page or unrecognized
  return undefined;
}
