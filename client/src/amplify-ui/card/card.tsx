import {Component, h, Prop, Host} from "@stencil/core";
import {
  cardStyle,
  graphicStyle,
  detailsStyle,
  externalLinkGraphic,
  hostStyle,
} from "./card.style";
import {createVNode} from "../../utils/hyperscript";

@Component({tag: "amplify-card", shadow: false})
export class AmplifyCard {
  /*** if true, the thumbnail gets rendered to the left of the detail (not above) */
  @Prop() readonly vertical?: boolean;
  /*** url */
  @Prop() readonly url?: string;
  /*** link tag to use */
  @Prop() readonly containerTag: string = "a";
  /*** whether or not to show external link graphic */
  @Prop() readonly external?: boolean;

  render() {
    const vertical = !!this.vertical;
    return (
      <Host class={hostStyle}>
        {createVNode(
          this.containerTag,
          {href: this.url, ...(this.external ? {target: "_blank"} : {})},
          <div class={{[cardStyle]: true, vertical}}>
            <div class={{[graphicStyle]: true, vertical}}>
              <slot name="graphic" />
            </div>
            <div class={detailsStyle}>
              <slot name="heading" />
              <slot name="description" />
            </div>
            {this.external && (
              <img
                class={externalLinkGraphic}
                src={`/assets/external-link-black.svg`}
                alt="External link"
              />
            )}
          </div>,
        )}
      </Host>
    );
  }
}
