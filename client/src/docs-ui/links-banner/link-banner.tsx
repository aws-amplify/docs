import {Component, h} from "@stencil/core";
import {
  containerInnerStyle,
  containerOuterStyle,
  logoStyle,
} from "./link-banner.style";

@Component({tag: "docs-link-banner", shadow: false})
export class DocsLinkBanner {
  render() {
    return (
      <amplify-container
        class={containerOuterStyle}
        innerClass={containerInnerStyle}
      >
        <amplify-external-link
          href="https://github.com/aws-amplify"
          graphic="black"
        >
          <img src="/assets/github.svg" class={logoStyle} />
          Amplify GitHub
        </amplify-external-link>
        <amplify-external-link
          href="https://discord.gg/jWVbPfC"
          graphic="black"
        >
          <img src="/assets/discord-blue.svg" class={logoStyle} />
          Amplify on Discord
        </amplify-external-link>
        <amplify-external-link
          href="https://aws.amazon.com/amplify/framework/"
          graphic="black"
        >
          <img src="/assets/aws-dark.svg" class={logoStyle} />
          Amplify Resources
        </amplify-external-link>
        <amplify-external-link
          href="https://amplify.aws/community/"
          graphic="black"
        >
          <img src="/assets/logo-dark.svg" class={logoStyle} />
          Amplify Community
        </amplify-external-link>
      </amplify-container>
    );
  }
}
