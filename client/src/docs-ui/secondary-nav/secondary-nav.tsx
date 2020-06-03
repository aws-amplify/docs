import * as links from "../../constants/links";
import {Component, Host, h, Prop, State, Listen} from "@stencil/core";
import {
  secondaryNavStyle,
  hostStyle,
  linkActiveStyle,
  shadowStyle,
} from "./secondary-nav.style";
import {createVNodeFromHyperscriptNode} from "../../utils/hyperscript";
import {pageContext} from "../page/page.context";
import {SelectedFilters} from "../page/page.types";
import {isWiderThanTablet} from "../../amplify-ui/styles/media";

@Component({tag: "docs-secondary-nav", shadow: false})
export class DocsSecondaryNav {
  /*** the current filter state */
  @Prop() readonly selectedFilters?: SelectedFilters;

  @State() isWiderThanTablet = this.calculateIsWiderThanTablet();

  @Listen("resize", {target: "window"})
  calculateIsWiderThanTablet() {
    this.isWiderThanTablet = isWiderThanTablet();
    return this.isWiderThanTablet;
  }

  render() {
    return (
      <Host class={hostStyle} id="secondary-nav">
        <docs-container>
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
                    url: "/lib",
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
            {!this.isWiderThanTablet && <docs-search-bar />}
          </div>
        </docs-container>
      </Host>
    );
  }
}

pageContext.injectProps(DocsSecondaryNav, ["selectedFilters"]);
