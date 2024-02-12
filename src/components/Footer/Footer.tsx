import ExternalLink from '../ExternalLink';
import * as links from '../../constants/links';
import { VisuallyHidden, Flex } from '@aws-amplify/ui-react';
import {
  IconDiscord,
  IconTwitter,
  IconGithub,
  IconAWS
} from '@/components/Icons';
import { ColorModeSwitcher } from '@/components/ColorModeSwitcher';

interface FooterProps {
  hasTOC?: boolean;
}

export const Footer = ({ hasTOC = false }: FooterProps) => {
  return (
    <Flex as="footer" className={`footer${hasTOC ? ' footer--toc' : ''}`}>
      <Flex className="footer-wrapper">
        <Flex className="footer__content">
          <ColorModeSwitcher />
          <p>
            <IconAWS
              fontSize="xl"
              aria-hidden={false}
              aria-label="AWS"
              marginInlineEnd="xs"
            />
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
            <ExternalLink href={links.TERMS} className="footer-link">
              site terms
            </ExternalLink>{' '}
            and{' '}
            <ExternalLink href={links.PRIVACY} className="footer-link">
              privacy policy
            </ExternalLink>
            .
          </p>
          <p>
            Flutter and the related logo are trademarks of Google LLC. We are
            not endorsed by or affiliated with Google LLC.
          </p>
        </Flex>
        <Flex as="ul" className="footer__links">
          <li>
            <ExternalLink
              href={links.TWITTER}
              className="footer-link footer-link--social"
            >
              <IconTwitter aria-hidden="true" />
              <VisuallyHidden>Twitter</VisuallyHidden>
            </ExternalLink>
          </li>
          <li>
            <ExternalLink
              href={links.DISCORD}
              className="footer-link footer-link--social"
            >
              <IconDiscord aria-hidden="true" />
              <VisuallyHidden>Discord</VisuallyHidden>
            </ExternalLink>
          </li>
          <li>
            <ExternalLink
              href={links.GITHUB}
              className="footer-link footer-link--social"
            >
              <IconGithub aria-hidden="true" />
              <VisuallyHidden>Github</VisuallyHidden>
            </ExternalLink>
          </li>
        </Flex>
      </Flex>
    </Flex>
  );
};
