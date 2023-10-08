import ExternalLink from '../components/ExternalLink';
import InternalLinkButton from '../components/InternalLinkButton';
import { useEffect, useState } from 'react';

export default function Custom404() {
  let [href, setHref] = useState('https://docs.amplify.aws');
  useEffect(() => {
    setHref(window.location.href);
  }, []);
  return (
    <>
      <h1>404</h1>
      <p>
        {`Apologies––we can't seem to find the page for which you're looking. If this is a mistake, please `}
        <ExternalLink
          href={`https://github.com/aws-amplify/docs/issues/new?title=[missing-page]&labels=v2&body=${encodeURI(
            `**Page**: [\`${href}\`](${href})

**Feedback**: <!-- your feedback here -->
`
          )}`}
        >
          file an issue
        </ExternalLink>
        {` and we'll fix it ASAP.`}
      </p>
      <InternalLinkButton href="/">
        Return to the landing page
      </InternalLinkButton>
    </>
  );
}
