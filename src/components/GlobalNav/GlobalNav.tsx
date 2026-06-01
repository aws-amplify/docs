import React from 'react';
import { View, Flex } from '@aws-amplify/ui-react';
import { useState } from 'react';
import { NavMenuIconType } from './components/icons/IconLink';
import { RightNavLinks } from './components/RightNavLinks';
import { AmplifyNavLink } from './components/AmplifyNavLink';
import { SkipToMain } from '@/components/SkipToMain';
import {
  SECTIONS,
  SectionKey,
  getDefaultPathForSection
} from '@/data/sections';
import { Platform } from '@/data/platforms';
import Link from 'next/link';

export enum NavMenuItemType {
  DEFAULT = 'DEFAULT',
  EXTERNAL = 'EXTERNAL',
  ICON = 'ICON'
}

export interface NavMenuItem {
  type: NavMenuItemType;
  label: string;
  url: string;
  order: number;
  icon?: NavMenuIconType | string;
}

export interface NavProps {
  rightLinks: NavMenuItem[];
  socialLinks?: NavMenuItem[];
  currentSite: string;
  isGen1?: boolean;
  mainId: string;
  activeSection?: SectionKey;
  onSectionChange?: (section: SectionKey) => void;
  currentPlatform?: Platform;
  featureRoute?: string;
  pageSection?: SectionKey;
}

export function GlobalNav({
  currentSite,
  isGen1,
  mainId,
  rightLinks,
  socialLinks,
  activeSection,
  onSectionChange,
  currentPlatform,
  featureRoute,
  pageSection
}: NavProps) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const platform = currentPlatform || 'react';

  /**
   * Resolve the href for a section tab. If the user is on a page that has
   * a matching route in the target section (featureRoute), link there
   * instead of the generic section landing page.
   */
  const getSectionHref = (key: SectionKey): string => {
    if (
      featureRoute &&
      pageSection &&
      ((pageSection === 'backend' && key === 'frontend') ||
        (pageSection === 'frontend' && key === 'backend'))
    ) {
      return featureRoute.replace('[platform]', platform);
    }
    return getDefaultPathForSection(key, platform);
  };

  return (
    <View
      as="nav"
      className={`navbar ${isGen1 ? 'navbar--gen1' : ''}`}
      aria-label="Amplify Docs - External links to additional Amplify resources"
    >
      <SkipToMain mainId={mainId} />
      <Flex className="nav-links-container">
        <AmplifyNavLink
          isGen1={isGen1}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />

        {!isGen1 && (
          <Flex
            className={`section-nav ${isCollapsed ? 'collapsed-menu' : ''}`}
          >
            {(Object.keys(SECTIONS) as SectionKey[])
              .filter((key) => !SECTIONS[key].hideFromNav)
              .map((key) => {
                const section = SECTIONS[key];
                const isActive = activeSection === key;
                return (
                  <Link
                    key={key}
                    href={getSectionHref(key)}
                    className={`section-nav__tab ${isActive ? 'section-nav__tab--active' : ''}`}
                    onClick={() => onSectionChange?.(key)}
                  >
                    <span className="section-nav__tab__label">
                      {section.label}
                    </span>
                    {section.subtitle && isActive && (
                      <span className="section-nav__tab__subtitle">
                        {section.subtitle}
                      </span>
                    )}
                  </Link>
                );
              })}
          </Flex>
        )}

        <RightNavLinks
          rightLinks={rightLinks}
          socialLinks={socialLinks}
          currentSite={currentSite}
          isCollapsed={isCollapsed}
        />
      </Flex>
      <View
        className={isCollapsed ? '' : 'background-overlay'}
        onClick={() => {
          setIsCollapsed(true);
        }}
      ></View>
    </View>
  );
}
