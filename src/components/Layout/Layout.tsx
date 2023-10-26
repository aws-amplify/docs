import { useState, forwardRef, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  Flex,
  View,
  Button,
  ThemeProvider,
  IconsProvider
} from '@aws-amplify/ui-react';
import { defaultIcons } from '@/themes/defaultIcons';
import { defaultTheme } from '@/themes/defaultTheme';
import { Footer } from '@/components/Footer/';
import { GlobalNav, NavMenuItem } from '@/components/GlobalNav/GlobalNav';
import {
  DEFAULT_PLATFORM,
  PLATFORMS,
  PLATFORM_DISPLAY_NAMES,
  Platform
} from '@/data/platforms';
import { SpaceShip } from '@/components/SpaceShip';
import SearchBar from '@/components/SearchBar';
import { IconMenu, IconDoubleChevron } from '@/components/Icons';
import { LEFT_NAV_LINKS, RIGHT_NAV_LINKS } from '@/utils/globalnav';
import { trackPageVisit } from '../../utils/track';
import { Menu } from '@/components/Menu';
import { LayoutProvider } from '@/components/Layout';
import directory from 'src/directory/directory.json';
import { PageNode } from 'src/directory/directory';

export const Layout = forwardRef(function Layout(
  {
    children,
    pageTitle,
    pageDescription,
    platform,
    url,
    pageType = 'inner'
  }: {
    children: any;
    pageTitle?: string;
    pageDescription?: string;
    platform?: Platform;
    url?: string;
    pageType?: 'home' | 'inner';
  },
  footerRef
) {
  useEffect(() => {
    trackPageVisit();
  }, []);

  const [menuOpen, toggleMenuOpen] = useState(false);

  const router = useRouter();
  const basePath = 'docs.amplify.aws';
  const metaUrl = url ? url : basePath + router.asPath;

  const rootPage = directory as PageNode;
  const platformOverviewPage =
    rootPage.children && rootPage.children.length === 1
      ? rootPage.children[0]
      : undefined;

  // [platform] will always be the very first subpath right?
  // when using `router.asPath` it returns a string that starts with a '/'
  // To get the "platform" the client was trying to visit, we have to get the string at index 1
  // Doing this because when visiting a 404 page, there is no `router.query.platform`, so we have
  // to check where the user was trying to visit from
  const asPathPlatform = router.asPath.split('/')[1] as Platform;

  const currentPlatform = platform
    ? platform
    : PLATFORMS.includes(asPathPlatform)
    ? asPathPlatform
    : DEFAULT_PLATFORM;

  const title = [
    pageTitle,
    platform ? PLATFORM_DISPLAY_NAMES[platform] : null,
    'AWS Amplify Docs'
  ]
    .filter((s) => s !== '' && s !== null)
    .join(' - ');

  const description = pageDescription + 'AWS Amplify Docs';

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
        <ThemeProvider theme={defaultTheme}>
          <IconsProvider icons={defaultIcons}>
            <View className={`layout-wrapper layout-wrapper--${pageType}`}>
              {pageType === 'home' ? <SpaceShip /> : null}
              <GlobalNav
                leftLinks={LEFT_NAV_LINKS as NavMenuItem[]}
                rightLinks={RIGHT_NAV_LINKS as NavMenuItem[]}
                currentSite="Docs"
              />
              <View className={`layout-search layout-search--${pageType}`}>
                <Flex className="search-menu-bar">
                  <Button
                    onClick={() => toggleMenuOpen(true)}
                    size="small"
                    className="search-menu-toggle mobile-toggle"
                  >
                    <IconMenu aria-hidden="true" />
                    Menu
                  </Button>
                  <View className="search-menu-bar__search">
                    <SearchBar />
                  </View>
                </Flex>
              </View>
              <View
                className={`layout-sidebar${
                  menuOpen ? ' layout-sidebar--expanded' : ''
                }`}
              >
                <View
                  className={`layout-sidebar__backdrop${
                    menuOpen ? ' layout-sidebar__backdrop--expanded' : ''
                  }`}
                  onClick={() => toggleMenuOpen(false)}
                ></View>
                <View
                  className={`layout-sidebar__inner${
                    menuOpen ? ' layout-sidebar__inner--expanded' : ''
                  }`}
                >
                  <div className="layout-sidebar-platform">
                    <Button
                      size="small"
                      colorTheme="overlay"
                      className="mobile-toggle"
                      onClick={() => toggleMenuOpen(false)}
                    >
                      <IconDoubleChevron aria-hidden="true" />
                      Menu
                    </Button>
                    [ Platform switcher goes here]
                  </div>
                  <div className="layout-sidebar-menu">
                    <Menu
                      currentPlatform={currentPlatform}
                      platformOverviewPage={platformOverviewPage}
                    />
                  </div>
                </View>
              </View>

              <View className="layout-main">
                <Flex as="main" className="main">
                  {children}
                </Flex>
                <Footer />
              </View>
            </View>
          </IconsProvider>
        </ThemeProvider>
      </LayoutProvider>
    </>
  );
});
