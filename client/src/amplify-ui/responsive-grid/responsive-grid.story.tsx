import {Component, Host, h} from "@stencil/core";

@Component({tag: "amplify-responsive-grid-story"})
export class AmplifyGridStory {
  render() {
    return (
      <Host>
        <responsive-grid>
          <div>first</div>
          <div>second</div>
          <div>third</div>
          <div>fourth</div>
          <div>fifth</div>
          <div>sixth</div>
          <div>seventh</div>
          <div>eighth</div>
          <div>ninth</div>
          <div>tenth</div>
          <div>eleventh</div>
          <div>twelth</div>
        </responsive-grid>
      </Host>
    );
  }
}
