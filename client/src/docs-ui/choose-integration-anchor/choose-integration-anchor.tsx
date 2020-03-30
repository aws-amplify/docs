import {Component, Host, h, Prop} from "@stencil/core";
import {Page} from "../../api";
import {
  mobileFilterMetadataByOption,
  webFilterMetadataByOption,
} from "../../utils/filter-data";
import {internalLinkContext} from "../internal-link/internal-link.context";
import {SetCurrentPath} from "../internal-link/internal-link.types";
import {hostStyle} from "./choose-integration-anchor.style";

@Component({tag: "docs-choose-integration-anchor"})
export class DocsChooseIntegrationAnchor {
  /*** method to trigger the update of the currently-mounted `Page` */
  @Prop() readonly setCurrentPath?: SetCurrentPath;
  /*** the current page's data */
  @Prop() readonly page?: Page;

  createOnClick = (path: string | undefined) => () => {
    path && this.setCurrentPath && this.setCurrentPath(path);
  };

  render() {
    return (
      <Host class={hostStyle}>
        <h2>Choose a platform or framework</h2>
        <h3>Web</h3>
        <amplify-responsive-grid
          gridGap={1}
          columns={4}
          class="border-radius margin-top-md"
        >
          {Object.entries(webFilterMetadataByOption).map(
            ([filterValue, {label, graphicURI}]) => {
              const route =
                this.page && `${this.page.route}?integration=${filterValue}`;

              return (
                <amplify-card
                  key={label}
                  vertical
                  onClick={this.createOnClick(route)}
                  url={route}
                >
                  <img slot="graphic" src={graphicURI} alt={`${label} Logo`} />
                  <h4 slot="heading">{label}</h4>
                </amplify-card>
              );
            },
          )}
        </amplify-responsive-grid>
        <h3>Mobile</h3>
        <amplify-responsive-grid
          gridGap={1}
          columns={4}
          class="border-radius margin-top-md"
        >
          {Object.entries(mobileFilterMetadataByOption).map(
            ([filterValue, {label, graphicURI}]) => {
              const route =
                this.page && `${this.page.route}?integration=${filterValue}`;

              return (
                <amplify-card
                  key={label}
                  vertical
                  onClick={this.createOnClick(route)}
                  url={route}
                >
                  <img slot="graphic" src={graphicURI} alt={`${label} Logo`} />
                  <h4 slot="heading">{label}</h4>
                </amplify-card>
              );
            },
          )}
        </amplify-responsive-grid>
      </Host>
    );
  }
}

internalLinkContext.injectProps(DocsChooseIntegrationAnchor, [
  "setCurrentPath",
]);
