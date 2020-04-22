import {
  Component,
  Host,
  h,
  State,
  Listen,
  Element,
  Prop,
  Watch,
  Build,
} from "@stencil/core";
import {MatchResults} from "@stencil/router";
import {
  sidebarLayoutStyle,
  pageStyle,
  tocStyle,
  sidebarToggleClass,
  mainStyle,
  sectionHeaderStyle,
} from "./page.style";
import {Page, createVNodesFromHyperscriptNodes} from "../../api";
import {updateDocumentHead} from "../../utils/update-document-head";
import {
  getFilterKeyFromPage,
  getFilterKeyFromLocalStorage,
  withFilterOverrides,
} from "../../utils/filters";
import {filterOptionsByName} from "../../utils/filter-data";
import {SetSelectedFilters} from "./page.types";
import {pageContext} from "./page.context";
import {track, AnalyticsEventType} from "../../utils/track";
import {ensureMenuScrolledIntoView} from "../../utils/ensure-menu-scrolled-into-view";
import {getPage} from "../../cache";
import {getNavHeight} from "../../utils/get-nav-height";
import {scrollToHash} from "../../utils/scroll-to-hash";
import {parseURL} from "../../utils/url/url";

@Component({tag: "docs-page", shadow: false})
export class DocsPage {
  @Element() el: HTMLElement;

  /** match path */
  @Prop() readonly match: MatchResults;

  @State() pageData?: Page;
  @State() blendUniversalNav?: boolean;
  @State() sidebarStickyTop = getNavHeight("rem");
  @State() selectedFilters: Record<string, string | undefined> = {};

  setSelectedFilters: SetSelectedFilters = (updates) => {
    const overrides = withFilterOverrides(updates, this.selectedFilters);
    this.selectedFilters = {
      ...this.selectedFilters,
      ...overrides,
    };
    for (const [filterKey, filterValue] of Object.entries(overrides)) {
      localStorage.setItem(
        getFilterKeyFromLocalStorage(filterKey),
        filterValue,
      );
    }
  };

  filterKey?: string;
  filterValue?: string;

  @Listen("resize", {target: "window"})
  setSidebarStickyTop() {
    if (this.pageData?.menu) {
      this.sidebarStickyTop = getNavHeight("rem");
    }
  }

  @Watch("match")
  onRouteChange() {
    this.getPageData();
  }

  @Listen("popstate", {target: "window"})
  onPopState() {
    this.getPageData();
  }

  componentWillLoad() {
    return this.getPageData();
  }

  async getPageData() {
    if (this.match) {
      const {path, params} = parseURL(
        this.match.params.page || location.pathname || "/",
      );
      this.blendUniversalNav = path === "/";

      track({
        type: AnalyticsEventType.PAGE_VISIT,
        attributes: {url: path},
      });

      try {
        const pageData = await getPage(path);
        if (pageData) {
          this.pageData = pageData;
          updateDocumentHead(pageData);
          this.filterKey = getFilterKeyFromPage(pageData);
          this.selectedFilters = Object.assign(
            {},
            ...Object.keys(filterOptionsByName).map((filterKey) => {
              const localStorageKey = getFilterKeyFromLocalStorage(filterKey);
              return {
                [filterKey]: localStorageKey
                  ? localStorage.getItem(localStorageKey) || undefined
                  : undefined,
              };
            }),
          );

          if (this.filterKey) {
            const {[this.filterKey]: filterValue} = params;
            if (
              typeof filterValue === "string" &&
              filterValue !== "undefined"
            ) {
              this.filterValue = filterValue;
              this.setSelectedFilters({[this.filterKey]: this.filterValue});
            } else {
              this.filterValue = undefined;
            }
          } else {
            this.filterKey = undefined;
          }
        } else {
          this.pageData = undefined;
        }
      } catch (exception) {
        if (this.match) {
          track({
            type: AnalyticsEventType.PAGE_DATA_FETCH_EXCEPTION,
            attributes: {url: this.match.url, exception},
          });
        }
      }
    }
  }

