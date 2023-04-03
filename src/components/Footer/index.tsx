import Link from 'next/link';
import {
  Footer,
  RightFooter,
  LeftFooter,
  Social,
  Legal,
  FooterHeading
} from './styles';
import { Container } from '../Container';
import ExternalLink from '../ExternalLink';
import * as links from '../../constants/links';
import * as img from '../../constants/img';
import Icon from '@cloudscape-design/components/icon';

export default function DocsFooter() {
  return (
    <Container backgroundColor="color-ink-hv">
      <Footer>
        <LeftFooter>
          <div>
            <FooterHeading>
              <img alt={img.AMPLIFY.alt} src={img.AMPLIFY.lightSrc} />
              <h3>AWS Amplify</h3>
            </FooterHeading>
            <p>
              Amplify open source software, documentation and community are
              supported by Amazon Web Services.
            </p>
            <Legal>
              {' '}
              &#169; 2023 Amazon Web Services, Inc. and its affiliates
            </Legal>
            <Legal>
              All rights reserved. View the site terms adn Legalrivacy
              Legalolicy.
            </Legal>
            <Legal>
              Flutter and the related logo are trademarks of Google LLC.
            </Legal>
            <Legal>We are not endorsed by or affiliated with Google LLC.</Legal>
          </div>
        </LeftFooter>
        <RightFooter>
          <Social>
            <ExternalLink anchorTitle="Twitter" href={links.TWITTER}>
              <img alt={img.TWITTER.alt} src={img.TWITTER.src} />
            </ExternalLink>
            <ExternalLink anchorTitle="Discord" href={links.DISCORD}>
              <img alt={img.DISCORD.alt} src={img.DISCORD.lightSrc} />
            </ExternalLink>
            <ExternalLink anchorTitle="GitHub" href={links.GITHUB}>
              <img alt={img.GITHUB.alt} src={img.GITHUB.lightSrc} />
            </ExternalLink>
          </Social>
          <div>We want to hear from you</div>
          <Link href="docs.amplify.aws">Take our docs survey</Link>
          <div>Need help?</div>
          <a href="docs.amplify.aws">
            Connect to an Amplify expert{' '}
            <Icon name="external" variant="link"></Icon>
          </a>
        </RightFooter>
      </Footer>
    </Container>
  );
}
