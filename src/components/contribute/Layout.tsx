import Head from 'next/head';
import { ThemeProvider } from '@aws-amplify/ui-react';
import { Layout as BaseLayout } from '../Layout';
import { theme } from './theme';
import type { PropsWithChildren } from 'react';

export type LayoutProps = PropsWithChildren<{
  // @todo use types from Layout component
  meta: {
    title: string;
    description: string;
  };
}>;

export default function Layout({ children, meta }: LayoutProps) {
  const creator = '@AWSAmplify';
  const url = 'https://docs.amplify.aws/contribute';
  return (
    <>
      <Head>
        <title>AWS Amplify Contributor Program</title>

        <meta name="HandheldFriendly" content="True" />
        <meta name="MobileOptimized" content="320" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta name="description" content={meta.description} />

        <meta property="og:title" content={meta.title} key="title" />
        <meta property="og:site_name" content="Amplify Contributor Program" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:url" content={url} />
        <meta property="og:locale" content="en-us" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={creator} />
        <meta name="twitter:creator" content={creator} />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta
          property="twitter:image"
          content="/images/contribute/contributor-bash-og-image.png"
        />
        <meta name="twitter:domain" content={url} />
      </Head>
      <div id="contributor-page">
        <ThemeProvider theme={theme}>
          <BaseLayout meta={meta}>{children}</BaseLayout>
        </ThemeProvider>
      </div>
    </>
  );
}
