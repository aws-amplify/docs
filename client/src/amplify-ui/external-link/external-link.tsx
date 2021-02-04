import {Component, Prop, h} from "@stencil/core";
import {externalLinkStyle, graphicStyle} from "./external-link.style";
import {track, trackExternalLink, AnalyticsEventType} from "../../utils/track";

@Component({tag: "amplify-external-link", shadow: false})
export class AmplifyExternalLink {
  /*** Whether to cancel the overriden target behavior (defaults to "_blank") */
  @Prop() readonly redirect?: boolean;
  /*** The URL to open / to which the anchor should redirect */
  @Prop() readonly href?: string;
  /*** Title attr same as for `a` */
  @Prop() readonly anchorTitle?: string;
  /*** Whether to display the external link graphic to the right of the anchor child text */
  @Prop() readonly graphic?: "black" | "white";

  onClick = () => {
    if (this.href) {
      track({
        type: AnalyticsEventType.EXTERNAL_LINK_CLICK,
        attributes: {from: location.href, to: this.href},
      });
      trackExternalLink(this.href);
    }
  };

  render() {
    return (
      <a
        class={externalLinkStyle}
        {...(this.redirect ? {} : {target: "_blank"})}
        onClick={this.onClick}
        href={this.href}
        title={this.anchorTitle}
        rel="noopener noreferrer"
      >
        <slot />
        {this.graphic && (
          <img
            class={graphicStyle}
            src={`/assets/external-link-${this.graphic}.svg`}
          />
        )}
      </a>
    );
  }
}
