import { useContext, useRef } from 'react';
import { useRouter } from 'next/router';
import { Button, Flex, View, VisuallyHidden } from '@aws-amplify/ui-react';
import classNames from 'classnames';
import { DEFAULT_PLATFORM, PLATFORMS, Platform } from '@/data/platforms';
import {
  ALGOLIA_API_KEY,
  ALGOLIA_INDEX_NAME,
  ALGOLIA_APP_ID
} from '../../constants/algolia';
import { IconMenu, IconDoubleChevron } from '@/components/Icons';
import { Menu } from '@/components/Menu';
import { LayoutContext } from '@/components/Layout';
import type { HeadingInterface } from '@/components/TableOfContents/TableOfContents';
import { PlatformNavigator } from '@/components/PlatformNavigator';
import flatDirectory from 'src/directory/flatDirectory.json';
import { DocSearch } from '@docsearch/react';
import '@docsearch/css';
import { PageLastUpdated } from '../PageLastUpdated';
import Feedback from '../Feedback';
import RepoActions from '../Menu/RepoActions';
import { usePathWithoutHash } from '@/utils/usePathWithoutHash';

export const LayoutHeader = ({
  hasTOC = true,
  tocHeadings,
  pageType = 'inner',
  platform,
  showLastUpdatedDate = true
}: {
  hasTOC?: boolean;
  tocHeadings: HeadingInterface[];
  pageType?: 'home' | 'inner';
  platform?: Platform;
  showLastUpdatedDate: boolean;
}) => {
  const { menuOpen, toggleMenuOpen } = useContext(LayoutContext);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const sidebarMenuButtonRef = useRef<HTMLButtonElement>(null);
  const showTOC = hasTOC && tocHeadings.length > 0;
  const router = useRouter();
  const asPathWithNoHash = usePathWithoutHash();
  const isGen2 = asPathWithNoHash.split('/')[1] === 'gen2';
  let currentPlatform = isGen2 ? undefined : DEFAULT_PLATFORM;
  const isPrev = asPathWithNoHash.split('/')[2] === 'prev';

  if (!isGen2) {
    // [platform] will always be the very first subpath right?
    // when using `router.asPath` it returns a string that starts with a '/'
    // To get the "platform" the client was trying to visit, we have to get the string at index 1
    // Doing this because when visiting a 404 page, there is no `router.query.platform`, so we have
    // to check where the user was trying to visit from
    const asPathPlatform = asPathWithNoHash.split('/')[1] as Platform;

    currentPlatform = platform
      ? platform
      : PLATFORMS.includes(asPathPlatform)
        ? asPathPlatform
        : DEFAULT_PLATFORM;
  }

  const handleMenuToggle = () => {
    if (!menuOpen) {
      toggleMenuOpen(true);
      // For keyboard navigators, move focus to the close menu button in the nav
      setTimeout(() => sidebarMenuButtonRef?.current?.focus(), 0);
    } else {
      toggleMenuOpen(false);
      // For keyboard navigators, move focus back to menu button in header
      menuButtonRef?.current?.focus();
    }
  };

  return (
    <View as="header" className="layout-header">
      <Flex className={`layout-search layout-search--${pageType}`}>
        <Button
          onClick={() => handleMenuToggle()}
          size="small"
          ref={menuButtonRef}
          className="search-menu-toggle mobile-toggle"
        >
          <IconMenu aria-hidden="true" />
          Menu
        </Button>

        <View
          className={classNames(
            'layout-search__search',
            `layout-search__search--${pageType}`,
            { 'layout-search__search--toc': showTOC }
          )}
        >
          <View className="layout-search__search__container">
            <DocSearch
              appId={process.env.ALGOLIA_APP_ID || ALGOLIA_APP_ID}
              indexName={process.env.ALGOLIA_INDEX_NAME || ALGOLIA_INDEX_NAME}
              apiKey={process.env.ALGOLIA_API_KEY || ALGOLIA_API_KEY}
              searchParameters={{
                facetFilters: [`platform:${isGen2 ? 'gen2' : currentPlatform}`]
              }}
            />
          </View>
        </View>
      </Flex>
      <View
        className={classNames('layout-sidebar', {
          'layout-sidebar--expanded': menuOpen
        })}
      >
        <View
          className={classNames('layout-sidebar__backdrop', {
            'layout-sidebar__backdrop--expanded': menuOpen
          })}
          onClick={() => toggleMenuOpen(false)}
        ></View>
        <View
          className={classNames('layout-sidebar__inner', {
            'layout-sidebar__inner--expanded': menuOpen
          })}
        >
          <Button
            size="small"
            colorTheme="overlay"
            className={classNames('layout-sidebar__mobile-toggle', {
              'layout-sidebar__mobile-toggle--open': menuOpen
            })}
            ref={sidebarMenuButtonRef}
            onClick={() => handleMenuToggle()}
          >
            <IconDoubleChevron />
            <VisuallyHidden>Close menu</VisuallyHidden>
          </Button>
          {isGen2 ? null : (
            <div className="layout-sidebar-platform">
              <PlatformNavigator
                currentPlatform={currentPlatform}
                isPrev={isPrev}
              />
            </div>
          )}

          <div className="layout-sidebar-menu">
            <Menu currentPlatform={currentPlatform} path={asPathWithNoHash} />
            <div className="layout-sidebar-feedback">
              <RepoActions router={router}></RepoActions>
              <Feedback router={router}></Feedback>
            </div>
            {showLastUpdatedDate && (
              <PageLastUpdated directoryData={flatDirectory[router.pathname]} />
            )}
          </div>
        </View>
      </View>
    </View>
  );
};
