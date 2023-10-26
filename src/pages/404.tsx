import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ExternalLink from '@/components/ExternalLink';
import { IconExternalLink } from '@/components/Icons';
import { Button, Flex, Text, View, Heading } from '@aws-amplify/ui-react';

export default function Custom404() {
  const basePath = 'https://docs.amplify.aws';
  let [href, setHref] = useState(basePath);
  const path = useRouter().asPath;
  useEffect(() => {
    setHref(basePath + path);
  }, [path]);
  return (
    <Flex className="four-oh-four">
      <Heading level={1}>404</Heading>
      <Text>
        Apologies––we can't seem to find the page for which you're looking. If
        this is a mistake, please file an issue and we'll fix it ASAP.
      </Text>
      <Flex className="four-oh-four__cta">
        <Button as="a" href="/" variation="primary">
          Return to home page
        </Button>
        <Button
          variation="link"
          as="a"
          rel="noopener noreferrer"
          target="_blank"
          gap="small"
          href={`https://github.com/aws-amplify/docs/issues/new?title=[missing-page]&labels=v2&body=${encodeURI(
            `**Page**: [\`${href}\`](${href})

**Feedback**: <!-- your feedback here -->
`
          )}`}
        >
          File an issue <IconExternalLink />
        </Button>
      </Flex>
    </Flex>
  );
}
