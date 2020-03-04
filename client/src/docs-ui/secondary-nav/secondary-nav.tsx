import {Component, Host, h} from "@stencil/core";
import {
  secondaryNavStyle,
  hostStyle,
  searchStyle,
  linkActiveStyle,
} from "./secondary-nav.style";
import {createVNodeFromHyperscriptNode} from "../../utils/hyperscript";

@Component({tag: "docs-secondary-nav", shadow: false})
export class DocsSecondaryNav {
  render() {
    return (
      <Host class={hostStyle}>
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
                    url: "/lib",
                  },
                  {
                    label: "CLI",
                    url: "/cli",
                  },
                  {
                    label: "Console",
                    url:
                      "https://docs.aws.amazon.com/amplify/latest/userguide/welcome.html",
                    external: true,
                  },
                  {
                    label: "API Reference",
                    url: "/reference",
                  },
                ].map(({url, label, external}) =>
                  createVNodeFromHyperscriptNode([
                    external ? "amplify-external-link" : "docs-internal-link",
                    {
                      key: label,
                      href: url,
                      ...(external
                        ? {graphic: "black"}
                        : {childActiveClass: linkActiveStyle}),
                    },
                    ["span", null, label],
                  ]),
                )}
              </div>
              <div class={searchStyle}>
                <div>
                  <input
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
