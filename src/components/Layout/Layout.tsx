import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  Button,
  Flex,
  Heading,
  IconsProvider,
  ThemeProvider,
  View,
  VisuallyHidden
} from '@aws-amplify/ui-react';
import classNames from 'classnames';
import { defaultIcons } from '@/themes/defaultIcons';
import { defaultTheme } from '@/themes/defaultTheme';
import { gen2Theme } from '@/themes/gen2Theme';
import { Footer } from '@/components/Footer/';
import { GlobalNav, NavMenuItem } from '@/components/GlobalNav/GlobalNav';
import {
  DEFAULT_PLATFORM,
  PLATFORMS,
  PLATFORM_DISPLAY_NAMES,
  Platform
} from '@/data/platforms';
import { ALGOLIA_API_KEY, ALGOLIA_INDEX_NAME, ALGOLIA_APP_ID } from '../../constants/algolia';
import { SpaceShip } from '@/components/SpaceShip';
import { IconMenu, IconDoubleChevron } from '@/components/Icons';
import { LEFT_NAV_LINKS, RIGHT_NAV_LINKS } from '@/utils/globalnav';
import { trackPageVisit } from '../../utils/track';
import { Menu } from '@/components/Menu';
import { LayoutProvider } from '@/components/Layout';
import { TableOfContents } from '@/components/TableOfContents';
import type { HeadingInterface } from '@/components/TableOfContents/TableOfContents';
import { PlatformNavigator } from '@/components/PlatformNavigator';
import directory from 'src/directory/directory.json';
import flatDirectory from 'src/directory/flatDirectory.json';
import { PageNode } from 'src/directory/directory';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { debounce } from '@/utils/debounce';
import { DocSearch } from '@docsearch/react';
import '@docsearch/css';
import { PageLastUpdated } from '../PageLastUpdated';

