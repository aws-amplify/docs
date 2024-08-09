import { useContext, useRef } from 'react';
import { useRouter } from 'next/router';
import { Button, Flex, View, VisuallyHidden } from '@aws-amplify/ui-react';
import classNames from 'classnames';
import { Platform } from '@/data/platforms';
import {
  ALGOLIA_API_KEY,
  ALGOLIA_INDEX_NAME,
  ALGOLIA_APP_ID
} from '../../constants/algolia';
import { IconMenu, IconDoubleChevron } from '@/components/Icons';
import { Menu } from '@/components/Menu';
import { LayoutContext } from '@/components/Layout';
import { PlatformNavigator } from '@/components/PlatformNavigator';
import flatDirectory from '@/directory/flatDirectory.json';
import { DocSearch } from '@docsearch/react';
import '@docsearch/css';
import { PageLastUpdated } from '../PageLastUpdated';
import Feedback from '../Feedback';
import RepoActions from '../Menu/RepoActions';
import { usePathWithoutHash } from '@/utils/usePathWithoutHash';
import { TableOfContents } from '../TableOfContents';
import { HeadingInterface } from '../TableOfContents/TableOfContents';

export const LayoutHeader = ({
  currentPlatform,
  isGen1,
  pageType = 'inner',
  showLastUpdatedDate = true,
  showTOC,
  tocHeadings
}: {
  currentPlatform: Platform;
  isGen1: boolean;
  pageType?: 'home' | 'inner';
  showLastUpdatedDate: boolean;
  showTOC?: boolean;
  tocHeadings: HeadingInterface[];
}) => {
  const { menuOpen, toggleMenuOpen } = useContext(LayoutContext);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const sidebarMenuButtonRef = useRef<HTMLButtonElement>(null);
  const { tocOpen, toggleTocOpen } = useContext(LayoutContext);
  const tocButtonRef = useRef<HTMLButtonElement>(null);
  const sidebarTocButtonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const asPathWithNoHash = usePathWithoutHash();

  const handleMenuToggle = (menu) => {
    if (menu === 'menu' && !menuOpen) {
      toggleMenuOpen(true);
      // For keyboard navigators, move focus to the close menu button in the nav
      setTimeout(() => sidebarMenuButtonRef?.current?.focus(), 0);
    } else {
      toggleMenuOpen(false);
      // For keyboard navigators, move focus back to menu button in header
      menuButtonRef?.current?.focus();
    }

    if (menu === 'toc' && !tocOpen) {
      toggleTocOpen(true);
      // For keyboard navigators, move focus to the close menu button in the nav
      setTimeout(() => sidebarTocButtonRef?.current?.focus(), 0);
    } else {
      toggleTocOpen(false);
      // For keyboard navigators, move focus back to menu button in header
      tocButtonRef?.current?.focus();
    }
  };

  // Search result transform function that will strip out the pageMain anchor tag
  // Algolia search results include the anchor tag where the content was found but since we
  // are aggregating records this ends up always being the pageMain anchor tag which is the
  // page's main content section.  This adds focus to the main content section on every search
  // and creates a funny user experience.  Removing this tag will avoid that.
  const transformItems = (items) => {
    items.map((item) => {
      if (item.url.includes('#pageMain')) {
        item.url = item.url.replace('#pageMain', '');
      }
    });
    return items;
  };

  return (
    <View as="header" className="layout-header">
      <Flex className={`layout-search layout-search--${pageType}`}>
        <Button
          onClick={() => handleMenuToggle('menu')}
          size="small"
          ref={menuButtonRef}
          className="search-menu-toggle mobile-toggle"
        >
          <IconMenu aria-hidden="true" />
          Menu
        </Button>
        {showTOC ? (
          <Button
            onClick={() => handleMenuToggle('toc')}
            size="small"
            ref={tocButtonRef}
            className="search-menu-toggle mobile-toggle"
          >
            <IconMenu aria-hidden="true" />
            On this page
          </Button>
        ) : null}

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
                facetFilters: [
                  `platform:${currentPlatform}`,
                  `gen:${isGen1 ? 'gen1' : 'gen2'}`
                ]
              }}
              transformItems={transformItems}
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
            onClick={() => handleMenuToggle('menu')}
          >
            <IconDoubleChevron />
            <VisuallyHidden>Close menu</VisuallyHidden>
          </Button>

          <div className="layout-sidebar-platform">
            <PlatformNavigator
              currentPlatform={currentPlatform}
              isGen1={isGen1}
            />
          </div>

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
        {showTOC ? <div className=""></div> : null}
      </View>

      {showTOC ? (
        <View
          className={classNames('layout-sidebar', 'right-menu', {
            'layout-sidebar--expanded': tocOpen
          })}
        >
          <View
            className={classNames('layout-sidebar__backdrop', {
              'layout-sidebar__backdrop--expanded': tocOpen
            })}
            onClick={() => toggleTocOpen(false)}
          ></View>
          <View
            className={classNames('layout-sidebar__inner', 'right-menu', {
              'layout-sidebar__inner--expanded-right': tocOpen
            })}
          >
            <Button
              size="small"
              colorTheme="overlay"
              className={classNames(
                'layout-sidebar__mobile-toggle',
                'right-menu',
                {
                  'layout-sidebar__mobile-toggle--open': tocOpen
                }
              )}
              ref={sidebarTocButtonRef}
              onClick={() => handleMenuToggle('toc')}
            >
              <IconDoubleChevron />
              <VisuallyHidden>Close table of contents</VisuallyHidden>
            </Button>
            <div className="layout-sidebar-menu">
              <TableOfContents headers={tocHeadings} />
            </div>
          </View>
        </View>
      ) : null}
    </View>
  );
};
