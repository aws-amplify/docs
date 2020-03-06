import {Component, h, Prop, Host} from "@stencil/core";
import {pageContext} from "../page/page.context";
import {SelectedFilters} from "../page/page.types";

const mobilePlatforms = {
  ios: true,
  android: true,
};

const isMobileSelected = (selectedFilters?: SelectedFilters): boolean =>
  (selectedFilters?.platform && mobilePlatforms[selectedFilters.platform]) ||
  false;

@Component({tag: "docs-card", shadow: false})
export class DocsCard {
  /*** the global filter state */
  @Prop() readonly selectedFilters?: SelectedFilters;
  /*** if true, the thumbnail gets rendered to the left of the detail (not above) */
  @Prop() readonly vertical?: boolean;
  /*** url */
  @Prop() readonly url?: string;
  /*** add a different url when mobile selected */
  @Prop() readonly urlOverrideForMobileFilter?: string;

  render() {
    const {vertical, url, urlOverrideForMobileFilter} = this;
    return (
      <Host>
        <amplify-card
          containerTag="docs-internal-link"
          {...{vertical}}
          url={
            isMobileSelected(this.selectedFilters)
              ? urlOverrideForMobileFilter
              : url
          }
        >
          <slot name="graphic" />
          <slot name="heading" />
          <slot name="description" />
        </amplify-card>
      </Host>
    );
  }
}

pageContext.injectProps(DocsCard, ["selectedFilters"]);
