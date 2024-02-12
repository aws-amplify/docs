import '@aws-amplify/ui-react/styles.css';
import '../styles/styles.scss';
import Head from 'next/head';
import { MDXProvider } from '@mdx-js/react';
import { Layout } from '@/components/Layout';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { trackPageVisit } from '../utils/track';
import { useCurrentPlatform } from '@/utils/useCurrentPlatform';
import { useCanonicalUrl } from '@/utils/useCanonicalUrl';

function MyApp({ Component, pageProps }) {
  const {
    meta,
    platform,
    url,
    hasTOC,
    pageType,
    showBreadcrumbs,
    showLastUpdatedDate,
    useCustomTitle
  } = pageProps;

  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      trackPageVisit();
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);

  const getLayout =
    Component.getLayout ||
    ((page: React.ReactElement) => (
      <Layout
        pageTitle={meta?.title ? meta.title : ''}
        pageDescription={meta?.description ? meta.description : ''}
        pageType={pageType}
        url={url}
        platform={platform ? platform : ''}
        hasTOC={hasTOC}
        useCustomTitle={useCustomTitle}
        showBreadcrumbs={showBreadcrumbs}
        showLastUpdatedDate={showLastUpdatedDate}
      >
        {page}
      </Layout>
    ));

  let canonicalUrl = 'https://docs.amplify.aws';

  const canonicalUrlPath = useCanonicalUrl(meta, useCurrentPlatform());

  canonicalUrl += canonicalUrlPath;

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="msapplication-TileImage"
          content="/assets/icon/ms-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/assets/icon/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/assets/icon/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/assets/icon/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/assets/icon/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/assets/icon/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/assets/icon/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/assets/icon/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/assets/icon/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/assets/icon/apple-icon-180x180.png"
        />
        <link rel="apple-touch-icon" href="/assets/icon/apple-icon.png" />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/assets/icon/android-icon-192x192.png"
        />
        {router.route.startsWith('/gen2') ? (
          <>
            <link
              rel="icon"
              type="image/png"
              sizes="16x16"
              href="/assets/icon/favicon-purple-16x16.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="32x32"
              href="/assets/icon/favicon-purple-32x32.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="96x96"
              href="/assets/icon/favicon-purple-96x96.png"
            />
            <link
              rel="icon"
              type="image/x-icon"
              href="/assets/icon/favicon-purple.ico"
            />
          </>
        ) : (
          <>
            <link
              rel="icon"
              type="image/png"
              sizes="16x16"
              href="/assets/icon/favicon-teal-16x16.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="32x32"
              href="/assets/icon/favicon-teal-32x32.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="96x96"
              href="/assets/icon/favicon-teal-96x96.png"
            />
            <link
              rel="icon"
              type="image/x-icon"
              href="/assets/icon/favicon-teal.ico"
            />
          </>
        )}

        <link rel="apple-touch-icon" href="/assets/icon/icon.png" />
        <link rel="canonical" href={canonicalUrl} />

        {process.env.BUILD_ENV !== 'production' ? (
          <>
            <link
              rel="preload"
              as="script"
              href="https://aa0.awsstatic.com/s_code/js/3.0/awshome_s_code.js"
            />
          </>
        ) : (
          <>
            <link
              rel="preload"
              as="script"
              href="https://a0.awsstatic.com/s_code/js/3.0/awshome_s_code.js"
            />
          </>
        )}
      </Head>

      <MDXProvider>{getLayout(<Component {...pageProps} />)}</MDXProvider>

      {process.env.BUILD_ENV !== 'production' ? (
        <>
          {/* eslint-disable-next-line @next/next/no-sync-scripts */}
          <script src="https://aa0.awsstatic.com/s_code/js/3.0/awshome_s_code.js"></script>
          <script
            src="https://alpha.d2c.marketing.aws.dev/client/loader/v1/d2c-load.js"
            defer
          ></script>
        </>
      ) : (
        <>
          {/* eslint-disable-next-line @next/next/no-sync-scripts */}
          <script src="https://a0.awsstatic.com/s_code/js/3.0/awshome_s_code.js"></script>
          <script
            src="https://d2c.aws.amazon.com/client/loader/v1/d2c-load.js"
            defer
          ></script>
        </>
      )}
      <link
        href="https://prod.assets.shortbread.aws.dev/shortbread.css"
        rel="stylesheet"
      ></link>
    </>
  );
}

export default MyApp;
