export type SectionKey =
  | 'quickstart'
  | 'backend'
  | 'frontend'
  | 'hosting'
  | 'ui'
  | 'reference';

export interface SectionConfig {
  label: string;
  subtitle?: string;
}

export const SECTIONS: Record<SectionKey, SectionConfig> = {
  quickstart: { label: 'Quickstart' },
  backend: { label: 'Build a Backend', subtitle: 'What runs on AWS' },
  frontend: { label: 'Frontend Libraries', subtitle: 'What runs in your app' },
  ui: { label: 'UI Libraries', subtitle: 'Pre-built components' },
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
    case 'reference':
      return `/${platform}/reference/`;
    default:
      return `/${platform}/`;
  }
}

/**
 * Derive the active section from the current URL path.
 * Returns undefined for Gen1 pages or unrecognized paths.
 */
export function getSectionFromPath(path: string): SectionKey | undefined {
  if (path.startsWith('/gen1')) return undefined;

  if (path.includes('/start/') || path.includes('/how-amplify-works/')) {
    return 'quickstart';
  }
  if (path.includes('/deploy-and-host/')) return 'hosting';
  if (path.includes('/reference/')) return 'reference';
  if (path.includes('/build-ui/')) return 'ui';
  if (path.includes('/frontend/') || path.includes('/ai/')) return 'frontend';
  if (path.includes('/build-a-backend/')) return 'backend';

  return undefined;
}
