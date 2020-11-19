import {Component, Prop, Host, h, State, Watch} from "@stencil/core";
import {Page} from "../../api";
import {
  menuStyle,
  menuItemContainerStyle,
  menuBreakStyle,
  productRootLink,
  activeLinkStyle,
  discordLinkStyle,
} from "./menu.style";
import {pageContext} from "../page/page.context";
import {SelectedFilters} from "../page/page.types";
import {DISCORD} from "../../constants/img";

@Component({tag: "docs-menu", shadow: false})
export class DocsMenu {
  /*** the `Page` instance for which this menu is being rendered */
  @Prop() readonly page?: Page;
  /*** the currently-selected filter state */
  @Prop() readonly selectedFilters?: SelectedFilters;
  /*** the filter key */
  @Prop() readonly filterKey?: string;

  @State() switcher?: "lib" | "ui";

  @Watch("selectedFilters")
  componentWillLoad() {
    if (this.page) {
      let switcher: "ui" | "lib" | undefined;

      const productRootRoute = this.page?.productRootLink?.route;
      if (productRootRoute) {
        if (
          (productRootRoute === "/lib" || productRootRoute === "/sdk") &&
          this.selectedFilters?.platform !== "js"
        ) {
          switcher = "lib";
        }

        if (
          (productRootRoute === "/ui" || productRootRoute === "/ui-legacy") &&
          this.selectedFilters?.framework !== "react-native"
        ) {
          switcher = "ui";
        }
      }

      this.switcher = switcher;
    }
  }

  render() {
    const menu = this.page?.menu;
    return (
      menu && (
        <Host class={menuStyle}>
          {(() => {
            switch (this.switcher) {
              case "ui": {
                return (
                  <docs-version-switch
                    leftOption={{
                      title: "Latest",
                      href: "/ui",
                    }}
                    rightOption={{
                      title: "Legacy",
                      href: "/ui-legacy",
                    }}
                  />
                );
              }

              default: {
                return;
              }
            }
          })()}
          {this.page?.productRootLink && (
            <docs-internal-link
              href={this.page.productRootLink.route}
              class={productRootLink}
              activeClass={activeLinkStyle}
            >
              {this.page.productRootLink.title}
            </docs-internal-link>
          )}
          {menu && (
            <div class={menuItemContainerStyle}>
              {menu.map((menuGroup) => (
                <docs-menu-group {...{menuGroup}} filterKey={this.filterKey} />
              ))}
            </div>
          )}
          <hr class={menuBreakStyle} />
          <docs-repo-actions page={this.page} />
          <amplify-external-link
            redirect={false}
            href="https://discord.gg/jWVbPfC"
            anchorTitle="Discord Community"
            class={discordLinkStyle}
          >
            <img alt={DISCORD.alt} src={DISCORD.lightSrc} />
            Chat with us
          </amplify-external-link>
          <docs-feedback-callout />
        </Host>
      )
    );
  }
}

pageContext.injectProps(DocsMenu, ["selectedFilters"]);
