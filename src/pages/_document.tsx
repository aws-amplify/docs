import crypto from 'crypto';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ALGOLIA_APP_ID } from '../constants/algolia';
import { NextRouter, useRouter } from 'next/router';

const cspHashOf = (text) => {
  const hash = crypto.createHash('sha256');
  hash.update(text);
  return `'sha256-${hash.digest('base64')}'`;
};

const ANALYTICS_CSP = {
  all: {
    connect: [
      'https://amazonwebservices.d2.sc.omtrdc.net',
      'https://aws.demdex.net',
      'https://dpm.demdex.net',
      'https://cm.everesttech.net',
      'https://prod.tools.shortbread.aws.dev',
      'https://prod.log.shortbread.aws.dev'
    ],
    img: [
      'https://amazonwebservices.d2.sc.omtrdc.net',
      'https://aws.demdex.net',
      'https://dpm.demdex.net',
      'https://cm.everesttech.net'
    ],
    frame: ['https://aws.demdex.net', 'https://dpm.demdex.net'],
    script: ['https://prod.assets.shortbread.aws.dev'],
    style: ['https://prod.assets.shortbread.aws.dev']
  },
  prod: {
    connect: [
      'https://d2c.aws.amazon.com/',
      'https://vs.aws.amazon.com',
      'https://a0.awsstatic.com/',
      'https://aws.amazon.com/'
    ],
    img: ['https://a0.awsstatic.com/', 'https://d2c.aws.amazon.com/'],
    script: ['https://a0.awsstatic.com/', 'https://d2c.aws.amazon.com/']
  },
  alpha: {
    connect: [
      'https://aa0.awsstatic.com/',
      'https://alpha.d2c.marketing.aws.dev/',
      'https://aws-mktg-csds-alpha.integ.amazon.com/',
      'https://d2c-alpha.dse.marketing.aws.a2z.com',
      'https://vs-alpha.aws.amazon.com'
    ],
    img: ['https://aa0.awsstatic.com/', 'https://alpha.d2c.marketing.aws.dev/'],
    script: [
      'https://aa0.awsstatic.com/',
      'https://alpha.d2c.marketing.aws.dev/'
    ]
  }
};

// CSP also set in customHttp.yml
const getCspContent = (context) => {
  const cspInlineScriptHash = cspHashOf(
    NextScript.getInlineScriptSource(context)
  );

  // Dev environment
  if (process.env.BUILD_ENV !== 'production') {
    return `
      default-src 'none';
      style-src 'self' 'unsafe-inline' ${ANALYTICS_CSP.all.style.join(' ')};
      font-src 'self' data:;
      frame-src 'self' https://www.youtube-nocookie.com ${ANALYTICS_CSP.all.frame.join(
        ' '
      )};
      connect-src 'self' ${ANALYTICS_CSP.all.connect.join(
        ' '
      )} ${ANALYTICS_CSP.alpha.connect.join(
        ' '
      )} https://${ALGOLIA_APP_ID}-dsn.algolia.net https://${ALGOLIA_APP_ID}-1.algolianet.com https://${ALGOLIA_APP_ID}-2.algolianet.com https://${ALGOLIA_APP_ID}-3.algolianet.com;
      img-src 'self' https://img.shields.io data: ${ANALYTICS_CSP.all.img.join(
        ' '
      )} ${ANALYTICS_CSP.alpha.img.join(' ')};
      media-src 'self';
      script-src 'unsafe-eval' 'self' ${cspInlineScriptHash} ${ANALYTICS_CSP.alpha.script.join(
        ' '
      )} ${ANALYTICS_CSP.all.script.join(' ')};`;
  }

  // Prod environment
  // Have to keep track of CSP inside customHttp.yml as well
  return `
    default-src 'none';
    style-src 'self' 'unsafe-inline' ${ANALYTICS_CSP.all.style.join(' ')};
    font-src 'self';
    frame-src 'self' https://www.youtube-nocookie.com ${ANALYTICS_CSP.all.frame.join(
      ' '
    )};
    connect-src 'self' ${ANALYTICS_CSP.all.connect.join(
      ' '
    )} ${ANALYTICS_CSP.prod.connect.join(
      ' '
    )} https://${ALGOLIA_APP_ID}-dsn.algolia.net https://${ALGOLIA_APP_ID}-1.algolianet.com https://${ALGOLIA_APP_ID}-2.algolianet.com https://${ALGOLIA_APP_ID}-3.algolianet.com;
    img-src 'self' https://img.shields.io ${ANALYTICS_CSP.all.img.join(
      ' '
    )} ${ANALYTICS_CSP.prod.img.join(' ')};
    media-src 'self';
    script-src 'self' ${cspInlineScriptHash} ${ANALYTICS_CSP.prod.script.join(
      ' '
    )} ${ANALYTICS_CSP.all.script.join(' ')};
  `;
};

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta
            httpEquiv="Content-Security-Policy"
            content={getCspContent(this.props)}
          />
          {process.env.BUILD_ENV === 'production' ||
          process.env.BUILD_ENV === 'staging' ? (
            <script
              src="https://prod.assets.shortbread.aws.dev/shortbread.js"
              defer
            ></script>
          ) : null}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
