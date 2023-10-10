import { useState } from 'react';
import Head from 'next/head';
import { Footer } from '@/components/Footer/';
import { useRouter } from 'next/router';
import { GlobalNav, NavMenuItem } from '@/components/GlobalNav/GlobalNav';
import { TestNav } from '@/components/TestNav';
import { Flex, View, Button } from '@aws-amplify/ui-react';
import { PLATFORM_DISPLAY_NAMES } from '@/data/platforms';
import SearchBar from '@/components/SearchBar';
import { IconMenu, IconDoubleChevron } from '@/components/Icons';

import { LEFT_NAV_LINKS, RIGHT_NAV_LINKS } from '@/utils/globalnav';
import { forwardRef, useEffect } from 'react';
import { trackPageVisit } from '../../utils/track';
import { Menu } from '../Menu-new';

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
    platform?: string;
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
  if (!router.isReady) return <></>;

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
      <View className={`layout-wrapper layout-wrapper--${pageType}`}>
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
            className="layout-sidebar__backdrop"
            onClick={() => toggleMenuOpen(false)}
          ></View>
          <View className="layout-sidebar__inner">
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
              <Menu />
            </div>
          </View>
          {/* <button
            className="mobile-toggle-close"
            onClick={() => toggleMenuOpen(false)}
          >
            <IconDoubleChevron aria-hidden="true" />
            Close menu
          </button> */}
        </View>

        <View className="layout-main">
          <Flex as="main" className="main">
            {children}
          </Flex>
          <Footer />
        </View>
      </View>
    </>
  );
});
