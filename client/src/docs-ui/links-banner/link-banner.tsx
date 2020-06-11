import {Component, h} from "@stencil/core";
import {
  containerInnerStyle,
  containerOuterStyle,
  logoStyle,
} from "./link-banner.style";
import * as links from "../../constants/links";
import * as img from "../../constants/img";

@Component({tag: "docs-link-banner", shadow: false})
export class DocsLinkBanner {
  render() {
    return (
      <docs-container
        class={containerOuterStyle}
        innerClass={containerInnerStyle}
      >
        <amplify-external-link href={links.GITHUB} graphic="black">
          <img
            alt={img.GITHUB.alt}
            src={img.GITHUB.darkSrc}
            class={logoStyle}
          />
          Amplify GitHub
        </amplify-external-link>
        <amplify-external-link href={links.DISCORD} graphic="black">
          <img class={logoStyle} {...img.DISCORD} />
          Amplify on Discord
        </amplify-external-link>
        <amplify-external-link href={links.MARKETING} graphic="black">
          <img alt={img.AWS.alt} src={img.AWS.darkSrc} class={logoStyle} />
          Amplify Resources
        </amplify-external-link>
        <amplify-external-link href={links.COMMUNITY} graphic="black">
          <img
            alt={img.AMPLIFY.alt}
            src={img.AMPLIFY.darkSrc}
            class={logoStyle}
          />
          Amplify Community
        </amplify-external-link>
      </docs-container>
    );
  }
}
