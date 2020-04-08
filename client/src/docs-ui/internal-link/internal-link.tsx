import {Component, h, Prop, Host, State} from "@stencil/core";
import {filtersByRoute} from "../../api";
import {SelectedFilters} from "../page/page.types";
import {pageContext} from "../page/page.context";
import {getPage} from "../../cache";
import {parseURL, serializeURL} from "../../utils/url/url";

const rerouteURL = (
  initialRoute: string | undefined,
  selectedFilter: string | undefined,
): string | undefined => {
  if (initialRoute && selectedFilter) {
    if (selectedFilter === "js" && initialRoute.startsWith("/sdk")) {
      return initialRoute.replace("/sdk", "/lib");
    }
  }
  return initialRoute;
};

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

  selectedFilter?: string;

  @State() url?: string;
  @State() isActive?: boolean;
  @State() isChildActive?: boolean;

  computeURL() {
    if (this.href) {
      const parsed = parseURL(this.href);

      const {base} = parsed;
      const {hash, params} = parsed;

      const hasQuery = Object.keys(params).length > 0;

      if (!hasQuery) {
        const filters = filtersByRoute.get(base);

        if (filters) {
          const [[filterKey, filterValues]] = Object.entries(filters);
          this.selectedFilter = this.selectedFilters?.[filterKey] as
            | string
            | undefined;

          if (this.selectedFilter) {
            if (
              this.selectedFilter &&
              Array.isArray(filterValues) &&
              filterValues.includes(this.selectedFilter)
            ) {
              params[filterKey] = this.selectedFilter;
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
      const hrefWithoutQS = this.href?.split("/q/")?.[0];
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
          url={rerouteURL(this.url, this.selectedFilter)}
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
