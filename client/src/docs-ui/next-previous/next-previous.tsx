import {Component, h, Host, Prop} from "@stencil/core";
import {
  nextPreviousLinkContainerStyle,
  nextPreviousLinkStyle,
  textGroupStyle,
  textAlignmentStyleByDirection,
} from "./next-previous.style";
import {Page, PageLink, Direction} from "../../api";
import {pageContext} from "../page/page.context";
import {SelectedFilters} from "../page/page.types";
import {VNode} from "@stencil/router/dist/types/stencil.core";

@Component({tag: "docs-next-previous", shadow: false})
export class DocsNextPrevious {
  /*** page from with `next` and `previous` can be attained */
  @Prop() readonly page?: Page;
  /*** currently-selected filter state */
  @Prop() readonly selectedFilters?: SelectedFilters;

  renderLink = (pageLink: PageLink, direction: Direction): VNode => {
    return (
      <docs-internal-link class={nextPreviousLinkStyle} href={pageLink.route}>
        {direction === "previous" && (
          <img src="/assets/arrow-left.svg" alt="Previous Page" />
        )}
        <div
          class={{
            [textGroupStyle]: true,
            [textAlignmentStyleByDirection[direction]]: true,
          }}
        >
          <span>{direction}</span>
          <h4>{pageLink.title}</h4>
        </div>
        {direction === "next" && (
          <img src="/assets/arrow-right.svg" alt="Next Page" />
        )}
      </docs-internal-link>
    );
  };

  render() {
    return (
      <Host class={nextPreviousLinkContainerStyle}>
        {this.page &&
          [
            {
              direction: "previous" as Direction,
              pageLinkOrLinkDictionary: this.page.previous,
            },
            {
              direction: "next" as Direction,
              pageLinkOrLinkDictionary: this.page.next,
            },
          ].map(({direction, pageLinkOrLinkDictionary}) => {
            if (pageLinkOrLinkDictionary) {
              if (pageLinkOrLinkDictionary.route) {
                return this.renderLink(
                  pageLinkOrLinkDictionary as PageLink,
                  direction,
                );
              } else {
                const filterKey = this.page?.filterKey;
                if (filterKey && this.selectedFilters) {
                  const selected = this.selectedFilters[filterKey] as string;
                  const currentPageLink = pageLinkOrLinkDictionary[
                    selected
                  ] as PageLink;
                  if (currentPageLink) {
                    return this.renderLink(currentPageLink, direction);
                  }
                }
              }
            }

            return <div />;
          })}
      </Host>
    );
  }
}

pageContext.injectProps(DocsNextPrevious, ["selectedFilters"]);
