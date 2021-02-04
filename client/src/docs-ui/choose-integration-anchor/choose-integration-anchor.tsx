import {Component, Host, h, Prop} from "@stencil/core";
import {Page} from "../../api";
import {
  mobileFilterMetadataByOption,
  webFilterMetadataByOption,
} from "../../utils/filter-data";
import {hostStyle} from "./choose-integration-anchor.style";

@Component({tag: "docs-choose-integration-anchor", shadow: false})
export class DocsChooseIntegrationAnchor {
  /*** the current page's data */
  @Prop() readonly page?: Page;

  render() {
    return (
      <Host class={hostStyle}>
        <h2>Choose a platform or framework</h2>
        <h3>Web</h3>
        <amplify-responsive-grid
          gridGap={1}
          columns={5}
          class="border-radius margin-top-md"
        >
          {Object.entries(webFilterMetadataByOption).map(
            ([filterValue, {label, graphicURI}]) => {
              const route =
                this.page && `${this.page.route}/q/integration/${filterValue}`;

              return (
                <docs-card
                  key={label}
                  url={route}
                  QSPs={`?sc_icampaign=${filterValue}-start&sc_ichannel=choose-integration`}
                >
                  <img slot="graphic" src={graphicURI} alt={`${label} Logo`} />
                  <h4 slot="heading">{label}</h4>
                </docs-card>
              );
            },
          )}
        </amplify-responsive-grid>
        <h3>Mobile</h3>
        <amplify-responsive-grid
          gridGap={1}
          columns={5}
          class="border-radius margin-top-md"
        >
          {Object.entries(mobileFilterMetadataByOption).map(
            ([filterValue, {label, graphicURI}]) => {
              const route =
                this.page && `${this.page.route}/q/integration/${filterValue}`;

              return (
                <docs-card
                  key={label}
                  url={route}
                  QSPs={`?sc_icampaign=${filterValue}-start&sc_ichannel=choose-integration`}
                >
                  <img slot="graphic" src={graphicURI} alt={`${label} Logo`} />
                  <h4 slot="heading">{label}</h4>
                </docs-card>
              );
            },
          )}
        </amplify-responsive-grid>
      </Host>
    );
  }
}
