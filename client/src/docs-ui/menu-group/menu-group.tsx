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
import {sidebarLayoutContext} from "../../amplify-ui/sidebar-layout/sidebar-layout.context";
import {ToggleInView} from "../../amplify-ui/sidebar-layout/sidebar-layout.types";
import {MQTablet} from "../../amplify-ui/styles/media";

@Component({tag: "docs-menu-group", shadow: false})
export class DocsMenuGroup {
  /*** the group to render */
  @Prop() readonly menuGroup?: MenuGroup;
  /*** the filter key that applies to this product section */
  @Prop() readonly filterKey?: string;
  /*** the currently-selected filters */
  @Prop() readonly selectedFilters: SelectedFilters;
  /*** whether or not the menu is in view */
  @Prop() readonly inView?: boolean;
  /*** the menu toggle */
  @Prop() readonly toggleInView: ToggleInView;

  @State() expanded = false || this.filterKey === "integration";
  @State() itemsToDisplay?: PageLink[];

  toggleOpen = () => {
    this.expanded = !this.expanded;
  };

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

  @Watch("menuGroup")
  @Watch("selectedFilters")
  componentWillLoad() {
    this.itemsToDisplay = this.menuGroup?.items.filter(this.shouldDisplay);
    const currentRoute = location.pathname.split("/q/").shift() as string;
    if (
      this.itemsToDisplay &&
      this.itemsToDisplay.some(({route}) => route === currentRoute)
    ) {
      this.expanded = true;
    }
  }

  closeMenuIfOnMobile = () => {
    // Slice off the "@media " string at the start for use in JS instead of CSS
    const MQTabletJS = MQTablet.substring(6);
    const isMobile = !window.matchMedia(MQTabletJS).matches;
    if (isMobile && this.inView) {
      this.toggleInView();
    }
  };

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
                    onClick={this.closeMenuIfOnMobile}
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
sidebarLayoutContext.injectProps(DocsMenuGroup, ["toggleInView", "inView"]);
