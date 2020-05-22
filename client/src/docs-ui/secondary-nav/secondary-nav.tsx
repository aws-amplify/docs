import {Component, Host, h, Prop, Build} from "@stencil/core";
import {
  secondaryNavStyle,
  hostStyle,
  searchStyle,
  linkActiveStyle,
  shadowStyle,
} from "./secondary-nav.style";
import {createVNodeFromHyperscriptNode} from "../../utils/hyperscript";
import {pageContext} from "../page/page.context";
import {SelectedFilters} from "../page/page.types";
import {transformData} from "../../utils/transform-search-data";
import * as links from "../../constants/links";

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
                {[
                  {
                    label: "Getting Started",
                    url: "/start",
                  },
                  {
                    label: "Libraries",
                    url: this.selectedFilters?.platform
                      ? this.selectedFilters.platform === "js"
                        ? "/lib"
                        : "/sdk"
                      : "/lib",
                    additionalActiveChildRoots: ["/lib", "/sdk"],
                  },
                  {
                    label: "UI Components",
                    url: "/ui",
                    additionalActiveChildRoots: ["/ui"],
                  },
                  {
                    label: "CLI",
                    url: "/cli",
                  },
                  {
                    label: "Console",
                    url: links.AWS_USER_GUIDE,
                    external: true,
                  },
                  ...(this.selectedFilters?.platform
                    ? [
                        {
                          label: "API Reference",
                          url: (() => {
                            switch (this.selectedFilters.platform) {
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
                          })(),
                          external: true,
                        },
                      ]
                    : []),
                ].map(({url, label, external, additionalActiveChildRoots}) =>
                  createVNodeFromHyperscriptNode([
                    external ? "amplify-external-link" : "docs-internal-link",
                    {
                      key: label,
                      href: url,
                      ...(external
                        ? {graphic: "black"}
                        : {
                            childActiveClass: linkActiveStyle,
                            additionalActiveChildRoots,
                          }),
                    },
                    ["span", null, label],
                  ]),
                )}
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

pageContext.injectProps(DocsSecondaryNav, ["selectedFilters"]);
