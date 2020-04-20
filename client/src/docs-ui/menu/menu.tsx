import {Component, Prop, Host, h, State, Watch} from "@stencil/core";
import {Page} from "../../api";
import {
  menuStyle,
  menuItemContainerStyle,
  menuBreakStyle,
  productRootLink,
} from "./menu.style";
import {getFilterKeyFromPage} from "../../utils/filters";
import {pageContext} from "../page/page.context";
import {SelectedFilters} from "../page/page.types";

@Component({tag: "docs-menu", shadow: false})
export class DocsMenu {
  /*** the `Page` instance for which this menu is being rendered */
  @Prop() readonly page?: Page;
  /*** the currently-selected filter state */
  @Prop() readonly selectedFilters?: SelectedFilters;
  /*** the filter key */
  @Prop() readonly filterKey?: string;

  @State() switcher?: "lib" | "ui";

  // @Watch("selectedFilters")
  // componentWillLoad() {
  //   if (this.page) {
  //     let switcher: "ui" | "lib" | undefined;

  //     const productRootRoute = this.page?.productRootLink?.route;
  //     if (productRootRoute) {
  //       if (
  //         (productRootRoute === "/lib" || productRootRoute === "/sdk") &&
  //         this.selectedFilters?.platform !== "js"
  //       ) {
  //         switcher = "lib";
  //       }

  //       if (productRootRoute === "/ui" || productRootRoute === "/ui-legacy") {
  //         switcher = "ui";
  //       }
  //     }

  renderVersionSwitch() {
    if (
      (this.page?.productRootLink?.route === "/lib" ||
        this.page?.productRootLink?.route === "/sdk") &&
      this.selectedFilters?.platform !== "js"
    ) {
      return (
        <docs-version-switch
          leftOption={{
            title: "Libraries",
            subTitle: "(preview)",
            href: "/lib",
          }}
          rightOption={{
            title: "SDK",
            subTitle: "(stable)",
            href: "/sdk",
          }}
        />
      );
    } else if (
      this.page?.productRootLink?.route === "/ui" ||
      this.page?.productRootLink?.route === "/ui-legacy"
    ) {
      if (this.selectedFilters?.framework !== "react-native") {
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
      return;
    }
  }

  render() {
    const menu = this.page?.menu;
    return (
      menu && (
        <Host class={menuStyle}>
          {this.page?.filterKey && <docs-select-anchor page={this.page} />}
          {this.renderVersionSwitch()}
          {this.page?.productRootLink && (
            <docs-internal-link
              href={this.page.productRootLink.route}
              class={productRootLink}
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
          <docs-feedback-callout />
        </Host>
      )
    );
  }
}

pageContext.injectProps(DocsMenu, ["selectedFilters"]);
