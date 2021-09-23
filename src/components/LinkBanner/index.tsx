import {Logo, Container, ExternalLinkWrapper} from "./styles";
import ExternalLink from "../ExternalLink";
import * as links from "../../constants/links";
import * as img from "../../constants/img";

export default function LinkBanner() {
  return (
    <Container backgroundColor="color-ink-md">
      <ExternalLinkWrapper>
        <ExternalLink href={links.GITHUB} graphic="black">
          <Logo alt={img.GITHUB.alt} src={img.GITHUB.darkSrc} />
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
          <Logo alt={img.AWS.alt} src={img.AWS.darkSrc} />
          Amplify Resources
        </ExternalLink>
      </ExternalLinkWrapper>
      <ExternalLinkWrapper>
        <ExternalLink href={links.COMMUNITY} graphic="black">
          <Logo alt={img.AMPLIFY.alt} src={img.AMPLIFY.darkSrc} />
          Amplify Community
        </ExternalLink>
      </ExternalLinkWrapper>
    </Container>
  );
}
