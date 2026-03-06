import crypto from 'crypto';
import { ALGOLIA_APP_ID } from '../constants/algolia';
import { ANALYTICS_CSP } from '../constants/csp';
import { NextScript } from 'next/document';

const cspHashOf = (text) => {
  const hash = crypto.createHash('sha256');
  hash.update(text);
  return `'sha256-${hash.digest('base64')}'`;
};

// CSP also set in customHttp.yml
const getCspContent = (nonce) => {
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
      script-src 'unsafe-eval' 'self' nonce-${nonce} ${ANALYTICS_CSP.alpha.script.join(
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
    script-src 'self' nonce-${nonce} ${ANALYTICS_CSP.prod.script.join(
      ' '
    )} ${ANALYTICS_CSP.all.script.join(' ')};
  `;
};

export { getCspContent };
