import React from 'react';
import { View, Flex } from '@aws-amplify/ui-react';
import { useState } from 'react';
import { NavMenuIconType } from './components/icons/IconLink';
import { RightNavLinks } from './components/RightNavLinks';
import { AmplifyNavLink } from './components/AmplifyNavLink';
import { SkipToMain } from '@/components/SkipToMain';
import {
  SECTIONS,
  EXTERNAL_NAV_ITEMS,
  SectionKey,
  getDefaultPathForSection
} from '@/data/sections';
import { Platform } from '@/data/platforms';
import { IconExternalLink } from '@/components/Icons';
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
}

export function GlobalNav({
  currentSite,
  isGen1,
  mainId,
  rightLinks,
  socialLinks,
  activeSection,
  onSectionChange,
  currentPlatform
}: NavProps) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const platform = currentPlatform || 'react';

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
            {(Object.keys(SECTIONS) as SectionKey[]).map((key) => {
              const section = SECTIONS[key];
              const isActive = activeSection === key;
              return (
                <Link
                  key={key}
                  href={getDefaultPathForSection(key, platform)}
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
            {EXTERNAL_NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="section-nav__tab section-nav__tab--external"
              >
                <span className="section-nav__tab__label">
                  {item.label}
                  <IconExternalLink
                    fontSize="xs"
                    className="section-nav__external-icon"
                  />
                </span>
              </a>
            ))}
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
