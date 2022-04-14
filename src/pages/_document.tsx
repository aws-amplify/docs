import crypto from 'crypto';
import Document, { Html, Head, Main, NextScript } from 'next/document';

const cspHashOf = (text) => {
  const hash = crypto.createHash('sha256');
  hash.update(text);
  return `'sha256-${hash.digest('base64')}'`;
};

const getCspContent = (context) => {
  const cspInlineScriptHash = cspHashOf(
    NextScript.getInlineScriptSource(context)
  );

  // Dev environment
  if (process.env.NODE_ENV !== 'production') {
    return `upgrade-insecure-requests;
      default-src 'none';
      style-src 'self' 'unsafe-inline';
      font-src 'self' data:;
      frame-src 'self';
      connect-src 'self' *.shortbread.aws.dev amazonwebservices.d2.sc.omtrdc.net dpm.demdex.net
      https://*.algolia.net https://*.algolianet.com https://ym8kdcu1hl.execute-api.us-west-2.amazonaws.com/feedback/submissions;
      img-src 'self' data: cm.everesttech.net amazonwebservices.d2.sc.omtrdc.net dpm.demdex.net;
      script-src 'unsafe-eval' 'self' ${cspInlineScriptHash} a0.awsstatic.com;
    `;
  }

  // Prod environment
  return `upgrade-insecure-requests;
    default-src 'none';
    style-src 'self';
    font-src 'self';
    frame-src 'self';
    connect-src 'self' *.shortbread.aws.dev amazonwebservices.d2.sc.omtrdc.net dpm.demdex.net
    https://*.algolia.net https://*.algolianet.com https://ym8kdcu1hl.execute-api.us-west-2.amazonaws.com/feedback/submissions;
    img-src 'self' cm.everesttech.net amazonwebservices.d2.sc.omtrdc.net dpm.demdex.net;
    script-src 'self' ${cspInlineScriptHash} a0.awsstatic.com;
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
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
