import {Component, Prop, Host, h, State} from "@stencil/core";
import {Page} from "../../api";
import {
  menuStyle,
  menuItemContainerStyle,
  menuBreakStyle,
  productRootLink,
  libSDKSwitcherStyle,
  activeSwitchStyle,
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

  @State() filterKey?: string;

  componentWillLoad() {
    this.filterKey = this.page && getFilterKeyFromPage(this.page);
  }

  render() {
    const menu = this.page?.menu;
    return (
      <Host class={menuStyle}>
        {this.page?.filterKey && <docs-select-anchor page={this.page} />}
        {this.page?.productRootLink && [
          (this.page.productRootLink.title === "Libraries" ||
            this.page.productRootLink.title === "SDK") &&
            this.selectedFilters?.platform !== "js" && (
              <div class={libSDKSwitcherStyle}>
                <docs-internal-link
                  href="/lib"
                  childActiveClass={activeSwitchStyle}
                >
                  Library
                  <span>(preview)</span>
                </docs-internal-link>
                <docs-internal-link
                  href="/sdk"
                  childActiveClass={activeSwitchStyle}
                >
                  SDK
                  <span>(stable)</span>
                </docs-internal-link>
              </div>
            ),
          <docs-internal-link
            href={this.page.productRootLink.route}
            class={productRootLink}
          >
            {this.page.productRootLink.title}
          </docs-internal-link>,
        ]}
        {menu && (
          <div class={menuItemContainerStyle}>
            {menu.map((menuGroup) => (
              <docs-menu-group
                key={menuGroup.title}
                {...{menuGroup}}
                filterKey={this.filterKey}
              />
            ))}
          </div>
        )}
        <hr class={menuBreakStyle} />
        <docs-repo-actions page={this.page} />
      </Host>
    );
  }
}

pageContext.injectProps(DocsMenu, ["selectedFilters"]);
