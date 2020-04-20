import {Component, Host, Prop, h, Watch, State} from "@stencil/core";
import {pageContext} from "../page/page.context";
import {SelectedFilters} from "../page/page.types";

@Component({tag: "docs-filter-target", shadow: false})
export class DocsFilterTarget {
  /*** the currently-selected filter state */
  @Prop() readonly selectedFilters?: SelectedFilters;
  /*** the conditions off of which to style the host visible vs. hidden */
  @Prop() readonly filters?: Record<string, string>;

  @State() shouldDisplay = false;

  @Watch("filters")
  @Watch("selectedFilters")
  componentWillLoad() {
    if (!this.selectedFilters) {
      this.shouldDisplay = false;
      return;
    }

    if (this.filters && this.selectedFilters) {
      for (const [filterKey, filterValue] of Object.entries(this.filters)) {
        if (this.selectedFilters[filterKey] !== filterValue) {
          this.shouldDisplay = false;
          return;
        }
      }
    }

    this.shouldDisplay = true;
  }

  render() {
    return (
      <Host style={{display: this.shouldDisplay ? "initial" : "none"}}>
        <slot name="content" />
      </Host>
    );
  }
}

pageContext.injectProps(DocsFilterTarget, ["selectedFilters"]);
