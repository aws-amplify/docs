import {Component, Host, Prop, h} from "@stencil/core";
import {pageContext} from "../page/page.context";
import {SelectedFilters} from "../page/page.types";

@Component({tag: "docs-filter-target", shadow: false})
export class DocsFilterTarget {
  /*** the currently-selected filter state */
  @Prop() readonly selectedFilters?: SelectedFilters;
  /*** the conditions off of which to style the host visible vs. hidden */
  @Prop() readonly filters?: Record<string, string>;

  shouldDisplay(): boolean {
    if (this.filters && this.selectedFilters) {
      for (const [filterKey, filterValue] of Object.entries(this.filters)) {
        if (this.selectedFilters[filterKey] !== filterValue) {
          return false;
        }
      }
    }
    return true;
  }

  render() {
    return (
      <Host style={{display: this.shouldDisplay() ? "initial" : "none"}}>
        <slot />
      </Host>
    );
  }
}

pageContext.injectProps(DocsFilterTarget, ["selectedFilters"]);
