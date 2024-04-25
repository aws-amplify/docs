import { useState, useEffect, ReactElement } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  ColorMode,
  Flex,
  Heading,
  IconsProvider,
  ThemeProvider,
  View
} from '@aws-amplify/ui-react';
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
import { GEN2BANNER_URLS } from '@/data/gen2Banner-urls';
import { SpaceShip } from '@/components/SpaceShip';
import { LEFT_NAV_LINKS, RIGHT_NAV_LINKS } from '@/utils/globalnav';
import { LayoutProvider, LayoutHeader } from '@/components/Layout';
import { TableOfContents } from '@/components/TableOfContents';
import type { HeadingInterface } from '@/components/TableOfContents/TableOfContents';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { debounce } from '@/utils/debounce';
import '@docsearch/css';
import { Banner } from '@/components/Banner';
import { usePathWithoutHash } from '@/utils/usePathWithoutHash';
import {
  NextPrevious,
  NEXT_PREVIOUS_SECTIONS
} from '@/components/NextPrevious';

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
  children: ReactElement;
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
  const [colorMode, setColorMode] = useState<ColorMode>('system');
  const [tocHeadings, setTocHeadings] = useState<HeadingInterface[]>([]);
  const mainId = 'pageMain';
  const showTOC = hasTOC && tocHeadings.length > 0;
  const router = useRouter();
  const asPathWithNoHash = usePathWithoutHash();
  const basePath = 'docs.amplify.aws';
  const metaUrl = url ? url : basePath + asPathWithNoHash;
  const pathname = router.pathname;
  const shouldShowGen2Banner = GEN2BANNER_URLS.includes(asPathWithNoHash);
  const isGen2 = asPathWithNoHash.split('/')[1] === 'gen2';
  let currentPlatform = isGen2 ? undefined : DEFAULT_PLATFORM;
  const isContributor = asPathWithNoHash.split('/')[1] === 'contribute';
  const currentGlobalNavMenuItem = isContributor ? 'Contribute' : 'Docs';

  const handleColorModeChange = (mode: ColorMode) => {
    setColorMode(mode);
    if (mode !== 'system') {
      localStorage.setItem('colorMode', mode);
    } else {
      localStorage.removeItem('colorMode');
    }
  };

  const isOverview =
    children?.props?.childPageNodes?.length != 'undefined' &&
    children?.props?.childPageNodes?.length > 0;

  const showNextPrev = NEXT_PREVIOUS_SECTIONS.some(
    (section) =>
      asPathWithNoHash.includes(section) &&
      !asPathWithNoHash.endsWith(section) &&
      !isOverview
  );

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

  const title = [
    pageTitle,
    platform ? PLATFORM_DISPLAY_NAMES[platform] : null,
    isGen2 ? 'AWS Amplify Gen 2 Documentation' : 'AWS Amplify Documentation'
  ]
    .filter((s) => s !== '' && s !== null)
    .join(' - ');

  const description = `${pageDescription} AWS Amplify Documentation`;

  const handleScroll = debounce((e) => {
    const bodyScroll = e.target.documentElement.scrollTop;
    if (bodyScroll > 20) {
      document.body.classList.add('scrolled');
    } else if (document.body.classList.contains('scrolled')) {
      document.body.classList.remove('scrolled');
    }
  }, 20);

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
  }, [children, pageType]);

  useEffect(() => {
    if (pageType === 'home') {
      document.addEventListener('scroll', handleScroll);
      return () => {
        document.removeEventListener('scroll', handleScroll);
      };
    }
  });

  useEffect(() => {
    const colorModePreference = localStorage.getItem('colorMode') as ColorMode;
    if (colorModePreference) {
      setColorMode(colorModePreference);
    }
  }, []);

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
          content={`https://docs.amplify.aws/assets/${
            isGen2 ? 'gen2' : 'classic'
          }-og.png`}
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
          content={`https://docs.amplify.aws/assets/${
            isGen2 ? 'gen2' : 'classic'
          }-og.png`}
          key="twitter:image"
        />
      </Head>
      <LayoutProvider
        value={{
          colorMode,
          menuOpen,
          toggleMenuOpen,
          handleColorModeChange
        }}
      >
        <ThemeProvider
          theme={isGen2 ? gen2Theme : defaultTheme}
          colorMode={colorMode}
        >
          <IconsProvider icons={defaultIcons}>
            <View className={`layout-wrapper layout-wrapper--${pageType}`}>
              {pageType === 'home' ? (
                <SpaceShip hasBanner={shouldShowGen2Banner} />
              ) : null}
              <GlobalNav
                leftLinks={LEFT_NAV_LINKS as NavMenuItem[]}
                rightLinks={RIGHT_NAV_LINKS as NavMenuItem[]}
                currentSite={currentGlobalNavMenuItem}
                isGen2={isGen2}
                mainId={mainId}
              />
              <LayoutHeader
                showTOC={showTOC}
                isGen2={isGen2}
                currentPlatform={currentPlatform}
                pageType={pageType}
                showLastUpdatedDate={showLastUpdatedDate}
              ></LayoutHeader>
              <View key={asPathWithNoHash} className="layout-main">
                <Flex
                  id={mainId}
                  as="main"
                  tabIndex={-1}
                  aria-label="Main content"
                  className={`main${showTOC ? ' main--toc' : ''}`}
                >
                  {showBreadcrumbs ? (
                    <Breadcrumbs route={pathname} platform={currentPlatform} />
                  ) : null}
                  {shouldShowGen2Banner ? <Banner /> : null}
                  {useCustomTitle ? null : (
                    <Heading level={1}>{pageTitle}</Heading>
                  )}
                  {children}
                  {showNextPrev && <NextPrevious />}
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
