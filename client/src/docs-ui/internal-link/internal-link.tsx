import {Component, h, Prop, Host, State, Watch, Build} from "@stencil/core";
import {filtersByRoute} from "../../api";
import {SelectedFilters} from "../page/page.types";
import {pageContext} from "../page/page.context";
import {getPage} from "../../cache.worker";
import {parseURL, serializeURL} from "../../utils/url/url.worker";

@Component({tag: "docs-internal-link", shadow: false})
export class DocsInternalLink {
  /*** the global selected filter state */
  @Prop() readonly selectedFilters?: SelectedFilters;
  /*** the route to render out */
  @Prop() readonly href: string;
  /*** query string parameters to attach to the link */
  @Prop() readonly QSPs: string = "";
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
  async componentWillLoad() {
    let selectedFilter: string | undefined;
    if (Build.isBrowser && !this.href) return;
    const {path, hash, params} = await parseURL(this.href);

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

    const url = await serializeURL({path, hash, params});
    const isActive = location.pathname === url;
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

    Object.assign(this, {url, isActive, isChildActive});
  }

  async componentDidRender() {
    if (this.url) {
      getPage((await parseURL(this.url)).path);
    }
  }

  render() {
    return (
      <Host>
        <stencil-route-link
          url={this.url + this.QSPs}
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
