import * as links from "../../constants/links";
import {Component, h, Host, Prop} from "@stencil/core";
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
  /*** what label should go next to the brand icon? */
  @Prop() readonly heading?: string;
  /*** image url for brand icon */
  @Prop() readonly brandIcon?: string;

  render() {
    return (
      <Host class={universalNavStyle}>
        <docs-container class="background-color-orange-hv">
          <div class={universalNavContentStyle}>
            <stencil-route-link
              url="/"
              anchorTitle="Amplify Docs"
              class={brandStyle}
            >
              <img src={this.brandIcon} />
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
                graphic={"white"}
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
