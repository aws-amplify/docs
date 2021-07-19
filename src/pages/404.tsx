import Layout from "../components/Layout";
import ExternalLink from "../components/ExternalLink";
import InternalLinkButton from "../components/InternalLinkButton";
import styled from "@emotion/styled";
import {MQDesktop} from "../components/media";
import {useEffect, useState} from "react";

export const Host = styled.div`
  width: 100%;
  height: calc(100vh - 10.75rem);
  padding: 1rem;

  ${MQDesktop} {
    height: calc(100vh - 7.75rem);
  }

  width: 100%;
  height: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  h1 {
    margin-bottom: 0.5rem;
  }

  p {
    margin-bottom: 1rem;
    max-width: 32rem;
  }
`;

export default function Custom404() {
  let [href, setHref] = useState("https://docs.amplify.aws");
  useEffect(() => {
    setHref(window.location.href);
  }, []);
  return (
    <Layout>
      <Host>
        <h1>404</h1>
        <p>
          {`Apologies––we can't seem to find the page for which you're looking. If this is a mistake, please `}
          <ExternalLink
            href={`https://github.com/aws-amplify/docs/issues/new?title=[missing-page]&labels=v2&body=${encodeURI(
              `**Page**: [\`${href}\`](${href})

**Feedback**: <!-- your feedback here -->
`,
            )}`}
          >
            file an issue
          </ExternalLink>
          {` and we'll fix it ASAP.`}
        </p>
        <InternalLinkButton href="/">
          Return to the landing page
        </InternalLinkButton>
      </Host>
    </Layout>
  );
}