export const Layout = ({
  children,
  hasTOC = true,
  pageDescription,
  pageTitle,
  pageType = 'inner',
  platform,
  showBreadcrumbs = true,
  showLastUpdatedDate = true,
  url,
  useCustomTitle = false
}: {
  children: any;
  hasTOC?: boolean;
  pageDescription?: string;
  pageTitle?: string;
  pageType?: 'home' | 'inner';
  platform?: Platform;
  showBreadcrumbs?: boolean;
  showLastUpdatedDate: boolean;
  url?: string;
  useCustomTitle?: boolean;
}) => {
  const [menuOpen, toggleMenuOpen] = useState(false);
  const [tocHeadings, setTocHeadings] = useState<HeadingInterface[]>([]);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const sidebarMenuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    trackPageVisit();
  }, []);

  useEffect(() => {
    const headings: HeadingInterface[] = [];

    const defaultHeadings = '.main > h2, .main > h3';
    const cliCommandHeadings =
      '.commands-list__command > h2, .commands-list__command > .commands-list__command__subcommands > h3';
    const headingSelectors = [defaultHeadings, cliCommandHeadings];

    const pageHeadings = document.querySelectorAll(headingSelectors.join(', '));

    pageHeadings.forEach((node) => {
      const { innerText, id, localName } = node as HTMLElement;
      if (innerText && id && (localName == 'h2' || localName == 'h3')) {
        headings.push({
          linkText: innerText,
          hash: id,
          level: localName
        });
      }
    });
    setTocHeadings(headings);

    if (pageType === 'home') {
      document.addEventListener('scroll', handleScroll);
      return () => {
        document.removeEventListener('scroll', handleScroll);
      };
    }
  }, [children, pageType]);

  const showTOC = hasTOC && tocHeadings.length > 0;
  const router = useRouter();
  const basePath = 'docs.amplify.aws';
  const metaUrl = url ? url : basePath + router.asPath;
  const pathname = router.pathname;

  let currentPlatform = DEFAULT_PLATFORM;
  const homepageNode = directory as PageNode;
  let rootMenuNode;

  const isGen2 = router.asPath.split('/')[1] === 'gen2';
  const searhParam = isGen2 ? 'gen2' : '[platform]';

  if (homepageNode?.children && homepageNode.children.length > 0) {
    rootMenuNode = homepageNode.children.find((node) => {
      if (node.path) {
        return node.path.indexOf(searhParam) > -1;
      }
    });
  }

  if (!isGen2) {
    // [platform] will always be the very first subpath right?
    // when using `router.asPath` it returns a string that starts with a '/'
    // To get the "platform" the client was trying to visit, we have to get the string at index 1
    // Doing this because when visiting a 404 page, there is no `router.query.platform`, so we have
    // to check where the user was trying to visit from
    const asPathPlatform = router.asPath.split('/')[1] as Platform;

    currentPlatform = platform
      ? platform
      : PLATFORMS.includes(asPathPlatform)
        ? asPathPlatform
        : DEFAULT_PLATFORM;
  }

  const title = [
    pageTitle,
    platform ? PLATFORM_DISPLAY_NAMES[platform] : null,
    'AWS Amplify Docs'
  ]
    .filter((s) => s !== '' && s !== null)
    .join(' - ');

  const description = `${pageDescription} AWS Amplify Docs`;

  const handleScroll = debounce((e) => {
    const bodyScroll = e.target.documentElement.scrollTop;
    if (bodyScroll > 20) {
      document.body.classList.add('scrolled');
    } else if (document.body.classList.contains('scrolled')) {
      document.body.classList.remove('scrolled');
    }
  }, 20);

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
    <>
      <Head>
        <title>{`${title}`}</title>
        <meta property="og:title" content={title} key="og:title" />
        <meta name="description" content={description} />
        <meta
          property="og:description"
          content={description}
          key="og:description"
        />
        <meta property="og:url" content={metaUrl} key="og:url" />
        <meta
          property="og:image"
          content="https://docs.amplify.aws/assets/ogp.jpg"
          key="og:image"
        />
        <meta property="description" content={description} key="description" />
        <meta property="twitter:card" content="summary" key="twitter:card" />
        <meta property="twitter:title" content={title} key="twitter:title" />
        <meta
          property="twitter:description"
          content={description}
          key="twitter:description"
        />
        <meta
          property="twitter:image"
          content="https://docs.amplify.aws/assets/ogp.jpg"
          key="twitter:image"
        />
      </Head>
      <LayoutProvider value={{ menuOpen, toggleMenuOpen }}>
        <ThemeProvider theme={isGen2 ? gen2Theme : defaultTheme}>
          <IconsProvider icons={defaultIcons}>
            <View className={`layout-wrapper layout-wrapper--${pageType}`}>
              {pageType === 'home' ? <SpaceShip /> : null}
              <GlobalNav
                leftLinks={LEFT_NAV_LINKS as NavMenuItem[]}
                rightLinks={RIGHT_NAV_LINKS as NavMenuItem[]}
                currentSite="Docs"
                isGen2={isGen2}
              />
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
                  <DocSearch
                    appId={process.env.ALGOLIA_APP_ID || ALGOLIA_APP_ID}
                    indexName={process.env.ALGOLIA_INDEX_NAME || ALGOLIA_INDEX_NAME}
                    apiKey={process.env.ALGOLIA_API_KEY || ALGOLIA_API_KEY}
                    searchParameters={{
                      facetFilters: [`platform:${currentPlatform}`]
                    }}
                  />
                </View>
              </Flex>
              <View
                className={`layout-sidebar${menuOpen ? ' layout-sidebar--expanded' : ''
                  }`}
              >
                <View
                  className={`layout-sidebar__backdrop${menuOpen ? ' layout-sidebar__backdrop--expanded' : ''
                    }`}
                  onClick={() => toggleMenuOpen(false)}
                ></View>
                <View
                  className={`layout-sidebar__inner${menuOpen ? ' layout-sidebar__inner--expanded' : ''
                    }`}
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
                        currentPlatform={
                          PLATFORM_DISPLAY_NAMES[currentPlatform]
                        }
                      />
                    </div>
                  )}

                  <div className="layout-sidebar-menu">
                    {isGen2 ? (
                      <Menu
                        rootMenuNode={rootMenuNode}
                        menuTitle="How Gen2 Amplify works"
                        menuHref={{
                          pathname: `/gen2`
                        }}
                      />
                    ) : (
                      <Menu
                        currentPlatform={currentPlatform}
                        rootMenuNode={rootMenuNode}
                        menuTitle="How Amplify works"
                        menuHref={{
                          pathname: `/[platform]`,
                          query: { platform: currentPlatform }
                        }}
                      />
                    )}
                    {/* <div className="layout-sidebar-feedback">
                      [ Feedback widget goes here ]
                    </div> */}
                    {showLastUpdatedDate && (
                      <PageLastUpdated
                        directoryData={flatDirectory[router.pathname]}
                      />
                    )}
                  </div>
                </View>
              </View>

              <View key={router.asPath} className="layout-main">
                <Flex
                  as="main"
                  className={`main${showTOC ? ' main--toc' : ''}`}
                >
                  {showBreadcrumbs ? (
                    <Breadcrumbs
                      route={pathname}
                      platform={currentPlatform}
                      isGen2={isGen2}
                    />
                  ) : null}
                  {useCustomTitle ? null : (
                    <Heading level={1}>{pageTitle}</Heading>
                  )}
                  {children}
                </Flex>
                {showTOC ? <TableOfContents headers={tocHeadings} /> : null}
              </View>
              <Footer hasTOC={showTOC} />
            </View>
          </IconsProvider>
        </ThemeProvider>
      </LayoutProvider>
    </>
  );
};
