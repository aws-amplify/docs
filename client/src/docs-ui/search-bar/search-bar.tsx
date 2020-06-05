import {Component, Host, h, Build, Element} from "@stencil/core";
import {searchStyle} from "./search-bar.style";
import {transformData} from "../../utils/transform-search-data";
import {
  ALGOLIA_API_KEY,
  ALGOLIA_INDEX_NAME,
  UNINITIALIZED_SEARCH_INPUT_SELECTOR,
} from "../../constants/algolia";

@Component({tag: "docs-search-bar", shadow: false})
export class DocsSearchBar {
  @Element() element: HTMLElement;

  initDocSearch() {
    if (Build.isBrowser) {
      const nToInit = this.element.querySelectorAll(
        UNINITIALIZED_SEARCH_INPUT_SELECTOR,
      ).length;
      if (nToInit > 0) {
        // @ts-ignore
        docsearch({
          apiKey: ALGOLIA_API_KEY,
          indexName: ALGOLIA_INDEX_NAME,
          inputSelector: UNINITIALIZED_SEARCH_INPUT_SELECTOR,
          debug: false,
          transformData,
        });
      }
    }
  }

  componentDidRender() {
    this.initDocSearch();
  }

  render() {
    return (
      <Host class={searchStyle}>
        <div>
          <div>
            <input
              class="amplify-docs-search-input three-dee-effect"
              type="search"
              placeholder="Search"
            />
            <img src="/assets/search.svg" alt="search" />
          </div>
        </div>
      </Host>
    );
  }
}
