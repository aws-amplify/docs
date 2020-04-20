import {Component, h, Prop, Host} from "@stencil/core";
import {
  cardStyle,
  graphicStyle,
  detailsStyle,
  externalLinkGraphic,
  hostStyle,
} from "./card.style";
import {createVNode} from "../../utils/hyperscript";
import {pageContext} from "../../docs-ui/page/page.context";
import {SelectedFilters} from "../../docs-ui/page/page.types";

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
  /*** add a different url when mobile selected */
  @Prop() readonly urlOverrideForMobileFilter?: string;
  /*** if true, the thumbnail gets rendered to the left of the detail (not above) */
  @Prop() readonly vertical?: boolean;
  /*** url */
  @Prop() readonly url?: string;
  /*** link tag to use */
  @Prop() readonly containerTag: string = "docs-internal-link";
  /*** whether or not to show external link graphic */
  @Prop() readonly external?: boolean;

  render() {
    const {vertical, url, urlOverrideForMobileFilter} = this;
    return (
      <Host class={hostStyle}>
        {createVNode(
          this.containerTag,
          {
            href:
              isMobileSelected(this.selectedFilters) &&
              urlOverrideForMobileFilter
                ? urlOverrideForMobileFilter
                : url,
            ...(this.external ? {target: "_blank"} : {}),
          },
          <div class={{[cardStyle]: true, vertical: !!vertical}}>
            <div class={{[graphicStyle]: true, vertical: !!vertical}}>
              <slot name="graphic" />
            </div>
            <div class={detailsStyle}>
              <slot name="heading" />
              <slot name="description" />
            </div>
            {this.external && (
              <img
                class={externalLinkGraphic}
                src={`/assets/external-link-black.svg`}
                alt="External link"
              />
            )}
          </div>,
        )}
      </Host>
    );
  }
}

pageContext.injectProps(DocsCard, ["selectedFilters"]);
