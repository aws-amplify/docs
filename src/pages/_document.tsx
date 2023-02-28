import crypto from 'crypto';
import Document, { Html, Head, Main, NextScript } from 'next/document';

const cspHashOf = (text) => {
  const hash = crypto.createHash('sha256');
  hash.update(text);
  return `'sha256-${hash.digest('base64')}'`;
};

// CSP also set in customHttp.yml
const getCspContent = (context) => {
  const cspInlineScriptHash = cspHashOf(
    NextScript.getInlineScriptSource(context)
  );

  // Dev environment
  if (process.env.NODE_ENV !== 'production') {
    return `upgrade-insecure-requests;
      default-src 'none';
      prefetch-src 'self';
      style-src 'self' 'unsafe-inline';
      font-src 'self' data:;
      frame-src 'self' https://www.youtube-nocookie.com https://aws.demdex.net https://dpm.demdex.net https://stackblitz.com;
      connect-src 'self' *.shortbread.aws.dev https://amazonwebservices.d2.sc.omtrdc.net https://aws.demdex.net https://dpm.demdex.net https://cm.everesttech.net https://aa0.awsstatic.com/ https://d2c-alpha.dse.marketing.aws.a2z.com
      https://*.algolia.net https://*.algolianet.com *.amazonaws.com;
      img-src 'self' https://img.shields.io data: cm.everesttech.net https://amazonwebservices.d2.sc.omtrdc.net https://aws.demdex.net https://dpm.demdex.net https://cm.everesttech.net https://aa0.awsstatic.com/; 
      media-src 'self';
      script-src 'unsafe-eval' 'self' ${cspInlineScriptHash} 	https://aa0.awsstatic.com/;
    `;
  }

  // Prod environment
  return `upgrade-insecure-requests;
    default-src 'none';
    prefetch-src 'self';
    style-src 'self' 'unsafe-inline';
    font-src 'self';
    frame-src 'self' https://www.youtube-nocookie.com https://aws.demdex.net https://dpm.demdex.net;
    connect-src 'self' *.shortbread.aws.dev https://amazonwebservices.d2.sc.omtrdc.net https://aws.demdex.net https://dpm.demdex.net https://cm.everesttech.net https://a0.awsstatic.com/ https://d2c.aws.amazon.com https://vs.aws.amazon.com
    https://*.algolia.net https://*.algolianet.com *.amazonaws.com https://docs-backend.amplify.aws;
    img-src 'self' https://img.shields.io cm.everesttech.net https://amazonwebservices.d2.sc.omtrdc.net https://aws.demdex.net https://dpm.demdex.net https://cm.everesttech.net https://a0.awsstatic.com/;
    media-src 'self';
    script-src 'self' ${cspInlineScriptHash} https://a0.awsstatic.com/;
  `;
};

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta
            httpEquiv="Content-Security-Policy"
            content={getCspContent(this.props)}
          />
          <link
            rel="preload"
            href="/fonts/AmazonEmber_W_Rg.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/AmazonEmber_W_Lt.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
