import {Component, h, Host} from "@stencil/core";

@Component({tag: "docs-universal-nav-story", shadow: false})
export class DocsUniversalNavStory {
  render() {
    return (
      <Host>
        <docs-universal-nav
          blend={false}
          heading="Amplify Docs"
          brand-icon="/assets/logo-light.svg"
          brand-icon-blend="/assets/logo-dark.svg"
        />
        <docs-universal-nav
          blend={true}
          heading="Amplify Docs"
          brand-icon="/assets/logo-light.svg"
          brand-icon-blend="/assets/logo-dark.svg"
        />
        <amplify-lorem />
      </Host>
    );
  }
}
