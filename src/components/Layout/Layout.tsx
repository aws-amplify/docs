import { useState, useEffect, ReactElement, createContext } from 'react';
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
import classNames from 'classnames';
import { defaultIcons } from '@/themes/defaultIcons';
import { defaultTheme } from '@/themes/defaultTheme';
import { gen1Theme } from '@/themes/gen1Theme';
import { Footer } from '@/components/Footer/';
import { GlobalNav, NavMenuItem } from '@/components/GlobalNav/GlobalNav';
import {
  DEFAULT_PLATFORM,
  PLATFORMS,
  PLATFORM_DISPLAY_NAMES,
  Platform
} from '@/data/platforms';
import { SpaceShip } from '@/components/SpaceShip';
import { LEFT_NAV_LINKS, RIGHT_NAV_LINKS } from '@/utils/globalnav';
import { LayoutProvider, LayoutHeader } from '@/components/Layout';
import { TableOfContents } from '@/components/TableOfContents';
import type { HeadingInterface } from '@/components/TableOfContents/TableOfContents';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { debounce } from '@/utils/debounce';
import '@docsearch/css';
import { usePathWithoutHash } from '@/utils/usePathWithoutHash';
import {
  NextPrevious,
  NEXT_PREVIOUS_SECTIONS
} from '@/components/NextPrevious';
import { Modal } from '@/components/Modal';
import { Gen1Banner } from '@/components/Gen1Banner';
import { ApiModal } from '../ApiDocs/display';
import { LinkDataType } from '../ApiDocs/display/TypeLink';

export const TypeContext = createContext({
  setModalData: (data) => data,
  modalOpen: () => {},
  addBreadCrumb: (data) => data,
  setBC: (data) => data
});

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
  const [modalData, setModalData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [breadCrumbs, setBreadCrumbs] = useState<LinkDataType[]>([]);

  const modalOpen = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  const addBreadCrumb = (bc) => {
    breadCrumbs.push(bc);
    setBreadCrumbs(breadCrumbs);
  };

  const setBC = (bc) => {
    setBreadCrumbs(bc);
  };

  const clearBC = () => {
    setBreadCrumbs([]);
  };

  const value = {
    setModalData,
    modalOpen,
    addBreadCrumb,
    setBC
  };

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
  const isGen1 = asPathWithNoHash.split('/')[1] === 'gen1';
  const isContributor = asPathWithNoHash.split('/')[1] === 'contribute';
  const currentGlobalNavMenuItem = isContributor ? 'Contribute' : 'Docs';
  const isHome = pageType === 'home';
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
      pathname.includes(section) &&
      !asPathWithNoHash.endsWith(section) &&
      !isOverview
  );

  // For 404 pages, we need to check what platform the user was visiting from so that we can
  // show them the correct platform. This is because 404 pages do not have the platform in router.query.platform.
  // For gen1 routes, [platform] is in index 2
  const asPathPlatform = isGen1
    ? (asPathWithNoHash.split('/')[2] as Platform)
    : (asPathWithNoHash.split('/')[1] as Platform);

  const currentPlatform = platform
    ? platform
    : PLATFORMS.includes(asPathPlatform)
      ? asPathPlatform
      : DEFAULT_PLATFORM;

  const title = [
    pageTitle,
    platform ? PLATFORM_DISPLAY_NAMES[platform] : null,
    isGen1
      ? 'AWS Amplify Gen 1 Documentation'
      : 'AWS Amplify Gen 2 Documentation'
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

  const isGen1GettingStarted = /\/gen1\/\w+\/start\/getting-started\//.test(
    asPathWithNoHash
  );
  const isGen1HowAmplifyWorks = /\/gen1\/\w+\/how-amplify-works\//.test(
    asPathWithNoHash
  );

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
    if (isHome) {
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
            isGen1 ? 'classic' : 'gen2'
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
            isGen1 ? 'classic' : 'gen2'
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
          theme={isGen1 ? gen1Theme : defaultTheme}
          colorMode={colorMode}
        >
          <IconsProvider icons={defaultIcons}>
            <TypeContext.Provider value={value}>
              <ApiModal
                data={modalData}
                showModal={showModal}
                close={closeModal}
                breadCrumbs={breadCrumbs}
                clearBC={clearBC}
              />
              <Modal isGen1={isGen1} />
              <View
                className={classNames(
                  'layout-wrapper',
                  `layout-wrapper--${pageType}`,
                  {
                    'spaceship-layout': isHome,
                    'spaceship-layout--gen1': isHome && isGen1
                  }
                )}
              >
                {isHome ? <SpaceShip /> : null}
                <GlobalNav
                  leftLinks={LEFT_NAV_LINKS as NavMenuItem[]}
                  rightLinks={RIGHT_NAV_LINKS as NavMenuItem[]}
                  currentSite={currentGlobalNavMenuItem}
                  isGen1={isGen1}
                  mainId={mainId}
                />
                <LayoutHeader
                  showTOC={showTOC}
                  isGen1={isGen1}
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
                      <Breadcrumbs
                        route={pathname}
                        platform={currentPlatform}
                      />
                    ) : null}
                    {useCustomTitle ? null : (
                      <Heading level={1}>{pageTitle}</Heading>
                    )}
                    {(isGen1GettingStarted || isGen1HowAmplifyWorks) && (
                      <Gen1Banner currentPlatform={currentPlatform} />
                    )}
                    {children}
                    {showNextPrev && <NextPrevious />}
                  </Flex>
                  {showTOC ? <TableOfContents headers={tocHeadings} /> : null}
                </View>
                <Footer hasTOC={showTOC} />
              </View>
            </TypeContext.Provider>
          </IconsProvider>
        </ThemeProvider>
      </LayoutProvider>
    </>
  );
};
