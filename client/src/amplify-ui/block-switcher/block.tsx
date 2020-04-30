import {Component, Host, h, Prop, Element} from "@stencil/core";

@Component({tag: "amplify-block", shadow: false})
export class AmplifyCodeBlock {
  /** Block name */
  @Prop() readonly name?: string;

  render() {
    return (
      <Host name={this.name}>
        <slot></slot>
      </Host>
    );
  }
}
