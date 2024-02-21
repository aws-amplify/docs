import { Flex, View } from '@aws-amplify/ui-react';
import { NavMenuLink } from './NavMenuLink';
import { NavMenuItem } from '../GlobalNav';

interface SocialNavLinksProps {
  socialLinks: NavMenuItem[];
  currentSite: string;
}

export function SocialNavLinks({
  socialLinks,
  currentSite
}: SocialNavLinksProps) {
  return (
    <Flex className="mobile-border social-links">
      {socialLinks.map((link) => (
        <View key={link.order}>
          <NavMenuLink navMenuItem={link} currentMenuItem={currentSite} />
        </View>
      ))}
    </Flex>
  );
}
