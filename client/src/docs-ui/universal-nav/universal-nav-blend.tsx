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

@Component({tag: "docs-universal-nav-blend", shadow: false})
export class DocsUniversalNavBlend {
  /*** what label should go next to the brand icon? */
  @Prop() readonly heading?: string;
  /*** image url for brand icon when nav in blend mode */
  @Prop() readonly brandIcon?: string;

  render() {
    return (
      <Host class={universalNavStyle}>
        <docs-container>
          <div class={universalNavContentStyle + " blend"}>
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
                graphic="black"
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
