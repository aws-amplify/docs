import {Component, h, Prop, Host, State} from "@stencil/core";
import {filtersByRoute} from "../../api";
import {SelectedFilters} from "../page/page.types";
import {pageContext} from "../page/page.context";
import {getPage} from "../../cache";
import {parseURL, serializeURL} from "../../utils/url";

@Component({tag: "docs-internal-link"})
export class DocsInternalLink {
  /*** the global selected filter state */
  @Prop() readonly selectedFilters?: SelectedFilters;
  /*** the route to render out */
  @Prop() readonly href?: string;
  /*** class name to attach to link when active */
  @Prop() readonly activeClass?: string;
  /*** class name to attach a subpage is active */
  @Prop() readonly childActiveClass?: string;
  /*** override `isChildActive` to true */
  @Prop() readonly additionalActiveChildRoots?: string[];

  @State() url?: string;
  @State() isActive?: boolean;
  @State() isChildActive?: boolean;

  computeURL() {
    if (this.href) {
      const parsed = parseURL(this.href);
      const {base, hash} = parsed;
      const {params} = parsed;
      const paramEntries = Object.entries(params);
      if (paramEntries.length === 0) {
        for (const [filterKey, filterValue] of paramEntries) {
          const filters = filtersByRoute.get(base);
          if (filters) {
            const [[filterKey, filterValues]] = Object.entries(filters);
            const selectedFilterValue = this.selectedFilters?.[filterKey] as
              | string
              | undefined;
            if (
              selectedFilterValue &&
              Array.isArray(filterValues) &&
              filterValues.includes(selectedFilterValue)
            ) {
              params[filterKey] = selectedFilterValue;
            }
          }
        }
      }
      this.url = serializeURL({base, hash, params});
    }
  }

  computeMatch() {
    if (this.url) {
      this.isActive = location.href === this.url;
      const currentPathWithoutQS = location.pathname.split("/q/")?.[0];
      const hrefWithoutQS = this.href?.split("?")?.[0];
      this.isChildActive =
        this.additionalActiveChildRoots?.some((root) =>
          location.href.startsWith(root),
        ) ||
        !!(
          hrefWithoutQS &&
          currentPathWithoutQS?.startsWith(hrefWithoutQS) &&
          !currentPathWithoutQS?.startsWith(`${hrefWithoutQS}-`)
        );
    }
  }

  componentWillLoad() {
    this.computeURL();
    this.computeMatch();
  }

  componentDidRender() {
    if (this.href) {
      getPage(this.href);
    }
  }

  render() {
    return (
      <Host>
        <stencil-route-link
          url={this.url}
          class={{
            ...(this.activeClass ? {[this.activeClass]: !!this.isActive} : {}),
            ...(this.childActiveClass
              ? {[this.childActiveClass]: !!this.isChildActive}
              : {}),
          }}
        >
          <slot />
        </stencil-route-link>
      </Host>
    );
  }
}

pageContext.injectProps(DocsInternalLink, ["selectedFilters"]);
