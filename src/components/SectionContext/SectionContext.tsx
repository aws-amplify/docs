import { createContext, useContext, useMemo, ReactNode } from 'react';
import { PLATFORMS, Platform } from '@/data/platforms';

export interface TopNavSection {
  label: string;
  /** Route prefix used to match active state and resolve sidebar tree */
  routePrefix: string;
  /** Whether this section shows the platform selector */
  hasPlatformSelector: boolean;
}

export interface SectionContextValue {
  currentSection: TopNavSection | null;
  /** Whether the platform selector should be shown */
  showPlatformSelector: boolean;
}

export const GEN2_SECTIONS: TopNavSection[] = [
  {
    label: 'Quickstart',
    routePrefix: '/[platform]/start',
    hasPlatformSelector: false
  },
  {
    label: 'Frontend Libraries',
    routePrefix: '/[platform]/frontend',
    hasPlatformSelector: true
  },
  {
    label: 'Build a Backend',
    routePrefix: '/[platform]/build-a-backend',
    hasPlatformSelector: false
  },
  {
    label: 'UI Library',
    routePrefix: '/[platform]/build-ui',
    hasPlatformSelector: false
  },
  {
    label: 'Hosting',
    routePrefix: '/[platform]/deploy-and-host',
    hasPlatformSelector: false
  },
  {
    label: 'Reference',
    routePrefix: '/[platform]/reference',
    hasPlatformSelector: false
  }
];

/**
 * Resolves the current top-nav section from a pathname.
 *
 * Replaces the `[platform]` placeholder in each section's routePrefix with
 * the actual platform extracted from the URL, then checks if the pathname
 * starts with that resolved prefix.
 *
 * @param pathname - The current URL path (e.g. "/react/build-a-backend/auth/setup")
 * @returns The matching TopNavSection, or null if no section matches
 */
export function resolveSection(pathname: string): TopNavSection | null {
  // Extract the first path segment as the potential platform
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length === 0) return null;

  const firstSegment = segments[0];

  // If the path starts with gen1, this is not a Gen2 page
  if (firstSegment === 'gen1') return null;

  // Determine the platform from the URL — use it if it's a known platform,
  // otherwise there's no platform segment to match against
  const platform = PLATFORMS.includes(firstSegment as Platform)
    ? firstSegment
    : null;

  if (!platform) return null;

  for (const section of GEN2_SECTIONS) {
    const resolvedPrefix = section.routePrefix.replace('[platform]', platform);
    if (
      pathname === resolvedPrefix ||
      pathname.startsWith(resolvedPrefix + '/')
    ) {
      return section;
    }
  }

  return null;
}

const defaultContextValue: SectionContextValue = {
  currentSection: null,
  showPlatformSelector: false
};

export const SectionContext =
  createContext<SectionContextValue>(defaultContextValue);

interface SectionProviderProps {
  pathname: string;
  children: ReactNode;
}

export function SectionProvider({ pathname, children }: SectionProviderProps) {
  const value = useMemo<SectionContextValue>(() => {
    const currentSection = resolveSection(pathname);
    return {
      currentSection,
      showPlatformSelector: currentSection?.hasPlatformSelector ?? false
    };
  }, [pathname]);

  return (
    <SectionContext.Provider value={value}>{children}</SectionContext.Provider>
  );
}

export function useSectionContext(): SectionContextValue {
  return useContext(SectionContext);
}
