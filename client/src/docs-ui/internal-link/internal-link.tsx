import {Component, h, Prop, Host, State, Watch} from "@stencil/core";
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

@Component({tag: "docs-internal-link", shadow: false})
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

  @Watch("selectedFilters")
  computeState() {
    let selectedFilter: string | undefined;
    if (this.href) {
      const {path, hash, params} = parseURL(this.href);

      if (Object.keys(params).length === 0) {
        const filters = filtersByRoute.get(path);
        if (filters) {
          const [[filterKey, filterValues]] = Object.entries(filters);
          selectedFilter = this.selectedFilters?.[filterKey] as
            | string
            | undefined;
          if (selectedFilter) {
            if (
              Array.isArray(filterValues) &&
              filterValues.includes(selectedFilter)
            ) {
              params[filterKey] = selectedFilter;
            }
          }
        }
      }

      const url = serializeURL({path, hash, params});
      const isActive = location.href === url;
      const currentPathWithoutQS = location.pathname.split("/q/")?.[0];
      const hrefWithoutQS = url.split("/q/")?.[0];
      const isChildActive =
        this.additionalActiveChildRoots?.some((root) =>
          location.pathname.startsWith(root),
        ) ||
        !!(
          hrefWithoutQS &&
          currentPathWithoutQS?.startsWith(hrefWithoutQS) &&
          !currentPathWithoutQS?.startsWith(`${hrefWithoutQS}-`)
        );

      Object.assign(this, {
        url: rerouteURL(url, selectedFilter),
        isActive,
        isChildActive,
      });
    }
  }

  componentDidRender() {
    if (this.url) {
      getPage(parseURL(this.url).path);
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
