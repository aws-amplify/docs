import React from 'react';
import { View, Flex } from '@aws-amplify/ui-react';
import { useState } from 'react';
import { NavMenuIconType } from './components/icons/IconLink';
import { RightNavLinks } from './components/RightNavLinks';
import { AmplifyNavLink } from './components/AmplifyNavLink';
import { LeftNavLinks } from './components/LeftNavLinks';
import { SkipToMain } from '@/components/SkipToMain';

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
  leftLinks: NavMenuItem[];
  rightLinks: NavMenuItem[];
  socialLinks?: NavMenuItem[];
  currentSite: string;
  isGen1?: boolean;
  mainId: string;
}

export function GlobalNav({
  currentSite,
  isGen1,
  leftLinks,
  mainId,
  rightLinks,
  socialLinks
}: NavProps) {
  const [isCollapsed, setIsCollapsed] = useState(true);

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

        <LeftNavLinks
          isCollapsed={isCollapsed}
          leftLinks={leftLinks}
          currentSite={currentSite}
        />

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
