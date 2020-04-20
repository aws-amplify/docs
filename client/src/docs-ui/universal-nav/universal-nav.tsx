import {Component, h, Host, Prop} from "@stencil/core";
import {
  universalNavStyle,
  universalNavContentStyle,
  brandStyle,
  linksStyle,
  hideAboutLinkStyle,
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
        <amplify-container
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
              {/* <img src={this.blend ? this.brandIconBlend : this.brandIcon} /> */}
              {this.blend ? (
                <svg
                  width="126px"
                  height="94px"
                  viewBox="0 0 126 94"
                  version="1.1"
                >
                  <title>Logo/Amplify Logo White</title>
                  <desc>Created with Sketch.</desc>
                  <defs></defs>
                  <g
                    id="Logo/Amplify-Logo-White"
                    stroke="none"
                    stroke-width="1"
                    fill="none"
                    fill-rule="evenodd"
                  >
                    <g id="Group" fill="#FF9900">
                      <path
                        d="M27.4193646,78 L62.9093796,78 L72,94 L71.743892,94 L0,94 L25.2808604,50.192137 L35.8751825,31.8473288 L44.9710103,47.6084247 L27.4193646,78 Z M40.6554116,23.5512493 L49.3887526,8.41853699 L98.814466,93.9997425 L81.3108879,93.9997425 L40.6554116,23.5512493 Z M54.249635,0 L71.7299104,0 L126,94 L108.497716,94 L54.249635,0 Z"
                        id="Fill-1"
                      ></path>
                    </g>
                  </g>
                </svg>
              ) : (
                <svg
                  width="126px"
                  height="94px"
                  viewBox="0 0 126 94"
                  version="1.1"
                >
                  <title>Logo/Amplify Logo White</title>
                  <desc>Created with Sketch.</desc>
                  <defs></defs>
                  <g
                    id="Logo/Amplify-Logo-White"
                    stroke="none"
                    stroke-width="1"
                    fill="none"
                    fill-rule="evenodd"
                  >
                    <g id="Group" fill="#FFFFFF">
                      <path
                        d="M27.4193646,78 L62.9093796,78 L72,94 L71.743892,94 L0,94 L25.2808604,50.192137 L35.8751825,31.8473288 L44.9710103,47.6084247 L27.4193646,78 Z M40.6554116,23.5512493 L49.3887526,8.41853699 L98.814466,93.9997425 L81.3108879,93.9997425 L40.6554116,23.5512493 Z M54.249635,0 L71.7299104,0 L126,94 L108.497716,94 L54.249635,0 Z"
                        id="Fill-1"
                      ></path>
                    </g>
                  </g>
                </svg>
              )}
              <span>{this.heading}</span>
              <sup>NEW</sup>
            </stencil-route-link>

            <div class={linksStyle}>
              <amplify-external-link
                redirect
                href="https://amplify.aws/community/"
                anchorTitle="Amplify Community"
              >
                <span>Community</span>
              </amplify-external-link>
              <amplify-external-link
                href="https://aws.amazon.com/amplify/"
                anchorTitle="AWS Amplify Homepage"
                graphic={this.blend ? "black" : "white"}
              >
                <span>
                  About<span class={hideAboutLinkStyle}>{` Amplify`}</span>
                </span>
              </amplify-external-link>
            </div>
          </div>
        </amplify-container>
      </Host>
    );
  }
}
