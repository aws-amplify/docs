import { Flex, View } from '@aws-amplify/ui-react';
import { NavMenuLink } from './NavMenuLink';
import { SocialNavLinks } from './SocialNavLinks';
import { NavMenuItem } from '../GlobalNav';
import { ALGOLIA_API_KEY, ALGOLIA_APP_ID, ALGOLIA_INDEX_NAME } from '@/constants/algolia';
import { DocSearch } from '@docsearch/react';
import { useCurrentPlatform } from '@/utils/useCurrentPlatform';
import { useIsLegacy } from '@/utils/useIsLegacy';

interface RightNavLinksProps {
  rightLinks: NavMenuItem[];
  socialLinks?: NavMenuItem[];
  isCollapsed: boolean;
  currentSite: string;
  isGen1?: boolean;
}

export function RightNavLinks({
  rightLinks,
  isCollapsed,
  currentSite,
  socialLinks,
  isGen1
}: RightNavLinksProps) {
  const currentPlatform = useCurrentPlatform();
  const isLegacy = useIsLegacy();
  const transformItems = (items) => {
    items.map((item) => {
      if (item.url.includes('#pageMain')) {
        item.url = item.url.replace('#pageMain', '');
      }
    });
    return items;
  };
  return (
    <Flex
      id="right-nav"
      className={`right-nav-links ${isCollapsed ? 'collapsed-menu' : ''}`}
    >
      {!isLegacy ? (
        <DocSearch
          appId={process.env.ALGOLIA_APP_ID || ALGOLIA_APP_ID}
          indexName={process.env.ALGOLIA_INDEX_NAME || ALGOLIA_INDEX_NAME}
          apiKey={process.env.ALGOLIA_API_KEY || ALGOLIA_API_KEY}
          searchParameters={{
            facetFilters: [
              `platform:${currentPlatform}`,
              `gen:${isGen1 ? 'gen1' : 'gen2'}`
            ]
          }}
          transformItems={transformItems}
        />
      ) : null}
      {rightLinks.map((link) =>
        link.legacy && !isLegacy ? null : (
          <View className="mobile-border" key={link.order}>
            <NavMenuLink navMenuItem={link} currentMenuItem={currentSite} />
          </View>
        )
      )}
      {socialLinks ? (
        <SocialNavLinks socialLinks={socialLinks} currentSite={currentSite} />
      ) : null}
    </Flex>
  );
}
