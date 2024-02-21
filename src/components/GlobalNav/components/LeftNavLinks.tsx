import { View, Flex } from '@aws-amplify/ui-react';
import { NavMenuLink } from './NavMenuLink';
import { NavMenuItem } from '../GlobalNav';

interface LeftNavLinksProps {
  leftLinks: NavMenuItem[];
  isCollapsed: boolean;
  currentSite: string;
}

export function LeftNavLinks({
  isCollapsed,
  leftLinks,
  currentSite
}: LeftNavLinksProps) {
  return (
    <Flex className={`left-nav-links ${isCollapsed ? 'collapsed-menu' : ''}`}>
      {leftLinks.map((link) => (
        <View className="mobile-border" key={link.order}>
          <NavMenuLink navMenuItem={link} currentMenuItem={currentSite} />
        </View>
      ))}
    </Flex>
  );
}
