import { Flex, View } from '@aws-amplify/ui-react';
import { NavMenuLink } from './NavMenuLink';
import { SocialNavLinks } from './SocialNavLinks';
import { NavMenuItem } from '../GlobalNav';

interface RightNavLinksProps {
  rightLinks: NavMenuItem[];
  socialLinks?: NavMenuItem[];
  isCollapsed: boolean;
  currentSite: string;
}

export function RightNavLinks({
  rightLinks,
  isCollapsed,
  currentSite,
  socialLinks
}: RightNavLinksProps) {
  return (
    <Flex
      id="right-nav"
      className={`right-nav-links ${isCollapsed ? 'collapsed-menu' : ''}`}
    >
      {rightLinks.map((link) => (
        <View className="mobile-border" key={link.order}>
          <NavMenuLink navMenuItem={link} currentMenuItem={currentSite} />
        </View>
      ))}
      {socialLinks ? (
        <SocialNavLinks socialLinks={socialLinks} currentSite={currentSite} />
      ) : null}
    </Flex>
  );
}
