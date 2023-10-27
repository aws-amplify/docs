import '@aws-amplify/ui-react/styles.css';
import '@algolia/autocomplete-theme-classic';
import '../styles/styles.scss';
import Head from 'next/head';
import { MDXProvider } from '@mdx-js/react';
import { Layout } from '@/components/Layout';

function MyApp({ Component, pageProps }) {
  const { meta, platform, url } = pageProps;
  const getLayout =
    Component.getLayout ||
    ((page) => (
      <Layout
        pageTitle={meta?.title ? meta.title : ''}
        pageDescription={meta?.description ? meta.description : ''}
        url={url}
        platform={platform ? platform : ''}
      >
        {page}
      </Layout>
    ));
  return (
    <>
      <Head>
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
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/assets/icon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/assets/icon/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/assets/icon/favicon-16x16.png"
        />
        <link rel="apple-touch-icon" href="/assets/icon/icon.png" />
        <link rel="icon" type="image/x-icon" href="/assets/icon/favicon.ico" />
      </Head>

      <MDXProvider>{getLayout(<Component {...pageProps} />)}</MDXProvider>

      {process.env.BUILD_ENV !== 'production' ? (
        <>
          <script src="https://aa0.awsstatic.com/s_code/js/3.0/awshome_s_code.js"></script>
          <script
            src="https://alpha.d2c.marketing.aws.dev/client/loader/v1/d2c-load.js"
            defer
          ></script>
        </>
      ) : (
        <>
          <script src="https://a0.awsstatic.com/s_code/js/3.0/awshome_s_code.js"></script>
          <script
            src="https://d2c.aws.amazon.com/client/loader/v1/d2c-load.js"
            defer
          ></script>
        </>
      )}
    </>
  );
}

export default MyApp;
