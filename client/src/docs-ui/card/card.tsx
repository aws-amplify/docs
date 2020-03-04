import {Component, h, Prop, Host} from "@stencil/core";

@Component({tag: "docs-card", shadow: false})
export class DocsCard {
  /*** if true, the thumbnail gets rendered to the left of the detail (not above) */
  @Prop() readonly vertical?: boolean;
  /*** url */
  @Prop() readonly url?: string;

  render() {
    const {vertical, url} = this;
    return (
      <Host>
        <amplify-card containerTag="docs-internal-link" {...{vertical, url}}>
          <slot name="graphic" />
          <slot name="heading" />
          <slot name="description" />
        </amplify-card>
      </Host>
    );
  }
}
