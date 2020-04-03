import {
  Component,
  Host,
  h,
  Prop,
  State,
  Watch,
  Listen,
  Element,
} from "@stencil/core";
import {
  sidebarLayoutStyle,
  pageStyle,
  tocStyle,
  sidebarToggleClass,
  mainStyle,
} from "./page.style";
import {Page, createVNodesFromHyperscriptNodes} from "../../api";
import {updateDocumentHead} from "../../utils/update-document-head";
import Url from "url-parse";
import {
  getFilterKeyFromPage,
  getFilterKeyFromLocalStorage,
  withFilterOverrides,
} from "../../utils/filters";
import {filterOptionsByName} from "../../utils/filter-data";
import {internalLinkContext} from "../internal-link/internal-link.context";
import {SetSelectedFilters} from "./page.types";
import {pageContext} from "./page.context";
import {track, AnalyticsEventType} from "../../utils/track";
import {Breakpoint} from "../../amplify-ui/styles/media";
import {getPage} from "../../cache";
import {popped, setPopped} from "../../utils/pop-state";
import {getNavHeight} from "../../utils/get-nav-height";
import {scrollToHash} from "../../utils/scroll-to-hash";

@Component({tag: "docs-page", shadow: false})
export class DocsPage {
  @Element() el: HTMLElement;

  /*** the current page path */
  @Prop() readonly currentPath?: string;

  @State() data?: Page;
  @State() blendUniversalNav?: boolean;
  @State() sidebarStickyTop = getNavHeight("rem");

  @State() selectedFilters: Record<string, string | undefined> = {};

  setSelectedFilters: SetSelectedFilters = (updates) => {
    this.selectedFilters = {
      ...this.selectedFilters,
      ...withFilterOverrides(updates, this.selectedFilters),
    };
  };

  /**
   * 1. we save to these members in `componentWillLoad`
   * 2. we wait for the first render to set the state to avoid a race with the TOC
   * (ensuring that the TOC has rendered nodes to gather and observe)
   */
  filterKey?: string;
  filterValue?: string;

  // @ts-ignore
  @Watch("currentPath")
  computeFilter() {
    if (this.filterKey) {
      const queryParams = new Url(location.href, true).query;
      const {[this.filterKey]: filterValue} = queryParams;
      if (filterValue) {
        this.filterValue = filterValue;
        localStorage.setItem(
          getFilterKeyFromLocalStorage(this.filterKey),
          filterValue,
        );
        this.setSelectedFilters({[this.filterKey]: this.filterValue});
      }
    }
  }

  // @ts-ignore
  @Listen("resize", {target: "window"})
  setSidebarStickyTop() {
    this.sidebarStickyTop = getNavHeight("rem");
  }

  ensureMenuScrolledIntoViewOnMobileMenuOpen = () => {
    const footer = document.querySelector("docs-footer");
    const documentHeight = document.body.getBoundingClientRect().height;
    if (footer && innerWidth <= Breakpoint.TABLET * 16) {
      const footerHeight = footer.getBoundingClientRect().height;
      if (scrollY > documentHeight - innerHeight - footerHeight) {
        if (scrollY > documentHeight - innerHeight - footerHeight) {
          const targetOffsetTop = documentHeight - (footerHeight + innerHeight);
          scrollTo({top: targetOffsetTop});
        }
      }
    }
  };

  componentWillUpdate() {
    if ((!this.data || this.data?.route !== location.pathname) && popped) {
      setPopped(false);
      return this.getPageData();
    }
  }

  componentWillLoad() {
    track({
      type: AnalyticsEventType.PAGE_VISIT,
      attributes: {url: location.href},
    });

    this.setSidebarStickyTop();
    return this.getPageData();
  }

  componentDidLoad() {
    const {hash} = location;
    if (hash) {
      setTimeout(() => {
        scrollToHash(hash, this.el);
      }, 100);
    }
  }

  getPageData = async () => {
    const {pathname} = location;
    this.blendUniversalNav = pathname === "/";

    try {
      this.data = await getPage(pathname);
      if (this.data) {
        updateDocumentHead(this.data);
        this.filterKey = getFilterKeyFromPage(this.data);
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
        this.computeFilter();
      }
    } catch (exception) {
      track({
        type: AnalyticsEventType.PAGE_DATA_FETCH_EXCEPTION,
        attributes: {url: location.href, exception},
      });
    }
  };

  requiresFilterSelection = (): boolean =>
    !!(this.filterKey && !this.filterValue);

  showMenu = (): boolean => {
    const menuItems = this.data?.menu;
    const menuItemsExist = !!(menuItems && menuItems.length > 0);
    return menuItemsExist && !this.requiresFilterSelection();
  };

  render() {
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
          {!this.data?.noTemplate
            ? [
                <docs-secondary-nav />,
                <div class={sidebarLayoutStyle}>
                  <amplify-toc-provider>
                    <amplify-sidebar-layout>
                      {this.showMenu() && (
                        <amplify-sidebar-layout-sidebar
                          slot="sidebar"
                          top={this.sidebarStickyTop}
                        >
                          <docs-menu page={this.data} />
                        </amplify-sidebar-layout-sidebar>
                      )}
                      {this.requiresFilterSelection() ? (
                        <amplify-sidebar-layout-main slot="main">
                          <amplify-toc-contents>
                            {this.filterKey === "integration" ? (
                              <docs-choose-integration-anchor
                                page={this.data}
                              />
                            ) : (
                              <docs-choose-anchor page={this.data} />
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
                              {this.data && [
                                <h1>{this.data.title}</h1>,
                                createVNodesFromHyperscriptNodes(
                                  this.data.body,
                                ),
                                <docs-next-previous
                                  key={this.data.route}
                                  page={this.data}
                                />,
                              ]}
                            </amplify-toc-contents>
                            <amplify-sidebar-layout-toggle
                              onClick={
                                this.ensureMenuScrolledIntoViewOnMobileMenuOpen
                              }
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
                          </amplify-sidebar-layout-main>,
                          !this.data?.disableTOC && (
                            <div slot="toc" class={tocStyle}>
                              <div>
                                <amplify-toc pageTitle={this.data?.title} />
                              </div>
                            </div>
                          ),
                        ]
                      )}
                    </amplify-sidebar-layout>
                  </amplify-toc-provider>
                </div>,
                <docs-footer />,
              ]
            : this.data && createVNodesFromHyperscriptNodes(this.data.body)}
          <docs-chat-button />
        </pageContext.Provider>
      </Host>
    );
  }
}

internalLinkContext.injectProps(DocsPage, ["currentPath"]);
