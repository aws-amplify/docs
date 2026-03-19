import { useContext, useRef, useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import { Button, Flex, View, VisuallyHidden } from '@aws-amplify/ui-react';
import classNames from 'classnames';
import { Platform } from '@/data/platforms';
import { SECTIONS, SectionKey, getDefaultPathForSection } from '@/data/sections';
import Link from 'next/link';
import {
  ALGOLIA_API_KEY,
  ALGOLIA_INDEX_NAME,
  ALGOLIA_APP_ID
} from '../../constants/algolia';
import { IconMenu, IconDoubleChevron, IconChevron } from '@/components/Icons';
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
import { SearchFilters } from '@/components/Search';
import type { GenFilter, PlatformFilter } from '@/components/Search';

export const LayoutHeader = ({
  currentPlatform,
  isGen1,
  pageType = 'inner',
  showLastUpdatedDate = true,
  showTOC,
  activeSection,
  onSectionChange
}: {
  currentPlatform: Platform;
  isGen1: boolean;
  pageType?: 'home' | 'inner';
  showLastUpdatedDate: boolean;
  showTOC?: boolean;
  activeSection?: string;
  onSectionChange?: (section: SectionKey) => void;
}) => {
  const { menuOpen, toggleMenuOpen } = useContext(LayoutContext);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const sidebarMenuButtonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const asPathWithNoHash = usePathWithoutHash();

  const [platformFilter, setPlatformFilter] = useState<PlatformFilter>('all');
  const [genFilter, setGenFilter] = useState<GenFilter>('gen2');

  const searchParams = useMemo(() => ({
    ...(platformFilter !== 'all' && { optionalFacetFilters: [`platform:${platformFilter}`] }),
    ...(genFilter !== 'both' && { facetFilters: [`gen:${genFilter}`] })
  }), [platformFilter, genFilter]);

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
              searchParameters={searchParams}
              transformItems={transformItems}
              getMissingResultsUrl={({ query }) =>
                `https://github.com/aws-amplify/docs/issues/new?title=${encodeURIComponent(`[search] Missing results for: ${query}`)}&labels=v2`
              }
            />
            <SearchFilters
              platformFilter={platformFilter}
              genFilter={genFilter}
              onPlatformChange={setPlatformFilter}
              onGenChange={setGenFilter}
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

          {!isGen1 && (
            <div className="section-nav-sidebar">
              {(Object.keys(SECTIONS) as SectionKey[]).map((key) => {
                const section = SECTIONS[key];
                const isActive = activeSection === key;
                return (
                  <Link
                    key={key}
                    href={getDefaultPathForSection(key, currentPlatform)}
                    className={`section-nav-sidebar__tab ${isActive ? 'section-nav-sidebar__tab--active' : ''}`}
                    onClick={() => {
                      onSectionChange?.(key);
                      toggleMenuOpen(false);
                    }}
                  >
                    {section.label}
                  </Link>
                );
              })}
            </div>
          )}

          <div className="layout-sidebar-platform">
            <PlatformNavigator
              currentPlatform={currentPlatform}
              isGen1={isGen1}
            />
          </div>

          <div className="layout-sidebar-menu">
            <Menu
              currentPlatform={currentPlatform}
              path={asPathWithNoHash}
              activeSection={activeSection}
            />
            {!isGen1 && (
              <a
                href={`/gen1/${currentPlatform}/`}
                className="layout-sidebar-legacy__link"
              >
                <span className="layout-sidebar-legacy__label">
                  Gen1 Docs
                  <span className="layout-sidebar-legacy__badge">Legacy</span>
                </span>
                <IconChevron className="icon-rotate-270" />
              </a>
            )}
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