  requiresFilterSelection = (): boolean =>
    !!(this.filterKey && !this.filterValue);

  showMenu = (): boolean => {
    const menuItems = this.pageData?.menu;
    const menuItemsExist = !!(menuItems && menuItems.length > 0);
    return menuItemsExist && !this.requiresFilterSelection();
  };

  componentDidRender() {
    this.setSidebarStickyTop();
    const {hash} = location;
    if (hash) {
      // TODO: replace with better method for ensuring TOC rendered. Race condition!
      setTimeout(() => {
        scrollToHash(hash, this.el);
      }, 250);
    }
  }

  render() {
    if (Build.isBrowser) {
      return (
        <Host class={pageStyle}>
          <pageContext.Provider
            state={{
              selectedFilters: this.selectedFilters,
              setSelectedFilters: this.setSelectedFilters,
            }}
          >
            <docs-universal-nav
              blend={this.blendUniversalNav}
              heading="Amplify Docs"
              brand-icon="/assets/logo-light.svg"
              brand-icon-blend="/assets/logo-dark.svg"
            />
            {this.pageData && this.pageData.noTemplate
              ? createVNodesFromHyperscriptNodes(this.pageData.body)
              : [
                  <docs-secondary-nav />,
                  this.pageData ? (
                    <div class={sidebarLayoutStyle}>
                      <amplify-toc-provider>
                        <amplify-sidebar-layout>
                          {this.showMenu() && (
                            <amplify-sidebar-layout-sidebar
                              slot="sidebar"
                              top={this.sidebarStickyTop}
                            >
                              <docs-menu
                                filterKey={this.filterKey}
                                page={this.pageData}
                                key={this.pageData?.productRootLink?.route}
                              />
                            </amplify-sidebar-layout-sidebar>
                          )}
                          {this.requiresFilterSelection() ? (
                            <amplify-sidebar-layout-main slot="main">
                              <amplify-toc-contents>
                                {this.filterKey === "integration" ? (
                                  <docs-choose-integration-anchor
                                    page={this.pageData}
                                  />
                                ) : (
                                  <docs-choose-anchor page={this.pageData} />
                                )}
                              </amplify-toc-contents>
                            </amplify-sidebar-layout-main>
                          ) : (
                            [
                              <amplify-sidebar-layout-main
                                slot="main"
                                class={mainStyle}
                              >
                                <amplify-toc-contents>
                                  {this.pageData && [
                                    <h1 class={sectionHeaderStyle}>
                                      {this.pageData.sectionTitle}
                                    </h1>,
                                    <h1>{this.pageData.title}</h1>,
                                    createVNodesFromHyperscriptNodes(
                                      this.pageData.body,
                                    ),
                                    <docs-next-previous
                                      key={this.pageData.route}
                                      page={this.pageData}
                                    />,
                                  ]}
                                </amplify-toc-contents>
                                <amplify-sidebar-layout-toggle
                                  onClick={ensureMenuScrolledIntoView}
                                  in-view-class="in-view"
                                  class={{
                                    "three-dee-effect": true,
                                    [sidebarToggleClass]: true,
                                  }}
                                >
                                  <img
                                    class="burger-graphic"
                                    src="/assets/burger.svg"
                                  />
                                  <img
                                    class="ex-graphic"
                                    src="/assets/close.svg"
                                  />
                                </amplify-sidebar-layout-toggle>
                              </amplify-sidebar-layout-main>,
                              !this.pageData?.disableTOC && (
                                <div slot="toc" class={tocStyle}>
                                  <div>
                                    <amplify-toc
                                      pageTitle={this.pageData?.title}
                                    />
                                  </div>
                                </div>
                              ),
                            ]
                          )}
                        </amplify-sidebar-layout>
                      </amplify-toc-provider>
                    </div>
                  ) : (
                    <docs-four-o-four />
                  ),
                  <docs-footer />,
                ]}
            <docs-chat-button />
          </pageContext.Provider>
        </Host>
      );
    }
  }
}
