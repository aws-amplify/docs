import { Logo, Container, ExternalLinkWrapper } from './styles';
import ExternalLink from '../ExternalLink';
import * as links from '../../constants/links';
import * as img from '../../constants/img';

export default function LinkBanner() {
  return (
    <Container backgroundColor="color-ink-md">
      <ExternalLinkWrapper>
        <ExternalLink href={links.GITHUB} graphic="black">
          <Logo alt="" src={img.GITHUB.darkSrc} />
          Amplify GitHub
        </ExternalLink>
      </ExternalLinkWrapper>
      <ExternalLinkWrapper>
        <ExternalLink href={links.DISCORD} graphic="black">
          <Logo alt="" src={img.DISCORD.blueSrc} />
          Amplify on Discord
        </ExternalLink>
      </ExternalLinkWrapper>
      <ExternalLinkWrapper>
        <ExternalLink href={links.MARKETING} graphic="black">
          <Logo alt="" src={img.AWS.darkSrc} />
          Amplify Resources
        </ExternalLink>
      </ExternalLinkWrapper>
      <ExternalLinkWrapper>
        <ExternalLink href={links.LEARN} graphic="black">
          <Logo alt="" src={img.AMPLIFY.darkSrc} />
          Amplify Learn
        </ExternalLink>
      </ExternalLinkWrapper>
    </Container>
  );
}
