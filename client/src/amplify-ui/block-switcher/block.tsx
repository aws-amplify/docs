import {Component, Host, h, Prop} from "@stencil/core";

@Component({tag: "amplify-block", shadow: false})
export class AmplifyCodeBlock {
  /** the tab headings, comma-separated as a single string */
  @Prop() readonly tabHeadingList?: string;

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
