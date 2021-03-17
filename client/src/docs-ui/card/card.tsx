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
import {PLATFORM_FILTER_OPTIONS} from "../../utils/filter-data";

const mobilePlatforms = {
  ios: true,
  android: true,
};

const isMobileSelected = (selectedFilters?: SelectedFilters): boolean =>
  (selectedFilters?.platform && mobilePlatforms[selectedFilters.platform]) ||
  false;

const isPlatformSelected = (
  platform: typeof PLATFORM_FILTER_OPTIONS[number],
  selectedFilters?: SelectedFilters,
): boolean =>
  (selectedFilters?.platform && selectedFilters.platform === platform) || false;

@Component({tag: "docs-card", shadow: false})
export class DocsCard {
  /*** the global filter state */
  @Prop() readonly selectedFilters?: SelectedFilters;
  /*** add a different url when mobile selected */
  @Prop() readonly urlOverrideForMobileFilter?: string;
  /*** add a different url when mobile selected */
  @Prop() readonly urlOverrideForIOSFilter?: string;
  /*** add a different url when mobile selected */
  @Prop() readonly urlOverrideForAndroidFilter?: string;
  /*** add a different url when mobile selected */
  @Prop() readonly urlOverrideForJSFilter?: string;
  /*** if true, the thumbnail gets rendered to the left of the detail (not above) */
  @Prop() readonly vertical?: boolean;
  /*** url */
  @Prop() readonly url?: string;
  /*** query string parameters to attach to the link */
  @Prop() readonly QSPs: string = "";
  /*** link tag to use */
  @Prop() readonly containertag: string = "docs-internal-link";
  /*** whether or not to show external link graphic */
  @Prop() readonly external?: boolean;

  render() {
    const {
      vertical,
      urlOverrideForMobileFilter,
      urlOverrideForIOSFilter,
      urlOverrideForAndroidFilter,
      urlOverrideForJSFilter,
    } = this;

    let href = this.url;

    if (urlOverrideForMobileFilter && isMobileSelected(this.selectedFilters)) {
      href = urlOverrideForMobileFilter;
    }

    if (
      urlOverrideForIOSFilter &&
      isPlatformSelected("ios", this.selectedFilters)
    ) {
      href = urlOverrideForIOSFilter;
    }

    if (
      urlOverrideForAndroidFilter &&
      isPlatformSelected("android", this.selectedFilters)
    ) {
      href = urlOverrideForAndroidFilter;
    }

    if (
      urlOverrideForJSFilter &&
      isPlatformSelected("js", this.selectedFilters)
    ) {
      href = urlOverrideForJSFilter;
    }

    return (
      <Host class={hostStyle}>
        {createVNode(
          this.containertag,
          {
            href,
            QSPs: this.QSPs,
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
