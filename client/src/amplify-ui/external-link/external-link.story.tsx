import {Component, Host, h} from "@stencil/core";

@Component({tag: "amplify-external-link-story", shadow: false})
export class AmplifyExternalLinkStory {
  render() {
    return (
      <Host>
        <amplify-external-link>some link label here</amplify-external-link>
      </Host>
    );
  }
}
