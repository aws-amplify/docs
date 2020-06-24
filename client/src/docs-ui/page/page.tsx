import {Component, Host, h, State, Listen, Element, Build} from "@stencil/core";
import {
  sidebarLayoutStyle,
  pageStyle,
  tocStyle,
  sidebarToggleClass,
  mainStyle,
  sectionHeaderStyle,
} from "./page.style";
import {
  Page,
  createVNodesFromHyperscriptNodes,
  filtersByRoute,
} from "../../api";
import {updateDocumentHead} from "../../utils/update-document-head";
import {
  getFilterKeyFromPage,
  getFilterKeyFromLocalStorage,
  withFilterOverrides,
} from "../../utils/filters";
import {filterOptionsByName} from "../../utils/filter-data";
import {
  SetSelectedFilters,
  SelectedTabHeadings,
  SetNewSelectedTabHeadings,
} from "./page.types";
import {pageContext} from "./page.context";
import {track, AnalyticsEventType} from "../../utils/track";
import {ensureMenuScrolledIntoView} from "../../utils/ensure-menu-scrolled-into-view";
import {getPage} from "../../cache.worker";
import {getNavHeight} from "../../utils/get-nav-height";
import {scrollToHash} from "../../utils/scroll-to-hash";
import {parseURL} from "../../utils/url/url.worker";

const SELECTED_TABS_LOCAL_STORAGE_KEY = `amplify-docs::selected-tabs`;

@Component({tag: "docs-page", shadow: false})
export class DocsPage {
  @Element() el: HTMLElement;

  @State() pageData?: Page;
  @State() blendUniversalNav?: boolean;
  @State() sidebarStickyTop = getNavHeight("rem");
  @State() selectedFilters: Record<string, string | undefined> = {};
  @State() selectedTabHeadings: SelectedTabHeadings = [];

  rafId?: number;
  isFirstRenderOfCurrentPage = true;
  previousPathname = "";

  setNewSelectedTabHeading: SetNewSelectedTabHeadings = (tabHeading) => {
    // create temp array with `tabHeading` (the new highest priority) as first el
    const nextSelectedTabHeadings = new Array<string>();
    nextSelectedTabHeadings.push(tabHeading);

    // iterate through previous `selectedTabHeadings`
    this.selectedTabHeadings.forEach((e) => {
      // no repeats allowed!
      if (tabHeading !== e) {
        // ensure preexisting tab name priorities are preserved
        nextSelectedTabHeadings.push(e);
      }
    });

    // set the new priority list in state
    this.selectedTabHeadings = nextSelectedTabHeadings;

    // and serialize and save it to local storage
    localStorage.setItem(
      SELECTED_TABS_LOCAL_STORAGE_KEY,
      JSON.stringify(this.selectedTabHeadings),
    );
  };

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
  validFilterValue = true;

  @Listen("resize", {target: "window"})
  setSidebarStickyTop() {
    if (this.pageData?.menu) {
      this.sidebarStickyTop = getNavHeight("rem");
    }
  }

  startRaf() {
    // lets us repeatedly call `updatePageData` without actually
    // triggering redundant `this.getPageData` calls.
    let {pathname} = location;
    const updatePageData = () => {
      if (location.pathname !== pathname) {
        this.isFirstRenderOfCurrentPage = true;
        this.previousPathname = pathname;
        pathname = location.pathname;
        this.getPageData();
      }
    };

    // create RAF loop, save its ID (so that we can end the loop in `componentWillUnload`).
    // This loop triggers `updatePageData`, which––upon path changes––triggers the appropriate rerender.
    this.rafId = (function watchForRouteChange() {
      updatePageData();
      return requestAnimationFrame(watchForRouteChange);
    })();
  }

  componentDidLoad() {
    this.startRaf();
  }

  scrollToId() {
    const {hash} = location;
    if (hash) {
      setTimeout(() => {
        // TODO: fix potential race condition
        scrollToHash(hash, this.el);
      }, 250);
    }
  }

  componentDidRender() {
    this.setSidebarStickyTop();
    if (this.isFirstRenderOfCurrentPage) {
      this.scrollToId();
    }
    this.isFirstRenderOfCurrentPage = false;
  }

  stopRaf() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
  }

  componentWillUnload() {
    this.stopRaf();
  }

  restoreBlockSwitcherState() {
    // gather list of previously-selected tab headings (might be null)
    const persistedSelectedTabsSerialized =
      localStorage.getItem(SELECTED_TABS_LOCAL_STORAGE_KEY) || undefined;
    if (persistedSelectedTabsSerialized) {
      // save that selection array if it exists (otherwise, list is empty)
      this.selectedTabHeadings = JSON.parse(persistedSelectedTabsSerialized);
    }
  }

  componentWillLoad() {
    this.restoreBlockSwitcherState();
    return this.getPageData();
  }

  async getPageData() {
    let currentRoute = location.pathname || "/";
    if (!currentRoute.startsWith("/")) {
      currentRoute = `/${currentRoute}`;
    }
    if (currentRoute.endsWith("/") && currentRoute !== "/") {
      currentRoute = currentRoute.substring(0, currentRoute.length - 1);
    }

    const {path, params} = await parseURL(currentRoute);
    const routeFiltersEntry = filtersByRoute.get(path);
    const allFilters =
      routeFiltersEntry &&
      Object.values(routeFiltersEntry).reduce((acc, curr) => {
        return [...acc, ...curr];
      }, []);
    this.blendUniversalNav = currentRoute === "/";

    track({
      type: AnalyticsEventType.PAGE_VISIT,
      attributes: {url: currentRoute, previousUrl: this.previousPathname},
    });

    try {
      const pageData = await getPage(currentRoute);
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
          if (typeof filterValue === "string" && filterValue !== "undefined") {
            this.filterValue = filterValue;
            if (allFilters) {
              this.validFilterValue = allFilters.includes(filterValue);
              if (this.validFilterValue) {
                this.setSelectedFilters({[this.filterKey]: this.filterValue});
              }
            }
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
      track({
        type: AnalyticsEventType.PAGE_DATA_FETCH_EXCEPTION,
        attributes: {url: location.href, exception},
      });
    }
  }

  showMenu = (): boolean => {
    const menuItems = this.pageData?.menu;
    return !!(menuItems && menuItems.length > 0);
  };

  render() {
    if (Build.isBrowser || location.pathname === "/") {
      return (
        <Host class={pageStyle}>
          <pageContext.Provider
            state={{
              selectedFilters: this.selectedFilters,
              setSelectedFilters: this.setSelectedFilters,
              selectedTabHeadings: this.selectedTabHeadings,
              setNewSelectedTabHeadings: this.setNewSelectedTabHeading,
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
                  this.pageData && this.validFilterValue ? (
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
                          <amplify-sidebar-layout-main
                            slot="main"
                            class={mainStyle}
                          >
                            <amplify-toc-contents>
                              {this.pageData && [
                                <h1
                                  class={{
                                    [sectionHeaderStyle]: true,
                                    "category-heading": true,
                                  }}
                                >
                                  {this.pageData.sectionTitle}
                                </h1>,
                                <h1 class="page-heading">
                                  {this.pageData.title}
                                </h1>,
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
                              <img class="ex-graphic" src="/assets/close.svg" />
                            </amplify-sidebar-layout-toggle>
                          </amplify-sidebar-layout-main>
                          {!this.pageData?.disableTOC && (
                            <div slot="toc" class={tocStyle}>
                              <div>
                                <amplify-toc pageTitle={this.pageData?.title} />
                              </div>
                            </div>
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
