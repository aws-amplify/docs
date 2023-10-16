import ExternalLink from '../ExternalLink';
import * as links from '../../constants/links';
import { Text, View, VisuallyHidden, Flex } from '@aws-amplify/ui-react';
import {
  IconDiscord,
  IconTwitter,
  IconGithub,
  IconAWS
} from '@/components/Icons';

export const Footer = () => {
  return (
    <Flex as="footer" className="footer">
      <Flex className="footer__content">
        <p>
          <IconAWS aria-hidden="true" marginInlineEnd="xs" />
          Amplify open source software, documentation and community are
          supported by Amazon Web Services.
        </p>
        <p>
          {' '}
          © {new Date().getFullYear()}, Amazon Web Services, Inc. and its
          affiliates.
        </p>
        <p>
          All rights reserved. View the{' '}
          <ExternalLink href={links.TERMS}>site terms</ExternalLink> and{' '}
          <ExternalLink href={links.PRIVACY}>privacy policy</ExternalLink>.
        </p>
        <p>
          Flutter and the related logo are trademarks of Google LLC. We are not
          endorsed by or affiliated with Google LLC.
        </p>
      </Flex>
      <Flex as="ul" className="footer__links">
        <li>
          <ExternalLink href={links.TWITTER}>
            <IconTwitter aria-hidden="true" />
            <VisuallyHidden>Twitter</VisuallyHidden>
          </ExternalLink>
        </li>
        <li>
          <ExternalLink href={links.DISCORD}>
            <IconDiscord aria-hidden="true" />
            <VisuallyHidden>Discord</VisuallyHidden>
          </ExternalLink>
        </li>
        <li>
          <ExternalLink href={links.GITHUB}>
            <IconGithub aria-hidden="true" />
            <VisuallyHidden>Github</VisuallyHidden>
          </ExternalLink>
        </li>
      </Flex>
    </Flex>
  );
};
