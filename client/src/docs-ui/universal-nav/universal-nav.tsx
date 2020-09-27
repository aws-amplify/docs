import * as links from "../../constants/links";
import {Component, h, Host, Prop, Listen, State} from "@stencil/core";
import {
  universalNavStyle,
  universalNavContentStyle,
  brandStyle,
  linksStyle,
  hideAboutLinkStyle,
  searchStyle,
} from "./universal-nav.style";

@Component({tag: "docs-universal-nav", shadow: false})
export class DocsUniversalNav {
  /*** determines whether transparent background styles & starker text/logo colors are applied */
  @Prop() readonly blend?: boolean;
  /*** what label should go next to the brand icon? */
  @Prop() readonly heading?: string;
  /*** image url for brand icon */
  @Prop() readonly brandIcon?: string;
  /*** image url for brand icon when nav in blend mode */
  @Prop() readonly brandIconBlend?: string;

  render() {
    return (
      <Host class={universalNavStyle}>
        <docs-container
          class={{
            "background-color-orange-hv":
              this.blend === undefined || !this.blend,
          }}
        >
          <div
            class={{
              [universalNavContentStyle]: true,
              blend: this.blend !== undefined && this.blend,
            }}
          >
            <stencil-route-link
              url="/"
              anchorTitle="Amplify Docs"
              class={brandStyle}
            >
              <img src={this.blend ? this.brandIconBlend : this.brandIcon} />
              <span>{this.heading}</span>
            </stencil-route-link>

            <docs-search-bar class={searchStyle} />

            <div class={linksStyle}>
              <amplify-external-link
                redirect
                href={links.COMMUNITY}
                anchorTitle="Amplify Community"
              >
                <span>Community</span>
              </amplify-external-link>
              <amplify-external-link
                href={links.MARKETING}
                anchorTitle="AWS Amplify Homepage"
                graphic={this.blend ? "black" : "white"}
              >
                <span>
                  About<span class={hideAboutLinkStyle}>{` Amplify`}</span>
                </span>
              </amplify-external-link>
            </div>
          </div>
        </docs-container>
      </Host>
    );
  }
}
