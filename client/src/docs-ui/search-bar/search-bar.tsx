import {Component, Host, h, Build, Listen} from "@stencil/core";
import {searchStyle} from "./search-bar.style";
import {transformData} from "../../utils/transform-search-data";
import {ALGOLIA_API_KEY, ALGOLIA_INDEX_NAME} from "../../constants/algolia";

@Component({tag: "docs-search-bar", shadow: false})
export class DocsSearchBar {
  initDocSearch() {
    if (Build.isBrowser) {
      // @ts-ignore
      docsearch({
        apiKey: ALGOLIA_API_KEY,
        indexName: ALGOLIA_INDEX_NAME,
        inputSelector: ".amplify-docs-search-input:not(.ds-input)",
        debug: false,
        transformData,
      });
    }
  }

  @Listen("resize", {target: "window"})
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
