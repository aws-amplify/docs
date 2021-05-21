import {Logo, Container, ExternalLinkWrapper} from "./styles";
import ExternalLink from "../ExternalLink";
import * as links from "../../constants/links";
import * as img from "../../constants/img";

export default function LinkBanner() {
  return (
    <Container backgroundColor="color-ink-md">
      <ExternalLinkWrapper>
        <ExternalLink href={links.GITHUB} graphic="black">
          <Logo src="/assets/github.svg" />
          Amplify GitHub
        </ExternalLink>
      </ExternalLinkWrapper>
      <ExternalLinkWrapper>
        <ExternalLink href={links.DISCORD} graphic="black">
          <Logo alt={img.DISCORD.alt} src={img.DISCORD.blueSrc} />
          Amplify on Discord
        </ExternalLink>
      </ExternalLinkWrapper>
      <ExternalLinkWrapper>
        <ExternalLink href={links.MARKETING} graphic="black">
          <Logo src="/assets/aws-dark.svg" />
          Amplify Resources
        </ExternalLink>
      </ExternalLinkWrapper>
      <ExternalLinkWrapper>
        <ExternalLink href={links.COMMUNITY} graphic="black">
          <Logo src="/assets/logo-dark.svg" />
          Amplify Community
        </ExternalLink>
      </ExternalLinkWrapper>
    </Container>
  );
}
