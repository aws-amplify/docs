import {h, Component, Host, Prop} from "@stencil/core";
import {
  containerStyle,
  graphicStyle,
  hostStyle,
} from "./internal-link-button.style";

@Component({tag: "docs-internal-link-button", shadow: false})
export class DocsInternalLinkButton {
  /*** the path to redirect to (internal only!) */
  @Prop() readonly href?: string;

  render() {
    return (
      <Host class={hostStyle}>
        <docs-internal-link class={containerStyle} href={this.href}>
          <div class={graphicStyle}>
            <slot name="graphic" />
          </div>
          <div>
            <slot name="text" />
          </div>
        </docs-internal-link>
      </Host>
    );
  }
}
