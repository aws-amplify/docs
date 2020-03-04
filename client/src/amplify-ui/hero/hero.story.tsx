import {Component, Host, h} from "@stencil/core";

@Component({tag: "amplify-hero-story", shadow: false})
export class AmplifyHeroStory {
  render() {
    return (
      <Host>
        <amplify-hero>
          <h1 slot="heading">Heading</h1>
          <h3 slot="subheading">Subheading</h3>
          <docs-landing-hero-cta slot="cta" />
        </amplify-hero>
      </Host>
    );
  }
}
