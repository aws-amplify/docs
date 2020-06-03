import {Component, Host, h, Build, Listen} from "@stencil/core";
import {searchStyle} from "./search-bar.style";
import {transformData} from "../../utils/transform-search-data";

@Component({tag: "docs-search-bar", shadow: false})
export class DocsSearchBar {
  initDocSearch() {
    if (Build.isBrowser) {
      // @ts-ignore
      docsearch({
        apiKey: "24d37f059982b2f5ecf829afe93aed40",
        indexName: "aws_amplify_new",
        inputSelector: "#amplify-docs-search-input",
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
              id="amplify-docs-search-input"
              type="search"
              placeholder="Search"
              class="three-dee-effect"
            />
            <img src="/assets/search.svg" alt="search" />
          </div>
        </div>
      </Host>
    );
  }
}
