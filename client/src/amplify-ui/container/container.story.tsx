import {Component, h, Host} from "@stencil/core";

@Component({tag: "amplify-container-story", shadow: false})
export class AmplifyContainerStory {
  render() {
    return (
      <Host>
        <amplify-container>
          <p>some content</p>
        </amplify-container>
      </Host>
    );
  }
}
