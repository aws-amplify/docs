import {Component, h} from "@stencil/core";
import {
  footerContainerStyle,
  footerStyle,
  leftLinkContainerStyle,
  rightLinkContainerStyle,
  legalStyle,
  socialLinkContainerStyle,
} from "./footer.style";

@Component({tag: "docs-footer", shadow: false})
export class DocsFooter {
  render() {
    return (
      <amplify-container class={footerContainerStyle}>
        <div class={footerStyle}>
          <div class={leftLinkContainerStyle}>
            <img src="/assets/logo-light.svg" />
            <div>
              <h3>Amplify</h3>
              <docs-internal-link href="/start">
                Getting Started
              </docs-internal-link>
              <amplify-external-link href="https://gitter.im/AWS-Amplify/Lobby">
                Support
              </amplify-external-link>
            </div>
            <div>
              <h3>Community</h3>
              <amplify-external-link href="https://amplify.aws/community/events">
                Events
              </amplify-external-link>
              <amplify-external-link href="https://amplify.aws/community/posts">
                Posts
              </amplify-external-link>
              <amplify-external-link href="https://amplify.aws/community/contributors">
                Members
              </amplify-external-link>
              <amplify-external-link href="https://amplify.aws/community/newsletters">
                Newsletters
              </amplify-external-link>
            </div>
          </div>
          <div class={rightLinkContainerStyle}>
            <div class={socialLinkContainerStyle}>
              <amplify-external-link
                anchorTitle="Twitter"
                href="https://twitter.com/AWSAmplify"
              >
                <img src="/assets/twitter.svg" />
              </amplify-external-link>
              <amplify-external-link
                anchorTitle="Gitter"
                href="https://gitter.im/AWS-Amplify/Lobby"
              >
                <img src="/assets/gitter.svg" />
              </amplify-external-link>
              <amplify-external-link
                anchorTitle="GitHub"
                href="https://github.com/aws-amplify"
              >
                <img src="/assets/github-light.svg" />
              </amplify-external-link>
            </div>
            <div class={legalStyle}>
              <span>
                <img src="/assets/aws.svg" />
                {`Amplify open source, documentation and community are supported
                by Amazon Web Services © 2019, Amazon Web Services, Inc. and its
                affiliates. All rights reserved. View the `}
                <amplify-external-link href="https://aws.amazon.com/terms/">
                  site terms
                </amplify-external-link>
                {` and `}
                <amplify-external-link href="https://aws.amazon.com/privacy/">
                  privacy policy
                </amplify-external-link>
                .
              </span>
            </div>
          </div>
        </div>
      </amplify-container>
    );
  }
}
