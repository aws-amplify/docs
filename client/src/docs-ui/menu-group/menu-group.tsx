import {Component, Prop, Host, h, State, Watch} from "@stencil/core";
import {MenuGroup, PageLink} from "../../api";
import {
  linksStyle,
  menuGroupHeaderStyle,
  menuGroupItemStyle,
  activeLinkStyle,
  arrowStyle,
  arrowDownStyle,
  arrowUpStyle,
} from "./menu-group.style";
import {pageContext} from "../page/page.context";
import {SelectedFilters} from "../page/page.types";

@Component({tag: "docs-menu-group", shadow: false})
export class DocsMenuGroup {
  /*** the group to render */
  @Prop() readonly menuGroup?: MenuGroup;
  /*** the filter key that applies to this product section */
  @Prop() readonly filterKey?: string;
  /*** the currently-selected filters */
  @Prop() readonly selectedFilters: SelectedFilters;

  @State() expanded = false;
  @State() itemsToDisplay?: PageLink[];

  /**
   * given that the entire menu and its parents (up to the route level) are rerendered
   * on every route change, we cannot store the expanded state in a parent. We could store
   * it inside of the router component, but we'd still run into issues with returning users.
   * Best to use the serialized menu as a key and save the state in local storage.
   */
  expandedLocalStorageKey?: string;

  toggleOpen = () => {
    this.expanded = !this.expanded;
    if (this.expandedLocalStorageKey) {
      localStorage.setItem(
        this.expandedLocalStorageKey,
        this.expanded ? "true" : "false",
      );
    }
  };

  componentWillLoad() {
    if (this.menuGroup) {
      this.setItemsToDisplay();
      this.expandedLocalStorageKey = JSON.stringify(this.menuGroup);
      if (this.expandedLocalStorageKey) {
        let expanded = false;

        const retrieved =
          localStorage.getItem(this.expandedLocalStorageKey) || undefined;
        if (retrieved) {
          expanded = retrieved === "true" ? true : false;
        }

        if (!expanded) {
          this.menuGroup?.items.forEach(({route}) => {
            if (route === location.pathname) {
              expanded = true;
              if (this.expandedLocalStorageKey) {
                localStorage.setItem(
                  this.expandedLocalStorageKey,
                  this.expanded ? "true" : "false",
                );
              }
            }
          });
        }

        this.expanded = expanded || this.filterKey === "integration";
      }
    }
  }

  shouldDisplay = ({filters}: PageLink): boolean => {
    return (
      // the filter key is undefined
      this.filterKey === undefined ||
      // this page is available independent of filter
      filters === undefined ||
      // this page is available in specific filtered versions (one of which is the globally-selected)
      (filters &&
        this.selectedFilters &&
        filters[this.filterKey].includes(
          this.selectedFilters[this.filterKey] as string,
        ))
    );
  };

  // @ts-ignore
  @Watch("menuGroup")
  // @ts-ignore
  @Watch("selectedFilters")
  setItemsToDisplay() {
    this.itemsToDisplay = this.menuGroup?.items.filter(this.shouldDisplay);
  }

  render() {
    return (
      <Host>
        {this.menuGroup &&
          this.itemsToDisplay &&
          this.itemsToDisplay.length > 0 && [
            <button class={menuGroupHeaderStyle} onClick={this.toggleOpen}>
              <h4>{this.menuGroup.title}</h4>
              <i
                class={{
                  [arrowStyle]: true,
                  [arrowUpStyle]: this.expanded,
                  [arrowDownStyle]: !this.expanded,
                }}
              ></i>
            </button>,
            this.expanded && (
              <div class={linksStyle}>
                {this.itemsToDisplay.map((item) => (
                  <docs-internal-link
                    key={item.title}
                    href={item.route}
                    class={menuGroupItemStyle}
                    activeClass={activeLinkStyle}
                  >
                    {item.title}
                  </docs-internal-link>
                ))}
              </div>
            ),
          ]}
      </Host>
    );
  }
}

pageContext.injectProps(DocsMenuGroup, ["selectedFilters"]);
