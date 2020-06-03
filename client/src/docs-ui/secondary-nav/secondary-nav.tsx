import * as links from "../../constants/links";
import {Component, Host, h, Prop, Build} from "@stencil/core";
import {
  secondaryNavStyle,
  hostStyle,
  searchStyle,
  shadowStyle,
  linkActiveStyle,
} from "./secondary-nav.style";
import {SelectedFilters} from "../page/page.types";
import {transformData} from "../../utils/transform-search-data";

@Component({tag: "docs-secondary-nav", shadow: false})
export class DocsSecondaryNav {
  /*** the current filter state */
  @Prop() readonly selectedFilters?: SelectedFilters;

  componentDidRender() {
    if (Build.isBrowser && location.pathname !== "/") {
      // @ts-ignore
      docsearch({
        apiKey: "24d37f059982b2f5ecf829afe93aed40",
        indexName: "aws_amplify_new",
        inputSelector: "#amplify-docs-search-input",
        debug: false,
        transformData,
      });
    }
  }

  render() {
    return (
      <Host class={hostStyle} id="secondary-nav">
        <amplify-container>
          <div class={secondaryNavStyle}>
            <div>
              <div>
                <docs-internal-link
                  href="/start"
                  childActiveClass={linkActiveStyle}
                >
                  Getting Started
                </docs-internal-link>
                <docs-internal-link
                  href="/lib"
                  additionalActiveChildRoots={["/lib", "/sdk"]}
                  childActiveClass={linkActiveStyle}
                >
                  Libraries
                </docs-internal-link>
                <docs-internal-link
                  href="/ui"
                  additionalActiveChildRoots={["/ui"]}
                  childActiveClass={linkActiveStyle}
                >
                  UI Components
                </docs-internal-link>
                <docs-internal-link
                  href="/cli"
                  childActiveClass={linkActiveStyle}
                >
                  CLI
                </docs-internal-link>
                <amplify-external-link
                  graphic="black"
                  href={links.AWS_USER_GUIDE}
                >
                  Console
                </amplify-external-link>
                <amplify-external-link
                  graphic="black"
                  href={(() => {
                    switch (this.selectedFilters?.platform) {
                      case "ios": {
                        return links.IOS_REFERENCE;
                      }
                      case "android": {
                        return links.ANDROID_REFERENCE;
                      }
                      case "js": {
                        return links.JS_REFERENCE;
                      }
                    }
                  })()}
                >
                  API Reference
                </amplify-external-link>
                <div class={shadowStyle}></div>
              </div>
            </div>
            <div class={searchStyle}>
              <div>
                <div>
                  <input
                    id="amplify-docs-search-input"
                    type="search"
                    placeholder="Search"
                    class="three-dee-effect"
                  />
                  <img src="/assets/search.svg" alt="search" />
                </div>
              </div>
            </div>
          </div>
        </amplify-container>
      </Host>
    );
  }
}
