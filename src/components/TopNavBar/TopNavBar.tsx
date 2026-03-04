import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import {
  TopNavSection,
  GEN2_SECTIONS
} from '@/components/SectionContext/SectionContext';
import { PLATFORMS, Platform } from '@/data/platforms';

export interface TopNavBarProps {
  sections: TopNavSection[];
  currentSection: string;
  isGen1: boolean;
}

/**
 * Resolves a section's routePrefix by replacing [platform] with the
 * actual platform extracted from the current URL path.
 */
function resolveSectionHref(routePrefix: string, currentPath: string): string {
  const segments = currentPath.split('/').filter(Boolean);
  const firstSegment = segments[0] ?? '';
  const platform = PLATFORMS.includes(firstSegment as Platform)
    ? firstSegment
    : 'react';
  const resolved = routePrefix.replace('[platform]', platform);
  return resolved.endsWith('/') ? resolved : resolved + '/';
}

/**
 * Checks whether a section is the currently active one by comparing
 * its routePrefix against the current URL path.
 */
function isSectionActive(
  section: TopNavSection,
  currentSection: string
): boolean {
  return section.label === currentSection;
}

export function TopNavBar({
  sections,
  currentSection,
  isGen1
}: TopNavBarProps) {
  const router = useRouter();
  const navRef = useRef<HTMLElement>(null);
  const activeRef = useRef<HTMLAnchorElement>(null);

  // Auto-scroll active item into view on mobile
  useEffect(() => {
    if (activeRef.current && navRef.current) {
      activeRef.current.scrollIntoView({
        inline: 'center',
        behavior: 'smooth'
      });
    }
  }, [currentSection]);

  if (isGen1) {
    return null;
  }

  const currentPath = router.asPath;

  return (
    <nav
      ref={navRef}
      className="top-nav-bar"
      role="navigation"
      aria-label="Section navigation"
    >
      <ul className="top-nav-bar__list">
        {sections.map((section) => {
          const active = isSectionActive(section, currentSection);
          const href = resolveSectionHref(section.routePrefix, currentPath);

          return (
            <li key={section.label} className="top-nav-bar__item">
              <Link
                href={href}
                ref={active ? activeRef : undefined}
                className={classNames('top-nav-item', {
                  'top-nav-item--active': active
                })}
                aria-current={active ? 'page' : undefined}
              >
                {section.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
