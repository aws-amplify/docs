import {Component, h, Prop, Host, State, Watch} from "@stencil/core";
import {filtersByRoute} from "../../api";
import {SelectedFilters} from "../page/page.types";
import {pageContext} from "../page/page.context";
import {internalLinkContext} from "./internal-link.context";
import {SetCurrentPath} from "./internal-link.types";
import Url from "url-parse";
import {track, AnalyticsEventType} from "../../utils/track";
import {getPage} from "../../cache";

@Component({tag: "docs-internal-link"})
export class DocsInternalLink {
  /*** the current route! */
  @Prop() readonly currentPath?: string;
  /*** fn to set the current route */
  @Prop() readonly setCurrentPath?: SetCurrentPath;
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

  // @ts-ignore
  @Watch("selectedFilters")
  computeURL() {
    if (this.href) {
      const parsed = new Url(this.href, 'https://docs.amplify.aws', true);
      const {query, pathname, origin, hash} = parsed;

      if (Object.keys(query).length === 0) {
        const filters = filtersByRoute.get(pathname);
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
            parsed.set("query", {[filterKey]: selectedFilterValue});
            parsed.set("hash", hash);
          }
        }
      }

      this.url = parsed
        .toString()
        .split(origin)
        .pop();
    }
  }

  // @ts-ignore
  @Watch("selectedFilters")
  // @ts-ignore
  @Watch("currentPath")
  computeMatch() {
    if (this.currentPath && this.url) {
      this.isActive = this.currentPath === this.url;
      const currentPathWithoutQS = this.currentPath?.split("?")?.[0];
      const hrefWithoutQS = this.href?.split("?")?.[0];
      this.isChildActive =
        this.additionalActiveChildRoots?.some((root) =>
          this.currentPath?.startsWith(root),
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

  onClick = () => {
    if (this.url) {
      track({
        type: AnalyticsEventType.INTERNAL_LINK_CLICK,
        attributes: {from: location.href, to: this.url},
      });

      if (this.setCurrentPath) {
        this.setCurrentPath(this.url);
      }
    }
  };

  render() {
    return (
      <Host>
        <stencil-route-link
          onClick={this.onClick}
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
internalLinkContext.injectProps(DocsInternalLink, [
  "currentPath",
  "setCurrentPath",
]);
